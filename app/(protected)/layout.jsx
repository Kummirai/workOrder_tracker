"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (!authStatus) {
      router.replace("/"); // Redirect to login page
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
