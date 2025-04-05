"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { redirect } from "next/navigation";
import { FollowedTopic, FollowedTopics } from "@/types";
import { getLoggedInUser } from "@/appwrite/authService";
import { getFollowedTopics } from "@/services/followService";
import { getTopic } from "@/services/topicService";
import ForYouButton from "./forYouButton";
import FollowedTopicsBar from "./followedTopicsBar";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function FollowedTopicsFeed() {
  const [topics, setTopics] = useState<FollowedTopic[]>([]);
  const [page, setPage] = useState(0); // Start at 0 for initial load
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [trigger, inView] = useInView();
  const [limit, setLimit] = useState(false);
  const [followedTopics, setfollowedTopics] = useState<FollowedTopics>({ $id: '', UserFollowedTopics: [] });
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
            const followedTopics = await getFollowedTopics(userId);
            if (followedTopics) {
              setfollowedTopics(followedTopics);
              console.log("Bookmarks fetched:", followedTopics); // Debugging log
              await initialLoad(followedTopics); // Perform initial load
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

  const initialLoad = async (followedTopics: FollowedTopics) => {
    const initialBatchSize = 5; // Number of articles to load initially
    const initialTopics = [];
    for (let i = 0; i < initialBatchSize && i < followedTopics.UserFollowedTopics.length; i++) {
      const topicId = followedTopics.UserFollowedTopics[i];
      try {
        const result = await getTopic(topicId);
        if (result) {
          initialTopics.push(result as unknown as FollowedTopic);
        }
      } catch (error) {
        console.error(`Error loading initial article with ID ${topicId}:`, error);
      }
    }
    setTopics(initialTopics);
    setPage(initialBatchSize - 1); // Set the page to the last loaded index
  };

  const loadTopics = async () => {
    if (loading || limit) return;

    setLoading(true);
    setShowProgress(false);
    setTimeout(() => setShowProgress(true), 250); // Delay the appearance of CircularProgress

    await delay(250);

    const nextPage = page + 1;
    if (nextPage >= followedTopics.UserFollowedTopics.length) {
      console.log("No more articles to load or bookmarks are empty."); // Debugging log
      setLimit(true);
      setLoading(false);
      setShowProgress(false);
      return;
    }
    const topicId = followedTopics.UserFollowedTopics[nextPage];
    try {
      const result = await getTopic(topicId);
      if (result) {
        setTopics(prevTopics => {
          if (prevTopics.some(topic => topic.$id === result.$id)) {
            console.log("Topic already exists in the feed:", result.$id); // Debugging log
            return prevTopics;
          }
          return [...prevTopics, result as unknown as FollowedTopic];
        });
      } else {
        console.warn("No valid article found for ID:", topicId); // Debugging log
      }
    } catch (error) {
      console.error(`Error loading article with ID ${topicId}:`, error);
    }
    setPage(nextPage);
    setLoading(false);
    setShowProgress(false);
  };

  useEffect(() => {
    if (inView && !loading && !limit) {
      loadTopics();
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
      {topics.map((topic, index) => (
        <Grow in={true} timeout={500} key={index}>
          <Box>
            <ForYouButton
                name={topic.TopicName}
                category={topic.TopicCategories[0]}
                link={`/tema/${topic.TopicCategories[0]}/${topic.$id}`}
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