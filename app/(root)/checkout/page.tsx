"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/context/CartContext";
import CartItems from "@/components/CartItems";
import { CiTrash } from "react-icons/ci";
import "react-phone-number-input/style.css";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { BsCreditCard } from "react-icons/bs";
import { formatMoneyDisplay, addMoney } from "@/lib/utils";
import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";

import axios from "axios";

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

const PUBLIC_KEY = "";
const formSchema = z.object({
  fullname: z.string().min(3),
  phone: z.string().min(3),
  street: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(3),
  //   zip: z.string().min(3),
  address: z.string().min(3),
  country: z.string().min(3),
});
const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const { clearCart, cart } = useCart();
  const deliveryFee = 20;
  const subtotal = cart.reduce((acc, item) => addMoney(acc, item.price), 0);
  const total = addMoney(subtotal, deliveryFee);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      address: "",
      street: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const makePayment = () => {
    if (!window.FlutterwaveCheckout) {
      console.error("FlutterwaveCheckout not loaded yet");
      return;
    }
    try {
      setLoading(true);
      window.FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-a4afdff8027882794a525f2ad6d1b494-X",
        tx_ref: Date.now(),
        amount: total,
        currency: "NGN",
        payment_options: "card,ussd,banktransfer",
        redirect_url: "http://localhost:3000/checkout",
        customer: {
          email: "customer@example.com",
          phone_number: "07000000000",
          name: "John Doe",
        },
        callback: async function (data: any) {
          console.log(data);
          try {
            const res = await axios.post("/api/verify-payment", {
              transaction_id: data.transaction_id,
            });
            console.log("res", res);
            if (res.data.verified) {
              setPaymentVerified(true);
              clearCart();
              // Route back to checkout page immediately after successful verification
              router.push("/checkout");
            }
          } catch (error) {
            console.log("error", error);
          }
        },
        onclose: function () {
          // This will be called when the payment modal is closed
          // The routing is now handled in the callback function above
        },
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return cart.length > 0 ? (
    <div className="flex flex-col gap-10  px-6 pt-20 lg:px-20 w-full">
      <div className="flex items-start">
        <Button onClick={() => router.back()} className="cursor-pointer">
          <MdKeyboardArrowLeft />
          Back
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 ">
        <section className="flex flex-col gap-6 w-full">
          <p className="text-xl font-bold">Enter your shipping details</p>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>

                    <PhoneInputWithCountry
                      name="phoneInputWithCountrySelect"
                      control={form.control}
                      rules={{ required: true }}
                    />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </section>
        <section className="flex flex-col gap-4 w-full">
          <div className="border p-4 rounded-md">
            <div className="flex justify-end">
              <Button
                onClick={clearCart}
                className="flex items-center gap-1 bg-red-600 text-white"
              >
                <CiTrash /> Remove all
              </Button>
            </div>
            <CartItems />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">Subtotal</p>
              <p>{formatMoneyDisplay(subtotal)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">Delivery</p>
              <p>{formatMoneyDisplay(deliveryFee)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">Total</p>
              <p>{formatMoneyDisplay(total)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={makePayment}
              disabled={loading}
              className="flex items-center cursor-pointer p-6 bg-yellow-500 hover:bg-yellow-400 font-bold text-lg text-black justify-center gap-4"
            >
              Pay with Flutterwave
              <BsCreditCard className="text-xl" />
            </Button>
            <Button className="flex items-center p-6 cursor-pointer text-lg font-bold gap-4">
              Pay on delivery
              <CiDeliveryTruck className="text-4xl" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <p className="text-2xl font-bold">No items in cart</p>
      <Link href={"/"}>
        <Button>Back to products</Button>
      </Link>
    </div>
  );
};

export default page;
