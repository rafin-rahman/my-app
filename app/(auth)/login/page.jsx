"use client";
import { useState, useEffect, useRef } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import GoogleButton from "@/components/GoogleButton";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
  })
  .refine((data) => data.email && data.password, {
    message: "Please enter your email and password",
    path: ["email", "password"],
  });

export default function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const session = useSession();
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/");

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

  const loginUser = async (values) => {
    // e.preventDefault();
    setLoading(true);
    const signInResponse = await signIn("credentials", {
      ...values,
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
        <Link href={"/"}>
          <img
            className="mx-auto h-10 w-auto"
            src="/logos/logo_light.svg"
            alt="Logo"
          />
        </Link>

        <div className={"mx-auto  max-w-sm"}>
          <GoogleButton />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form
              className="space-y-6"
              // onSubmit={loginUser}
              onSubmit={form.handleSubmit(loginUser)}
            >
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Email address"}
                            type={"email"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Password"}
                            type={"password"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div>
                {loading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </Button>
                ) : (
                  <Button className={"w-full"} type="submit">
                    Login
                  </Button>
                )}
              </div>

              {/*<div className="text-sm">*/}
              {/*  <a*/}
              {/*    href="#"*/}
              {/*    className="font-semibold text-gray-600 hover:text-gray-500"*/}
              {/*  >*/}
              {/*    Forgot password?*/}
              {/*  </a>*/}
              {/*</div>*/}
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
          </Form>
        </div>
      </div>
    </>
  );
}
