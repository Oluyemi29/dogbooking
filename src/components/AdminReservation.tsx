import prisma from "@/lib/db";
import React from "react";
import Image from "next/image";
import DeleteReservation from "./deleteReservation";
import IsEmpty from "./IsEmpty";

const AdminReservation = async () => {
  const reserve = await prisma.reservation.findMany({
    include: {
      AvailableDogs: true,
      User: true,
    },
  });

  return (
    <>
      {reserve.length > 0 ? (
        <>
          <div className="w-full p-2 md:p-5 rounded-lg text-black bg-white">
            <div className="odd:bg-gray-200 even:bg-transparent flex justify-between text-[0.8rem] px-5 py-4 rounded-lg font-semibold">
              <h1 className="text-left md:block hidden">Name</h1>
              <h1>Breed</h1>
              <h1>Image</h1>
              <h1 className="text-left md:block hidden">S Date</h1>
              <h1 className="text-left md:block hidden">E Date</h1>
              <h1 className="text-left md:block hidden">R Name</h1>
              <h1>Action</h1>
            </div>
            {reserve.map((reservations, index) => {
              return (
                <div
                  key={index}
                  className="odd:bg-gray-200 even:bg-transparent flex overflow-x-auto items-center rounded-lg text-left justify-between px-5 py-2 text-[0.8rem]"
                >
                  <h1 className="text-left md:block hidden">
                    {reservations.AvailableDogs?.name}
                  </h1>
                  <h1>{reservations?.AvailableDogs?.breed}</h1>
                  <Image
                    src={reservations.AvailableDogs?.image as string}
                    width={40}
                    height={40}
                    alt={reservations.AvailableDogs?.name as string}
                    priority
                    quality={95}
                    className="rounded-md w-6 h-6"
                  />
                  <h1 className="text-left md:block hidden">
                    {reservations?.startDate.toString().slice(0, 15)}
                  </h1>
                  <h1 className="text-left md:block hidden">
                    {reservations?.endDate.toString().slice(0, 15)}
                  </h1>
                  <h1 className="text-left md:block hidden">
                    {reservations?.User?.name}
                  </h1>
                  <DeleteReservation
                    id={reservations.id}
                    name={reservations.AvailableDogs?.name}
                    breed={reservations.AvailableDogs?.breed}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <IsEmpty
            EmptyHeading="No Reservation Found"
            EmptyParagraph="Users have not made any reservation"
          />
        </>
      )}
    </>
  );
};

export default AdminReservation;
