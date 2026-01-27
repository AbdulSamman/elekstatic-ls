"use client";

import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { AppContext } from "../AppContext";
import { LayoutDashboard } from "lucide-react";

function Header() {
  const { user } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { cart } = useContext(AppContext);

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed border-b border-audio-cyan/20 backdrop-blur-md z-50 top-0 left-0 w-full bg-black/60 transition-all duration-300`}
    >
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-audio-cyan/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center justify-center rounded-full animate-audio-glow">
                <Image
                  src="/logo3.png"
                  width={55}
                  height={55}
                  loading="eager"
                  alt="SnB Audio Logo"
                  className="object-contain rounded-full border border-audio-cyan/30"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <Link href={"/"}>
                <span className="text-xl font-bold tracking-[0.15em] text-white">
                  SnB <span className="text-audio-cyan">AUDIO</span>
                </span>
              </Link>
            </div>
          </div>

          <nav
            aria-label="Global"
            ref={menuRef}
            className={`menuBase ${
              isMenuOpen ? "menuIsOpen" : ""
            } lg:block bg-black/95 lg:bg-transparent`}
          >
            {isMenuOpen && (
              <button
                className="absolute right-6 top-6 cursor-pointer text-audio-cyan hover:scale-110 transition"
                onClick={handleToggleMenu}
              >
                <FiX className="w-8 h-8" />
              </button>
            )}

            <ul className="flex flex-col items-center justify-center gap-8 lg:gap-10 text-[13px] font-medium tracking-[0.2em] lg:flex-row h-full bg-transparent">
              {["PRODUCTS", "COLLECTION", "SUPPORT", "CONTACT", "ABOUT US"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      className="text-neutral-400 hover:text-audio-cyan hover:drop-shadow-[0_0_8px_rgba(0,191,255,0.8)] transition-all duration-300"
                      href={item === "PRODUCTS" ? "/products" : "#"}
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-6">
            {user?.primaryEmailAddress?.emailAddress ===
              "tkservas@gmail.com" && (
              <Link
                href="/dashboard"
                className="text-neutral-400 hover:text-audio-cyan transition"
              >
                <LayoutDashboard size={22} />
              </Link>
            )}

            <Link
              href={user ? "/cart" : "/sign-in-cart"}
              className="relative group p-2"
            >
              <CiShoppingCart className="text-3xl text-neutral-200 group-hover:text-audio-cyan transition-colors" />
              {cart?.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-audio-cyan text-[10px] font-bold text-black ring-2 ring-black">
                  {cart.length}
                </span>
              )}
            </Link>

            {!user ? (
              <Link
                href="sign-in"
                className="p-2 hover:text-audio-cyan transition-colors"
              >
                <FaRegUserCircle className="text-2xl text-neutral-200" />
              </Link>
            ) : (
              <div className="flex items-center pl-2 border-l border-neutral-800">
                <UserButton
                  appearance={{
                    variables: {
                      colorPrimary: "#00BFFF",
                      colorText: "#ffffff",
                      colorBackground: "#0a0a0a",
                    },
                  }}
                />
              </div>
            )}

            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-audio-cyan/30 text-audio-cyan hover:bg-audio-cyan/10 transition cursor-pointer"
              onClick={handleToggleMenu}
            >
              {!isMenuOpen ? <FiMenu size={20} /> : <FiX size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
