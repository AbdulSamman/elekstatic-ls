"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  // nav background ändern
  const pathname = usePathname();
  const headerBg = pathname === "/" ? "bg-transparent" : "bg-blue-500";
  return (
    <header
      className={`${headerBg} border-t-6 border-primary absolute top-0 left-0 z-10 w-full`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="lg:flex lg:items-center lg:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <div className="bg-primary border-4 border-borderCol rounded-b-4xl min-w-[100px] min-h-[100px]">
                <Image
                  src="/logo2.png"
                  width={100}
                  height={100}
                  loading="eager"
                  alt="logo"
                  className="pb-2"
                />
              </div>
            </a>
          </div>

          <div className="hidden lg:block px-2 ">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white transition hover:text-gray-400 "
                    href="#">
                    PRODUKTE
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-400"
                    href="#">
                    {" "}
                    SAMMLUNGEN
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-400"
                    href="#">
                    UNTERSTÜTZUNG
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-400 "
                    href="#">
                    KONTAKT
                  </a>
                </li>

                <li>
                  <a
                    className="text-white transition hover:text-gray-400 "
                    href="#">
                    ERKUNDEN
                  </a>
                </li>
                <li>
                  <a
                    className="text-white transition hover:text-gray-400 "
                    href="#">
                    ÜBER UNS
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="gap-4 flex">
              <a
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                href="#">
                Login
              </a>

              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                href="#">
                Register
              </a>
            </div>

            <div className="block lg:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
