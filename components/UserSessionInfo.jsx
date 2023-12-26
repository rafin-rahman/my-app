"use client";
import { useSession } from "next-auth/react";

export default function UserSessionInfo() {
  const { data: session } = useSession();
  return (
    <>
      <pre className={"p-4 mb-10 bg-gray-100 rounded-md overflow-x-auto"}>
        {JSON.stringify(session, null, 2)}
      </pre>
    </>
  );
}
