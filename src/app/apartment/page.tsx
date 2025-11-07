"use client";

import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, Button, Box } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import AOS from "aos";

interface ApartmentType {
    _id: string;
    aimage: string;
    aprtno: string;
    flrno: string;
    block: string;
    rent: number;
    role?: string;
}

const ApartmentPage: React.FC = () => {
    const [apartments, setApartments] = useState<ApartmentType[]>([]);

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        axios
            .get("/api/apartments")
            .then((res) => setApartments(res.data))
            .catch(() => {
                // Fallback mock data
                setApartments([
                    {
                        _id: "1",
                        aimage: "/images/rooms/l1.webp",
                        aprtno: "A-101",
                        flrno: "1st Floor",
                        block: "A",
                        rent: 1200,
                    },
                    {
                        _id: "2",
                        aimage: "/images/rooms/l2.webp",
                        aprtno: "B-202",
                        flrno: "2nd Floor",
                        block: "B",
                        rent: 1400,
                    },
                    {
                        _id: "3",
                        aimage: "/images/rooms/l3.webp",
                        aprtno: "C-303",
                        flrno: "3rd Floor",
                        block: "C",
                        rent: 1800,
                    },
                    {
                        _id: "4",
                        aimage: "/images/rooms/l4.webp",
                        aprtno: "D-404",
                        flrno: "4th Floor",
                        block: "D",
                        rent: 2000,
                    },
                ]);
            });
    }, []);

    const handleAgreement = (room: ApartmentType) => {
        Swal.fire({
            title: "Agreement Confirm",
            text: `Do you want to make an agreement for Apartment ${room.aprtno}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: `Agreement confirmed for Apartment ${room.aprtno}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <Box className="min-h-screen py-[120px] w-[1177px] mx-auto">
            <Typography
                variant="h2"
                align="center"
                className="text-4xl font-extrabold text-[#103c3b] pb-10"
                data-aos="fade-up"
            >
                Available Apartments
            </Typography>

            <div className="grid md:grid-cols-2 gap-6">
                {apartments.map((room, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <Card
                            key={room._id}
                            data-aos={isEven ? "flip-left" : "flip-right"}
                            style={{ backgroundColor: "#f4f9f9" }}
                            className="group overflow-hidden"
                        >
                            <div className="flex flex-col">
                                {/* Image */}
                                <CardMedia
                                    component="img"
                                    image={room.aimage}
                                    alt={room.aprtno}
                                    className="w-full h-60 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />

                                {/* Content */}
                                <div className="p-6 flex flex-col gap-3 text-gray-800">
                                    <Typography variant="h6" className="font-semibold text-[#4f46e5]">
                                        Dhaka Dream Nest
                                    </Typography>

                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <Typography>Apartment No: {room.aprtno}</Typography>
                                        <Typography>Floor No: {room.flrno}</Typography>
                                        <Typography>Block: {room.block}</Typography>
                                        <Typography>Rent: ${room.rent}</Typography>
                                    </div>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAgreement(room)}
                                        className="mt-4"
                                    >
                                        Agreement
                                    </Button>
                                </div>
                            </div>
                        </Card>

                    );
                })}
            </div>
        </Box>
    );
};

export default ApartmentPage;