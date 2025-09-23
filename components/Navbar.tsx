"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { HiBars3BottomRight } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { Button } from "./ui/button";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openBurgerMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <nav
      className={`fixed  top-0 left-0 right-0  border-b border-b-black/10 z-10 ${
        isOpen ? "bg-white" : "bg-white/80"
      }`}
    >
      <div className="2xl:container 2xl:mx-auto   backdrop-blur-md flex p-4 justify-between items-center h-full">
        <h1 className="text-xl font-bold z-50">ArtLoom</h1>
        <ul className="hidden md:flex items-center gap-6 text-lg">
          <li>
            <Link href="/">Products</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <CiShoppingCart className="text-3xl" />
          {isOpen ? (
            <TfiClose onClick={openBurgerMenu} className="text-3xl z-50 p-1" />
          ) : (
            <HiBars3BottomRight
              onClick={openBurgerMenu}
              className="text-3xl z-50 md:hidden"
            />
          )}
          <Button className="hidden md:block">Sign in</Button>
        </div>
        {isOpen && (
          <div className="absolute h-screen mt-12 bg-white  backdrop-blur-sm inset-0 z-20 ">
            <div className="flex flex-col gap-10 p-4 h-full ">
              <ul className="flex flex-col  gap-2 text-lg">
                <li>
                  <Link href="/">Products</Link>
                </li>
                <li>
                  <Link href="/">About</Link>
                </li>
                <li>
                  <Link href="/">Contact</Link>
                </li>
              </ul>
              <Button>Sign in</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
