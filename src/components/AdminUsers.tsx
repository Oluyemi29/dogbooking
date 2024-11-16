import prisma from "@/lib/db";
import React from "react";
import DeleteUser from "./DeleteUser";
import { Button } from "@nextui-org/react";

const AdminUsers = async () => {
  const users = await prisma.user.findMany({});

  return (
    <div className="w-full p-2 md:p-5 rounded-lg text-black bg-white">
      <div className="odd:bg-gray-200 even:bg-transparent flex justify-between px-5 py-4 rounded-lg font-semibold">
        <h1>Name</h1>
        <h1>Email</h1>
        <h1>Action</h1>
      </div>
      {users.map((userses, index) => {
        return (
          <div
            key={index}
            className="odd:bg-gray-200 even:bg-transparent flex items-center rounded-lg text-center justify-between px-5 py-2"
          >
            <h1>{userses.name}</h1>
            <h1 className="text-left md:block hidden">{userses.email}</h1>
            {userses.email !== "admin@gmail.com" ? (
              <DeleteUser
                email={userses?.email}
                id={userses?.id}
                name={userses?.name}
              />
            ) : (
              <Button className="cursor-not-allowed bg-red-200">Deleted</Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;
