"use client";

import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useContext } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { AppContext } from "../AppContext";
import { LayoutDashboard } from "lucide-react";

function Header() {
  const { user } = useUser();
  // nav background ändern
  const pathname = usePathname();

  // // menu
  const menuRef = useRef<HTMLDivElement>(null); // Ref für das Menü-Element

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { cart } = useContext(AppContext);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // menu close außerhalb menuIsOpen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Überprüfe, ob das geklickte Element nicht das Menü ist und schließe das Menü dann
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed  border-b border-neutral-800 backdrop-blur z-50 top-0 left-0 w-full bg-neutral-950/40`}
    >
      <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="bg-black  border-4  border-neutral-800 rounded-b-4xl min-w-12 min-h-12 flex items-center justify-center">
              <Link href={"/"}>
                <Image
                  src="/logo2.png"
                  width={64}
                  height={64}
                  loading="eager"
                  alt="logo"
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          <nav
            aria-label="Global"
            ref={menuRef}
            className={`menuBase ${
              isMenuOpen ? "menuIsOpen" : ""
            } lg:block bg-neutral-950 lg:bg-transparent text-sm text-neutral-300`}
          >
            {isMenuOpen && (
              <button
                className="absolute right-6 top-6 cursor-pointer text-neutral-800 hover:text-white transition"
                onClick={handleToggleMenu}
              >
                <FiX className="w-10 h-10 text-neutral-100" />
              </button>
            )}

            <ul className="flex flex-col items-center justify-center gap-8 text-sm lg:flex-row h-full p-1">
              <li className="text-2xl lg:text-sm">
                <Link className="hover:text-white transition" href="#">
                  PRODUCTS
                </Link>
              </li>
              <li className="text-2xl lg:text-sm">
                <Link className="hover:text-white transition" href="#">
                  COLLECTION
                </Link>
              </li>
              <li className="text-2xl lg:text-sm">
                <Link className="hover:text-white transition" href="#">
                  SUPPORT
                </Link>
              </li>
              <li className="text-2xl lg:text-sm">
                <Link className="hover:text-white transition" href="#">
                  CONTACT
                </Link>
              </li>
              <li className="text-2xl lg:text-sm">
                <Link className="hover:text-white transition" href="#">
                  ABOUT US
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div>
              {user &&
                user.primaryEmailAddress?.emailAddress ===
                  "tkservas@gmail.com" && (
                  <Link href="/dashboard">
                    <LayoutDashboard />
                  </Link>
                )}
            </div>
            <div className="gap-6 flex items-center">
              <Link
                className="rounded text-sm text-gray-100"
                href={`${user ? "/cart" : "/sign-in-cart"}`}
              >
                <h2 className="flex items-center cursor-pointer text-neutral-100 hover:text-neutral-300  transition">
                  <CiShoppingCart className="text-3xl" />

                  <span className="text-sm">({cart?.length})</span>
                </h2>
              </Link>
            </div>

            {!user ? (
              <Link href="sign-in">
                <div className="flex items-center cursor-pointer text-neutral-100 hover:text-neutral-300 transition">
                  <FaRegUserCircle className="text-2xl" />
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <UserButton
                  appearance={{
                    variables: {
                      colorText: "#ffffff",
                      colorBackground: "#0a0a0ab3",
                    },
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                className="block lg:hidden rounded-lg border border-neutral-400 p-2 text-neutral-100 hover:text-neutral-300  transition cursor-pointer"
                onClick={handleToggleMenu}
              >
                {!isMenuOpen ? (
                  <FiMenu className="menuIcon text-neutral-100" />
                ) : (
                  <FiX className="menuIcon" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
