import UserDetails from "@/components/UserDetails/UserDetails";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function UserProfile({ params }) {
  const urlUserEmail = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    select: {
      email: true,
    },
  });

  if (!urlUserEmail) {
    return <>Profile not found</>;
  }

  const session = await getServerSession();

  const loggedInUserEmail = session.user.email;

  return (
    <>
      You are logged in as {loggedInUserEmail}
      <br />
      The user you are viewing is {urlUserEmail.email}
      <UserDetails userId={params.userId} />
    </>
  );
}
