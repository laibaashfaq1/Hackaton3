
import Browse from "../components/Browse";
import Rooms from "../components/Rooms";
import FurnitureGallery from "../components/Furniture";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import CardManager from "../components/cardManager";


export default async function Hero () {
  const query=`*[_type=='product'][0..5]{
      _id,
        title,
        description,
        price,
        productImage,
        tags,
        discountpercentage,
        isNew,
        slug
    }`;
  const product:Product[] = await client.fetch(query);
  return (
    <div>
      <Image
              src="/heroimg.jpg"
              alt="Checkout background"
              width={1440}
              height={316}
              priority
              className="w-full object-cover"/>

      {/* Other Components */}
      <Browse />
      <section>
        {product.map((product:Product) => (
          <CardManager product={product} key={product._id}/>
        ))}
      </section>
    
    <Rooms />
    <FurnitureGallery />
    </div>
  );
};

