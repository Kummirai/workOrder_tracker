'use client';

import { useState } from "react";
import InputField from "@/components/InputField";

export default function SettingsPage() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangePin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (newPin !== confirmPin) {
      setMessage("New PINs do not match.");
      setIsError(true);
      return;
    }
    
    if (newPin.length < 4) {
      setMessage("New PIN must be at least 4 digits.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("/api/pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPin, newPin }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("PIN changed successfully!");
        setIsError(false);
        setCurrentPin("");
        setNewPin("");
        setConfirmPin("");
      } else {
        setMessage(data.message || "Failed to change PIN.");
        setIsError(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsError(true);
    }
  };

  return (
    <main className="p-5 max-w-xl mx-auto">
      <h1 className="font-bold mb-5">Settings</h1>
      <div className="border p-4 sm:p-6 rounded-lg border-gray-300 bg-white">
        <h2 className="font-semibold mb-4 text-gray-800">Change PIN</h2>
        <form onSubmit={handleChangePin}>
          <div className="space-y-4">
            <InputField
              fieldtype="password"
              fieldLabel="Current PIN"
              htmlFor="currentPin"
              placeholder="Enter your current PIN"
              handleChange={(e) => setCurrentPin(e.target.value)}
              inputValue={currentPin}
            />
            <InputField
              fieldtype="password"
              fieldLabel="New PIN"
              htmlFor="newPin"
              placeholder="Enter your new PIN"
              handleChange={(e) => setNewPin(e.target.value)}
              inputValue={newPin}
            />
            <InputField
              fieldtype="password"
              fieldLabel="Confirm New PIN"
              htmlFor="confirmPin"
              placeholder="Confirm your new PIN"
              handleChange={(e) => setConfirmPin(e.target.value)}
              inputValue={confirmPin}
            />
          </div>
          {message && (
            <p className={`mt-4 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
              Change PIN
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
