"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import { SEO } from "../../../utils/company";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters long"),
    lastName: z.string().min(3, "Last name must be at least 3 characters long"),
    email: z.string().email("Please enter your email"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
    confirmPassword: z
      .string()
      .min(3, "Confirm Password must be at least 3 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  });

  const registerUser = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/register", values);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (err) {
      if (err.response) {
        // The server responded with a non 2xx status code
        toast.error(err.response.data.message); // or another appropriate property
        console.log(err.response.data);

        setLoading(false);
      } else if (err.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
        console.log(err.request);

        setLoading(false);
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error(err.message);
        console.log("Error: ", err.message);

        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href={"/"}>
            <img
              className="mx-auto h-10 w-auto"
              src={SEO.logo_light}
              alt="Logo"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(registerUser)}
              className="space-y-8"
            >
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"First name"}
                            type={"text"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
              <>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"Last name"}
                            type={"text"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Your email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"abc@example.com"}
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"******"}
                            type={"password"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
              <>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Re-enter your Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"******"}
                            type={"password"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
              <div>
                {loading ? (
                  <Button disabled className={"w-full"}>
                    <Loader2 className={"animate-spin"} size={24} />
                    Loading...
                  </Button>
                ) : (
                  <Button type="submit" className={"w-full"}>
                    Register
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
              {/*  Link to login page */}
              <div className="text-sm">
                <a
                  href="/login"
                  className="font-semibold text-gray-600 hover:text-gray-500"
                >
                  Already have an account?
                </a>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
