"use client";

import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, Button, Box } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import "aos/dist/aos.css";
import { useSession } from "next-auth/react";

interface ApartmentType {
  _id: string;
  aimage: string;
  aprtno: string;
  flrno: string;
  block: string;
  rent: number;
}

const ApartmentPage: React.FC = () => {
  const [apartments, setApartments] = useState<ApartmentType[]>([]);
  const [agreements, setAgreements] = useState<any[]>([]);

  const { data: session } = useSession();

  // Initialize AOS
  useEffect(() => {
    import("aos").then((module) => {
      module.default.init({ duration: 1000, once: true });
    });
  }, []);

  // Fetch Apartments
  useEffect(() => {
    axios
      .get("/api/apartments")
      .then((res) => setApartments(res.data))
      .catch(() => {});
  }, []);

  // Fetch Agreements
  useEffect(() => {
    axios
      .get("/api/agreements")
      .then((res) => setAgreements(res.data))
      .catch(() => {});
  }, []);

  // 🔥 Corrected: apartment is booked if some agreement has ag.apartment._id === aptId
  const isBooked = (aptId: string) => {
    return agreements.some((a) => a.apartment?._id === aptId);
  };

  // 🔥 Corrected: user has agreement if ag.user._id === logged-in user id
  const userHasAgreement = () => {
    if (!session?.user?.id) return false;

    return agreements.some((a) => a.user?._id === session.user.id);
  };

  // Handle Agreement
  const handleAgreement = async (apt: ApartmentType) => {
    // only members can make agreement
    if (session?.user?.role !== "member") {
      return Swal.fire("Access Denied", "Only members can make an agreement!", "error");
    }

    // one apartment per user
    if (userHasAgreement()) {
      return Swal.fire("Limit Reached", "You have already booked 1 apartment!", "warning");
    }

    Swal.fire({
      title: "Confirm Agreement",
      text: `Do you want to make an agreement for Apartment ${apt.aprtno}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("/api/agreements", {
            userId: session.user.id,
            apartmentId: apt._id,
          });

          Swal.fire({
            icon: "success",
            title: `Agreement confirmed for ${apt.aprtno}`,
            showConfirmButton: false,
            timer: 1500,
          });

          // refresh agreements
          const res = await axios.get("/api/agreements");
          setAgreements(res.data);
        } catch (err: any) {
          Swal.fire("Error", err.response?.data?.message || "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <section className="bg-[#656566]">
      <Box className="min-h-screen py-[120px] w-[1177px] mx-auto">
        <h2
          className="text-3xl font-bold text-[#eaf8f8] mb-10 flex items-center justify-center"
          data-aos="fade-up"
        >
          Available Apartments
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {apartments.map((apt, index) => {
            const isEven = index % 2 === 0;

            return (
              <Card
                key={apt._id}
                data-aos={isEven ? "flip-left" : "flip-right"}
                style={{ backgroundColor: "#f4f9f9" }}
                className="group overflow-hidden"
              >
                <div className="flex flex-col">
                  <CardMedia
                    component="img"
                    image={apt.aimage}
                    alt={apt.aprtno}
                    className="w-full h-60 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />

                  <div className="p-6 flex flex-col gap-3 text-gray-800">
                    <Typography variant="h6" className="font-semibold text-[#4f46e5]">
                      Dhaka Dream Nest
                    </Typography>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <Typography>Apartment No: {apt.aprtno}</Typography>
                      <Typography>Floor No: {apt.flrno}</Typography>
                      <Typography>Block: {apt.block}</Typography>
                      <Typography>Rent: ${apt.rent}</Typography>
                    </div>

                    {/* Button Logic */}
                    {isBooked(apt._id) ? (
                      <Button variant="contained" color="warning" disabled className="mt-4">
                        Booked
                      </Button>
                    ) : session?.user?.role === "member" && !userHasAgreement() ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAgreement(apt)}
                        className="mt-4"
                      >
                        Agreement
                      </Button>
                    ) : (
                      <Button variant="contained" disabled className="mt-4">
                        Not Available
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Box>
    </section>
  );
};

export default ApartmentPage;
