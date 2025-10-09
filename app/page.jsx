"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    if (authStatus) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/pin");
      const { pin: correctPin } = await response.json();
      if (pin === correctPin) {
        sessionStorage.setItem("isAuthenticated", "true");
        router.push("/dashboard");
      } else {
        alert("Incorrect PIN");
        setPin("");
      }
    } catch (error) {
      alert("Error verifying PIN. Please try again.");
      setPin("");
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form onSubmit={handlePinSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center text-gray-800">Welcome</h1>
            <p className="text-center text-gray-500">Enter your PIN to continue</p>
          </div>
          <InputField
            fieldtype="password"
            fieldLabel="PIN"
            htmlFor="pin"
            placeholder="****"
            handleChange={(e) => setPin(e.target.value)}
            inputValue={pin}
          />
          <div className="flex items-center justify-between mt-6">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Unlock
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}