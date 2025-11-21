"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AgreementManagePage() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Agreements
  const fetchAgreements = async () => {
    try {
      const res = await fetch("/api/agreements");
      const data = await res.json();
      setAgreements(data);
    } catch (error) {
      console.error("Error fetching agreements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  // Update Status
  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/agreements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        Swal.fire("Success", "Agreement status updated!", "success");
        fetchAgreements();
      } else {
        Swal.fire("Error", "Failed to update", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Delete Agreement
  const handleDeleteAgreement = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the agreement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/agreements/${id}`, { method: "DELETE" });

      if (res.ok) {
        Swal.fire("Deleted!", "Agreement removed successfully", "success");
        fetchAgreements();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Agreement Management</h1>

      {agreements.length === 0 ? (
        <p>No agreements found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {agreements.map((ag: any) => (
            <div
              key={ag._id}
              className="p-4 border rounded-md shadow bg-[#0d3b3a]"
            >
              <h2 className="text-xl font-bold text-white">
                Agreement #{ag._id}
              </h2>

              <p className="mt-2 text-gray-200">
                <strong>Member:</strong> {ag.user?.name || "Unknown"}
              </p>

              <p className="text-gray-200">
                <strong>Apartment:</strong> {ag.apartment?.aprtno || "N/A"}
              </p>

              <p className="text-gray-200">
                <strong>Status:</strong> {ag.status}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(ag._id, "approved")}
                  className="px-3 py-1 bg-blue-600 rounded text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleStatusUpdate(ag._id, "completed")}
                  className="px-3 py-1 bg-green-600 rounded text-white"
                >
                  Complete
                </button>

                <button
                  onClick={() => handleDeleteAgreement(ag._id)}
                  className="px-3 py-1 bg-red-600 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
