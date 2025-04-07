"use client";

import { Box, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FollowedTopic } from "@/types";
import ForYouButton from "./forYouButton";
import { searchTopics } from "@/services/searchService";
import SearchedTopicsBar from "./searchedTopicsBar";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function SearchedTopicsFeed({ searchedTerm }: { searchedTerm: string }) {
  const [topics, setTopics] = useState<FollowedTopic[]>([]);
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
      const newTopics = await searchTopics(nextPage, searchedTerm); // Fetch topics in batches
      if (!newTopics || newTopics.length === 0) {
        setLimit(true);
      } else {
        setTopics((prevTopics) => {
          const uniqueTopics = newTopics.filter(
            (newTopic) => !prevTopics.some((prevTopic) => prevTopic.$id === newTopic.$id)
          );
          return [...prevTopics, ...uniqueTopics];
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
        <SearchedTopicsBar searchedTerm={searchedTerm} />
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