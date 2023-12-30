"use client";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GoogleComponent() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <Button className={"mt-14"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Login in...
        </Button>
      ) : (
        <GoogleButton
          onClick={() => {
            setLoading(true);
            signIn(
              "google"
              // { redirect: false }
            );
          }}
          className="w-full mt-16"
        />
      )}
    </>
  );
}
