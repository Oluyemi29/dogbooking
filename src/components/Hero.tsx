"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { GiSittingDog } from "react-icons/gi";
import Dogbrands from "@/images/dogbrand.png";
import { FaHouseCircleCheck } from "react-icons/fa6";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const buttonVariant = {
    whileHover: { scale: 1.1 },
    initial: {
      x: -500,
    },
    animate: {
      x: 0,
      transition: {
        delay: 3,
        duration: 1,
      },
    },
  };
  const h1Variant = {
    initial: {
      x: -600,
    },
    animate: {
      x: 0,
      transition: {
        delay: 1,
        stiffness: 500,
        type: "spring",
      },
    },
  };
  const pVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 2,
        duration: 2,
      },
    },
  };
  const ImageVariant = {
    initial: {
      x: 600,
    },
    animate: {
      x: 0,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
  };
  const MyDog =
    "https://i.pinimg.com/736x/31/e2/46/31e24695f58a384dadbf912cb6a1ac22.jpg";

  return (
    <div>
      <motion.div className="flex md:flex-row flex-col justify-center mx-auto gap-14 mt-10 w-full items-center">
        <div className="w-full">
          <motion.h1
            variants={h1Variant}
            initial={"initial"}
            animate={"animate"}
            className="md:text-3xl text-medium text-mainBlue font-bold"
          >
            Dogs Are Friendly{" "}
            <span className="bg-mainYellow px-4 py-2 border-2 rounded-md border-mainBlue">
              {" "}
              And Lovely.
            </span>
          </motion.h1>
          <motion.p
            variants={pVariant}
            initial={"initial"}
            animate={"animate"}
            className="text-sm mt-6 text-black"
          >
            Dog websites serve as comprehensive hubs for all things related to
            dogs, offering resources on care, training, health, and breed
            information. These sites often feature in-depth articles about dog
            nutrition, grooming, and behavioral tips, helping owners provide the
            best care for their pets. Many also include breed-specific
            information, allowing users to research different dog breeds, their
            temperaments, and needs. Additionally, some sites offer community
            forums where dog lovers can exchange advice and experiences. Whether
            you`re looking for dog adoption, health advice, training tips, or
            dog products, these sites provide a wealth of information for both
            new and experienced dog owners.
          </motion.p>
          <motion.button
            variants={buttonVariant}
            whileHover={"whileHover"}
            initial={"initial"}
            animate={"animate"}
            className="bg-mainYellow border-2 inline-flex items-center gap-3 border-mainBlue font-semibold text-mainBlue px-12 py-5 text-[1rem] mt-14 rounded-full"
          >
            Explore Dogs Here <GiSittingDog />
          </motion.button>
        </div>
        <motion.div
          variants={ImageVariant}
          initial={"initial"}
          animate={"animate"}
          className="w-full flex justify-center"
        >
          <Image
            src={MyDog}
            quality={95}
            priority
            alt="dog"
            width={40}
            height={40}
            className="md:w-[60%] w-full rounded-md"
          />
        </motion.div>
      </motion.div>
      <div className="mt-20 ">
        <div className="bg-mainYellow border-2 border-mainBlue flex justify-between gap-5 w-full px-10 pt-4 pb-14">
          <h1 className="font-semibold md:text-0.8rem text-[0.6rem] text-mainBlue">
            Dog websites are valuable resources for <br /> dog owners, breeders,
            and enthusiasts,
          </h1>
          <Image
            src={Dogbrands}
            width={40}
            height={40}
            alt="dogs"
            className="w-14"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 -mt-6 w-[90%] mx-auto z-10 gap-10">
          <div className="border-2 border-mainBlue rounded-md p-8 bg-white">
            <FaHouseCircleCheck size={25} className="text-mainBlue" />
            <h1 className="font-semibold text-mainBlue my-3">Dog websites.</h1>
            <p className="text-[0.7rem] text-mainBlue">
              Dog websites are valuable resources for dog owners, breeders, and
              enthusiasts, offering a range of information about dog care,
              training, health, and breeds. These sites often provide articles
              on dog nutrition, grooming tips, and behavior training to help
              improve the well-being of pets. Many dog sites also feature breed
              directories, allowing users to explore different dog breeds and
              their characteristics. Additionally, some websites offer online
              communities for dog lovers to connect, share experiences, and seek
              advice. Whether you`re looking for adoption services, dog
              products, or general advice, dog sites are an essential resource
              for responsible pet ownership.These sites often feature in-depth
              articles about dog nutrition, grooming, and behavioral tips,
              helping owners provide the best care for their pets.
            </p>
            <Link href={"/dogs"}>
              <Button className="px-8 py-4 rounded-full bg-mainBlue text-white mt-5">
                Know more of Pet
              </Button>
            </Link>
          </div>
          <div className="border-2 border-mainBlue rounded-md p-8 bg-white">
            <FaHouseChimneyMedical size={25} className="text-mainBlue" />
            <h1 className="font-semibold text-mainBlue my-3">About Us.</h1>
            <p className="text-[0.7rem] text-mainBlue">
              Dog websites are valuable resources for dog owners, breeders, and
              enthusiasts, offering a range of information about dog care,
              training, health, and breeds. These sites often provide articles
              on dog nutrition, grooming tips, and behavior training to help
              improve the well-being of pets. Many dog sites also feature breed
              directories, allowing users to explore different dog breeds and
              their characteristics. Additionally, some websites offer online
              communities for dog lovers to connect, share experiences, and seek
              advice. Whether you`re looking for adoption services, dog
              products, or general advice, dog sites are an essential resource
              for responsible pet ownership.These sites often feature in-depth
              articles about dog nutrition, grooming, and behavioral tips,
              helping owners provide the best care for their pets.
            </p>
            <Link href={"/dogs"}>
              <Button className="px-8 py-4 rounded-full bg-mainBlue text-white mt-5">
                Know more of Pet
              </Button>
            </Link>
          </div>
          <div className="border-2 border-mainBlue rounded-md p-8 bg-white">
            <FaHouseUser size={25} className="text-mainBlue" />
            <h1 className="font-semibold text-mainBlue my-3">
              Fact About Dogs.
            </h1>
            <p className="text-[0.7rem] text-mainBlue">
              Dog websites are valuable resources for dog owners, breeders, and
              enthusiasts, offering a range of information about dog care,
              training, health, and breeds. These sites often provide articles
              on dog nutrition, grooming tips, and behavior training to help
              improve the well-being of pets. Many dog sites also feature breed
              directories, allowing users to explore different dog breeds and
              their characteristics. Additionally, some websites offer online
              communities for dog lovers to connect, share experiences, and seek
              advice. Whether you`re looking for adoption services, dog
              products, or general advice, dog sites are an essential resource
              for responsible pet ownership.These sites often feature in-depth
              articles about dog nutrition, grooming, and behavioral tips,
              helping owners provide the best care for their pets.
            </p>
            <Link href={"/dogs"}>
              <Button className="px-8 py-4 rounded-full bg-mainBlue text-white mt-5">
                Know more of Pet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
