"use client";
import Image from "next/image";
import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import Dogbrands from "@/images/dogbrand.png";
import { IoIosStar } from "react-icons/io";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subscriber } from "@/app/api/actions";
import toast from "react-hot-toast";

const SecondHero = () => {
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

  const DogImage =
    "https://i.pinimg.com/736x/77/2c/59/772c59186f0e34d9fa375480a695f54c.jpg";
  const GoogleLogo =
    "https://i.pinimg.com/564x/19/74/89/1974895dcb39192c99c0156e80494d3e.jpg";
  const SubDog =
    "https://i.pinimg.com/564x/38/ae/a9/38aea96ffac6e0c1bab864c1e023392a.jpg";
  return (
    <div>
      <div className="flex w-full mt-14 md:flex-row gap-8 flex-col-reverse">
        <div className="w-full">
          <h1 className="text-xl flex items-center gap-3 text-mainBlue font-bold">
            <FaRegCircleDot />
            Village Dog
          </h1>
          <p className="mt-5 text-mainBlue">
            Dog websites are essential platforms for dog lovers, providing a
            wide range of resources and information on caring for dogs. These
            sites often feature articles on dog health, nutrition, and grooming,
            helping owners keep their pets in the best possible condition. From
            detailed guides on feeding and exercise routines to tips for
            managing common health issues, dog sites are a reliable source of
            advice for maintaining a happy and healthy dog. In addition to
            health and care, dog websites often offer extensive breed
            directories. These directories allow users to research different dog
            breeds, learning about their traits, temperaments, and specific care
            needs. Whether you`re looking for a small companion breed or a
            larger working dog, these sites provide valuable information that
            helps prospective owners make informed decisions about which breed
            best suits their lifestyle. Many dog sites also foster a sense of
            community among pet owners. Through forums and social media groups,
            users can connect with fellow dog lovers, share experiences, seek
            advice, and discuss all things related to dogs. These interactive
            features make dog sites not only informative but also engaging for
            people looking to bond over their shared love for their pets.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Image
            src={DogImage}
            alt="dogimage"
            width={100}
            height={100}
            className="md:w-[70%] w-full rounded-xl border-2 border-mainBlue p-5"
          />
        </div>
      </div>
      <div className="mt-20 ">
        <div className="bg-mainYellow border-2 border-mainBlue flex justify-between gap-5 w-full px-10 pt-4 pb-14">
          <div>
            <h1 className="font-semibold md:text-0.8rem text-[0.6rem] text-mainBlue">
              Do your Know?
            </h1>
            <h1 className="font-bold md:text-2xl text-lg line-clamp-1 text-mainBlue">
              Many dog sites also foster a sense{" "}
              <br className="hidden md:block" /> of community among pet owners.{" "}
            </h1>
          </div>
          <Image
            src={Dogbrands}
            width={40}
            height={40}
            alt="dogs"
            className="w-20"
          />
        </div>
        <div className="">
          <div className="border-2 border-mainBlue rounded-md text-mainBlue p-5 bg-white grid grid-cols-1 md:grid-cols-4 -mt-6 w-[92%] mx-auto z-10 gap-3">
            <div className="bg-slate-200 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-white rounded-full w-5 h-5 text-[0.78rem] bg-blue-900 text-center items-center">
                  A
                </h1>
                <div>
                  <h1 className="text-[0.7rem] font-bold">Alex Johnson</h1>
                  <p className="text-[0.6rem]">12/12/2023</p>
                </div>
                <Image
                  src={GoogleLogo}
                  alt="GoogleLogo"
                  width={20}
                  height={20}
                  className="w-6 h-5 rounded-md"
                />
              </div>
              <div className="flex mt-1">
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
              </div>
              <p className="font-semibold text-[0.8rem] my-3">
                Many dog sites also foster a sense of community among pet
                owners. Through forums and social media groups, users can
                connect with fellow dog lovers, share experiences, seek advice,
                and discuss all things related to dogs.
              </p>
              <p className="text-[0.6rem] my-1">Five star ratings</p>
            </div>
            <div className="bg-slate-200 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-white rounded-full w-5 h-5 text-[0.78rem] bg-blue-900 text-center items-center">
                  A
                </h1>
                <div>
                  <h1 className="text-[0.7rem] font-bold">Alex Johnson</h1>
                  <p className="text-[0.6rem]">12/12/2023</p>
                </div>
                <Image
                  src={GoogleLogo}
                  alt="GoogleLogo"
                  width={20}
                  height={20}
                  className="w-6 h-5 rounded-md"
                />
              </div>
              <div className="flex mt-1">
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
              </div>
              <p className="font-semibold text-[0.8rem] my-3">
                Many dog sites also foster a sense of community among pet
                owners. Through forums and social media groups, users can
                connect with fellow dog lovers, share experiences, seek advice,
                and discuss all things related to dogs.
              </p>
              <p className="text-[0.6rem] my-1">Five star ratings</p>
            </div>
            <div className="bg-slate-200 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-white rounded-full w-5 h-5 text-[0.78rem] bg-blue-900 text-center items-center">
                  A
                </h1>
                <div>
                  <h1 className="text-[0.7rem] font-bold">Alex Johnson</h1>
                  <p className="text-[0.6rem]">12/12/2023</p>
                </div>
                <Image
                  src={GoogleLogo}
                  alt="GoogleLogo"
                  width={20}
                  height={20}
                  className="w-6 h-5 rounded-md"
                />
              </div>
              <div className="flex mt-1">
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
              </div>
              <p className="font-semibold text-[0.8rem] my-3">
                Many dog sites also foster a sense of community among pet
                owners. Through forums and social media groups, users can
                connect with fellow dog lovers, share experiences, seek advice,
                and discuss all things related to dogs.
              </p>
              <p className="text-[0.6rem] my-1">Five star ratings</p>
            </div>
            <div className="bg-slate-200 p-2 rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="text-white rounded-full w-5 h-5 text-[0.78rem] bg-blue-900 text-center items-center">
                  A
                </h1>
                <div>
                  <h1 className="text-[0.7rem] font-bold">Alex Johnson</h1>
                  <p className="text-[0.6rem]">12/12/2023</p>
                </div>
                <Image
                  src={GoogleLogo}
                  alt="GoogleLogo"
                  width={20}
                  height={20}
                  className="w-6 h-5 rounded-md"
                />
              </div>
              <div className="flex mt-1">
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
                <IoIosStar size={15} className="text-mainYellow" />
              </div>
              <p className="font-semibold text-[0.8rem] my-3">
                Many dog sites also foster a sense of community among pet
                owners. Through forums and social media groups, users can
                connect with fellow dog lovers, share experiences, seek advice,
                and discuss all things related to dogs.
              </p>
              <p className="text-[0.6rem] my-1">Five star ratings</p>
            </div>
          </div>
        </div>
      </div>
      {/* dogses */}
      <div className="my-10">
        <h1 className="text-center font-bold text-2xl italic text-mainBlue">
          Check it out
        </h1>
        <div className="w-full flex justify-center my-3">
          <AvatarGroup max={7} total={3} isBordered>
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/474x/0a/05/e0/0a05e0cd8ae8486e4991cf98adbb7f58.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/474x/21/88/ac/2188acb0584da3f775ef6cf8dfab68b8.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/474x/21/2e/23/212e23845f6a3cbd114dc5fc54041d2a.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/474x/57/3c/cc/573cccd23b37e4c6e76b651acac3d6f8.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/enabled_hi/474x/e2/7e/46/e27e46395cfb878c407d589ffb44770d.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/474x/42/3c/49/423c49eea14fa377eb45f9a2ca5fa14e.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/enabled_hi/474x/c4/d2/69/c4d269c486431d1fe895052e2ae91742.jpg"
            />
            <Avatar
              isBordered
              color="success"
              size="lg"
              src="https://i.pinimg.com/474x/49/eb/9e/49eb9e88471b7b99f476c73e1d6726be.jpg"
            />
          </AvatarGroup>
        </div>
      </div>
      <div>
        <h1 className="text-center font-bold text-mainBlue text-xl md:text-4xl mb-5">
          SUBSCRIBE TO OUR NEWSLETTER
        </h1>
        <div className="w-full flex md:flex-row gap-3 flex-col items-center">
          <div className="w-full">
            <form
              onSubmit={handleSubmit(submit)}
              action=""
              method="post"
              className="flex gap-4 items-center md:m-0 m-auto w-[90%]"
            >
              <input
                className="md:h-14 h-12 w-[70%] text-black pl-5 rounded-full border-2 border-slate-400"
                type="text"
                placeholder="Enter Your Email"
                id=""
                {...register("email")}
              />
              <button
                type="submit"
                className="w-[30%] h-12 md:h-14 rounded-full bg-mainYellow text-white"
              >
                Subscribe
              </button>
              <span className="text-red-600 text-[0.7rem]">
                {errors.email && errors.email.message}
              </span>
            </form>
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={SubDog}
              alt="SubDog"
              width={100}
              height={100}
              className="md:w-[50%] rounded-xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
