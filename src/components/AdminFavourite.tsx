import prisma from "@/lib/db";
import React from "react";
import Image from "next/image";
import IsEmpty from "./IsEmpty";

const AdminFavourite = async () => {
  const favourite = await prisma.favourite.findMany({
    include: {
      DogsGenerally: true,
      User: true,
    },
  });

  return (
    <div className="w-full p-2 md:p-5 rounded-lg text-black bg-white">
      {favourite.length > 0 ? (
        <>
          <div className="odd:bg-gray-200 even:bg-transparent flex justify-between text-[0.8rem] px-5 py-4 rounded-lg font-semibold">
            <h1 >Name</h1>
            <h1>Breed</h1>
            <h1 className="text-left md:block hidden">Age</h1>
            <h1 className="text-left md:block hidden">Gender</h1>
            <h1 className="text-left md:block hidden">Size</h1>
            <h1 className="text-left md:block hidden">Color</h1>
            <h1 className="text-left md:block hidden">Price</h1>
            <h1>Image</h1>
          </div>

          {favourite.map((MyFav, index) => {
            return (
              <div
                key={index}
                className="odd:bg-gray-200 even:bg-transparent flex overflow-x-auto items-center rounded-lg text-left justify-between px-5 py-2 text-[0.8rem]"
              >
                <h1 >
                  {MyFav?.User?.name}
                </h1>
                <h1>{MyFav?.DogsGenerally?.breed}</h1>
                <h1 className="text-left md:block hidden">{MyFav?.DogsGenerally?.age}</h1>
                <h1 className="text-left md:block hidden">{MyFav?.DogsGenerally?.gender}</h1>
                <h1 className="text-left md:block hidden">{MyFav?.DogsGenerally?.size}</h1>
                <h1 className="text-left md:block hidden">{MyFav?.DogsGenerally?.color}</h1>
                <h1 className="text-left md:block hidden">{MyFav?.DogsGenerally?.price}</h1>
                <Image
                  src={MyFav?.DogsGenerally?.image as string}
                  width={40}
                  height={40}
                  alt={MyFav?.DogsGenerally?.name as string}
                  priority
                  quality={95}
                  className="rounded-md w-6 h-6"
                />
              </div>
            );
          })}
        </>
      ) : (
        <>
        <IsEmpty EmptyHeading="No Favorite Found" EmptyParagraph="No Dogs has been pick from user as a Favorite"/>
        </>
      )}
    </div>
  );
};

export default AdminFavourite;
