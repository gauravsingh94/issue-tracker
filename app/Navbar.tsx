import React from "react";
import Link from "next/link";
import { IoBugSharp } from "react-icons/io5";

export const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      herf: "/",
    },
    {
      label: "Issues",
      herf: "/issues",
    },
  ];
  
  return (
    <nav className="text-black border-b flex space-x-6 items-center h-14 mb-5 px-5">
      <Link href="/">
        <IoBugSharp />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li className="text-zinc-500 hover:text-zinc-900 transition-colors">
            <Link href={link.herf}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
