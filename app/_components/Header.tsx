"use client";

import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useContext } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { CiShoppingCart } from "react-icons/ci";

import { AppContext } from "../AppContext";
import Cart from "../cart/_components/Cart";

function Header() {
  const { user } = useUser();
  // nav background ändern
  const pathname = usePathname();
  const headerBg = pathname === "/" ? "bg-transparent" : "bg-black";
  const headerPos = pathname === "/" ? "absolute" : "static";

  // // menu
  const menuRef = useRef<HTMLDivElement>(null); // Ref für das Menü-Element

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // signIn signUp nav hidden
  // const [isloggedIn, setIsLoggedIn] = useState(false);
  // // useEffect(() => {
  // //   const url = window.location.href;
  // //   setIsLoggedIn(
  // //     url.toString().includes("sign-in") || url.toString().includes("sign-up")
  // //   );
  // // });
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

  // // resize menu wenn geöffnet ist
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 767) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <header
      className={`${headerBg} border-t-6 border-primary ${headerPos} top-0 left-0 z-2 w-full`}
    >
      <div className="mx-auto max-w-400 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="bg-primary border-4 border-borderCol rounded-b-4xl min-w-25 min-h-25">
              <Link href={"/"}>
                <Image
                  src="/logo2.png"
                  width={100}
                  height={100}
                  loading="eager"
                  alt="logo"
                  className="pb-2"
                />
              </Link>
            </div>
          </div>

          <nav
            aria-label="Global"
            ref={menuRef}
            className={`menuBase ${isMenuOpen ? "menuIsOpen" : ""} lg:block`}
          >
            {isMenuOpen && (
              <button
                className=" text-white absolute right-0 t-0 m-6 cursor-pointer transition hover:text-gray-400 "
                onClick={handleToggleMenu}
              >
                <FiX className="w-12 h-12" />
              </button>
            )}
            <ul className="flex flex-col items-center justify-center gap-6 text-sm lg:flex-row h-full p-1">
              <li className="text-2xl lg:text-sm p-0.5">
                <Link
                  className="text-white transition hover:text-gray-400 "
                  href="#"
                >
                  PRODUKTE
                </Link>
              </li>

              <li className="text-2xl lg:text-sm p-0.5">
                <Link
                  className="text-white transition hover:text-gray-400"
                  href="#"
                >
                  SAMMLUNGEN
                </Link>{" "}
              </li>

              <li className="text-2xl lg:text-sm p-0.5">
                <Link
                  className="text-white transition hover:text-gray-400"
                  href="#"
                >
                  UNTERSTÜTZUNG
                </Link>{" "}
              </li>

              <li className="text-2xl lg:text-sm p-0.5">
                <Link
                  className="text-white transition hover:text-gray-400 "
                  href="#"
                >
                  KONTAKT
                </Link>{" "}
              </li>

              <li className="text-2xl lg:text-sm p-0.5">
                <Link
                  className="text-white transition hover:text-gray-400 "
                  href="#"
                >
                  ÜBER UNS
                </Link>{" "}
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!user ? (
              <div className="gap-4 flex">
                <Link
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  href="/sign-in"
                >
                  Login
                </Link>

                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                  href="/sign-up"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <h2 className="flex items-center gap-1 cursor-pointer">
                  <CiShoppingCart
                    className="text-3xl text-gray-200"
                    onClick={handleCartOpen}
                  />
                  <span className="text-gray-300">({cart.length})</span>
                </h2>
                <UserButton />
                {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 hover:text-gray-600/75 lg:hidden cursor-pointer"
                onClick={handleToggleMenu}
              >
                {!isMenuOpen ? (
                  <FiMenu className="menuIcon" />
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
