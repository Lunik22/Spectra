"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import TopicBarXl from "./topicBarXl";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getArticles, getAvailableAlignments } from "@/services/articleService";
import { usePathname } from "next/navigation";
import { getTopic } from "@/services/topicService";
import { Article } from "@/types";
import ArticleCardXl from "./articleCardXl";

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
    console.log(`Alignment ${alignment}`);
    console.log(`New Page ${nextPage}`);

    const result = await getArticles(topicId, availableAlignments, alignment, 1, nextPage, timestamp);
    const newArticle = result && typeof result === 'object' && '$id' in result && 'ArticleTitle' in result && 'ArticleImage' in result && 'ArticleDate' in result && 'ArticleLink' in result && 'ArticleAlignment' in result && 'ArticlePayWall' in result && 'ArticleAuthors' in result && 'ArticlePreview' in result && 'ArticleTopics' in result && 'ArticleReliability' in result && 'ArticleType' in result && 'ArticleLanguage' in result
      ? (result as unknown as Article)
      : null;

    const topic = await getTopic(topicId);
    if (topic) {
      setTopicName(topic.TopicName);
    }

    if (!newArticle) {
      setLimit(true);
    } else {
      setArticles(prevArticles => {
        // Avoid adding duplicate articles
        if (prevArticles.some(article => article.ArticleLink === newArticle.ArticleLink)) {
          return prevArticles;
        }
        return [...prevArticles, newArticle];
      });
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
    if (alignment === newAlignment) return; // Avoid reloading if the same alignment is selected
  
    setAlignment(newAlignment);
  
    // Fade-out effect
    setArticles([]);
    setTimeout(async () => {
      setPage(-1); // Reset pagination
      setLimit(false); // Reset limit
  
      const timestamp = Math.floor(Date.now() / 1000);
      const availableAlignments = await getAvailableAlignments(topicId, timestamp);
      setAlignmentCounts(availableAlignments);
  
      // Load the first page of articles for the new alignment
      const result = await getArticles(topicId, availableAlignments, newAlignment, 1, 0, timestamp);
      const newArticle = result && typeof result === 'object' && '$id' in result && 'ArticleTitle' in result && 'ArticleImage' in result && 'ArticleDate' in result && 'ArticleLink' in result && 'ArticleAlignment' in result && 'ArticlePayWall' in result && 'ArticleAuthors' in result && 'ArticlePreview' in result && 'ArticleTopics' in result && 'ArticleReliability' in result && 'ArticleType' in result && 'ArticleLanguage' in result
        ? (result as unknown as Article)
        : null;
  
      if (newArticle) {
        setArticles([newArticle]); // Fade-in effect
      }
    }, 500); // Delay to allow fade-out effect
  };

  return (
    <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
      <Box>
        <TopicBarXl
          $id={topicId}
          topic={{ $id: topicId, TopicName: topicName, TopicCategory: "", TopicArticles: [] }}
          alignment={alignment}
          onArticleChange={(newAlignment) => handleAlignmentChange(newAlignment)}
          alignmentCounts={alignmentCounts}
        />
      </Box>
      {articles.map((article, index) => (
        <Grow in={true} timeout={500} key={index}>
          <Box>
            <ArticleCardXl
              $id={article.$id}
              title={article.ArticleTitle}
              image={article.ArticleImage}
              date={article.ArticleDate}
              sourceLink={article.ArticleLink}
              paywall={article.ArticlePayWall}
              authors={article.ArticleAuthors}
              preview={article.ArticlePreview}
              topics={article.ArticleTopics}
              reliability={article.ArticleReliability}
              type={article.ArticleType}
              language={article.ArticleLanguage}
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
            Gratulujem, dosiahli ste koniec! Teraz sa prosím choďte dotknúť trávy :)
          </Typography>
        )}
      </Box>
    </Stack>
  );
}