"use client";
import React, { useState } from "react";
import { ChartLine, Menu, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartSideBar from "./CartSideBar";
import PopUpAlert from "./PopUpAlert";
const links = [
  { href: "/products", label: "Produits", icon: <Package /> },
  { href: "/orders", label: "Ordres", icon: <ShoppingCart /> },
  { href: "/metrics", label: "Métriques", icon: <ChartLine /> },
];
export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const toggleMobile = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="relative border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-md">
      <div className="container py-4 flex justify-between items-center gap-6">
        <div>
          <Link href="/metrics" className="font-semibold text-lg">
            DummyShop
          </Link>
        </div>

        <nav className=" hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex gap-2 items-center hover:bg-purple-700 hover:text-white py-2 px-4 rounded-md ${
                pathname === link.href ? "bg-purple-700 text-white" : ""
              }
                      `}>
              {link.icon}
              {link.label}
            </Link>
          ))}

          <CartSideBar setShowPopup={setShowPopup} />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <CartSideBar setShowPopup={setShowPopup} />
          <button
            className="md:hidden flex items-center border border-gray-300  rounded-md hover:bg-gray-100 dark:bg-gray-800"
            onClick={toggleMobile}>
            <Menu />
          </button>
        </div>
        {isOpen && (
          <>
            <div className="absolute left-0 right-0 top-full md:hidden bg-white dark:bg-gray-900 brder-t border-gray-200 dark:border-gray-800">
              <nav className="flex flex-col items-start p-4 space-y-2">
                {" "}
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`w-full flex gap-2 items-center  hover:bg-purple-700 hover:text-white py-2 px-4 rounded-md transition ${
                      pathname === link.href ? "bg-purple-700 text-white" : ""
                    }
                      `}
                    onClick={() => {
                      setIsOpen(false);
                    }}>
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </>
        )}
        {showPopup && (
          <PopUpAlert
            color="green"
            message="Votre paiement a été effectué avec succès"
            duration={1500}
          />
        )}
      </div>
    </header>
  );
}
