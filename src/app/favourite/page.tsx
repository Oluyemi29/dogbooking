import FavouriteCard from "@/components/FavouriteCard";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  const favourite = await prisma.favourite.findMany({
    select:{
      userId:true,
      dogsGenerallyId:true,
      DogsGenerally:true
    }
  });

  return (
    <div>
        <h1 className="text-2xl text-mainBlue text-center my-5 font-bold">Your Favourite Dogs</h1>
        <div >
              <FavouriteCard
              Favour={favourite}
              />
        </div>
    </div>
  );
};

export default page;
