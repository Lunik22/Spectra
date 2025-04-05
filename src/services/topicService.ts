"use server";

import { Client, Databases, Query } from "appwrite"; // Adjust the import based on your project structure
import { Topic } from "@/types";
import { getAvailableAlignments, getArticles, getRandomAlignment } from "./articleService";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '') 
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '') 

const databases = new Databases(client);

export async function getTopics(offset = 0, category: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  try {
    let topicResponse;
    if (category == '0') {
      topicResponse = await databases.listDocuments(
        '66e992ad00337f2887d0',
        '673995d50003db697576',
        [
          Query.greaterThanEqual('TopicLastArticle', timestamp - 86000),
          Query.limit(3),
          Query.offset(offset * 3),
          Query.orderDesc('TopicLatestArticlesCount'),
        ]
      );
    } else {
      topicResponse = await databases.listDocuments(
        '66e992ad00337f2887d0',
        '673995d50003db697576',
        [
          Query.greaterThanEqual('TopicLastArticle', timestamp - 86000),
          Query.limit(3),
          Query.offset(offset * 3),
          Query.contains('TopicCategories', [category]),
          Query.orderDesc('TopicLatestArticlesCount'),
        ]
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topicsData = topicResponse.documents?.map((doc: any) => ({
      $id: doc.$id,
      TopicName: doc.TopicName,
      TopicCategory: doc.TopicCategory,
      TopicArticles: doc.TopicArticles,
    })) as Topic[] || [];
    console.log(topicsData);

    const availableAlignments: { [key: string]: { l: number; s: number; k: number } } = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articlesData: { [key: string]: any } = {};
    const topicsDataClean = [] as Topic[];
    const alignments: { [key: string]: 'l' | 's' | 'k' } = {};

    for (const topic of topicsData) {
      console.log(topic.$id);
      const availableAlignmentsResponse = await getAvailableAlignments(topic.$id);
      console.log(`availableAlignmentsResponse for topic ${topic.$id}:`, availableAlignmentsResponse);

      if (availableAlignmentsResponse.l === 0 && availableAlignmentsResponse.s === 0 && availableAlignmentsResponse.k === 0) {
        console.log(`No available alignments for topic ${topic.$id}`);
      } else {
        topicsDataClean.push(topic);
        availableAlignments[topic.$id] = availableAlignmentsResponse;
        console.log(`${availableAlignmentsResponse} available alignments for topic ${topic.$id}`);

        const randomAlignment = await getRandomAlignment(availableAlignmentsResponse);
        alignments[topic.$id] = randomAlignment;

        if (availableAlignmentsResponse) {
          const articleResponse = await getArticles(topic.$id, availableAlignmentsResponse, randomAlignment);
          if (articleResponse) {
            articlesData[topic.$id] = articleResponse;
          }
        }
      }
    }

    return { topics: topicsDataClean, articles: articlesData, alignmentsCount: availableAlignments, alignments };
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}

export async function getTopic(topic: string) {
  try {
    const topicResponse = await databases.getDocument(
      '66e992ad00337f2887d0',
      '673995d50003db697576',
      topic,
    );

    const topicData = {
      $id: topicResponse.$id,
      TopicName: topicResponse.TopicName,
      TopicCategory: topicResponse.TopicCategory,
      TopicArticles: topicResponse.TopicArticles,
      TopicLastArticle: topicResponse.TopicLastArticle,
      TopicLatestArticlesCount: topicResponse.TopicLatestArticlesCount,
      TopicCategories: topicResponse.TopicCategories,
    } as Topic;

    console.log(topicData);
    return topicData;

  } catch (error) {
    console.error(`Error retrieving topic ${topic}: ${error}`);
    return null;
  }
}

