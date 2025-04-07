"use server"

import { Client, Databases, Query } from "node-appwrite";
import { Article, FollowedTopic } from "@/types";

export async function searchTopics(offset = 0, searchedTerm: string) {
  try {
    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

    const databases = new Databases(client);

    const topicResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_TOPICS_COLLECTION || '',
      [
        Query.contains('TopicName', [searchedTerm]),
        Query.limit(3),
        Query.offset(offset * 3),
      ]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topicsData = topicResponse.documents?.map((doc: any) => ({
      $id: doc.$id,
      TopicName: doc.TopicName,
      TopicCategories: doc.TopicCategories,
      TopicArticles: doc.TopicArticles,
    })) as FollowedTopic[] || [];

    return topicsData;
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}

export async function searchArticles(offset = 0, searchedTerm: string) {
  try {
    const client = new Client();
    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

    const databases = new Databases(client);

    const articleResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION || '',
      [
        Query.or([
            Query.contains('ArticleTitle', [searchedTerm]),
            Query.contains('ArticlePreview', [searchedTerm]),
            Query.contains('ArticleAuthors', [searchedTerm]),
            Query.contains('ArticleLink', [searchedTerm]),
            Query.contains('ArticleType', [searchedTerm]),
            Query.contains('ArticleLanguage', [searchedTerm]),
        ]),
        Query.limit(3),
        Query.offset(offset * 3),
        Query.orderDesc('ArticleDate'),
      ]
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articlesData = articleResponse.documents?.map((doc: any) => ({
      $id: doc.$id,
      ArticleTitle: doc.ArticleTitle,
      ArticleDate: doc.ArticleDate,
      ArticlePayWall: doc.ArticlePayWall,
      ArticleLink: doc.ArticleLink,
      ArticleAuthors: doc.ArticleAuthors,
      ArticleTopics: doc.ArticleTopics,
      ArticlePreview: doc.ArticlePreview,
      ArticleImage: doc.ArticleImage,
      ArticleReliability: doc.ArticleReliability,
      ArticleType: doc.ArticleType,
      ArticleLanguage: doc.ArticleLanguage,
      ArticleAlignment: doc.ArticleAlignment,
    })) as Article[] || [];

    return articlesData;
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}