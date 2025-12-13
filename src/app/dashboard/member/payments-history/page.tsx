// src/app/dashboard/member/payments-history/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface PaymentType {
  _id: string;
  apartment: {
    aprtno: string;
    flrno: string;
    block: string;
  };
  amount: number;
  status: string;
  receiptUrl?: string;
  paymentDate: string;
}

export default function PaymentHistoryPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<PaymentType[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    axios
      .get(`/api/payments?userId=${session.user.id}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [session]);

  return (
    <div className="min-h-screen py-[120px] w-[1177px] mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {payments.map((p) => (
            <div key={p._id} className="border p-4 rounded-md bg-white shadow-md">
              <p><strong>Apartment:</strong> {p.apartment.aprtno}, {p.apartment.flrno}, Block {p.apartment.block}</p>
              <p><strong>Amount:</strong> ${p.amount}</p>
              <p><strong>Status:</strong> {p.status}</p>
              <p><strong>Payment Date:</strong> {new Date(p.paymentDate).toLocaleString()}</p>
              {p.receiptUrl && (
                <a
                  href={`/api/payments/receipt/${p._id}`}
                  target="_blank"
                  className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Download Receipt
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
