import React from "react";
import { Heading, Text, Flex } from "@chakra-ui/react";

import { AddSiteModal } from "./AddSiteModal";

const EmptyState = () => (
  <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    backgroundColor="white"
    width="100%"
    borderRadius={8}
    p={16}
    height="100%"
  >
    <Heading size="lg" mb={2}>
      You haven`t added any sites.
    </Heading>
    <Text mb={4}>Welcome 👋 Lets get started.</Text>
    <AddSiteModal>Add your first site</AddSiteModal>
  </Flex>
);

export default EmptyState;
