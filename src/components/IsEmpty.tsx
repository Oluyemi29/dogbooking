import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaFile } from "react-icons/fa";

interface EmptyDetails {
  EmptyHeading: string;
  EmptyParagraph: string;
}

const IsEmpty = ({ EmptyHeading, EmptyParagraph }: EmptyDetails) => {
  return (
    <div className="w-full flex flex-col text-black -mt-10 h-screen justify-center items-center">
      <div className="text-center">
        <div className="w-max p-2 rounded-lg m-auto bg-red-200">
          <FaFile className="text-red-600" size={50} />
        </div>
        <h1 className="font-bold text-2xl mt-5">{EmptyHeading}</h1>
        <p className="text-[0.8rem]">{EmptyParagraph}</p>
      </div>
      <Link href={'/'}>
        <Button className="bg-red-600 mt-10 text-white">Go Back Home</Button>
      </Link>
    </div>
  );
};

export default IsEmpty;
