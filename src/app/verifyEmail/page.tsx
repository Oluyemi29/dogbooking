"use client";
import Image from "next/image";
import React from "react";

const Page = () => {
  const Anime =
    "https://i.pinimg.com/originals/80/b4/c8/80b4c8eca5291255732a9d4e3eeb8826.gif";
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="md:w-3/6 w-full">
        <Image
          src={Anime}
          alt="anime"
          width={100}
          height={100}
          priority
          quality={95}
          className="w-2/4 rounded-md mx-auto"
        />
        <div className="mt-10 w-full text-center">
          <h1 className="text-2xl font-bold">Email Confirmation</h1>
          <p className="text-[0.8rem]">
            We`ve send a verification button link to your mail
            to confirm the validity of Account, kindly go to your
            email and click on the verification button to verify your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
