"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import { useRouter } from "next/navigation";
import LoadingButton from "../../../components/UI/loadingButton";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract the callbackUrl from the URL's query parameter
    const urlParams = new URLSearchParams(window.location.search);
    // Get the callbackUrl
    const path = urlParams.get("callbackUrl");
    // If there is a callbackUrl, set it in the state
    if (path) {
      // Construct the full URL e.g. http://localhost:3000/protected instead of just "/protected"
      const fullUrl = window.location.origin + path;
      setCallbackUrl(fullUrl);
    }
  }, []);

  // Redirect the user to the callbackUrl if he is already logged in
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [session]);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const signInResponse = await signIn("credentials", {
      ...data,
      // redirect: false = won't redirect the user to a pre-build page from NextAuth
      redirect: false,
    });
    if (signInResponse?.error) {
      toast.error(signInResponse.error);
      setLoading(false);
    } else {
      toast.success("Logged in successfully");
      if (callbackUrl !== "/") {
        // keep only the pathname from callbackUrl e.g. /protected instead of http://localhost:3000/protected
        const callbackUrlPathName = new URL(callbackUrl).pathname;
        // redirect the user to the callbackUrl
        router.push(callbackUrlPathName);
      } else {
        // redirect the user to the homepage
        router.push("/");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <img
          className="mx-auto h-10 w-auto"
          src="/logos/logo_light.svg"
          alt="Logo"
        />

        <div className={"mx-auto  max-w-sm"}>
          <GoogleButton />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              {loading ? (
                <LoadingButton loadingText="Login" />
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              )}
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-gray-600 hover:text-gray-500"
              >
                Forgot password?
              </a>
            </div>
            {/* register link */}
            <div className="text-sm">
              <a
                href="/register"
                className="font-semibold text-gray-600 hover:text-gray-500"
              >
                Don't have an account? Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}