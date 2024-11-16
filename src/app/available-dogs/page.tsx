import AvailableDogs from "@/components/AvailableDogCard";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  const data = await prisma.availableDogs.findMany({});
  return (
    <div className="grid mt-10 md:grid-cols-4 gap-5 grid-cols-2">
      {data.map((datum, index) => {
        return (
          <AvailableDogs
            key={index}
            breed={datum.breed}
            id={datum.id}
            image={datum.image}
            name={datum.name}
          />
        );
      })}
    </div>
  );
};

export default page;
