import AdminSidebar from "@/components/AdminSidebar";
import AdminUsers from "@/components/AdminUsers";
import React from "react";

const page = async () => {
  return (
    <div className="w-full flex gap-2">
      <div className="w-3/12 md:block hidden">
        <AdminSidebar />
      </div>
      <div className="md:w-9/12 w-full">
        <h1 className="text-center font-semibold text-lg my-5 text-mainBlue md:text-2xl">
          All Users
        </h1>
        <AdminUsers />
      </div>
    </div>
  );
};

export default page;