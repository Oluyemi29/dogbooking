"use client";
import React, { useState } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email("not email format"),
    password: z
      .string()
      .min(5, "min of 5 password character")
      .max(16, "max of 16 password character"),
  });

  type formSchemaType = z.infer<typeof formSchema>;
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (value: formSchemaType) => {
    setButtonDisabled(true);
    const { password, email } = value;
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast.error("Invalid email or password");
        } else {
          toast.error("pls check your login credentials and try again");
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    setButtonDisabled(false);
  };
  return (
    <div id="regback">
      <h1 className="text-center font-semibold text-2xl mt-10 text-mainBlue">
        Welcome to Login Page
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
          Dont have an Account?{" "}
          <Link className="text-mainBlue font-semibold" href={"/signup"}>
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
