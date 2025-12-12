"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function Header() {
  // nav background ändern
  const pathname = usePathname();
  const headerBg = pathname === "/" ? "bg-transparent" : "bg-black";
  const headerPos = pathname === "/" ? "absolute" : "static";

  // // menu
  const menuRef = useRef<HTMLDivElement>(null); // Ref für das Menü-Element

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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

  // resize menu wenn geöffnet ist
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`${headerBg} border-t-6 border-primary ${headerPos} top-0 left-0 z-2 w-full`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="bg-primary border-4 border-borderCol rounded-b-4xl min-w-[100px] min-h-[100px]">
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
            className={`${isMenuOpen ? "menuIsOpen" : "hidden"}  lg:block`}
          >
            {isMenuOpen && (
              <button
                className="menuIcon text-white absolute right-0 t-0 m-6 cursor-pointer transition hover:text-gray-400 "
                onClick={handleToggleMenu}
              >
                <X className="w-12 h-12" />
              </button>
            )}

            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-white transition hover:text-gray-400 "
                  href="#"
                >
                  PRODUKTE
                </Link>
              </li>

              <li>
                <Link
                  className="text-white transition hover:text-gray-400"
                  href="#"
                >
                  SAMMLUNGEN
                </Link>{" "}
              </li>

              <li>
                <Link
                  className="text-white transition hover:text-gray-400"
                  href="#"
                >
                  UNTERSTÜTZUNG
                </Link>{" "}
              </li>

              <li>
                <Link
                  className="text-white transition hover:text-gray-400 "
                  href="#"
                >
                  ERKUNDEN
                </Link>{" "}
              </li>
              <li>
                <Link
                  className="text-white transition hover:text-gray-400 "
                  href="#"
                >
                  KONTAKT
                </Link>{" "}
              </li>

              <li>
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
            <div className="gap-4 flex">
              <a
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                href="#"
              >
                Login
              </a>

              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                href="#"
              >
                Register
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden cursor-pointer "
                onClick={handleToggleMenu}
              >
                {!isMenuOpen ? (
                  <Menu className="menuIcon" />
                ) : (
                  <X className="menuIcon" />
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
