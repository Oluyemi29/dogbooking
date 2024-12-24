"use server";
import EmailTemp from "@/components/EmailTemplate";
import prisma from "@/lib/db";
import nodemailer from "nodemailer";
import bycrpt from "bcrypt";
import Handlebars from "handlebars";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export const createAccount = async (
  address: string,
  email: string,
  name: string,
  password: string,
  pictureLink: string,
  phone: string
) => {
  noStore();
  const User = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (User) {
    throw new Error("User Alrealdy exist");
  }
  const hashPassword = await bycrpt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      phone,
      name: name,
      address,
      image: pictureLink,
      password: hashPassword,
    },
  });
  const newUserid = newUser.id;
  const myEmail = newUser.email;
  const template = Handlebars.compile(EmailTemp);
  const url = `${process.env.NEXTAUTH_URL}/authenticated/${newUserid}`;
  const myBody = template({
    url,
  });

  try {
    const { EmailAuth, EmailAuthAPassword } = process.env;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EmailAuth,
        pass: EmailAuthAPassword,
      },
    });

    const info = await transporter.sendMail({
      from: '"Oluyemi 💻" <adedokunoluyemi1@gmail.com>',
      to: myEmail,
      subject: "Email Confirmation",
      html: myBody,
    });
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const emailVerify = async (id: string) => {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return null;
  }
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      confirmEmail: true,
    },
  });
  return true;
};

export const editProfile = async (
  editWhat: string,
  editInput: string,
  id: string
) => {
  if (editWhat === "name") {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: editInput,
      },
    });
    return revalidatePath("/profile");
  }
  if (editWhat === "phone") {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        phone: editInput,
      },
    });
    return revalidatePath("/profile");
  }
  if (editWhat === "address") {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        address: editInput,
      },
    });
    return revalidatePath("/profile");
  }
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
  return revalidatePath("/admin/users");
};

type uploadDogs = {
  name: string;
  age: string;
  breed: string;
  color: string;
  gender: string;
  size: string;
  price: number;
  pictureLink: string;
};

export const uploadDogs = async (
  name: string,
  age: string,
  breed: string,
  color: string,
  gender: string,
  size: string,
  price: number,
  pictureLink: string
) => {
  const available = await prisma.availableDogs.create({
    data: {
      name,
      age,
      breed,
      color,
      gender,
      size,
      price,
      image: pictureLink,
    },
  });
  await prisma.dogsGenerally.create({
    data: {
      name,
      age,
      breed,
      color,
      gender,
      size,
      price,
      image: pictureLink,
      idFromAvail: available.id,
    },
  });
  revalidatePath("/admin/available");
  revalidatePath("/admin/alldogs");
  revalidatePath("/available-dogs");
  revalidatePath("/dogs");
  return true;
};

export const deleteDogs = async (id: string, deleteBoth: boolean) => {
  noStore();
  await prisma.availableDogs.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/available");
  revalidatePath("/available-dogs");

  const checking = await prisma.dogsGenerally.findUnique({
    where: {
      idFromAvail: id,
    },
  });

  if (deleteBoth === true && checking) {
    await prisma.dogsGenerally.delete({
      where: {
        idFromAvail: id,
      },
    });
    revalidatePath("/admin/alldogs");
    revalidatePath("/dogs");
  }
};

export const DeleteFromDogs = async (id: string) => {
  await prisma.dogsGenerally.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/alldogs");
  revalidatePath("/dogs");
  return true;
};

export const BookReservation = async (
  id: string,
  userId: string,
  startDate: string,
  endDate: string
) => {
  await prisma.reservation.create({
    data: {
      endDate,
      startDate,
      availableDogsId: id,
      userId,
    },
  });
  revalidatePath("/reservation");
  revalidatePath("/available-dogs");
  revalidatePath("/admin/reservation");
  return redirect("/available-dogs");
};

export const deleteReserve = async (id: string) => {
  await prisma.reservation.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/reservation");
  revalidatePath("/reservation");

  return true;
};

export const myFavourite = async (
  dogsGenerallyId: string,
  myFavid: string | undefined,
  userId: string,
  favourite: boolean
) => {
  if (dogsGenerallyId && userId) {
    if (favourite === false) {
      await prisma.favourite.create({
        data: {
          dogsGenerallyId,
          userId,
        },
      });
      revalidatePath("/favourite");
      revalidatePath("/dogs");
      revalidatePath("/admin/favourite");
    }

    if (favourite === true) {
      await prisma.favourite.delete({
        where: {
          id: myFavid,
        },
      });
      revalidatePath("/favourite");
      revalidatePath("/dogs");
    }
  }
};

export const resDelete = async (id: string) => {
  await prisma.reservation.delete({
    where: {
      id,
    },
  });
  revalidatePath("/reservation");
  return true;
};

export const Subscriber = async (email: string) => {
  noStore();
  const checkEmail = await prisma.subscribe.findUnique({
    where: {
      email,
    },
  });
  if (checkEmail) {
    return true;
  } else {
    await prisma.subscribe.create({
      data: {
        email,
      },
    });
    revalidatePath("/admin/subscribe");
    return true;
  }
};
