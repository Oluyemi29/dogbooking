"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
type childProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: childProps) => {
  return (
    <div>
      <NextUIProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextUIProvider>
    </div>
  );
};

export default AppProvider;
