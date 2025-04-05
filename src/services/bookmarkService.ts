"use server";

import { Client, Databases, Query } from "node-appwrite"; // Ensure the correct package is used
import { createAdminClient } from "@/appwrite/appwriteClient";

const session = await createAdminClient();

const databases = new Databases(session.client as Client); // Explicitly cast to the correct Client type

export async function isArticleBookmarked( userId: string, articleId: string) {
  try {
    const bookmarkResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      [
          Query.equal('$id', userId),
          Query.contains('UserSavedArticles', articleId),
      ]
    );
    
    if (bookmarkResponse.documents.length > 0) {
        return bookmarkResponse.documents; // Article is bookmarked
    } else {
        return null; // Article is not bookmarked
    }
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
    return null;
  }
}

export async function setBookmark( userId: string, articleId: string) {
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

    const userSavedArticles = document.UserSavedArticles || [];
    userSavedArticles.push(articleId);

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
      {
        UserSavedArticles: userSavedArticles,
      },
    );
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
}

export async function undoBookmark( userId: string, articleId: string) {
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

    const userSavedArticles = (document.UserSavedArticles || []).filter(
        (savedArticleId: string) => savedArticleId !== articleId
    );


    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_ITEMS_COLLECTION || '',
      userId,
      {
        UserSavedArticles: userSavedArticles,
      },
    );
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
}

