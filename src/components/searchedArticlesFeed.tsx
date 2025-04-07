"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Article } from "@/types";
import { searchArticles } from "@/services/searchService";
import ArticleCardXl from "./articleCardXl";
import SearchedArticlesBar from "./searchedArticlesBar";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function SearchedArticlesFeed({ searchedTerm }: { searchedTerm: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(-1); // Start at 0 for initial load
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [trigger, inView] = useInView();
  const [limit, setLimit] = useState(false);

  const loadTopics = async () => {
    if (loading || limit) return;

    setLoading(true);
    setShowProgress(false);
    setTimeout(() => setShowProgress(true), 250); // Delay the appearance of CircularProgress

    await delay(250);

    const nextPage = page + 1;

    try {
      const newArticles = await searchArticles(nextPage, searchedTerm); // Fetch topics in batches
      if (!newArticles || newArticles.length === 0) {
        setLimit(true);
      } else {
        setArticles((prevArticles) => {
          const uniqueArticles = newArticles.filter(
            (newArticle) => !prevArticles.some((prevArticle) => prevArticle.$id === newArticle.$id)
          );
          return [...prevArticles, ...uniqueArticles];
        });
      }
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading topics:", error);
    } finally {
      setLoading(false);
      setShowProgress(false);
    }
  };

  useEffect(() => {
    if (inView && !loading && !limit) {
      loadTopics();
    }
  }, [inView, loading, limit]);

  useEffect(() => {
    // Initial load
    loadTopics();
  }, []); // Run only once on component mount

  return (
    <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
      <Box>
        <SearchedArticlesBar searchedTerm={searchedTerm} />
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
              reliability={article.ArticleReliability}
              type={article.ArticleType}
              language={article.ArticleLanguage}             
              topics={article.ArticleTopics}
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