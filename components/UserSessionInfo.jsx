"use client";
import { useSession } from "next-auth/react";

export default function UserSessionInfo() {
  const { data: session } = useSession();
  return <>{JSON.stringify(session)}</>;
}
