import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware({ req, err }) {
    // extra function here after user has been validated
  },
  {
    callbacks: {
      // If token exist, it returns TRUE. User is authenticated.
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === "/authorised/admin") {
          return token?.role.includes("admin");
        }

        return Boolean(token);
      },
    },
  }
);

export const config = { matcher: ["/authorised/:path*"] };
