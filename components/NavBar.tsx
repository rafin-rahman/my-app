"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav className="flex justify-around items-center p-4 bg-gray-800 text-white">
      <Link href={"/"}>
        <div className="font-bold">NextJS</div>
      </Link>

      <div>
        <Link
          href="/dashboard"
          className={"hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
        >
          Dashboard
        </Link>
      </div>
      <div>
        <Link
          href="/register"
          className={"hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
        >
          Register
        </Link>
      </div>

      <div>
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
              "bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
            }
          >
            <button
              onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
