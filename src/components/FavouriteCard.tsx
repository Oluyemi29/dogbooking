"use client";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import IsEmpty from "./IsEmpty";

type AvailableProps = {
  Favour: {
    dogsGenerallyId: string | null;
    userId: string | null;
    DogsGenerally: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      image: string;
      name: string;
      breed: string;
      age: string;
      gender: string;
      size: string;
      color: string;
      price: number;
      idFromAvail: string;
    } | null;
  }[];
};

const FavouriteCard = ({ Favour }: AvailableProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const EachFav = Favour.filter((Myfav) => {
    return Myfav.userId === userId;
  });

  return (
    <>
      {EachFav.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 mt-10 w-full gap-5">
          {EachFav.map((AllFav, index) => {
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
                  src={AllFav.DogsGenerally?.image as string}
                  width={100}
                  priority
                  quality={95}
                />
                <CardFooter className="justify-between flex bg-mainBlue/90 border-mainBlue border-1 overflow-hidden md:py-1 py-3 absolute  rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1  z-10">
                  <p className="text-tiny text-white/80">
                    {AllFav.DogsGenerally?.breed}
                  </p>
                  <Button
                    className="text-tiny text-white/90 bg-black/20 border-white/40 border-2"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    #{AllFav.DogsGenerally?.price}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <>
          <IsEmpty
            EmptyHeading="No Favourite Found"
            EmptyParagraph="Kindly go to home page and pick your favourite dogs"
          />
        </>
      )}
    </>
  );
};

export default FavouriteCard;
