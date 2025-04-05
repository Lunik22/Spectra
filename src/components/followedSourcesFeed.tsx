/*"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { redirect } from "next/navigation";
import { FollowedSource, FollowedSources, FollowedTopic, FollowedTopics } from "@/types";
import { getLoggedInUser } from "@/appwrite/authService";
import { getFollowedSources, getFollowedTopics, getSource } from "@/services/followService";
import { getTopic } from "@/services/topicService";
import ForYouButton from "./forYouButton";
import FollowedTopicsBar from "./followedTopicsBar";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function FollowedTopicsFeed() {
  const [sources, setSources] = useState<FollowedSources[]>([]);
  const [page, setPage] = useState(0); // Start at 0 for initial load
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [trigger, inView] = useInView();
  const [limit, setLimit] = useState(false);
  const [followedSources, setfollowedSources] = useState<FollowedSources>({ $id: '', UserFollowedSources: [] });
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
            const followedSources = await getFollowedSources(userId);
            if (followedSources) {
              setfollowedSources(followedSources);
              console.log("Bookmarks fetched:", followedSources); // Debugging log
              await initialLoad(followedSources); // Perform initial load
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

  const initialLoad = async (followedSources: FollowedSources) => {
    const initialBatchSize = 5; // Number of articles to load initially
    const initialSources = [];
    for (let i = 0; i < initialBatchSize && i < followedSources.UserFollowedSources.length; i++) {
      const topicId = followedSources.UserFollowedSources[i];
      try {
        const result = await getTopic(topicId);
        if (result) {
          initialSources.push(result as unknown as FollowedSource);
        }
      } catch (error) {
        console.error(`Error loading initial article with ID ${topicId}:`, error);
      }
    }
    setSources(initialSources);
    setPage(initialBatchSize - 1); // Set the page to the last loaded index
  };

  const loadSources = async () => {
    if (loading || limit) return;

    setLoading(true);
    setShowProgress(false);
    setTimeout(() => setShowProgress(true), 250); // Delay the appearance of CircularProgress

    await delay(250);

    const nextPage = page + 1;
    if (nextPage >= followedSources.UserFollowedSources.length) {
      console.log("No more articles to load or bookmarks are empty."); // Debugging log
      setLimit(true);
      setLoading(false);
      setShowProgress(false);
      return;
    }
    const sourceId = followedSources.UserFollowedSources[nextPage];
    try {
      const result = await getSource(sourceId);
      if (result) {
        setSources(prevSources => {
          if (prevSources.some(source => source.$id === result.$id)) {
            console.log("Topic already exists in the feed:", result.$id); // Debugging log
            return prevSources;
          }
          return [...prevSources, result as unknown as FollowedSources];
        });
      } else {
        console.warn("No valid article found for ID:", sourceId); // Debugging log
      }
    } catch (error) {
      console.error(`Error loading article with ID ${sourceId}:`, error);
    }
    setPage(nextPage);
    setLoading(false);
    setShowProgress(false);
  };

  useEffect(() => {
    if (inView && !loading && !limit) {
      loadSources();
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
        <FollowedTopicsBar />
      </Box>
      {sources.map((source, index) => (
        <Grow in={true} timeout={500} key={index}>
          <Box>
            <ForYouButton
                name={source.SourceName}
                category={source.TopicCategories[0]}
                link={`/tema/${source.TopicCategories[0]}/${source.$id}`}
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
}*/