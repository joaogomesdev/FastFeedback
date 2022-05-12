import Head from "next/head";
import { Button, Code, Flex, Heading, Icon, Text } from "@chakra-ui/react";

import { useAuth } from "@lib/auth";
import { Logo } from "@styles/theme";

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>FastFeedback</title>
      </Head>

      <Logo color="back" fontSize="64px" />
      {auth.user?.email ? (
        <Button onClick={(e) => auth.signOut()}>Sign out</Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signInWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
