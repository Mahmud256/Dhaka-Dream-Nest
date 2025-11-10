"use client";
import { useSession } from "next-auth/react";


export default function UserPage() {
    const { data: session } = useSession();
    return <div className="min-h-screen py-[120px] w-[1177px] mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-green-600">User Profile</h2>
        <p><strong>Name:</strong> {session?.user?.name}</p>
        <p><strong>Email:</strong> {session?.user?.email}</p>
        <p><strong>Role:</strong> {session?.user?.role}</p>

        <div className="mt-6">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
                Upgrade to Member
            </button>
        </div>
    </div>;
}

