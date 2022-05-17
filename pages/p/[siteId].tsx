import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useAuth } from "@lib/auth";
import { createFeedback } from "@lib/firestore";
import { Feedback } from "@components/Feedback";
import { getAllFeedback, getAllSites } from "@lib/firestore-admin";

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
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending",
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    await createFeedback(newFeedback);
    setIsSubmittingFeedback(false);
  };

  return (
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

      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
