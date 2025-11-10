"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { LogOut, LayoutDashboard, User, Users, Home } from "lucide-react";
import AuthProvider from "../providers/AuthProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return;
        if (!session?.user) router.push("/login");
    }, [session, status, router]);

    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <AuthProvider>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-[#103c3b] text-white flex flex-col p-5 space-y-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-[#14524f] ${pathname === "/dashboard" ? "bg-[#14524f]" : ""}`}
                    >
                        <LayoutDashboard size={18} /> Overview
                    </Link>
                    <Link
                        href="/"
                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-[#14524f]`}
                    >
                        <Home size={18} /> Home
                    </Link>

                    {/* Role-based navigation */}
                    {session?.user?.role === "admin" && (
                        <Link
                            href="/dashboard/admin"
                            className={`flex items-center gap-2 p-2 rounded-md hover:bg-[#14524f] ${pathname === "/dashboard/admin" ? "bg-[#14524f]" : ""}`}
                        >
                            <Users size={18} /> Admin Panel
                        </Link>
                    )}

                    {session?.user?.role === "member" && (
                        <Link
                            href="/dashboard/member"
                            className={`flex items-center gap-2 p-2 rounded-md hover:bg-[#14524f] ${pathname === "/dashboard/member" ? "bg-[#14524f]" : ""}`}
                        >
                            <User size={18} /> Member Area
                        </Link>
                    )}

                    {session?.user?.role === "user" && (
                        <Link
                            href="/dashboard/user"
                            className={`flex items-center gap-2 p-2 rounded-md hover:bg-[#14524f] ${pathname === "/dashboard/user" ? "bg-[#14524f]" : ""}`}
                        >
                            <User size={18} /> User Profile
                        </Link>
                    )}

                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-red-600 mt-auto bg-red-500"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-md shadow">
                        <h1 className="text-xl font-semibold">
                            Welcome, <span className="capitalize">{session?.user?.role}</span>
                        </h1>
                        <p className="text-gray-500">{session?.user?.email}</p>
                    </div>

                    {/* Page content */}
                    <div className="bg-white p-6 rounded-md shadow">{children}</div>
                </main>
            </div>
        </AuthProvider>
    );
}
