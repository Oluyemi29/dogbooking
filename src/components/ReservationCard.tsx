"use client";
import { resDelete } from "@/app/api/actions";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import IsEmpty from "./IsEmpty";

type AvailableProps = {
  Reserve: {
    id: string;
    userId: string | null;
    startDate: Date;
    endDate: Date;
    AvailableDogs: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      breed: string;
      age: string;
      gender: string;
      size: string;
      color: string;
      price: number;
      image: string;
    } | null;
  }[];
};

const ReservationCard = ({ Reserve }: AvailableProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const EachRes = Reserve.filter((Myres) => {
    return Myres.userId === userId;
  });
  const handleReserveDelete = async (id: string) => {
    await resDelete(id);
  };

  return (
    <>
      {EachRes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 w-full gap-5">
          {EachRes.map((AllRes, index) => {
            return (
              <Card
                key={index}
                isFooterBlurred
                radius="lg"
                className="border-2 border-mainBlue/60 hover:scale-105 w-full"
              >
                <Image
                  alt="Woman listing to music"
                  className="w-full md:h-[16rem] h-[15rem]"
                  height={100}
                  src={AllRes.AvailableDogs?.image as string}
                  width={100}
                  priority
                  quality={95}
                />
                <CardFooter className="flex gap-1 flex-col bg-mainBlue/90 border-mainBlue border-1 overflow-hidden md:py-1 py-1 absolute  rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1  z-10">
                  <div className="w-full items-center flex flex-row justify-between">
                    <div>
                      <p className="text-[0.6rem] text-white/80">
                        {AllRes.AvailableDogs?.breed}
                      </p>
                      <p className="text-[0.6rem] text-white/80">
                        #{AllRes?.AvailableDogs?.price}
                      </p>
                    </div>
                    <Button
                      className="text-tiny text-white/90 bg-red-500 border-white/40 border-2"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                      onClick={() => {
                        handleReserveDelete(AllRes.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="flex w-full text-white flex-row justify-between">
                    <h1 className="text-[0.6rem]">Start</h1>
                    <h1 className="text-[0.6rem] font-semibold">
                      {AllRes?.startDate.toString().slice(0, 15)}
                    </h1>
                  </div>
                  <div className="flex w-full text-white flex-row justify-between">
                    <h1 className="text-[0.6rem]">End</h1>
                    <h1 className="text-[0.6rem] font-semibold">
                      {AllRes?.endDate.toString().slice(0, 15)}
                    </h1>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <>
          <IsEmpty
            EmptyHeading="No Reservation Found"
            EmptyParagraph="Kindly go to homepage and like your reseration dogs"
          />
        </>
      )}
    </>
  );
};

export default ReservationCard;
