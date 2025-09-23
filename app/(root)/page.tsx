"use client";

import Arts from "@/components/sections/Arts";
import Hero from "@/components/sections/Hero";
import React from "react";

const page = () => {
  return (
    <div className="flex pt-10 overflow-x-hidden flex-col px-4 lg:px-10 gap-20 w-full 2xl:container 2xl:mx-auto h-full">
      {/* hero */}
      <Hero />
      {/* Arts  */}
      <Arts />
    </div>
  );
};

export default page;
