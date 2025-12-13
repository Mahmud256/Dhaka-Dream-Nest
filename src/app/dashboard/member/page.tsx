// src/app/dashboard/member/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

interface ApartmentType {
  _id: string;
  aimage: string;
  aprtno: string;
  flrno: string;
  block: string;
  rent: number;
}

interface AgreementType {
  _id: string;
  apartment: ApartmentType | string;
  user?: { _id: string } | string;
  status: "pending" | "completed" | "cancelled";
}

export default function MemberPage() {
  const { data: session } = useSession();
  const [agreements, setAgreements] = useState<AgreementType[]>([]);

  // Fetch agreements for the logged-in user
  const fetchAgreements = async () => {
    if (!session?.user?.id) return;

    try {
      const res = await axios.get(`/api/agreements`);
      // Only set agreements for current user (server returns all agreements)
      const filtered: AgreementType[] = res.data.filter((a: any) => {
        if (!a.user) return false;
        const maybeId = typeof a.user === "string" ? a.user : a.user._id || a.user.id;
        return maybeId === session.user.id;
      });

      setAgreements(filtered);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch bookings", "error");
    }
  };

  // Handle Stripe redirect after payment
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const success = query.get("success");
    const apartmentId = query.get("apartmentId");
    const userId = query.get("userId");

    if (success === "true" && apartmentId && userId) {
      // Confirm payment and create agreement
      axios
        .post("/api/payments/confirm", { apartmentId, userId })
        .then((res) => {
          if (res.data.agreement) {
            Swal.fire("Success", "Apartment booked successfully!", "success").then(() => {
              fetchAgreements();
            });
            // Remove query params to prevent re-triggering
            try {
              const url = new URL(window.location.href);
              url.search = "";
              window.history.replaceState({}, document.title, url.toString());
            } catch (e) {
              // ignore
            }
          } else {
            Swal.fire("Error", res.data.message || "Booking failed", "error");
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire("Error", "Failed to confirm payment", "error");
        });
    } else if (success === "false") {
      Swal.fire("Payment failed", "No agreement created", "error");
      try {
        const url = new URL(window.location.href);
        url.search = "";
        window.history.replaceState({}, document.title, url.toString());
      } catch (e) { }
    }
  }, [session]);

  // Fetch agreements on session load
  useEffect(() => {
    fetchAgreements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

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

      <h3 className="text-xl font-bold mt-8 mb-4">My Bookings</h3>
      {agreements.length === 0 ? (
        <p>No apartments booked yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {agreements.map((ag) => {
            const apt = (typeof ag.apartment === "string" ? null : ag.apartment) as ApartmentType | null;
            return (
              <div key={ag._id} className="border p-4 rounded-md bg-white shadow-md">
                {apt && (
                  <img
                    src={apt.aimage}
                    alt={apt.aprtno}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <p>
                  <strong>Apartment No:</strong> {apt?.aprtno ?? "N/A"}
                </p>
                <p>
                  <strong>Floor No:</strong> {apt?.flrno ?? "N/A"}
                </p>
                <p>
                  <strong>Block:</strong> {apt?.block ?? "N/A"}
                </p>
                <p>
                  <strong>Rent:</strong> ${apt?.rent ?? "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      ag.status === "pending"
                        ? "text-yellow-500"
                        : ag.status === "completed"
                          ? "text-green-600"
                          : "text-red-500"
                    }
                  >
                    {ag.status}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
