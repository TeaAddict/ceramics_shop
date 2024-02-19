"use client";

import { NAV_BAR_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavButtons = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-7 text-2xl">
      {NAV_BAR_LINKS.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            style={{
              pointerEvents:
                !isActive || pathname.includes("/shop/") ? "auto" : "none",
            }}
            className={`text-black flex ${
              !isActive
                ? "hover:border-b-[1px] border-black"
                : "border-b-2 border-black"
            }`}
          >
            {React.createElement(link.icon)}
            {link.label}
          </Link>
        );
      })}
    </ul>
  );
};

export default NavButtons;