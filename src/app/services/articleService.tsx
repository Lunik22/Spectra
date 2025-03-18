import { cardActionsClasses } from "@mui/material";
import { Client, Databases, Query } from "appwrite"; // Adjust the import based on your project structure

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66df301b002bf5d08c1e') 

const databases = new Databases(client);

export async function getTopics() {
  let response;
  let timestamp = Math.floor(Date.now() / 1000);
  try {
    response = await databases.listDocuments(
      '66e992ad00337f2887d0',
      '673995d50003db697576',
      [
        /*Query.greaterThanEqual('TopicLastArticle', timestamp - 86400),*/
        Query.limit(1000),

      ]
    );
    return response;
  } catch (error) {
    console.error(`Error retrieving topics collection: ${error}`);
  }
  
}

export async function getArticles(categoryId: string) {
  let response;
  let timestamp = Math.floor(Date.now() / 1000);
  try {
    response = await databases.listDocuments(
      '66e992ad00337f2887d0',
      '66e992d00033deaab869',
      [
        Query.greaterThanEqual('ArticleDate', timestamp - 186400),
        Query.limit(1000),
      ]
    );
    return response;
  } catch (error) {
      console.error(`Error retrieving article links collection: ${error}`);
  }
}