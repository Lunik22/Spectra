"use server";

import { Source } from "@/types";
import { Client, Databases, Query } from "appwrite"; // Adjust the import based on your project structure

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '') 
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '') 

const databases = new Databases(client);

export async function getArticleSources(){
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_SOURCES_COLLECTION || '',
    );

    const sourcesData = response.documents?.map((doc) => ({
      $id: doc.$id,
      SourceName: doc.ArticleSourceName,
      SourceLink: doc.ArticleSourceLink,
      SourceAltImg: doc.ArticleSourceAltImg,
      SourceImg: doc.ArticleSourceImg,
      SourceAlignment: doc.ArticleSourceAlignment,
    })) as unknown as Source[] || [];

    if (response && response.documents.length > 0) {
      return sourcesData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving sources: ${error}`);
    return null;
  }
}

export async function getAvailableAlignments(topic: string, dateLimit: number = 86400) {
  const alignments: ('l' | 's' | 'k')[] = ['l', 's', 'k'];
  const availableAlignments: { 'l': number, 's': number, 'k': number } = { 'l': 0, 's': 0, 'k': 0 };
  let timestamp = Math.floor(Date.now() / 1000);
  timestamp += 7200
  console.log(`Timestamp: ${timestamp}`);
  for (const alignment of alignments) {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION || '',
      [
        Query.contains('ArticleTopics', [topic]),
        Query.contains('ArticleAlignment', [alignment]),
        Query.greaterThanEqual('ArticleDate', timestamp - dateLimit),
        Query.limit(10000),
      ]
    );

    if (response.documents.length > 0 ) {
      availableAlignments[alignment] = response.documents.length;
      console.log(`Alignment ${alignment} has ${response.documents.length} articles`);
    }
  }
  console.log(availableAlignments);

  if (availableAlignments['l'] > 0 || availableAlignments['s'] > 0 || availableAlignments['k'] > 0) {
    return availableAlignments;
  } else {
    return { 'l': 0, 's': 0, 'k': 0 };
  }
}

export async function getRandomAlignment(availableAlignments: { 'l': number, 's': number, 'k': number }): Promise<'l' | 's' | 'k'> {
  const validAlignments = (Object.keys(availableAlignments) as Array<keyof typeof availableAlignments>)
    .filter(key => availableAlignments[key] > 0);

  if (validAlignments.length === 0) {
    return 'l'; // Default to 'l' if no valid alignments are available
  }

  return validAlignments[Math.floor(Math.random() * validAlignments.length)];
}

export async function getArticles(topic: string, availableAlignments: { 'l': number, 's': number, 'k': number }, alignment: 'l' | 's' | 'k' | '' = '', limit: number = 1, offset: number = 0, dateLimit: number = 86400) {
  const alignments = [];
  const timestamp = Math.floor(Date.now() / 1000);
  for (const alignment of Object.keys(availableAlignments) as Array<'l' | 's' | 'k'>) {
    if (availableAlignments[alignment] > 0) {
      alignments.push(alignment);
    }
  }
  let alignmentLocal: 'l' | 's' | 'k' ;
  if (alignment !== '') {
    alignmentLocal = alignment as 'l' | 's' | 'k';
  } else {
    if (alignments.length === 1) {
      alignmentLocal = alignments[0] as 'l' | 's' | 'k';
    } else if (alignments.length === 0) {
      return '';
    } else {
      alignmentLocal = alignments[Math.floor(Math.random() * alignments.length)] as 'l' | 's' | 'k';
    }
  }
  try {
  let response;
  if(alignment == ''){
    response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION || '',
      [
        Query.contains('ArticleTopics', [topic]),
        Query.limit(limit),
        Query.greaterThanEqual('ArticleDate', timestamp - dateLimit),
        Query.orderDesc('ArticleDate'),
        Query.offset(offset),
      ]
    );
  }else{
    response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION || '',
      [
        Query.contains('ArticleTopics', [topic]),
        Query.limit(limit),
        Query.contains('ArticleAlignment', [alignmentLocal]),
        Query.greaterThanEqual('ArticleDate', timestamp - dateLimit),
        Query.orderDesc('ArticleDate'),
        Query.offset(offset),
      ]
    );
  }
  if (response && response.documents.length > 0) {
      console.log(response.documents[0]);
      return response.documents[0]
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving newest article: ${error}`);
    return '';
  }
}

export async function getArticle(articleId: string) {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION || '',
      articleId
    );
    if (response) {
      return response;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving article by ID: ${error}`);
    return null;
  }
}