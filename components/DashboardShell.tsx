import React from "react";
import {
  Flex,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";

import { useAuth } from "@lib/auth";
import { Logo } from "@styles/theme";
import { AddSiteModal } from "./AddSiteModal";

interface Props {
  children: React.ReactNode;
}

const DashboardShell = ({ children }: Props) => {
  const { user, signOut } = useAuth();
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
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
            <Logo name="logo" fontSize="24px" mr={8} />
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {user && (
              <Button variant="ghost" mr={2} onClick={signOut}>
                Log Out
              </Button>
            )}
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
