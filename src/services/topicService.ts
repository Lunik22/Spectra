"use server";

import { cardActionsClasses } from "@mui/material";
import { Client, Databases, Query } from "appwrite"; // Adjust the import based on your project structure
import { Topic } from "@/types";
import { getAvailableAlignments, getNewestArticle } from "./newestArticleService";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '') 
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '') 

const databases = new Databases(client);


export async function getTopics(offset = 0, category: string) {
  let timestamp = Math.floor(Date.now() / 1000);
  try {
    let topicResponse;
    if (category == '0'){
      topicResponse = await databases.listDocuments(
        '66e992ad00337f2887d0',
        '673995d50003db697576',
        [
          Query.greaterThanEqual('TopicLastArticle', timestamp - 172800),
          Query.limit(3),
          Query.offset(offset * 3),
        ]
      );
    } else {
      topicResponse = await databases.listDocuments(
        '66e992ad00337f2887d0',
        '673995d50003db697576',
        [
          Query.greaterThanEqual('TopicLastArticle', timestamp - 172800),
          Query.limit(3),
          Query.offset(offset * 3),
          Query.contains('TopicCategories', [category]),
        ]
      );
    }

    const topicsData = topicResponse.documents.map((doc: any) => ({
      $id: doc.$id,
      TopicName: doc.TopicName,
      TopicCategory: doc.TopicCategory,
      TopicArticles: doc.TopicArticles,
    })) as Topic[];
    console.log(topicsData);

    const availableAlignments: { [key: string]: any } = {};
    const articlesData: { [key: string]: any} = {};
    const topicsDataClean = [] as Topic[];

    for (const topic of topicsData) {
      console.log(topic.$id);
      const availableAlignmentsResponse = await getAvailableAlignments(topic.$id);
      console.log(`availableAlignmentsResponse for topic ${topic.$id}:`, availableAlignmentsResponse);


      if (availableAlignmentsResponse === null) {
        console.log(`No available alignments for topic ${topic.$id}`);
      } else {
        topicsDataClean.push(topic);
        availableAlignments[topic.$id] = availableAlignmentsResponse;
        console.log(`${availableAlignmentsResponse} available alignments for topic ${topic.$id}`);
        if (availableAlignmentsResponse) {
          const articleResponse = await getNewestArticle(topic.$id, availableAlignmentsResponse);
          if (articleResponse) {
            articlesData[topic.$id] = articleResponse;
          }
        }
      }
    }

    return { topics: topicsDataClean, articles: articlesData, alignmentsCount: availableAlignments };
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}

