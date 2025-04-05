"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getArticle } from "@/services/articleService";
import { redirect } from "next/navigation";
import { Article, Bookmarks } from "@/types";
import ArticleCardXl from "./articleCardXl";
import { getBookmarks } from "@/services/bookmarkService";
import { getLoggedInUser } from "@/appwrite/authService";
import BookmarkBar from "./bookmarkBar";
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function BookmarkFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0); // Start at 0 for initial load
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [trigger, inView] = useInView();
  const [limit, setLimit] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmarks>({ $id: '', UserSavedArticles: [] });
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true); // Track user loading state

  useEffect(() => {
    async function fetchUser() {
      try {
        const loggedInUser = await getLoggedInUser();
        if (loggedInUser) {
          setUserId(loggedInUser.$id);
          const userId = loggedInUser.$id;
          if (userId) {
            const bookmarks = await getBookmarks(userId);
            if (bookmarks) {
              setBookmarks(bookmarks);
              console.log("Bookmarks fetched:", bookmarks); // Debugging log
              await initialLoad(bookmarks); // Perform initial load
            } else {
              console.warn("No bookmarks found for user:", userId); // Debugging log
            }
          } else {
            console.error("User ID is null."); // Debugging log
          }
        } else {
          redirect('/autentifikacia/prihlasenie');
        }
      } catch (error) {
        console.error("Error fetching user in BookmarkFeed:", error);
      } finally {
        setIsLoadingUser(false); // Mark user loading as complete
      }
    }

    fetchUser();
  }, []);

  const initialLoad = async (bookmarks: Bookmarks) => {
    const initialBatchSize = 5; // Number of articles to load initially
    const initialArticles = [];
    for (let i = 0; i < initialBatchSize && i < bookmarks.UserSavedArticles.length; i++) {
      const articleId = bookmarks.UserSavedArticles[i];
      console.log(`Loading initial article with ID: ${articleId}`); // Debugging log
      try {
        const result = await getArticle(articleId);
        if (result) {
          initialArticles.push(result as unknown as Article);
        }
      } catch (error) {
        console.error(`Error loading initial article with ID ${articleId}:`, error);
      }
    }
    setArticles(initialArticles);
    setPage(initialBatchSize - 1); // Set the page to the last loaded index
  };

  const loadArticles = async () => {
    if (loading || limit) return;

    setLoading(true);
    setShowProgress(false);
    setTimeout(() => setShowProgress(true), 250); // Delay the appearance of CircularProgress

    await delay(250);

    const nextPage = page + 1;
    if (nextPage >= bookmarks.UserSavedArticles.length) {
      console.log("No more articles to load or bookmarks are empty."); // Debugging log
      setLimit(true);
      setLoading(false);
      setShowProgress(false);
      return;
    }
    const articleId = bookmarks.UserSavedArticles[nextPage];
    console.log(`Loading article with ID: ${articleId}`); // Debugging log
    try {
      const result = await getArticle(articleId);
      if (result) {
        setArticles(prevArticles => {
          if (prevArticles.some(article => article.$id === result.$id)) {
            console.log("Article already exists in the feed:", result.$id); // Debugging log
            return prevArticles;
          }
          return [...prevArticles, result as unknown as Article];
        });
      } else {
        console.warn("No valid article found for ID:", articleId); // Debugging log
      }
    } catch (error) {
      console.error(`Error loading article with ID ${articleId}:`, error);
    }
    setPage(nextPage);
    setLoading(false);
    setShowProgress(false);
  };

  useEffect(() => {
    if (inView && !loading && !limit) {
      console.log("Triggering loadArticles..."); // Debugging log
      loadArticles();
    }
  }, [inView, loading, limit]);

  if (isLoadingUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userId) {
    redirect('/autentifikacia/prihlasenie');
    return null; // Prevent rendering if redirecting
  }

  return (
    <Stack spacing={2} sx={{ paddingTop: "11rem" }}>
      <Box>
        <BookmarkBar />
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