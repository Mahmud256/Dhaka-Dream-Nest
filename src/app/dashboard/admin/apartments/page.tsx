"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface ApartmentType {
  _id: string;
  aimage: string;
  aprtno: string;
  flrno: string;
  block: string;
  rent: number;
}

const ApartmentsAdmin: React.FC = () => {
  const [apartments, setApartments] = useState<ApartmentType[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/apartments")
      .then((res) => setApartments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (apt: ApartmentType) => {
    router.push(`/dashboard/admin/apartments/update?id=${apt._id}`);
  };

  const handleDelete = async (apt: ApartmentType) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete Apartment ${apt.aprtno}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await axios.delete(`/api/apartments/${apt._id}`);
    Swal.fire("Deleted!", "Apartment has been removed", "success");
    setApartments((prev) => prev.filter((a) => a._id !== apt._id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#103c3b]">🏢 Apartment Management Dashboard</h1>
        <p className="text-gray-600 mt-2">View, update & delete apartments from the system</p>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {apartments.map((apt) => (
          <div
            key={apt._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <img
              src={apt.aimage}
              alt={apt.aprtno}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="bg-[#103c3b] text-white rounded-full p-2 mr-2">
                  🏠
                </div>
                <h2 className="text-lg font-bold">Apartment {apt.aprtno}</h2>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="space-y-1">
                <p><strong>Floor:</strong> {apt.flrno}</p>
                <p><strong>Block:</strong> {apt.block}</p>
                <span className="inline-block mt-1 bg-blue-500 text-white px-3 py-1 rounded text-sm">
                  ৳{apt.rent} / month
                </span>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <button
                onClick={() => handleUpdate(apt)}
                className="bg-blue-100 hover:bg-blue-200 p-2 rounded"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(apt)}
                className="bg-red-100 hover:bg-red-200 p-2 rounded"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentsAdmin;
