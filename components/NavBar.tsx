"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SEO } from "@/utils/company";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

const MENU_LINKS = [
  {
    name: "About",
    path: "/about",
    loginRequired: false,
  },
  {
    name: "Contact",
    path: "/contact",
    loginRequired: false,
  },
  {
    name: "Admin",
    path: "/app/admin",
    loginRequired: true,
  },
  {
    name: "Manager",
    path: "/app/manager",
    loginRequired: true,
  },
  {
    name: "Super Admin",
    path: "/app/superAdmin",
    loginRequired: true,
  },
];

const Navbar = () => {
  const { data: session } = useSession();
  console.log("session log:", session);
  const pathname = usePathname();

  const renderMenuItem = (item) => {
    if (!item.loginRequired || (item.loginRequired && session)) {
      return (
        <a href={item.path} key={item.name}>
          <Button
            className={`${
              pathname === item.path
                ? "text-orange-400  underline-offset-8"
                : ""
            } dark text-xl dark:underline dark:underline-offset-4 hover:dark:underline-offset-8 hover:text-orange-400 `}
            variant={"link"}
          >
            {item.name}
          </Button>
        </a>
      );
    }
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-around items-center p-4 bg-gray-800 text-white">
      <Link href={"/"}>
        {/*<div className="font-bold mb-2 sm:mb-0">{SEO.companyName}</div>*/}
        <img className="mx-auto h-8 w-auto" src={SEO.logo_dark} alt="Logo" />
      </Link>
      {/* Nav bar menu */}
      {MENU_LINKS.map(renderMenuItem)}
      <div className="mt-2 sm:mt-0">
        {!session ? (
          <Link href="/login">
            <Button className={"dark"}>Login</Button>
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger asChild className={"text-black"}>
              <Button variant="outline">
                {
                  // @ts-ignore
                  session?.user?.firstName ? (
                    // @ts-ignore
                    session?.user?.firstName + " " + session?.user?.lastName
                  ) : (
                    <Loader2 className="mr-2 h-4 w-10 animate-spin" />
                  )
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="space-y-2">
                <h1 className="font-medium leading-none">Navigation</h1>
                <a href={"/app/superAdmin"}>
                  <Button variant={"link"}>Admin</Button>
                </a>
                <h4 className="font-medium leading-none">Settings</h4>
                <Button onClick={() => signOut()} variant={"link"}>
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
