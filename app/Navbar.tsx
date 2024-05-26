"use client";
import React from "react";
import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { IoBugSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes/dist/esm/components/box.js";

export const Navbar = () => {
  const currPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    {
      key: 1,
      label: "Dashboard",
      href: "/",
    },
    {
      key: 2,
      label: "Issues",
      href: "/issues/list",
    },
  ];

  return (
    <nav className="text-black border-b flex space-x-6 items-center h-14 mb-5 px-5">
      <Link href="/">
        <IoBugSharp />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.key}
            className={classnames({
              "text-zinc-900": currPath === link.href,
              "text-zinc-500": currPath !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </Box>
    </nav>
  );
};
