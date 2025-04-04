"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import TopicBarXl from "./topicBarXl";
import ArticleCardLg from "./articleCardLg";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getArticle, getAvailableAlignments } from "@/services/articleService";
import { usePathname } from "next/navigation";
import { getTopic } from "@/services/topicService";
import next from "next";
import { Article } from "@/types";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function TopicFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [trigger, inView] = useInView();
  const [limit, setLimit] = useState(false);
  const [alignment, setAlignment] = useState<'' | 'l' | 's' | 'k'>('');
  const [alignmentCounts, setAlignmentCounts] = useState<{ 'l': number, 's': number, 'k': number }>({ l: 0, s: 0, k: 0 });

  const pathname = usePathname();
  const parts = pathname.split('/');
  const topicId = parts[parts.length - 1];
  const [topicName, setTopicName] = useState<string>("");

  const loadArticles = async () => {
    if (loading || limit) return;

    setLoading(true);
    setShowProgress(false);
    setTimeout(() => setShowProgress(true), 250); // Delay the appearance of CircularProgress

    await delay(250);

    const nextPage = page + 1;

    const timestamp = Math.floor(Date.now() / 1000);
    const availableAlignments = await getAvailableAlignments(topicId, timestamp);
    setAlignmentCounts(availableAlignments);
    console.log(alignment)
    console.log(nextPage)

    const newArticle = await getArticle(topicId, availableAlignments, alignment, 1, nextPage, timestamp) as Article;
    

    const topic = await getTopic(topicId);
    if (topic) {
      setTopicName(topic.TopicName);
    }

    if (!newArticle) {
      setLimit(true);
    } else {
      setArticles(prevArticles => [...prevArticles, newArticle]);
    }

    setPage(nextPage);
    setLoading(false);
    setShowProgress(false);
  };

  useEffect(() => {
    if (inView && !loading && !limit) {
      loadArticles();
    }
  }, [inView, loading, limit]);

  const handleAlignmentChange = async (newAlignment: '' | 'l' | 's' | 'k') => {
    setAlignment(newAlignment);
    console.log(`Selected alignment: ${newAlignment}`);
    setArticles([]); // Clear current articles
    setPage(0); // Reset pagination
    setLimit(false); // Reset limit
    await loadArticles(); // Load articles with the new alignment
  };

  return (
    <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
      <Box>
        <TopicBarXl
          topic={{ $id: topicId, TopicName: topicName, TopicCategory: "", TopicArticles: [] }}
          alignment={alignment}
          onArticleChange={(newAlignment) => handleAlignmentChange(newAlignment)}
          alignmentCounts={alignmentCounts}
        />
      </Box>
      {articles.map((article, index) => (
        <Grow in={true} timeout={500} key={index}>
          <Box>
            <ArticleCardLg
              title={article.ArticleTitle}
              image={article.ArticleImage}
              date={article.ArticleDate}
              sourceLink={article.ArticleLink}
            />
          </Box>
        </Grow>
      ))}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: "3rem"
      }}>
        {showProgress && (
          <CircularProgress />
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