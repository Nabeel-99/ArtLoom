"use client";

import Image from "next/image";
import React from "react";
import { TfiClose } from "react-icons/tfi";
import { useCart } from "./context/CartContext";
import { formatMoneyDisplay } from "@/lib/utils";

const CartItems = () => {
  const { cart, removeFromCart } = useCart();
  return (
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
              <p>{formatMoneyDisplay(item.price)}</p>
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
  );
};

export default CartItems;
