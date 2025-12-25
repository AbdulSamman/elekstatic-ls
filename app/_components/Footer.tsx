"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Copyright } from "lucide-react";

export const Footer = () => {
  const { user } = useUser();
  return (
    <div
      className="relative text-neutral-400 curved-top"
      style={{ backgroundColor: "black", zIndex: 0 }}
    >
      <div className="flex flex-col items-start justify-between w-full xl:flex-row gap-2 ">
        <div className="p-2 h-50 ">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <Image
                alt="footerLogo"
                src={"/logo2.png"}
                width={100}
                height={100}
                className="w-20 h-auto"
              />
            </Link>
            <span className="ml-2 text-xl font-bold tracking-wide text-neutral-400 uppercase">
              L.S.I 26
            </span>
          </div>
          <p className="text-sm text-neutral-400 p-2 w-full sm:w-130">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae
          </p>
        </div>

        <div className="grid grid-cols-4 items-center mt-auto px-4 w-full">
          <div className="h-30 xl:justify-self-end justify-self-center">
            <p className="font-semibold tracking-wide text-teal-accent-400 underline">
              Category
            </p>
            <ul className="mt-2 ">
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  World
                </a>
              </li>
            </ul>
          </div>
          <div className="h-30 xl:justify-self-end justify-self-center">
            <p className="font-semibold tracking-wide text-teal-accent-400 underline">
              Cherry
            </p>
            <ul className="mt-2 ">
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Web
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Business
                </a>
              </li>
            </ul>
          </div>

          <div className=" h-30 xl:justify-self-end justify-self-center">
            <p className="font-semibold tracking-wide text-teal-accent-400 underline">
              Apples
            </p>
            <ul className="mt-2">
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Brochure
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>
          <div className=" h-30 xl:justify-self-end justify-self-center">
            <p className="font-semibold tracking-wide text-teal-accent-400 underline">
              Business
            </p>
            <ul className="mt-2 ">
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Personal
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Wiki
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                >
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between pt-5 pb-3 border-t border-neutral-900 sm:flex-row items-center px-4">
        <div className="text-sm text-neutral-200 flex items-center gap-2 justify-center">
          <Copyright />
          <span className="px-1 text-center">
            Copyright 2026 SAMMAN Electronics Inc.. All rights reserved
          </span>
        </div>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          <Link
            href="/"
            className="transition-colors duration-300 text-neutral-500 hover:text-neutral-200 hover:scale-120"
          >
            <span className="text-2xl">
              <FaTiktok />
            </span>
          </Link>
          <Link
            href="/"
            className="transition-colors duration-300 text-neutral-500 hover:text-neutral-200 hover:scale-120"
          >
            <span className="text-2xl">
              <FaXTwitter />
            </span>
          </Link>
          <Link
            href="/"
            className="transition-colors duration-300 text-neutral-500 hover:text-neutral-200 hover:scale-120"
          >
            <span className="text-2xl">
              <FaInstagram />
            </span>
          </Link>
          <Link
            href="/"
            className="transition-colors duration-300 text-neutral-500 hover:text-neutral-200 hover:scale-120"
          >
            <span className="text-2xl ">
              <FaFacebook />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
