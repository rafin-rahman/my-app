// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";
//
// export default withAuth(
//   function middleware({ req, err }) {
//     // extra function here after user has been validated
//   },
//   {
//     callbacks: {
//       // If token exist, it returns TRUE. User is authenticated.
//       authorized: async ({ req, token }) => {
//         if (req.nextUrl.pathname === "/app/admin") {
//           switch (true) {
//             case token?.role?.includes("superAdmin"):
//               return true;
//             case token?.role?.includes("admin"):
//               return true;
//             default:
//               console.log("not admin");
//               return false;
//           }
//         }
//       },
//     },
//   }
// );
//
// export const config = { matcher: ["/app/:path*"] };

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// Ignore requests that aren't for the app or API.

export default async function middleware(req, event) {
  // if (
  //   !req.nextUrl.pathname.startsWith("/app") &&
  //   !req.nextUrl.pathname.startsWith("/api")
  // ) {
  //   return NextResponse.next();
  // }

  const token = await getToken({ req });
  console.log("my log", req.method, req.nextUrl.pathname, token?.role);

  if (
    req.nextUrl.pathname.includes("/app/admin") &&
    !(token?.role?.includes("superAdmin") || token?.role?.includes("admin"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();

  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = { matcher: ["/app/:path*"] };
