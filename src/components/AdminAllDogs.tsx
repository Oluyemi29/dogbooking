import prisma from "@/lib/db";
import React from "react";
import Image from "next/image";
import DeleteFromAllDogs from "./DeleteFromAllDogs";

const AdminAllDogs = async () => {
  const users = await prisma.dogsGenerally.findMany({});

  return (
    <div className="w-full p-2 md:p-5 rounded-lg text-black bg-white">
      <div className="odd:bg-gray-200 even:bg-transparent flex justify-between text-[0.8rem] px-5 py-4 rounded-lg font-semibold">
        <h1 className="text-left md:block hidden">Name</h1>
        <h1>Breed</h1>
        <h1 className="text-left md:block hidden">Age</h1>
        <h1 className="text-left md:block hidden">Gender</h1>
        <h1 className="text-left md:block hidden">Size</h1>
        <h1 className="text-left md:block hidden">Color</h1>
        <h1 className="text-left md:block hidden">Price</h1>
        <h1>Image</h1>
        <h1>Action</h1>
      </div>
      {users.map((availabe, index) => {
        return (
          <div
            key={index}
            className="odd:bg-gray-200 even:bg-transparent flex overflow-x-auto items-center rounded-lg text-left justify-between px-5 py-2 text-[0.8rem]"
          >
            <h1 className="text-left md:block hidden">{availabe.name}</h1>
            <h1>{availabe.breed}</h1>
            <h1 className="text-left md:block hidden">{availabe.age}</h1>
            <h1 className="text-left md:block hidden">{availabe.gender}</h1>
            <h1 className="text-left md:block hidden">{availabe.size}</h1>
            <h1 className="text-left md:block hidden">{availabe.color}</h1>
            <h1 className="text-left md:block hidden">#{availabe.price}</h1>
            <Image
              src={availabe.image as string}
              width={40}
              height={40}
              alt={availabe.name}
              priority
              quality={95}
              className="rounded-md w-6 h-6"
            />
            <DeleteFromAllDogs id={availabe.id} name={availabe.name} />
          </div>
        );
      })}
    </div>
  );
};

export default AdminAllDogs;
