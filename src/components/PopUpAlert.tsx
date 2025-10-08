"use client";
import { DotSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
interface PopUpAlertProps {
  color?: "green" | "red";
  message: string;
  duration?: number;
}
export default function PopUpAlert({
  color = "green",
  message,
  duration = 1000,
}: PopUpAlertProps) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const variant: Record<string, string> = {
    green: "bg-green-100 text-green-800 border-green-300",
    red: "bg-red-100 text-red-800 border-red-300",
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div
        className={`border p-4 rounded-lg shadow-lg w-80 text-center ${variant[color]}`}>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
