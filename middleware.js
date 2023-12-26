// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
//
// export default withAuth(
//   function middleware(req) {
//     console.log("Middleware my log");
//     console.log(req.nextauth);
//     if (
//       req.nextUrl.pathname === "/dashboard" &&
//       req.nextauth.token?.role !== "user"
//     ) {
//       return NextResponse.redirect("/login");
//     }
//   },
//   {
//     callbacks: {
//       authorized({ req, token }) {
//         if (token) return true; // If there is a token, the user is authenticated
//       },
//     },
//   }
// );
//
// export const config = { matcher: ["/dashboard"] };

// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/dashboard"] };

import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("Loggin middleware.js");
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      // If token exist, it retusn TRUE. User is authenticated.
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/protected/:path*"] };
