"use client";
import { deleteDogs } from "@/app/api/actions";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@nextui-org/react";
import React, { useState } from "react";

type userProps = {
  id: string;
  name: string | null;
};

const DeleteDog = ({ id, name }: userProps) => {
  const [openIt, setOpenIt] = useState(false);
  const [deleteBoth, setDeleteBoth] = useState(false);

  const confirmDelete = async () => {
    setOpenIt(false);
    await deleteDogs(id,deleteBoth)
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
                Confirm! you want to delete this dog{" "}
                <span className="font-bold italic underline"> {name}</span> from
                Available Dogs
              </p>
              <Divider orientation="horizontal"/>
              <p>
                Do you also want to delete this dog from Dogs Page too{" "}
                <Switch
                  defaultSelected={false}
                  onValueChange={() => {
                    setDeleteBoth(!deleteBoth);
                  }}
                >
                  {deleteBoth ? "Yes" : "No"}
                </Switch>
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

export default DeleteDog;
