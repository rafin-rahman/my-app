"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="font-bold">OFORM.IO.</div>
      <div>
        <Link
          href="/login"
          className={
            'className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
          }
        >
          Login
        </Link>
      </div>
      <div>
        <Link
          href="/register"
          className={
            'className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
          }
        >
          Register
        </Link>
      </div>
      {session && (
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}

      <div>
        <Link
          href="/dashboard"
          className={
            'className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
          }
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
