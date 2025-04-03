"use client";

import { Article, Topic } from "@/types";
import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import TopicBar from "./topicBar";
import ArticleCardLg from "./articleCardLg";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getTopics } from "@/services/topicService";
import { getArticle, getAvailableAlignments } from "@/services/articleService";
import { usePathname } from "next/navigation";
import { set } from "date-fns";

const subdomainToCategoryMap: { [key: string]: string } = {
  "": "0",
  "slovensko": "1",
  "svet": "2",
  "ekonomika": "3",
  "technologie-a-veda": "4", 
  "sport": "5",
  "zivotny-styl": "6",
  "kultura-a-zabava": "7"
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Feed() {
  const [topics, setTopics] = useState<Topic[]>();
  const [articles, setArticles] = useState<{ [key: string]: any }>();
  const [page, setPage] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [trigger, inView] = useInView();
  const [limit, setLimit] = useState(false);
  const [showArticle, setShowArticle] = useState<{ [key: string]: boolean }>({});
  const [alignments, setAlignments] = useState<{ [key: string]: 'l' | 's' | 'k' }>({});
  const [alignmentsCount, setAlignmentsCount] = useState<{ [key: string]: { 'l': number, 's': number, 'k': number } }>({});
  const [shownArticles, setShownArticles] = useState<string[]>([]);

  const hostname = usePathname();
  const parts = hostname.split('/');
  let category = "0";
  if (parts[1] === 'kategoria') {
    category = subdomainToCategoryMap[parts[2]];
  }

  const loadMoreTopics = async () => {
      console.log(`Loading more topics for page ${page + 1}`);
      if (loading) return;
      if (limit) return;

      setLoading(true);
      setShowProgress(false);
      setTimeout(() => setShowProgress(true), 250); // Delay the appearance of CircularProgress by 500ms

      await delay(250);

      const nextPage = page + 1;
      
      const newTopicsWArticles = (await getTopics(nextPage, category)) ?? { topics: [], articles: {}, alignmentsCount: {} };

      if (newTopicsWArticles.topics.length === 0) {
          setLimit(true);
      } else {
          if (newTopicsWArticles.topics.length > 0) {
            setTopics((prevTopics) => [...(prevTopics || []), ...newTopicsWArticles.topics || []]);
          }
          for (const articleId in newTopicsWArticles.articles) {
            if (shownArticles.includes(articleId)) {
              const alignmentCount = newTopicsWArticles.alignmentsCount[articleId];
              if (alignmentCount && Object.values(alignmentCount as { [key: string]: number }).reduce((a, b) => a + b, 0) >= 2) {
                const newArticle = await getArticle(
                  newTopicsWArticles.topics.find(topic => topic.$id === articleId)?.$id ?? '',
                  alignmentCount,
                  newTopicsWArticles.articles[articleId].ArticleAlignment,
                  1, // Offset of +1
                  1
                );
                newTopicsWArticles.articles[articleId] = newArticle;
              }
            } else {
              setShownArticles(prev => [...prev, articleId]);
            }
          }
          setArticles(prevArticles => ({ ...prevArticles, ...newTopicsWArticles.articles }));
          setShowArticle(prevShowArticle => ({
            ...prevShowArticle,
            ...Object.fromEntries(newTopicsWArticles.topics.map(topic => [topic.$id, true]))
          }));
          setAlignments(prevAlignments => ({
            ...prevAlignments,
            ...Object.fromEntries(newTopicsWArticles.topics.map(topic => [topic.$id, (newTopicsWArticles.articles as { [key: string]: any })[topic.$id]?.ArticleAlignment || 'l']))
          }));
          setAlignmentsCount(prevAlignmentsCount => ({
            ...prevAlignmentsCount,
            ...Object.fromEntries(newTopicsWArticles.topics.map(topic => [topic.$id, newTopicsWArticles.alignmentsCount[topic.$id]]))
          }));
      }
      setPage(nextPage);
      setLoading(false);
      setShowProgress(false);
  }

  useEffect(() => {
      if (inView && !loading) {
          console.log(`Loading more topics for page ${page + 1}`);
          loadMoreTopics();
      }
  }, [inView, loading]);

  const handleArticleChange = async (topicId: string, newArticle: any, alignment: 'l' | 's' | 'k') => {
    setShowArticle(prevShowArticle => ({
      ...prevShowArticle,
      [topicId]: false // Hide the current article for the grow-out effect
    }));
  
    setTimeout(() => {
      setAlignments(prevAlignments => ({
        ...prevAlignments,
        [topicId]: alignment // Update the alignment
      }));
  
      setArticles(prevArticles => ({
        ...prevArticles,
        [topicId]: newArticle // Update the article for the new alignment
      }));
  
      setShowArticle(prevShowArticle => ({
        ...prevShowArticle,
        [topicId]: true // Show the new article after the grow-in effect
      }));
    }, 500); // Delay to allow the grow-out effect
  };
  

  return (
      <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
        {topics && topics.map((topic: { $id: string; TopicName: string; TopicCategory: string; TopicArticles: any[] }) => (
          <Box key={topic.$id}>
            <Grow in={true} timeout={500}>
              <Box>
                <TopicBar
                  topic={topic}
                  alignment={alignments[topic.$id]}
                  onArticleChange={handleArticleChange}
                  alignmentCounts={alignmentsCount[topic.$id]}
                />
              </Box>
            </Grow>
            <Grow in={showArticle[topic.$id]} timeout={500}>
              <Box>
                {articles && articles[topic.$id] && (
                  <ArticleCardLg
                    title={articles[topic.$id].ArticleTitle}
                    image={articles[topic.$id].ArticleImage}
                    date={articles[topic.$id].ArticleDate}
                    sourceLink={articles[topic.$id].ArticleLink}
                  />
                )}
              </Box>
            </Grow>
          </Box>
        ))}
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: "3rem"
        }}>
            {showProgress && (
                <CircularProgress/>
            )}
            <div ref={trigger} style={{ 
              height: 10,
              display: loading ? 'none' : 'block'
            }} />
        </Box> 
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: "3rem"
        }}>
          {limit && (
            <Typography variant="h6">
              Gratulujem, dosiahli ste koniec :)
            </Typography>
          )}
        </Box>
      </Stack>
  );
}