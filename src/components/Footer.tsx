"use client";
import React from "react";
import { MdLocationPin } from "react-icons/md";
import { IoLogoFacebook } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Brand from "@/images/dogbrand.png";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subscriber } from "@/app/api/actions";
import toast from "react-hot-toast";

const Footer = () => {
  const mailSchema = z.object({
    email: z.string().email("Not Email Format"),
  });
  type mailSchemaType = z.infer<typeof mailSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<mailSchemaType>({
    resolver: zodResolver(mailSchema),
  });

  const submit = async (value: mailSchemaType) => {
    const { email } = value;
    await Subscriber(email);
    toast.success("You've subscribe successfully");
  };
  return (
    <div className="">
      <div className="bg-mainYellow text-mainBlue border-2 border-mainBlue mt-5 flex justify-between p-5 md:flex-row flex-col">
        <Link href={"/"}>
          <Image
            src={Brand}
            alt="atije"
            width={20}
            height={20}
            className="w-8 h-8 md:m-auto"
          />
          <h1 className="font-bold">ATIJE</h1>
        </Link>
        <div>
          <p className="md:text-[0.9rem] text-[0.7rem] md:text-center font-semibold italic">
            <MdLocationPin className="md:m-auto" size={25} /> <br /> Peace and
            Love Hostel, <br /> Under G area Ogbomoso
          </p>
        </div>
        <div className="text-[0.9rem] font-semibold">
          <Link href={"/"}>
            <p>Home</p>
          </Link>
          <Link href={"/dogs"}>
            <p>Dogs</p>
          </Link>
          <Link href={"/available-dogs"}>
            <p>Available Dogs</p>
          </Link>
          <Link href={"/"}>
            <p>Subscribe</p>
          </Link>
          <Link href={"/"}>
            <p>Contact</p>
          </Link>
          <Link href={"/"}>
            <p>Services</p>
          </Link>
        </div>
        <div className="">
          <div className="flex md:m-0 mt-6 m-auto md:w-max w-full justify-center gap-7">
            <FaWhatsapp size={25} />
            <FaInstagram size={25} />
            <FaTwitter size={25} />
            <IoLogoFacebook size={25} />
          </div>
          <div className="w-full mt-5">
            <form
              action=""
              method="post"
              className="flex gap-2 items-center md:m-0 m-auto w-[90%]"
              onSubmit={handleSubmit(submit)}
            >
              <input
                className="md:h-10 h-12 w-[70%] pl-5 rounded-full border-2 border-slate-400 text-[0.9rem]"
                type="text"
                placeholder="Enter Your Email"
                id=""
                {...register("email")}
              />
              <button
                type="submit"
                className="h-10 px-4 md:h-10 text-[0.7rem] rounded-full bg-mainBlue text-white"
              >
                Subscribe
              </button>
              <span className="text-red-700 text-[0.7rem]">
                {errors.email && errors.email.message}
              </span>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-mainBlue py-1.5 flex justify-center text-white">
        <h1 className="text-[0.7rem]">
          &copy;{" "}
          <Link href={"mailto:adedokunoluyemi1@gmail.com"}> Dev Oluyemi</Link>{" "}
          2024
        </h1>
      </div>
    </div>
  );
};

export default Footer;
