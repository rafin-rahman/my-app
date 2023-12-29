"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

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
        <div className="font-bold mb-2 sm:mb-0">MyApp</div>
        <img
          className="mx-auto h-6 w-auto"
          src="/logos/logo_dark.svg"
          alt="Logo"
        />
      </Link>

      {menuList.map((item) => {
        if (!item.loginRequired || (item.loginRequired && session)) {
          return (
            <a
              href={item.path}
              key={item.name}
              className={`${
                pathname === item.path
                  ? "text-orange-400 underline underline-offset-4 "
                  : ""
              } hover:bg-orange-500 hover:text-white font-bold py-2 px-4 rounded mt-1 sm:mt-0`}
            >
              {item.name}
            </a>
          );
        }
      })}

      <div className="mt-2 sm:mt-0">
        {!session ? (
          <Link
            href="/login"
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            Login
          </Link>
        ) : (
          <div
            className={
              "bg-gray-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
            }
          >
            <button onClick={() => signOut()}>
              Sign out - {session?.user?.name} -{" "}
              {
                // @ts-ignore
                session?.user?.role
              }
            </button>
            <Link href={"/app/manageUsers"}></Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
