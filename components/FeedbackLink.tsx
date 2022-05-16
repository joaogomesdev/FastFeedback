import { Flex, Link } from "@chakra-ui/react";

interface Props {
  siteId: string;
}

const FeedbackLink = ({ siteId }: Props) => {
  return (
    <Flex justify="space-between" mb={8} w="full" mt={1}>
      <Link fontWeight="bold" fontSize="sm" href={`/p/${siteId}`}>
        Leave a comment {"->"}
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by FastFeedback
      </Link>
    </Flex>
  );
};

export { FeedbackLink };
