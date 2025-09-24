"use client";
import { artData, ArtData } from "@/lib/utils";
import React, { use } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  //   const [art, setArt] = useState<ArtData | null>(null);
  //   useEffect(() => {
  //     const data = artData.find((art) => art.id === parseInt(id));
  //     if (data) {
  //       setArt(data);
  //     }
  //   }, [id]);
  console.log(id);
  //   if (!art) {
  //     return <div>Art not found</div>;
  //   }
  return <div>page</div>;
};

export default page;
