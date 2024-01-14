// "use client";
// import { SessionProvider } from "next-auth/react";
//
// export default function Provider({ children, session }) {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// }

// trying new way to provide session to fix production session issues
"use client";
import { SessionProvider } from "next-auth/react";
export default SessionProvider;
