"use client";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      <h1>Dashboard</h1>
      <p> You are logged in as {session?.user?.email}</p>
      <br />
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
