"use client";
import React from "react";
import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { IoBugSharp } from "react-icons/io5";

export const Navbar = () => {
  const currPath = usePathname();
  console.log("current pathname: ",currPath);
  const links = [
    {
      key:"1",
      label: "Dashboard",
      herf: "/",
    },
    {
      key:"2",
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
          <li className={classnames({
            "text-zinc-900":currPath===link.herf,
            "text-zinc-500":currPath!==link.herf,
            "hover:text-zinc-800 transition-colors":true
          })}>
            <Link key={link.key} href={link.herf}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
