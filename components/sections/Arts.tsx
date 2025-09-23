import { artImages } from "@/lib/utils";
import React from "react";
import ArtCard from "../ArtCard";

const Arts = () => {
  return (
    <section className="flex flex-col gap-10 2xl:container 2xl:mx-auto">
      <div className="flex items-center gap-4">
        <button>All</button>
        <button>Painting</button>
        <button>Digital</button>
        <button>Realism</button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-10">
        {artImages.map((image, index) => (
          <ArtCard key={index} image={image} />
        ))}
      </div>
    </section>
  );
};

export default Arts;
