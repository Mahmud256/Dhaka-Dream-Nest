"use client";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
    {
        id: 1,
        img: "/images/icons-color/1.png",
        title: "Smart Home System",
        desc: "Velit irure occaecat do consectetur dolore officia magna ut anim ut.",
    },
    {
        id: 2,
        img: "/images/icons-color/2.png",
        title: "Solar Energy Panels",
        desc: "Velit irure occaecat do consectetur dolore officia magna ut anim ut.",
    },
    {
        id: 3,
        img: "/images/icons-color/3.png",
        title: "Central Air Conditioning",
        desc: "Velit irure occaecat do consectetur dolore officia magna ut anim ut.",
    },
    {
        id: 4,
        img: "/images/icons-color/4.png",
        title: "Home Security System",
        desc: "Velit irure occaecat do consectetur dolore officia magna ut anim ut.",
    },
];

const HomeOverview = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000 // animation duration (ms)
            // once: true, // only animate once
            // easing: "ease-in-out", // smooth animation
        });
    }, []);

    return (
        <section className="py-20 bg-white text-gray-800 w-full">
            <div className="max-w-[1177px] mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left Side */}
                    <div data-aos="fade-right">
                        <p className="text-[#103c3b] uppercase tracking-wider mb-2 font-medium">
                            Home Overview
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-4 text-[#103c3b]">
                            Luxury living where comfort meets timeless style, effortlessly
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Non anim in pariatur in ex excepteur commodo do officia amet
                            incididunt ullamco nostrud aliquip minim magna esse dolore..
                        </p>
                        <a
                            href="#"
                            className="inline-block bg-[#103c3b] hover:bg-[#145452] transition px-6 py-3 rounded-full font-semibold text-white"
                        >
                            Schedule a Visit
                        </a>
                    </div>

                    {/* Right Side */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        data-aos="fade-left"
                    >
                        {features.map((item, index) => (
                            <div
                                key={item.id}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                className="bg-[#f4f9f9] p-6 rounded-xl hover:bg-[#eaf3f3] transition border border-gray-200"
                            >
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={70}
                                    height={70}
                                    className="mb-4"
                                />
                                <h4 className="text-lg font-semibold mb-2 text-[#103c3b]">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeOverview;
