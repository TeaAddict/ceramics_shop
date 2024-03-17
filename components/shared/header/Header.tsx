import Image from "next/image";
import React from "react";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavButtons from "./NavButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import ProfileButton from "@/components/profile/ProfileButton";
import LanguageButton from "../LanguageButton";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="sticky top-0 z-10 px-6 py-3 lg:px-20 3xl:px-24 flex items-center justify-between bg-white/90">
      <Link href={"/"} className="lg:pr-3 xl:pr-0">
        <Image
          src={"/assets/sk_logo.png"}
          alt="logo"
          width={35}
          height={35}
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
      <div className="hidden md:flex">
        <NavButtons />
      </div>
      <div className="flex items-center gap-5">
        {/* <div className="hidden sm:block"> */}
        <div className="">
          <CartBadge />
        </div>
        {!session ? (
          <div className="hidden md:block">
            <LoginButton />
          </div>
        ) : (
          <div className="hidden md:flex md:gap-5 md:items-center">
            {session?.user?.image && session.user.name && (
              <ProfileButton
                route={`/profile/${session.user.name}`}
                name={session.user.name}
                image={session.user.image}
              />
            )}
            <LogoutButton />
          </div>
        )}

        <LanguageButton />

        <div className="md:hidden">
          <MobileMenu session={session} />
        </div>
      </div>
    </section>
  );
};

export default Header;
