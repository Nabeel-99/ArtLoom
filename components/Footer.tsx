import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="border-t mt-20">
      <div className="px-4 lg:px-20 2xl:container 2xl:mx-auto  pb-20  pt-10 lg:pt-20 w-full flex flex-col gap-10 lg:gap-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col  w-full">
            <p className="font-bold text-xl">ArtLoom</p>
            <p>Your new destination for timeless art.</p>
          </div>
          <div className="p-6 border rounded-lg flex flex-col w-full gap-3">
            <p>Join our mailing list</p>
            <p>Get notified about new arrivals as soon as they drop</p>
            <div className="flex items-center gap-3">
              <Input placeholder="Email Address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-black/80">Contact Us</p>
            <p className="">Products</p>
            <p className="">About</p>
            <p>Create Account</p>
          </div>
          <p className="text-sm text-center">&copy; Copyright 2025 ArtLoom</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
