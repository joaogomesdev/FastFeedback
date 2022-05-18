import React from "react";
import { Box, Code, Switch } from "@chakra-ui/react";

import { Table, Tr, Th, Td } from "./Table";
import { RemoveFeedbackButton } from "./RemoveFeedbackButton";

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => (
          <Box as="tr" key={feedback.uuid}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{"/"}</Code>
            </Td>
            <Td>
              <Switch
                size="md"
                colorScheme="green"
                defaultChecked={feedback.status == "active"}
              />
            </Td>
            <Td>
              <RemoveFeedbackButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
