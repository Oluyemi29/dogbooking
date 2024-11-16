import ProfileCard from "@/components/ProfileCard";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const serverSess = await getServerSession();
  const emails = serverSess?.user?.email;

  const datas = await prisma.user.findUnique({
    where: {
      email: emails,
    },
  });

  return (
    <div>
      <ProfileCard
        email={datas?.email}
        name={datas?.name}
        address={datas?.address}
        phone={datas?.phone}
        image={datas?.image as string}
      />
    </div>
  );
};

export default page;
