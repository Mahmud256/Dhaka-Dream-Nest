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
}

export default function MemberPage() {
  const { data: session } = useSession();
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMemberAgreements = async () => {
    if (!session?.user?.email) return;

    try {
      const res = await fetch("/api/agreements");
      const data: AgreementType[] = await res.json();

      // filter agreements for current member
      const memberAgreements = data.filter(
        (a) => a.user?.email === session.user.email
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
    fetchMemberAgreements();
  }, [session]);

  return (
    <div className="min-h-screen py-[120px] w-[1177px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Member Profile</h2>
      <p>
        <strong>Name:</strong> {session?.user?.name}
      </p>
      <p>
        <strong>Email:</strong> {session?.user?.email}
      </p>
      <p>
        <strong>Role:</strong> {session?.user?.role}
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-blue-600">
        My Bookings
      </h3>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : agreements.length === 0 ? (
        <p>You have no booked apartments yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {agreements.map((a) => (
            <div
              key={a._id}
              className="p-4 border rounded-md shadow flex flex-col bg-[#f4f9f9]"
            >
              <img
                src={a.apartment.aimage}
                alt={a.apartment.aprtno}
                className="w-full h-40 object-cover rounded mb-3"
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
                  className={`font-semibold ${
                    a.status === "completed"
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
  );
}
