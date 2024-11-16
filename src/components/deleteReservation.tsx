"use client";
import { deleteReserve } from "@/app/api/actions";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import React, { useState } from "react";

type userProps = {
  id: string;
  name: string | null | undefined;
  breed: string | null | undefined;
};

const DeleteReservation = ({ id, name, breed }: userProps) => {
  const [openIt, setOpenIt] = useState(false);

  const confirmDelete = async () => {
    setOpenIt(false);
    await deleteReserve(id);
  };

  return (
    <>
      <Button
        className="bg-red-700 text-white text-[0.8rem]"
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
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              <p>
                Confirm! you want to delete the reservation this dog{" "}
                <span className="font-bold italic underline"> {name}</span> of{" "}
                <span className="font-bold italic underline"> {breed}</span>{" "}
                breed
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

export default DeleteReservation;
