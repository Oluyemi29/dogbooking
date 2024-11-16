"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Brand from "@/images/dogbrand.png";
import { HiMiniXMark } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import NavbarList from "./NavbarList";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbars = () => {
  const pathname = usePathname()
  
  const { data: session, status } = useSession();

  const [showMenu, setShowMenu] = useState(false);

  const content = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-tiny">
          <Link
            className="text-blue-600 underline underline-offset-2"
            href={"/signin"}
          >
            SignIn
          </Link>{" "}
          /{" "}
          <Link
            className="text-blue-600 underline underline-offset-2"
            href={"/signup"}
          >
            SignUp
          </Link>{" "}
          first
        </div>
      </div>
    </PopoverContent>
  );
  return (
    <div className="shadow-md rounded-br-lg rounded-bl-lg shadow-slate-200">
      <Navbar className="w-full text-mainBlue" shouldHideOnScroll>
          <NavbarBrand >
            <Link className="flex items-center gap-2" href={'/'} >
            <Image
              src={Brand}
              alt="atije"
              width={20}
              height={20}
              className="w-8 h-8"
            />
            <p className="font-bold text-inherit">Atije</p>
            </Link>
          </NavbarBrand>

        <NavbarContent className="hidden  sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname ==="/"?true:false}>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname ==="/dogs"?true:false} >
            <Link href="/dogs">
              Dogs
            </Link>
          </NavbarItem>
          <Popover placement="top-start">
            <PopoverTrigger>
              <NavbarItem isActive={pathname==="/available-dogs"?true:false}>
                <Link
                  color="foreground"
                  href={status === "authenticated" ? "/available-dogs" : "#"}
                >
                  <h1 className="capitalize text-mainBlue">Available Dogs</h1>
                </Link>
              </NavbarItem>
            </PopoverTrigger>
            <div>{status !== "authenticated" && content}</div>
          </Popover>
          <Popover placement="top-start">
            <PopoverTrigger>
              <NavbarItem isActive={pathname==="/favourite"?true:false}>
                <Link
                  color="foreground"
                  href={status === "authenticated" ? "/favourite" : "#"}
                >
                  <h1 className="capitalize text-mainBlue">Favourite</h1>
                </Link>
              </NavbarItem>
            </PopoverTrigger>
            <div>{status !== "authenticated" && content}</div>
          </Popover>
          <Popover placement="top-start">
            <PopoverTrigger>
              <NavbarItem isActive={pathname ==="/reservation"?true:false}>
                <Link
                  color="foreground"
                  href={status === "authenticated" ? "/reservation" : "#"}
                >
                  <h1 className="capitalize text-mainBlue">Reservation</h1>
                </Link>
              </NavbarItem>
            </PopoverTrigger>
            <div>{status !== "authenticated" && content}</div>
          </Popover>
          {status === "authenticated" && session.user.email ==="admin@gmail.com"&& <>
          <NavbarItem isActive={pathname.startsWith("/admin")?true:false}>
            <Link color="foreground" href="/admin/users">
              Admin
            </Link>
          </NavbarItem>
          </>}
        </NavbarContent>




        
        <NavbarContent justify="end">
          {status === "authenticated" ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link className="font-semibold" href="/profile">
                  {/* {userName} */}
                  <h1>Profile</h1>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  className="text-white px-8 bg-red-700"
                  as={Link}
                  color="primary"
                  href="/"
                  variant="flat"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link className="font-semibold" href="/signin">
                  Sign In
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  className="text-white px-8 bg-mainBlue"
                  as={Link}
                  color="primary"
                  href="/signup"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          <div
            className="w-max md:hidden"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {showMenu ? <HiMiniXMark size={25} /> : <IoMenu size={25} />}
          </div>
        </NavbarContent>
      </Navbar>
      <NavbarList showMenu={showMenu} changeMenu={()=>setShowMenu(!showMenu)} />
    </div>
  );
};

export default Navbars;
