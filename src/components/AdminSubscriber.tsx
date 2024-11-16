import prisma from "@/lib/db";
import React from "react";

const AdminSubscriber
 = async () => {
  const subscribe = await prisma.subscribe.findMany({});
  

  return (
    <div className="w-full p-2 md:p-5 rounded-lg text-black bg-white">
      <div className="odd:bg-gray-200 even:bg-transparent flex justify-between text-[0.8rem] px-5 py-4 rounded-lg font-semibold">
        <h1>S/N</h1>
        <h1>Email</h1>
        <h1>Subscribe At</h1>
      </div>
      {subscribe.map((subscribers, index) => {
          return (
              <div
              key={index}
              className="odd:bg-gray-200 even:bg-transparent flex overflow-x-auto items-center rounded-lg text-left justify-between px-5 py-2 text-[0.8rem]"
              >
            <h1>{index+1}</h1>
            <h1>{subscribers.email}</h1>
            <h1>{subscribers.createdAt.toString().slice(0,15)}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSubscriber
;
