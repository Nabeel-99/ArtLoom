import Image from "next/image";
import React from "react";

const ArtCard = ({ image }: { image: string }) => {
  return (
    <div className="relative cursor-pointer aspect-square lg:w-[380px] lg:h-[380px] overflow-hidden rounded-lg border-4">
      <Image
        src={image}
        alt="art"
        width={380}
        height={380}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ArtCard;
