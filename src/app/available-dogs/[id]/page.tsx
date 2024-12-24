import AvailableDogReview from "@/components/AvailableDogReview";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

type IdProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: IdProps) => {
  noStore();
  const data = await prisma.availableDogs.findUnique({
    where: {
      id,
    },
  });
  const reserve = await prisma.reservation.findMany({
    where: {
      availableDogsId: id,
    },
    select: {
      startDate: true,
      endDate: true,
    },
  });

  return (
    <div className="w-full my-5 justify-center flex">
      <AvailableDogReview
        id={id}
        age={data?.age}
        breed={data?.breed}
        color={data?.color}
        gender={data?.gender}
        image={data?.image}
        name={data?.name}
        price={data?.price}
        reservaions={reserve}
        size={data?.size}
      />
    </div>
  );
};

export default page;
