import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";

import { useAuth } from "@lib/auth";
import { createSite } from "@lib/supabase-db";

const AddSiteModal = ({ children }) => {
  const toast = useToast();
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user, token } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCreatingSite, setIsCreatingSite] = React.useState(false);

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const onSubmit = async ({ name, link }) => {
    try {
      setIsCreatingSite(true);

      const newSite = {
        author: user.id,
        name,
        link,
      };

      await createSite(newSite);
      setIsCreatingSite(false);
      toast({
        title: "Success!",
        description: "We've added your site.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      mutate(["/api/sites", token]);
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                placeholder="My site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                {...register("link", { required: true })}
                placeholder="https://mysite.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} color="#194D4C" fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              ml={3}
              color="#194D4C"
              fontWeight="medium"
              type="submit"
              isLoading={isCreatingSite}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddSiteModal };
