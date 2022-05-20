import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { useAuth } from "@lib/auth";
import { Feedback } from "@components/Feedback";
import { createFeedback, getAllFeedback, getAllSites } from "@lib/supabase-db";

export const getStaticProps: GetStaticProps = async (context) => {
  const { siteId } = context.params;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const router = useRouter();

  const { user } = useAuth();
  const inputEl = React.useRef(null);
  const [allFeedback, setAllFeedback] = React.useState(initialFeedback);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);

    const newFeedback = {
      author: user.name,
      authorId: user.id,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      provider: user.provider,
      status: "pending",
    };

    await createFeedback(newFeedback);
    setAllFeedback([newFeedback, ...allFeedback]);
    setIsSubmittingFeedback(false);
  };

  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="email">Comment</FormLabel>
            <Input ref={inputEl} id="comment" type="text" />
            <Button
              isLoading={isSubmittingFeedback}
              type="submit"
              fontWeight="medium"
              mt={2}
            >
              Add comment
            </Button>
          </FormControl>
        </Box>

        {allFeedback.length == 0 ? (
          <Heading>No Feedbacks...</Heading>
        ) : (
          allFeedback?.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))
        )}
      </Box>
    </>
  );
};

export default SiteFeedback;
