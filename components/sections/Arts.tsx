"use client";

import { artData, artImages, formatMoneyDisplay } from "@/lib/utils";
import React, { useState } from "react";
import ArtCard from "../ArtCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

const Arts = () => {
  const [items, setItems] = useState(artData.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreItems = () => {
    setTimeout(() => {
      const nextItems = artData.slice(items.length, items.length + 6);
      setItems([...items, ...nextItems]);
      if (items.length + nextItems.length >= artData.length) {
        setHasMore(false);
      }
    }, 1000);
  };
  return (
    <section className="flex flex-col  gap-10 2xl:container 2xl:mx-auto">
      <div className="flex items-center gap-4">
        <button>All</button>
        <button>Painting</button>
        <button>Digital</button>
        <button>Realism</button>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreItems}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-black" />
          </div>
        }
        scrollableTarget="window"
      >
        <div className="grid lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-10 w-full">
          {items.map((art, index) => (
            <Link
              href={`/products/${art.id}`}
              key={index}
              className="flex flex-col lg:w-[380px]   gap-4"
            >
              <ArtCard key={index} image={art.image} />
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <h3 className="font-medium">{art.title}</h3>
                  <p className="">{formatMoneyDisplay(art.price)}</p>
                </div>
                <div className="border flex items-center justify-center rounded-xl p-1 px-2 text-sm  bg-[#282828] text-white">
                  <span>{art.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Arts;
