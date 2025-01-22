'use client';

import Link from "next/link";
import { GoTrophy } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

export default function PCompare() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section
                className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('/productcomp.png')` }}
            >
            </section>

            {/* Product Comparison Section */}
            <div className="py-12 px-6 md:px-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Header Row */}
                    <div className="flex flex-wrap justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-black">
                                Go to Product page for more Products
                            </h3>
                            <Link href="/Shop">
                                <p className="text-gray-400 font-medium hover:underline mt-2">
                                    View More
                                </p>
                            </Link>
                        </div>

                        {/* Product Cards */}
                        <div className="flex flex-wrap gap-4">
                            {/* Product 1 */}
                            <div className="bg-white p-4 rounded-md shadow-md w-full sm:w-60">
                                <Link href="/SingleProduct">
                                    <img
                                        src="/Group 160.png"
                                        alt="Asgaard Sofa"
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                </Link>
                                <h3 className="text-lg font-bold mb-2">Asgaard Sofa</h3>
                                <p className="text-gray-400">Rs. 250,000.00</p>
                                <p className="text-gray-400">4.7 Reviews</p>
                            </div>

                            {/* Product 2 */}
                            <div className="bg-white p-4 rounded-md shadow-md w-full sm:w-60">
                                <Link href="/SingleProduct">
                                    <img
                                        src="/Group 157.png"
                                        alt="Outdoor Sofa Set"
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                </Link>
                                <h3 className="text-lg font-bold mb-2">Outdoor Sofa Set</h3>
                                <p className="text-gray-400">Rs. 224,000.00</p>
                                <p className="text-gray-400">4.2 Reviews</p>
                            </div>
                        </div>

                        {/* Add Product Button */}
                        <div className="mt-4 w-full sm:w-auto">
                            <p className="font-bold text-xl text-black mb-2">Add A Product</p>
                            <Link href="/Shop">
                                <button className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-md hover:bg-yellow-700 transition">
                                    Choose a Product
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Product Comparison Table */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Left Column (Headers) */}
                        <div className="p-6 rounded-md shadow-md">
                            <h2 className="text-xl font-bold mb-6">General</h2>
                            <div className="space-y-4">
                                <p>Sales Package</p>
                                <p>Model Number</p>
                                <p>Secondary Material</p>
                                <p>Configuration</p>
                                <p>Upholstery Material</p>
                                <p>Upholstery Color</p>
                            </div>

                            <h2 className="text-xl font-bold mt-24 mb-6">Product</h2>
                            <div className="space-y-4">
                                <p>Filling Material</p>
                                <p>Finish Type</p>
                                <p>Adjustable Headrest</p>
                                <p>Maximum Load Capacity</p>
                                <p>Origin of Manufacture</p>
                            </div>

                            <h2 className="text-xl font-bold mt-24 mb-6">Dimensions</h2>
                            <div className="space-y-4">
                                <p>Width</p>
                                <p>Height</p>
                                <p>Depth</p>
                                <p>Weight</p>
                                <p>Seat Height</p>
                                <p>Leg Height</p>
                            </div>

                            <h2 className="text-xl font-bold mt-24 mb-6">Warranty</h2>
                            <div className="space-y-4">
                                <p>Warranty Summary</p>
                                <p>Warranty Service Type</p>
                                <p>Covered in Warranty</p>
                                <p>Not Covered in Warranty</p>
                                <p>Warranty Period</p>
                            </div>
                        </div>

                        {/* Center Column (Product 1 Details) */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <div className="space-y-4 mt-14">
                                <p>1 Sectional Sofa</p>
                                <p>TFCBLIGRBL6SRHS</p>
                                <p>Solid Wood</p>
                                <p>L-shaped</p>
                                <p>Fabric + Cotton</p>
                                <p>Bright Grey & Lion</p>
                            </div>
                            <div className="space-y-4 mt-36">
                                <p>Foam</p>
                                <p>Bright Grey & Lion</p>
                                <p>No</p>
                                <p>280 KG</p>
                                <p>India</p>
                            </div>
                            <div className="space-y-4 mt-40">
                                <p>265.32 cm</p>
                                <p>76 cm</p>
                                <p>167.76 cm</p>
                                <p>45 KG</p>
                                <p>41.52 cm</p>
                                <p>5.46 cm</p>
                            </div>
                            <div className="space-y-4 mt-36">
                                <p>1 Year Manufacturing Warranty</p>
                                <p>Email: operations@trevifurniture.com</p>
                                <p>Warranty Against Manufacturing Defect</p>
                                <p>Does Not Cover Wear & Tear</p>
                                <p>1 Year</p>
                               {/* Addtocart button */}
                                    <Link href="/Cart">
                                        <button className="bg-yellow-600 text-white px-6 py-2 ml-1 mt-10">
                                            Add to Cart
                                        </button>
                                    </Link>
                                
                            </div>
                        </div>

                        {/* Center Column (Product 2 Details) */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <div className="space-y-4 mt-14">
                                <p>1 Three Seater, 2 Single Seater</p>
                                <p>DTUBLIGRBL568</p>
                                <p>Solid Wood</p>
                                <p>L-shaped</p>
                                <p>Fabric + Cotton</p>
                                <p>Bright Grey & Lion</p>
                            </div>
                            <div className="space-y-4 mt-36">
                                <p>Matte</p>
                                <p>Bright Grey & Lion</p>
                                <p>Yes</p>
                                <p>300 KG</p>
                                <p>India</p>
                            </div>
                            <div className="space-y-4 mt-40">
                                <p>265.32 cm</p>
                                <p>76 cm</p>
                                <p>167.76 cm</p>
                                <p>65 KG</p>
                                <p>41.52 cm</p>
                                <p>5.46 cm</p>
                            </div>
                            <div className="space-y-4 mt-36">
                                <p>1.2 Year Manufacturing Warranty</p>
                                <p>Email: support@xyz.com</p>
                                <p>Warranty for Manufacturing Defect</p>
                                <p>Does Not Cover Wear & Tear</p>
                                <p>3 Months</p>
                                {/* Addtocart Button */}
                                    <Link href="/Cart">
                                        <button className="bg-yellow-600 text-white px-6 py-2 mt-16">
                                            Add to Cart
                                        </button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-pink-100 py-8">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <GoTrophy size={40} className="mx-auto text-gray-800" />
                        <h4 className="font-bold text-gray-800">High Quality</h4>
                        <p className="text-gray-600 text-sm">Crafted from top materials</p>
                    </div>
                    <div>
                        <AiOutlineSafetyCertificate size={40} className="mx-auto text-gray-800" />
                        <h4 className="font-bold text-gray-800">Warranty Protection</h4>
                        <p className="text-gray-600 text-sm">Over 2 years</p>
                    </div>
                    <div>
                        <MdOutlineLocalShipping size={40} className="mx-auto text-gray-800" />
                        <h4 className="font-bold text-gray-800">Free Shipping</h4>
                        <p className="text-gray-600 text-sm">Orders over $50</p>
                    </div>
                    <div>
                        <RiCustomerService2Line size={40} className="mx-auto text-gray-800" />
                        <h4 className="font-bold text-gray-800">24/7 Support</h4>
                        <p className="text-gray-600 text-sm">Dedicated support</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
