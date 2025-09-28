"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { HiBars3BottomRight } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useCart } from "./context/CartContext";
import Image from "next/image";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openBurgerMenu = () => setIsOpen(!isOpen);
  const { cart, removeFromCart } = useCart();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  console.log("cart", cart);
  return (
    <nav
      className={`fixed  top-0 left-0 right-0  border-b border-b-black/10 z-10 ${
        isOpen ? "bg-white" : "bg-white/80"
      }`}
    >
      <div className="2xl:container 2xl:mx-auto   backdrop-blur-md flex p-4 justify-between items-center h-full">
        <Link href={"/"} className="text-xl font-bold z-50">
          ArtLoom
        </Link>
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
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="relative cursor-pointer ">
                <CiShoppingCart className="text-3xl" />
                <div className="absolute -top-1 -right-2 text-sm">
                  {cart.length}
                </div>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cart Items</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4  h-full overflow-y-scroll hide-scrollbar">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between ${
                      index === cart.length - 1 ? "border-b-0" : "border-b "
                    } py-2`}
                  >
                    <div className="flex gap-2">
                      <div className="aspect-square overflow-hidden border-2 rounded-lg">
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={`${item.title}`}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium text-lg">{item.title}</p>
                        <p>${item.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      type="button"
                      className="cursor-pointer"
                    >
                      <TfiClose /> <span className="sr-only">remove</span>
                    </button>
                  </div>
                ))}
              </div>
              <SheetFooter>
                <Button type="submit">Proceed to checkout</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

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
          <div className="absolute h-screen mt-20 bg-white  backdrop-blur-sm inset-0 z-20 ">
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
