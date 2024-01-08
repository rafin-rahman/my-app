import * as React from "react";
import { prisma } from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import _nameForm from "./_nameForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DropZone from "../DropZone";

export default async function UserProfile({ userId }) {
  let user = "";
  try {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        accounts: true,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return <div>User not found</div>;
    } else {
      return <div>Something went wrong</div>;
    }
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Not Found
          </h2>
          <p className="text-gray-600">The requested user does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={"flex items-center flex-col"}>
      <Card className="w-[650px] m-10">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Update user profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          {!user.accounts.length > 0 && <DropZone userId={user.id} />}

          <Separator orientation="horizontal" className={"my-4"} />
          <_nameForm textContent={user.name} />
        </CardContent>
      </Card>
      <Card className="w-[650px] m-10">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
