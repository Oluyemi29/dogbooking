"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

type showProps = {
  showMenu: boolean;
  changeMenu(): void;
};
const NavbarList = ({ showMenu, changeMenu }: showProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const content = (
    <PopoverContent>
      <div className="px-1 text-black py-2">
        <div className="text-tiny">
          <Link
            className="text-blue-600 underline underline-offset-2"
            href={"/signin"}
          >
            SignIn
          </Link>{" "}
          /{" "}
          <Link
            className="text-blue-600 underline underline-offset-2"
            href={"/signup"}
          >
            SignUp
          </Link>{" "}
          first
        </div>
      </div>
    </PopoverContent>
  );
  const { data: session, status } = useSession();

  const RegName = session?.user?.name;
  const userName = RegName?.includes(" ") ? RegName.split(" ").pop() : RegName;

  return (
    <>
      {showMenu && (
        <>
          <div className="absolute w-[95%] rounded-lg bg-mainBlue text-white bg-opacity-50 z-20 backdrop-blur-sm">
            <div className=" flex flex-col gap-4 px-2 py-4 font-semibold">
              <Link onClick={changeMenu} href={"/"}>
                <h1>Home</h1>
              </Link>
              <Link onClick={changeMenu} href={"/dogs"}>
                <h1>Dog</h1>
              </Link>
              {status === "authenticated" ? (
                <>
                  <Link onClick={changeMenu} href={"/available-dogs"}>
                    <h1 className="capitalize text-white">Available Dogs</h1>
                  </Link>
                </>
              ) : (
                <>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Link href={"#"}>
                        <h1 className="capitalize text-white">
                          Available Dogs
                        </h1>
                      </Link>
                    </PopoverTrigger>
                    <div>{content}</div>
                  </Popover>
                </>
              )}
              {status === "authenticated" ? (
                <>
                  <Link onClick={changeMenu} href={"/reservation"}>
                    <h1 className="capitalize text-white">Reservation</h1>
                  </Link>
                </>
              ) : (
                <>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Link href={"#"}>
                        <h1 className="capitalize text-white">Reservation</h1>
                      </Link>
                    </PopoverTrigger>
                    <div>{content}</div>
                  </Popover>
                </>
              )}
              {status === "authenticated" ? (
                <>
                  <Link onClick={changeMenu} href={"/favourite"}>
                    <h1 className="capitalize text-white">Favourite</h1>
                  </Link>
                </>
              ) : (
                <>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Link href={"#"}>
                        <h1 className="capitalize text-white">Favourite</h1>
                      </Link>
                    </PopoverTrigger>
                    <div>{content}</div>
                  </Popover>
                </>
              )}
              {status === "authenticated" &&
                session.user.email === "admin@gmail.com" && (
                  <>
                    <h1
                      onClick={() => {
                        changeMenu(), setModalOpen(true);
                      }}
                    >
                      Admin Page
                    </h1>
                  </>
                )}

              {status === "authenticated" ? (
                <>
                  <Link href={"/profile"}>{userName}</Link>
                </>
              ) : (
                <>
                  <Link href={"/signin"}>
                    <Button className="bg-mainBlue text-white w-max px-8">
                      Sign In
                    </Button>
                  </Link>
                  <Link href={"/signup"}>
                    <Button className="bg-mainBlue text-white w-max px-8">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <Modal
        placement={"center"}
        onClose={() => {
          setModalOpen(false);
        }}
        isOpen={modalOpen}
      >
        <ModalContent>
          <ModalHeader className="flex text-black flex-col gap-1">
            Admin Pages
          </ModalHeader>
          <ModalBody>
            <div className="w-full bg-transparent text-white font-semibold flex flex-col gap-5">
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/users"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>All Users</h1>{" "}
                </div>
              </Link>
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/available"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>Available Dogs</h1>
                </div>
              </Link>
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/alldogs"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>All Dogs</h1>
                </div>
              </Link>
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/uploadDogs"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>Upload Dogs</h1>
                </div>
              </Link>
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/reservation"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>Reservation</h1>
                </div>
              </Link>
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/favourite"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>Favourite</h1>
                </div>
              </Link>
              <Link
                onClick={() => setModalOpen(false)}
                className="hover:scale-105"
                href={"/admin/subscribe"}
              >
                <div className="bg-mainBlue py-3 px-2 rounded-md">
                  <h1>Subscribers</h1>
                </div>
              </Link>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                setModalOpen(false);
              }}
            >
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => {
                setModalOpen(false);
              }}
            >
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavbarList;
