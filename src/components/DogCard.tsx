"use client";
import { myFavourite } from "@/app/api/actions";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";

type priceProps = {
  dogsGenerallyId: string;
  price: string;
  link: string;
  fav?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    dogsGenerallyId: string | null;
    userId: string | null;
  }[];
};

const DogCard = ({ price, link, dogsGenerallyId, fav }: priceProps) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id as string;
  const myfav = fav?.filter((favy) => {
    return favy.userId === userId;
  });
  const myFavid = fav?.find((favy) => {
    return favy.userId === userId;
  })?.id;
  const favourite = myfav && myfav.length > 0 ? true : false;

  const handleFavourite = async () => {
    await myFavourite(dogsGenerallyId, myFavid, userId, favourite);
  };
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-2 border-mainBlue/60 md:hover:scale-105"
    >
      {status === "authenticated" && (
        <>
          <div
            className="cursor-pointer w-max absolute mt-4 right-5 p-2 rounded-sm bg-red-100"
            onClick={() => {
              handleFavourite();
            }}
          >
            {favourite ? (
              <FaHeart size={23} className="text-red-600" />
            ) : (
              <FaHeart size={23} className="text-black/80" />
            )}
          </div>
        </>
      )}
      <Image
        alt="Woman listing to music"
        className="w-full h-[15rem] md:h-[17rem]"
        height={500}
        src={link}
        width={500}
      />
      <CardFooter className="justify-between bg-mainBlue/90 border-mainBlue border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div>
          <p className="text-tiny text-white/80">Pitbull</p>
          <p className="text-[0.7rem] text-white/80">{price}</p>
        </div>
        <Button
          className="text-tiny text-white/90 bg-black/20 border-white/40 border-2"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Book Dog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DogCard;
