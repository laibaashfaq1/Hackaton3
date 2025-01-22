'use client';

import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { GoTrophy } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section
                className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('/contact.png')` }}
            ></section>

            {/* Centered Text */}
            <div className="text-center px-6 mt-14">
                <h1 className="text-black font-bold text-3xl mb-4">Get In Touch With Us</h1>
                <p className="text-gray-700 font-normal text-base leading-relaxed">
                    For more information about our products and services, please feel free to drop us an email.
                    Our staff will always be there to help you out. Do not hesitate!
                </p>
            </div>

            {/* Contact Information & Form */}
            <section className="py-12 px-6 md:px-20 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Details */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-5">
                            <IoLocationSharp size={18}/>
                            <div>
                                <h2 className="text-lg font-bold mb-2">Address</h2>
                                <p className="text-gray-700">1234 XYZ Street, Suite 100<br />ABC City, 12345</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <FaPhoneAlt size={15}  />
                            <div>
                                <h2 className="text-lg font-bold mb-2">Phone</h2>
                                <p className="text-gray-700">Mobile: +123-456-7890<br />Office: +987-654-3210</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <IoIosTime size={20}/>
                            <div>
                                <h2 className="text-lg font-bold mb-2">Working Time</h2>
                                <p className="text-gray-700">Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form className="space-y-6 p-6 rounded-lg shadow-md">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-500"
                                    placeholder="Enter the subject"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-500"
                                    placeholder="Write your message"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-md hover:bg-yellow-700 transition w-full"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

             {/* Footer */}
      <footer className="bg-pink-100 py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <GoTrophy size={40} className="mx-auto text-gray-800" />
            <h4 className="font-bold text-gray-800">High Quality</h4>
            <p className="text-gray-600 text-sm">Crafted from top materials</p>
          </div>
          <div>
            <AiOutlineSafetyCertificate
              size={40}
              className="mx-auto text-gray-800"
            />
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
