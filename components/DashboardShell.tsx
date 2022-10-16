import React from "react";
import NextLink from "next/link";
import { Flex, Link, Avatar, Box, Button } from "@chakra-ui/react";

import { useAuth } from "@lib/auth";
import { Logo } from "@styles/theme";

interface Props {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: Props) => {
  const { user, signOut } = useAuth();
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={16}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="70px"
        >
          <Flex>
            <NextLink href="/" passHref>
              <Logo name="logo" fontSize="24px" mr={8} />
            </NextLink>
            <NextLink href="/dashboard" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Link href="/account">
              <Button variant="ghost" mr={2}>
                Account
              </Button>
            </Link>
            <Avatar size="sm" src={user?.avatar_url} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
