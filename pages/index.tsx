import Head from "next/head";
import { Box, Button, Flex, Text, Icon, Link, Stack } from "@chakra-ui/react";
import { getAllFeedback } from "@lib/supabase-db";
import { useAuth } from "@lib/auth";
import { Github, Google, Logo } from "@styles/theme";
import { FeedbackLink } from "@components/FeedbackLink";
import { Feedback } from "@components/Feedback";
import Script from "next/script";

const SITE_ID = "dc1b6d39-7a25-4884-b596-5821eb81c45b";

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  };
}

const Home = ({ allFeedback }) => {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Script
            id="redirectScript"
            dangerouslySetInnerHTML={{
              __html: `
          if (document.cookie && document.cookie.includes('supabase.auth.token')) {
            window.location.href = "/dashboard"
          }
          `,
            }}
          />
          <Head>
            <title>Fast Feedback</title>
          </Head>
          <Logo color="black" name="logo" fontSize="48px" mb={2} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>
            {" is being built as part of "}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025 created by Lee Robinson
            </Link>
            {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <Flex justify="start" gap="2">
              <Button
                onClick={(e) => auth.signInWithGithub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<Github />}
                mt={4}
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: "scale(0.95)",
                }}
              >
                Sign In with GitHub
              </Button>
              <Button
                onClick={(e) => auth.signInWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                leftIcon={<Google />}
                mt={4}
                _hover={{ bg: "gray.100" }}
                _active={{
                  bg: "gray.100",
                  transform: "scale(0.95)",
                }}
              >
                Sign In with Google
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
};

export default Home;
