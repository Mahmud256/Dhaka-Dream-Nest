"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const role = session.user.role;
    router.push(`/dashboard/${role}`);
  }, [session, status, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      Redirecting to your dashboard...
    </div>
  );
}
