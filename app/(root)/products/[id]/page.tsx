"use client";
import ArtCard from "@/components/ArtCard";
import { useCart } from "@/components/context/CartContext";
import { Button } from "@/components/ui/button";
import { artData, ArtData, formatMoneyDisplay } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { addToCart } = useCart();
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [art, setArt] = useState<ArtData | null>(null);
  const [relatedArts, setRelatedArts] = useState<ArtData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handleAdd = () => {
    const added = addToCart(art!);
    if (added) {
      toast.success("Added to cart");
    } else {
      toast.error("Item already in cart");
    }
  };
  const fetchMoreItems = () => {
    if (!art) return;

    setTimeout(() => {
      const sameCategoryItems = artData.filter(
        (item) => item.category === art.category && item.id !== art.id
      );

      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const nextItems = sameCategoryItems.slice(startIndex, endIndex);

      if (nextItems.length > 0) {
        setRelatedArts([...relatedArts, ...nextItems]);
        setCurrentPage(currentPage + 1);
      }

      if (startIndex + nextItems.length >= sameCategoryItems.length) {
        setHasMore(false);
      }
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    const data = artData.find((art) => art.id === parseInt(id));
    if (data) {
      setArt(data);

      setRelatedArts([]);
      setCurrentPage(0);
      setHasMore(true);

      const sameCategoryItems = artData.filter(
        (item) => item.category === data.category && item.id !== data.id
      );

      if (sameCategoryItems.length > 0) {
        const initialItems = sameCategoryItems.slice(0, itemsPerPage);
        setRelatedArts(initialItems);
        setCurrentPage(1);

        if (initialItems.length >= sameCategoryItems.length) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }

      setLoading(false);
    }
  }, [id]);

  if (!art) {
    return <div>Art not found</div>;
  }
  return loading ? (
    <div className="flex justify-center items-center">Loading...</div>
  ) : (
    <div className="flex flex-col gap-10  px-6 pt-20 lg:px-20 w-full">
      <div className="flex items-start">
        <Button onClick={() => router.back()} className="cursor-pointer">
          <MdKeyboardArrowLeft />
          Back
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="aspect-square lg:w-1/2 lg:h-auto overflow-hidden border-4 rounded-xl">
          <Image
            src={art.image}
            width={380}
            height={380}
            className="object-cover w-full h-full"
            alt={`${art.title}`}
          />
        </div>
        <div className="flex flex-col gap-2 lg:w-1/2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-2xl">{art.title}</h3>
            <div className="border flex items-center justify-center rounded-xl p-1 px-2 text-sm  bg-[#282828] text-white">
              <span>{art.category}</span>
            </div>
          </div>
          <p className="font-medium">{formatMoneyDisplay(art.price)}</p>
          <p className="font-medium">Artist</p>
          <p>{art.artist}</p>
          <p className="font-medium">Description</p>
          <p>{art.description}</p>
          <Button onClick={handleAdd} className="mt-6 py-6 cursor-pointer">
            Add to Cart
          </Button>
        </div>
      </div>

      {/* related arts */}
      {relatedArts.length > 0 && (
        <div className="flex flex-col gap-10">
          <p className="text-3xl font-bold">People also like...</p>
          <InfiniteScroll
            dataLength={relatedArts.length}
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
              {relatedArts.map((relatedArt, index) => (
                <Link
                  href={`/products/${relatedArt.id}`}
                  key={index}
                  className="flex flex-col lg:w-[380px]   gap-4"
                >
                  <ArtCard key={index} image={relatedArt.image} />
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col">
                      <h3 className="font-medium">{relatedArt.title}</h3>
                      <p className="">{formatMoneyDisplay(relatedArt.price)}</p>
                    </div>
                    <div className="border flex items-center justify-center rounded-xl p-1 px-2 text-sm  bg-[#282828] text-white">
                      <span>{relatedArt.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default page;
