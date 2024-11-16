"use client";
import React, { useState } from "react";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { createAccount } from "../api/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const cloudName = "devoluyemi";
  const presetName = "atijedogs";

  const UserIcon =
    "https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";
  const [previewImage, setPreviewImage] = useState("");
  const formSchema = z
    .object({
      name: z
        .string()
        .min(3, "min of 3 character")
        .max(25, "max of 25 character"),
      email: z.string().email("not email format"),
      phone: z
        .string()
        .min(7, "number length to small")
        .max(25, "number length too long"),
      password: z
        .string()
        .min(5, "min of 5 password character")
        .max(16, "max of 16 password character"),
      confirmPassword: z
        .string()
        .min(5, "min of 5 password character")
        .max(16, "max of 16 password character"),
      address: z
        .string()
        .min(3, "Address too short")
        .max(100, "Address too long"),
      image: z
        .instanceof(File || undefined)
        .refine(
          (photo) => {
            return photo.size <= 1024 * 1024 * 2;
          },
          { message: "Image is greater then 2MB" }
        )
        .refine(
          (photo) => {
            return photo.type === "image/jpg" || "image/png" || "image/jpeg";
          },
          { message: "image type not allowed" }
        )
        .refine(
          (photo) => {
            return photo.type.startsWith("image/");
          },
          { message: "Only image is allowed" }
        ),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      { message: "Password does not match", path: ["confirmPassword"] }
    );

  type formSchemaType = z.infer<typeof formSchema>;
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (value: formSchemaType) => {
    setButtonDisabled(true);
    const { address, password, email, name, phone } = value;

    try {
      const ImageDetails = new FormData();
      ImageDetails.append("file", value.image);
      ImageDetails.append("upload_preset", presetName);
      const imageData = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: ImageDetails,
        }
      );
      const imageUrl = await imageData.json();
      const pictureLink = imageUrl.url;
      const result = await createAccount(
        address,
        email,
        name,
        password,
        pictureLink,
        phone
      );
      if (result) {
        toast.success("Registration successful");
        router.push("/verifyEmail");
      } else {
        toast.error("An Error Occured");
      }
    } catch (error) {
      console.log(error);
      toast.error(Error.name);
    }
    setButtonDisabled(false);
  };
  return (
    <div id="regback">
      <h1 className="text-center font-semibold text-2xl mt-10 text-mainBlue">
        Welcome to Registration page
      </h1>
      <p className="text-[0.9rem] text-center text-mainBlue">
        Kindly fill in your details
      </p>
      <div className="md:w-[50%] mx-auto w-full">
        <form
          method="post"
          onSubmit={handleSubmit(submit)}
          action=""
          className="w-full"
        >
          <div className="border-2 w-[20%] m-auto rounded-lg p-1 ">
            <label>
              <Image
                src={previewImage ? previewImage : UserIcon}
                alt="user"
                width={100}
                height={100}
                className="w-full h-16 md:h-24 rounded-md cursor-pointer"
              />
              <Controller
                name="image"
                control={control}
                defaultValue={undefined}
                render={({ field: { onChange } }) => (
                  <input
                    className="hidden w-[20%]"
                    type="file"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      onChange(e.target.files[0]);
                      setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                )}
              />
            </label>
          </div>
          {errors.image && (
            <span className="text-red-600 text-[0.7rem]">
              {errors.image.message}
            </span>
          )}{" "}
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type="text"
            label="Name"
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
          />
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type="email"
            label="Email"
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type="text"
            label="Phone"
            {...register("phone")}
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
          />
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type={showPassword ? "text" : "password"}
            label="Password"
            endContent={
              <div
                className="cursor-pointer text-black"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            }
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            endContent={
              <div
                className="cursor-pointer text-black"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            }
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
          />
          <Textarea
            label="Address"
            placeholder="Enter your Address"
            className="w-full border-2 border-slate-200 rounded-xl"
            {...register("address")}
            errorMessage={errors.address?.message}
            isInvalid={!!errors.address}
          />
          <Button
            disabled={buttonDisabled}
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-mainBlue text-white mt-14"
          >
            {buttonDisabled ? <Spinner color="warning" /> : "Submit"}
          </Button>
        </form>
        <Button
          onClick={() => {
            signIn("google", { callbackUrl: "/" });
          }}
          className="w-full h-14 text-lg flex gap-4 font-semibold text-mainBlue mt-4 bg-transparent border-2 border-mainBlue"
        >
          <FcGoogle size={25} /> Sign in with Google
        </Button>
        <p className="text-[0.8rem] text-left mt-3 italic text-black">
          Already have an Account?{" "}
          <Link className="text-mainBlue font-semibold" href={"/signin"}>
            Sign in Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
