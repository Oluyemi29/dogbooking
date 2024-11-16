"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Divider } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { editProfile } from "@/app/api/actions";

type profileProps = {
  email: string | undefined;
  name: string | null | undefined;
  phone?: string | null | undefined;
  address?: string | null | undefined;
  image?: string | null | undefined;
};

const ProfileCard = ({ email, name, address, phone, image }: profileProps) => {
  const UserIcon =
    "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
  const { data: session } = useSession();
  const { onOpenChange } = useDisclosure();
  const [openIt, setOpenIt] = useState(false);
  const [editWhat, setEditWhat] = useState("");
  const [editInput, setEditInput] = useState("");

  const id = session?.user?.id as string;

  const handleEdit = async () => {
    setOpenIt(false);
    await editProfile(editWhat, editInput, id);
  };

  return (
    <div className="w-full flex justify-center text-center items-center h-auto">
      <div className="md:w-2/6 w-full h-auto border-2 border-mainBlue rounded-lg mt-10">
        <Modal
          onClose={() => {
            setOpenIt(false);
          }}
          isOpen={openIt}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col text-black gap-1">
                Edit {editWhat}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label={editWhat}
                  className="text-black"
                  placeholder={`enter your ${editWhat}`}
                  variant="bordered"
                  onChange={(e) => {
                    setEditInput(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => setOpenIt(false)}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleEdit();
                  }}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
        <div className="w-full flex flex-col justify-center items-center bg-mainBlue h-32">
          <h1 className="text-white">{name}</h1>
        </div>
        <label>
          <Image
            src={image || (UserIcon as string)}
            alt="profile"
            width={100}
            height={100}
            priority
            quality={95}
            className="rounded-full w-12 cursor-pointer h-12 m-auto border-2 border-mainBlue p-1 -mt-6 bg-white"
          />
        </label>
        <div className="w-full p-5">
          <div className="flex justify-between items-center py-5">
            <div className="flex gap-5 items-center">
              <FaUser className="text-mainBlue" />
              <h1 className="text-black/80">{name}</h1>
            </div>
            {session?.user?.password && (
              <FiEdit
                className="cursor-pointer text-mainBlue"
                onClick={() => {
                  setOpenIt(!openIt);
                  setEditWhat("name");
                }}
              />
            )}
          </div>
          <Divider orientation="horizontal" className="" />
          <div className="flex gap-5 items-center py-5">
            <MdEmail className="text-mainBlue" />
            <h1 className="text-black/80">{email}</h1>
          </div>
          {session?.user?.password && (
            <>
              <Divider orientation="horizontal" className="" />
              <div className="flex justify-between items-center py-5">
                <div className="flex gap-5 items-center">
                  <FaPhone className="text-mainBlue" />
                  <h1 className="text-black/80">{phone}</h1>
                </div>
                <FiEdit
                  className="cursor-pointer text-mainBlue"
                  onClick={() => {
                    setOpenIt(!openIt);
                    setEditWhat("phone");
                  }}
                />
              </div>
              <Divider orientation="horizontal" className="" />
              <div className="flex justify-between items-center py-5">
                <div className="flex gap-5 items-center">
                  <FaAddressCard className="text-mainBlue" />
                  <h1 className="text-black/80">{address}</h1>
                </div>
                <FiEdit
                  className="cursor-pointer text-mainBlue"
                  onClick={() => {
                    setOpenIt(!openIt);
                    setEditWhat("address");
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
