import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useRouter } from "next/router";
// ...existing code...
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { User } from "lucide-react";


const Header = () => {
  
  // in Header.js
  
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };


  //const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // Always get fresh user on mount AND whenever storage changes (optional)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateUserId = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUserId(storedUser?._id || null);
      };

      updateUserId();

      // Optional: Listen to storage changes across tabs or window
      window.addEventListener("storage", updateUserId);

      return () => window.removeEventListener("storage", updateUserId);
    }
  }, []);



  return (
    <header className="bg-green-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center -ml-2">
            <Link href="/" className="flex items-center">
              <div className="w-14 h-14 relative mr-4 bg-white rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images.jpg"
                  alt="Barter Circle"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-xl text-green-100">
                  Barter Circle
                </span>
                <span className="text-green-300 text-sm block">Connect</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-green-100 hover:bg-green-800 hover:text-white transition duration-150"
            >
              Home
            </Link>

            {/* <button
              onClick={handleProfileClick}
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              <User size={18} /> My Profile
            </button> */}
            <button onClick={handleLogout}>Logout</button>
            <Link href="/category">
              <button className="px-4 py-3 rounded-md text-sm font-medium text-green-100 hover:bg-green-800 hover:text-white transition duration-150">
                Browse Categories
              </button>
            </Link>

            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-green-100 hover:bg-green-800 hover:text-white transition duration-150"
            >
              About Us
            </Link>

            {/* Login / Sign Up only if not logged in */}
            {!userId && (
              <>
               
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-500 transition duration-150"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">
                {isMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-800">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
          >
            Home
          </Link>

          {/* Always render Profile link */}

          {/* <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            <User size={18} /> My Profile
          </button> */}

          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
          >
            About Us
          </Link>
          <Link
            href="/category"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
          ></Link>
          <button onClick={handleLogout}>Logout</button>

          {/* Login / Sign Up only if not logged in */}
          {!userId && (
            <>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-700"
              >
                Login
              </Link>
             
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
