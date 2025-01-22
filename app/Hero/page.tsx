'use client';

import Browse from "../components/Browse";
import Rooms from "../components/Rooms";
import FurnitureGallery from "../components/Furniture";
import Image from "next/image";
import CardManager from "../components/cardManager";

export default function Hero() {
  return (
    <div>
      <Image
        src="/heroimg.jpg"
        alt="Checkout background"
        width={1440}
        height={316}
        priority
        className="w-full object-cover"
      />

      {/* Other Components */}
      <Browse />
      <section>
        <CardManager />
      </section>

      <Rooms />
      <FurnitureGallery />
    </div>
  );
}
