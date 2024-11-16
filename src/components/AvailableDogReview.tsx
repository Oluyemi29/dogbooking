"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

import { BookReservation } from "@/app/api/actions";
import { useSession } from "next-auth/react";
import { eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";

type ReviewProps = {
  id: string;
  image: string | undefined;
  name: string | undefined;
  breed: string | undefined;
  age: string | undefined;
  gender: string | undefined;
  size: string | undefined;
  color: string | undefined;
  price: number | undefined;
  reservaions: {
    startDate: Date;
    endDate: Date;
  }[];
};

type StateProps = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const AvailableDogReview = ({
  id,
  age,
  breed,
  color,
  gender,
  image,
  name,
  price,
  size,
  reservaions,
}: ReviewProps) => {
  const [offButton, setOffButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [state, setState] = useState<StateProps>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  let disabledRanges: Date[] = [];

  reservaions.forEach((eachReserve) => {
    const datesRanges = eachDayOfInterval({
      start: new Date(eachReserve.startDate),
      end: new Date(eachReserve.endDate),
    });
    disabledRanges = [...disabledRanges, ...datesRanges];
  });

  const handleReservation = async () => {
    const userId = session?.user?.id as string;
    const startDate = state.startDate.toISOString();
    const endDate = state.endDate.toISOString();

    await BookReservation(id, userId, startDate, endDate);
    toast.success("Reservation successfully done");
  };

  return (
    <div className="md:w-[50%] text-black w-full">
      <>
        <Modal
        className="text-black"
          onClose={() => {
            setIsOpen(false);
          }}
          isOpen={isOpen}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Make Reservation
              </ModalHeader>
              <ModalBody>
                <p>
                  Make reservation date range for Alix dog,pls pick short
                  duration time
                </p>
                <div className="flex justify-between items-center bg-slate-100 rounded-md p-3">
                  <Image
                    src={image as string}
                    alt="mine"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-md"
                    priority
                    quality={95}
                  />
                  <div className="flex flex-col gap-3">
                    <h1 className="text-[0.8rem] italic font-semibold">
                      {name}
                    </h1>
                    <h1 className="text-[0.8rem] italic font-semibold">
                      {breed}
                    </h1>
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <DateRange
                    ranges={[state]}
                    showDateDisplay={true}
                    onChange={(items) => {
                      setState(items.selection as StateProps);
                      state.startDate !== state.endDate
                        ? setOffButton(false)
                        : setOffButton(true);
                    }}
                    minDate={new Date()}
                    disabledDates={disabledRanges}
                    rangeColors={["#1a0863"]}
                  />
                </div>
                <p className="text-[0.7rem] text-mainYellow">
                  Admin will Contact you within the Reservation time
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setIsOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setIsOpen(false);
                    handleReservation();
                  }}
                  disabled={offButton}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>

      <Image
        src={image as string}
        alt="mine"
        width={100}
        height={100}
        className="w-[50%]  rounded-md mx-auto"
        priority
        quality={95}
      />
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Name</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          {name}
        </h1>
      </div>
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Breed</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          {breed}
        </h1>
      </div>
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Age</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          {age}
        </h1>
      </div>
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Gender</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          {gender}
        </h1>
      </div>
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Size</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          {size}
        </h1>
      </div>
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Color</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          {color}
        </h1>
      </div>
      <div className="flex justify-between w-full my-3 p-4 rounded-md bg-slate-200">
        <h1>Price</h1>
        <h1 className="italic font-semibold underline underline-offset-2">
          #{price}
        </h1>
      </div>
      <div className="flex justify-end">
        <Button
          onPress={() => {
            setIsOpen(true);
          }}
          className="bg-mainBlue text-white"
        >
          Make Reservation
        </Button>
      </div>
    </div>
  );
};

export default AvailableDogReview;
