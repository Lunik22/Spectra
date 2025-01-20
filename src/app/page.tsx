import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Container } from "@mui/material";
import Navbar from "../components/navbar";
import Menu from "../components/menu";
import ArticleCardLg from "@/components/articleCardLg";
import { Client, Databases, Query } from "appwrite";

const client = new Client();
client
  .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL)) 
  .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)) 

const databases = new Databases(client);

export default async function Home() {
  let articles;
  let timestamp = Math.floor(Date.now() / 1000);
  try {
    articles = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_APPWRITE_ARTICLES_COLLECTION),
      [
        Query.greaterThanEqual('ArticleDate', timestamp - 43200)
      ]
    );
    console.log("Articles successfully retrieved: ", articles);
  } catch (error) {
    console.error(`Error retrieving article links collection: ${error}`);
  }

  return (
    <Container>
      <Navbar/>
      <Menu/>
      <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
        {articles?.documents.map((article) => (
          <ArticleCardLg
            title={article.ArticleTitle}
            image={article.ArticleImage}
            date={article.ArticleDate}
            sourceLink={article.ArticleLink}
          />
        ))}
      </Stack>
    </Container>
  );
}
