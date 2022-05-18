import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSWRConfig } from "swr";

import { useAuth } from "@lib/auth";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteFeedback } from "@lib/supabase-db";

const RemoveFeedbackButton = ({ feedbackId }) => {
  const { mutate } = useSWRConfig();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { token } = useAuth();
  const cancelRef = React.useRef();

  const handleDeleteFeedback = async () => {
    await deleteFeedback(feedbackId);
    mutate(["/api/feedback", token]);
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Delete feedback"
        variant="ghost"
        icon={<DeleteIcon />}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can`t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export { RemoveFeedbackButton };
