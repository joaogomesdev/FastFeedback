import Head from "next/head";
import { Button, Flex, Link, Text } from "@chakra-ui/react";

import { useAuth } from "@lib/auth";
import { Logo } from "@styles/theme";
import Script from "next/script";
import React from "react";

export default function Home() {
  const { user, signInWithGithub } = useAuth();

  const handleSignInWithGithub = async () => {
    await signInWithGithub();
  };

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="400px"
      margin="0 auto"
    >
      <Script
        id="redirectScript"
        dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-authx')) {
            window.location.href = "/dashboard"
          }
          `,
        }}
      />

      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Logo color="back" fontSize="64px" />
      <Text mb={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {" is being built as part of "}
        <Link
          href="https://react2025.com"
          isExternal
          textDecoration="underline"
        >
          React 2025 made by Lee Robinson
        </Link>
        {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>

      {user ? (
        <Button as="a" size="sm" fontWeight="medium" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={handleSignInWithGithub}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
