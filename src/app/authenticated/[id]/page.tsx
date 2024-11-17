import { emailVerify } from "@/app/api/actions";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type paramsProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: paramsProps) => {
  const EmailAnime =
    "https://i.pinimg.com/originals/07/99/0d/07990de3a791c7330131934bc546ad25.gif";
  const id = params?.id;

  try {
    await emailVerify(id);
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="w-full h-screen flex justify-center text-black items-center">
      <div className="md:w-2/4 text-center w-full">
        <Image
          src={EmailAnime}
          alt="EmailAnime"
          width={100}
          height={100}
          className="w-2/4 rounded-lg mx-auto"
        />
        <div>
          <h1 className="text-2xl font-bold my-10 text-mainBlue">
            Email Verified Successful
          </h1>
          <p className="text-[0.9rem]">
            Thanks for verifing your account , your account has been verified
            successfully, Kindly click on the login button below to redirect you
            to login pages
          </p>
          <Link href={"/signin"}>
            <Button className="w-1/2 mt-10 bg-mainBlue h-14 rounded-md text-white">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
