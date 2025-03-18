"use client"

import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import Navbar from "../../../../components/navbar";
import Menu from "../../../../components/menu";
import { useEffect, useState } from 'react';
import { getArticles, getTopics } from '@/app/services/articleService';
import TopicBar from '@/components/topicBar';
 
export default function CategoryPage() {
  const [topics, setTopics] = useState<{
    $id: any;
    TopicName: any;
    TopicCategory: any;
    TopicArticles: any;
  }[]>([]);
    useEffect(() => {
      async function fetchTopics() {
        try {
          const topicResponse = await getTopics();
          if (topicResponse) {
            setTopics(topicResponse.documents.map((doc: any) => ({
              $id: doc.$id,
              TopicName: doc.TopicName,
              TopicCategory: doc.TopicCategory,
              TopicArticles: doc.TopicArticles
            })));
            console.log(topicResponse.documents);
          };
          
        } catch (error) {
          console.error(`Error retrieving article links collection: ${error}`);
        }
      }
      fetchTopics();
    }, []);


  const [articles, setArticles] = useState<{
      ArticleTopic: string; $id: string; ArticleTitle: string; ArticleImage: string; ArticleDate: string; ArticleLink: string; 
  }[]>([]);
    useEffect(() => {
      async function fetchArticles() {
        try {
          const response = await getArticles("0");
          if (response) {
            setArticles(articles.map((doc: any) => ({
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
        {topics.map((topic) => (
          <Box>
            <TopicBar
              key={topic.$id} 
              topic={topic.TopicName}
            />
          </Box>
        ))}
      </Stack>
    </Container>
  );
}