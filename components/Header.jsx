"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#5e17eb] p-5 px-10">
      <nav className="flex items-center justify-between text-white">
        <Link href="/">
          <h1 className="text-2xl font-bold font-serif">Jobs</h1>
        </Link>
        
        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center">
          <Link
            href="/"
            className="mx-2 my-1 md:my-0 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer "
          >
            Home
          </Link>
          <Link
            href={"/work_orders"}
            className="mx-2 my-1 md:my-0 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer"
          >
            Add Work Order
          </Link>
          <Link
            href={"/boq_items"}
            className="mx-2 my-1 md:my-0 px-4 border rounded-md hover:text-[#5e17eb]   hover:bg-white hover:cursor-pointer"
          >
            BOQ Items
          </Link>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col items-center">
            <Link
              href="/"
              className="my-1 px-4 py-2 border rounded-md hover:text-[#5e17eb] hover:bg-white hover:cursor-pointer w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={"/work_orders"}
              className="my-1 px-4 py-2 border rounded-md hover:text-[#5e17eb] hover:bg-white hover:cursor-pointer w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Work Order
            </Link>
            <Link
              href={"/boq_items"}
              className="my-1 px-4 py-2 border rounded-md hover:text-[#5e17eb] hover:bg-white hover:cursor-pointer w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              BOQ Items
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;