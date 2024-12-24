"use client";
import React, { useState } from "react";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import toast from "react-hot-toast";
import { uploadDogs } from "@/app/api/actions";

const AdminUploadDog = () => {
  const Gender = ["Male", "Female"];
  const Sizing = ["Small", "Medium", "Big"];
  const [offButton, setOffButton] = useState(false);

  const cloudName = "devoluyemi";
  const presetName = "atijedogs";

  const UserIcon =
    "https://i.pinimg.com/474x/8b/59/ad/8b59ad32537d8a795029d04ec07c950c.jpg";
  const [previewImage, setPreviewImage] = useState("");
  const formSchema = z.object({
    name: z
      .string()
      .min(2, "min of 2 character")
      .max(35, "max of 35 character"),
    breed: z
      .string()
      .min(3, "min of 3 character")
      .max(25, "max of 25 character"),
    age: z
      .string()
      .min(1, "age must not be empty")
      .max(25, "too long character"),
    gender: z
      .string()
      .min(4, "pls pick a valid gender")
      .refine(
        (value) => {
          return value === "Male" || value === "Female";
        },
        { message: "pls pick a valid gender" }
      ),
    size: z.string().refine(
      (value) => {
        return value === "Small" || value === "Medium" || value === "Big";
      },
      { message: "pls pick a valid size" }
    ),
    color: z
      .string()
      .min(3, "Color character too short")
      .max(40, "Color character too long"),
    image: z
      .instanceof(File || undefined)
      .refine(
        (values) => {
          return values.size <= 1024 * 1024 * 2;
        },
        { message: "your image is greater the 2MB" }
      )
      .refine(
        (values) => {
          return (
            values.type === "image/jpg" ||
            values.type === "image/jpeg" ||
            values.type === "image/png"
          );
        },
        { message: "image type is not allowed" }
      )
      .refine(
        (values) => {
          return values.type.startsWith("image/");
        },
        { message: "Only image is allowed" }
      ),
    price: z.coerce
      .number()
      .min(1, "Amount is too small")
      .max(100000000, "Amount is too much"),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (value: formSchemaType) => {
    setOffButton(true);
    const { name, age, breed, color, gender, size, price } = value;

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
      const result = await uploadDogs(
        name,
        age,
        breed,
        color,
        gender,
        size,
        price,
        pictureLink
      );
      if (result) {
        toast.success("Dog Upload Successfully");
      } else {
        toast.error("An Error Occured");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
    setOffButton(false);
  };
  return (
    <div id="regback">
      <h1 className="text-center font-semibold text-2xl mt-10 text-mainBlue">
        UPLOAD DOGS
      </h1>
      <p className="text-[0.9rem] text-center mb-5 text-mainBlue">
        Kindly fill in dogs and there details
      </p>
      <div className="md:w-[70%] mx-auto w-full">
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
                    hidden
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
            label="Dog Name"
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
          />
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type="text"
            label="Dog Breed"
            {...register("breed")}
            errorMessage={errors.breed?.message}
            isInvalid={!!errors.breed}
          />
          <Input
            className="border-2 border-slate-200 rounded-xl my-4"
            type="text"
            label="Dog Age"
            {...register("age")}
            errorMessage={errors.age?.message}
            isInvalid={!!errors.age}
          />
          <div className="flex md:flex-row flex-col w-full gap-4">
            <div className="w-full">
              <Select
                label="Select Dog Gender"
                className="w-full border-2 rounded-xl border-slate-200"
                {...register("gender")}
              >
                {Gender.map((dogGender) => (
                  <SelectItem className="text-black" key={dogGender}>{dogGender}</SelectItem>
                ))}
              </Select>
              {errors.gender && (
                <>
                  <span className="text-red-600 text-[0.7rem]">
                    {errors.gender.message}
                  </span>
                </>
              )}
            </div>
            <div className="w-full">
              <Select
                label="Select Dog Size"
                className="w-full border-2 rounded-xl text-black border-slate-200"
                {...register("size")}
              >
                {Sizing.map((dogSizing) => (
                  <SelectItem className="text-black" key={dogSizing}>{dogSizing}</SelectItem>
                ))}
              </Select>
              {errors.size && (
                <>
                  <span className="text-red-600 text-[0.7rem]">
                    {errors.size.message}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex md:flex-row flex-col my-4 gap-4">
            <Input
              className="border-2 border-slate-200 rounded-xl"
              type="text"
              label="Dog Color"
              {...register("color")}
              errorMessage={errors.color?.message}
              isInvalid={!!errors.color}
            />
            <Input
              className="border-2 border-slate-200 rounded-xl"
              type="number"
              label="Dog Price"
              {...register("price")}
              errorMessage={errors.price?.message}
              isInvalid={!!errors.price}
            />
          </div>
          <Button
            disabled={offButton}
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-mainBlue text-white mt-14"
          >
            {offButton ? <Spinner color="warning" /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadDog;
