"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const FloorPlanPage: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const rooms = [
        { name: "Living Room", size: "20 m²" },
        { name: "Dining Room", size: "15 m²" },
        { name: "Kitchen", size: "15 m²" },
        { name: "Master Bedroom", size: "16 m²" },
        { name: "Kids Bedroom 1", size: "12 m²" },
        { name: "Kids Bedroom 2", size: "12 m²" },
        { name: "Bath Room", size: "6 m²" },
        { name: "Garage", size: "40 m²" },
        { name: "Warehouse", size: "4 m²" },
    ];

    const stats = [
        { title: "Size", icon: "/images/svg/size.svg", value: "1665 sqft" },
        { title: "Beds", icon: "/images/svg/bed.svg", value: "5" },
        { title: "Baths", icon: "/images/svg/bath.svg", value: "5" },
        { title: "Parking Slots", icon: "/images/svg/car.svg", value: "5" },
    ];

    return (
        <section id="section-floorplan" className="bg-[#103c3b] text-white py-28">
            <div className="w-[1177px] mx-auto">
                {/* Top Section */}
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left Content */}
                    <div data-aos="fade-right">
                        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                            Discover
                        </p>
                        <h2 className="text-4xl font-bold mb-4">Home Floorplans</h2>
                        <p className="text-gray-400 mb-8">
                            Dolor ad consectetur dolore incididunt pariatur aliqua ut laborum
                            aliquip eiusmod officia tempor ex commodo amet voluptate.
                        </p>

                        <div className="border border-gray-800 rounded-xl overflow-hidden">
                            {rooms.map((room, i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between px-4 py-2 ${i % 2 === 0 ? "bg-[#141414]" : "bg-[#1c1c1c]"
                                        }`}
                                >
                                    <span>{room.name}</span>
                                    <span className="font-semibold">{room.size}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image Gallery */}
                    <div
                        className="flex flex-col gap-6"
                        data-aos="fade-left"
                    >
                        <Image
                            src="/images/misc/floorplan-2-color.webp"
                            alt="Floorplan 1"
                            width={1200}
                            height={800}
                            className="w-full rounded-lg shadow-lg object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Spacer */}
                <div className="my-20"></div>

                {/* Bottom Stats */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    data-aos="fade-up"
                >
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#1a1a1a] p-6 rounded-xl text-center shadow-md hover:bg-[#222] transition duration-300"
                        >
                            <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                            <div className="flex justify-center items-center gap-3">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                                <p className="text-lg">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FloorPlanPage;
