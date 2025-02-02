import { Client, Databases, Query } from "appwrite"; // Adjust the import based on your project structure

const client = new Client();
client
  .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL)) 
  .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)) 

const databases = new Databases(client);

export async function getArticles() {
  let response;
  let timestamp = Math.floor(Date.now() / 1000);
  try {
      response = await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION),
        [
          Query.greaterThanEqual('ArticleDate', timestamp - 86400),
          Query.limit(1000)
        ]
      );
      return response;
  } catch (error) {
      console.error(`Error retrieving article links collection: ${error}`);
  }
}