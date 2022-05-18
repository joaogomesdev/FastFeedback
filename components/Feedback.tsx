import { format, parseISO } from "date-fns";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";

interface Props {
  author: string;
  text: string;
  created_at: string;
}

const Feedback = ({ author, text, created_at }: Props) => {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      <Text color="gray.500" mb={4} fontSize="xs">
        {created_at && format(parseISO(created_at), "PPpp")}
      </Text>
      <Text color="gray.800">{text}</Text>
      <Divider
        borderColor="gray.200"
        backgroundColor="gray.200"
        mt={8}
        mb={8}
      />
    </Box>
  );
};

export { Feedback };
