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
import { useAuth } from "@lib/auth";
import { createSite } from "@lib/firestore";
import React from "react";
import { useForm } from "react-hook-form";

const AddSiteModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const toast = useToast();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const onSubmit = async ({ name, link }) => {
    try {
      await createSite({
        author: user.uid,
        createdAt: new Date().toISOString(),
        name,
        link,
      });
      toast({
        title: "Success!",
        description: "We've added your site.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} fontWeight="medium" variant="solid" size="md">
        Add your fist site
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
                ref={initialRef}
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
