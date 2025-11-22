"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AgreementType {
  _id: string;
  apartment: {
    _id: string;
    aprtno: string;
    flrno: string;
    block: string;
    rent: number;
    aimage: string;
  };
  status: string;
  // Optional user info if your API provides it
  user?: {
    name: string;
    email: string;
  };
}

export default function MemberPage() {
  const { data: session } = useSession();
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMemberAgreements = async () => {
    try {
      const res = await fetch("/api/agreements");
      const data: AgreementType[] = await res.json();

      // Filter agreements for current member if user info exists
      const memberAgreements = data.filter(
        (a) => a.user?.email === session?.user?.email
      );

      setAgreements(memberAgreements);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load agreements", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchMemberAgreements();
    }
  }, [session]);

  return (
    <div className="min-h-screen py-28 px-4 md:px-20 lg:px-32 bg-gray-50">
      {/* Profile Info */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Member Profile
        </h2>
        <p>
          <strong>Name:</strong> {session?.user?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {session?.user?.email || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {session?.user?.role || "N/A"}
        </p>
      </div>

      {/* Bookings */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-blue-600">
          My Bookings
        </h3>

        {loading ? (
          <p>Loading your bookings...</p>
        ) : agreements.length === 0 ? (
          <p>You have no booked apartments yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agreements.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <img
                  src={a.apartment.aimage}
                  alt={`Apartment ${a.apartment.aprtno}`}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <p>
                  <strong>Apartment No:</strong> {a.apartment.aprtno}
                </p>
                <p>
                  <strong>Floor No:</strong> {a.apartment.flrno}
                </p>
                <p>
                  <strong>Block:</strong> {a.apartment.block}
                </p>
                <p>
                  <strong>Rent:</strong> ${a.apartment.rent}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${a.status === "completed"
                        ? "text-green-600"
                        : a.status === "approved"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                  >
                    {a.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
