import AdminSidebar from "@/components/AdminSidebar";
import AdminUploadDog from "@/components/AdminUploadDog";
import React from "react";

const page = async () => {
  return (
    <div className="w-full flex gap-2">
      <div className="w-3/12 md:block hidden">
        <AdminSidebar />
      </div>
      <div className="md:w-9/12 w-full">
        <AdminUploadDog />
      </div>
    </div>
  );
};

export default page;
