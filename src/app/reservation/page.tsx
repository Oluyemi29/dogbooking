import ReservationCard from "@/components/ReservationCard";
import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  const Reserve = await prisma.reservation.findMany({
    select: {
      userId: true,
      id: true,
      AvailableDogs: true,
      startDate: true,
      endDate: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl text-mainBlue text-center my-5 font-bold">
        Your Reserved Dogs
      </h1>
      <div >
        <ReservationCard Reserve={Reserve} />
      </div>
    </div>
  );
};

export default page;
