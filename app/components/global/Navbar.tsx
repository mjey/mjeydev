"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import LogoWhite from "../../../public/mjWhite.png";
import LogoBlack from "../../../public/mjBlack.png";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { systemTheme, theme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ];

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return (
      <UnmountStudio>
        <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/">
              <div className="w-[70px] h-[30px] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded"></div>
            </Link>
            <nav className="md:block hidden">
              <ul className="flex items-center gap-x-8">
                {data.map((link, id) => (
                  <li key={id}>
                    <Link
                      href={link.href}
                      className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-x-4">
              <Theme />
              <MobileMenu />
            </div>
          </div>
        </header>
      </UnmountStudio>
    );
  }

  return (
    <UnmountStudio>
      <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/">
            <Image 
              src={currentTheme === "light" ? LogoBlack : LogoWhite} 
              width={70} 
              height={0} 
              style={{ height: "auto" }} 
              alt="logo" 
            />
            </Link>

          <nav className="md:block hidden">
            <ul className="flex items-center gap-x-8">
              {data.map((link, id) => (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-x-4">
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
