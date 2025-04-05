"use server";

import { Client, Databases, Query } from "node-appwrite"; // Ensure the correct package is used
import { createAdminClient } from "@/appwrite/appwriteClient";
import { FollowedSource, FollowedSources, FollowedTopics } from "@/types";

const session = await createAdminClient();

const databases = new Databases(session.client as Client); // Explicitly cast to the correct Client type

export async function getFollowedTopics( userId: string, topicId: string = '') {
  try {
    const followedResponse = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
        userId
    );

    const followedData = {
        $id: followedResponse.$id,
        UserFollowedTopics: followedResponse.UserFollowedTopics,
    } as FollowedTopics;

    if (topicId !== '') {
        if (followedData.UserFollowedTopics.includes(topicId)) {
            return followedData;
        } else {
            return null; // Article is not bookmarked
        }
    } else {
        return followedData; // Return all bookmarks
    }
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}

export async function getFollowedSources( userId: string, sourceId: string = '') {
  try {
    const followedResponse = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
        userId
    );

    const followedData = {
        $id: followedResponse.$id,
        UserFollowedSources: followedResponse.UserFollowedSources,
    } as FollowedSources;

    if (sourceId !== '') {
        if (followedData.UserFollowedSources.includes(sourceId)) {
            return followedData;
        } else {
            return null; // Article is not bookmarked
        }
    } else {
        return followedData; // Return all bookmarks
    }
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}

export async function setFollowedTopics( userId: string, topicId: string) {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
    )

    if (!document) {
      console.error(`Document with ID ${userId} not found.`);
      return null;
    }

    const userFollowedTopics = document.UserFollowedTopics || [];
    userFollowedTopics.push(topicId);

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
      {
        UserFollowedTopics: userFollowedTopics,
      },
    );
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
}

export async function undoFollowedTopics( userId: string, topicId: string) {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
    )

    if (!document) {
      console.error(`Document with ID ${userId} not found.`);
      return null;
    }

    const userFollowedTopics = (document.UserFollowedTopics || []).filter(
        (followedTopicId: string) => followedTopicId !== topicId
    );


    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
      {
        UserFollowedTopics: userFollowedTopics,
      },
    );
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
}

export async function setFollowedSources( userId: string, sourceId: string) {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
    )

    if (!document) {
      console.error(`Document with ID ${userId} not found.`);
      return null;
    }

    const userFollowedSources = document.UserFollowedSources || [];
    userFollowedSources.push(sourceId);

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
      {
        UserFollowedSources: userFollowedSources,
      },
    );
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
}

export async function undoFollowedSources( userId: string, sourceId: string) {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
    )

    if (!document) {
      console.error(`Document with ID ${userId} not found.`);
      return null;
    }

    const userFollowedSources = (document.UserFollowedSources || []).filter(
        (followedsourceId: string) => followedsourceId !== sourceId
    );


    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
      {
        UserFollowedSources: userFollowedSources,
      },
    );
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
}


export async function getSource(source: string) {
  try {
    const sourceResponse = await databases.listDocuments(
      '66e992ad00337f2887d0',
      '673995d50003db697576',
      [
        Query.equal('ArticleSourceName', source),
        Query.limit(1),
      ]
    );

    const sourceData = {
      $id: sourceResponse.documents[0].$id,
      SourceName: sourceResponse.documents[0]?.ArticleSourceName,
      SourceLinks: sourceResponse.documents[0]?.ArticleSourceLinks,
      SourceLogo: sourceResponse.documents[0]?.ArticleSourceLogo,
      SourceAlignment: sourceResponse.documents[0]?.ArticleSourceAlignment,
    } as FollowedSource;

    console.log(sourceData);
    return sourceData;

  } catch (error) {
    console.error(`Error retrieving topic ${source}: ${error}`);
    return null;
  }
}
