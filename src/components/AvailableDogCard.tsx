"use client";
import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AvailableProps = {
  image: string;
  id: string;
  name: string;
  breed: string;
};

const AvailableDogs = ({ id, image, breed }: AvailableProps) => {
  return (
    <Link href={`/available-dogs/${id}`}>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-2 border-mainBlue/60 md:hover:scale-105 w-full"
      >
        <Image
          alt="Woman listing to music"
          className="w-full md:h-[16rem] h-[15rem]"
          height={100}
          src={image}
          width={100}
          priority
          quality={95}
        />
        <CardFooter className="justify-between flex bg-mainBlue/90 border-mainBlue border-1 overflow-hidden md:py-1 py-3 absolute  rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1  z-10">
          <p className="text-tiny text-white/80">{breed}</p>
          <Button
            className="text-tiny text-white/90 bg-black/20 border-white/40 border-2"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Book
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AvailableDogs;
