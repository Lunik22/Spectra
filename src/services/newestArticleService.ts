"use server";

import { cardActionsClasses } from "@mui/material";
import { Client, Databases, Query } from "appwrite"; // Adjust the import based on your project structure

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || '') 
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '') 

const databases = new Databases(client);


export async function getAvailableAlignments(topic: string) {
  const alignments: ('l' | 's' | 'k')[] = ['l', 's', 'k'];
  const availableAlignments: { 'l': number, 's': number, 'k': number } = { 'l': 0, 's': 0, 'k': 0 };
  let timestamp = Math.floor(Date.now() / 1000);
  timestamp += 7200
  console.log(`Timestamp: ${timestamp}`);
  for (const alignment of alignments) {
    const response = await databases.listDocuments(
      '66e992ad00337f2887d0',
      '66e992d00033deaab869',
      [
        Query.contains('ArticleTopics', [topic]),
        Query.contains('ArticleAlignment', [alignment]),
        Query.greaterThanEqual('ArticleDate', timestamp - 86400),
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

export async function getNewestArticle(topic: string, availableAlignments: { 'l': number, 's': number, 'k': number }, alignment: 'l' | 's' | 'k' | '' = '', limit: number = 1) {
  const alignments = [];
  let timestamp = Math.floor(Date.now() / 1000);
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
    const response = await databases.listDocuments(
      '66e992ad00337f2887d0',
      '66e992d00033deaab869',
      [
        Query.contains('ArticleTopics', [topic]),
        Query.limit(limit),
        Query.contains('ArticleAlignment', [alignmentLocal]),
        Query.greaterThanEqual('ArticleDate', timestamp - 86400),
        Query.orderDesc('ArticleDate'),
      ]
    );
    if (response.documents.length > 0) {
      console.log(response.documents[0]);
      return response.documents[0]
    } else {
      return {};
    }
  } catch (error) {
    console.error(`Error retrieving newest article: ${error}`);
    return '';
  }
}