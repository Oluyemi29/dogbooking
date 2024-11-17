"use client";
import { deleteUser } from "@/app/api/actions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useState } from "react";

type userProps = {
  id: string;
  name: string | null;
  email: string;
};

const DeleteUser = ({ id, name, email }: userProps) => {
  const [openIt, setOpenIt] = useState(false);

  const confirmDelete = async () => {
    setOpenIt(false);
    await deleteUser(id);
  };

  return (
    <>
      <Button
        className="bg-red-700 text-white"
        onClick={() => {
          setOpenIt(!openIt);
        }}
      >
        Delete
      </Button>
      <Modal
        onClose={() => {
          setOpenIt(false);
        }}
        isOpen={openIt}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="text-black"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              <p>
                Are You sure you want to delete this users {name} with email{" "}
                {email}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  setOpenIt(false);
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  confirmDelete();
                }}
              >
                Action
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUser;
