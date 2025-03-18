"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Box, Container } from "@mui/material";
import Navbar from "../../components/navbar";
import Menu from "../../components/menu";
import ArticleCardLg from "@/components/articleCardLg";
import { Client, Databases, Query } from "appwrite";
import { useEffect, useState } from "react";
import { getArticles } from "../services/articleService";
import TopicBar from "@/components/topicBar";




export default function Home() {
  const [articles, setArticles] = useState<{
    ArticleTopic: string; $id: string; ArticleTitle: string; ArticleImage: string; ArticleDate: string; ArticleLink: string; 
}[]>([]);
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await getArticles("0");
        if (response && response.documents) {
          setArticles(response.documents.map((doc: any) => ({
            $id: doc.$id,
            ArticleTitle: doc.ArticleTitle,
            ArticleImage: doc.ArticleImage,
            ArticleDate: doc.ArticleDate,
            ArticleLink: doc.ArticleLink,
            ArticleTopic: doc.ArticleTopics[0] || "Téma"
          })));
        }
      } catch (error) {
        console.error(`Error retrieving article links collection: ${error}`);
      }
    }

    fetchArticles();
  }, []);

  return (
    <Container>
      <Navbar/>
      <Menu/>
      <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
        {articles.map((article) => (
          <Box>
            <TopicBar
              key={article.$id} // Ensure each article has a unique key
              topic={article.ArticleTopic}
            />
            <ArticleCardLg
              key={article.$id} // Ensure each article has a unique key
              title={article.ArticleTitle}
              image={article.ArticleImage}
              date={article.ArticleDate}
              sourceLink={article.ArticleLink}
            />
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
