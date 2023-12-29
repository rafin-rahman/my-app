"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const menuList = [
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

  return (
    <nav className="flex flex-col sm:flex-row justify-around items-center p-4 bg-gray-800 text-white">
      <Link href={"/"}>
        {/*<div className="font-bold mb-2 sm:mb-0">MyApp</div>*/}
        <img
          className="mx-auto h-8 w-auto"
          src="/logos/logo_dark.svg"
          alt="Logo"
        />
      </Link>

      {menuList.map((item) => {
        if (!item.loginRequired || (item.loginRequired && session)) {
          return (
            <a href={item.path} key={item.name}>
              <Button
                className={`${
                  pathname === item.path
                    ? "text-orange-400  underline-offset-8"
                    : ""
                } dark  dark:underline dark:underline-offset-4 hover:dark:underline-offset-8 hover:text-orange-400 `}
                variant={"link"}
              >
                {item.name}
              </Button>
            </a>
          );
        }
      })}

      <div className="mt-2 sm:mt-0">
        {!session ? (
          <Link href="/login">
            <Button className={"dark"}>Login</Button>
          </Link>
        ) : (
          <Select>
            <SelectTrigger className="w-[180px] dark">
              <SelectValue placeholder={session?.user?.name} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Navigation</SelectLabel>
                <Button variant={"link"}>Admin</Button>
                <SelectLabel>Settings</SelectLabel>
                <Button onClick={() => signOut()} variant={"link"}>
                  Logout
                </Button>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
