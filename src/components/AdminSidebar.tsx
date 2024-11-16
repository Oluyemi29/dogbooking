import Link from "next/link";
import React from "react";

const AdminSidebar = () => {
  return (
    <div className="w-full p-10 bg-mainBlue text-white font-semibold flex flex-col gap-5">
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/users"}
      >
        <h1>All Users</h1>{" "}
      </Link>
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/available"}
      >
        <h1>Available Dogs</h1>
      </Link>
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/alldogs"}
      >
        <h1>All Dogs</h1>
      </Link>
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/uploadDogs"}
      >
        <h1>Upload Dogs</h1>
      </Link>
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/reservation"}
      >
        <h1>Reservation</h1>
      </Link>
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/favourite"}
      >
        <h1>Favourites</h1>
      </Link>
      <Link
        className="hover:scale-105 md:bg-mainBlue/70;"
        href={"/admin/subscribe"}
      >
        <h1>Subscriber</h1>
      </Link>
    </div>
  );
};

export default AdminSidebar;
