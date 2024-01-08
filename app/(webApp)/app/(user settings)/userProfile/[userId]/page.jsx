import UserDetails from "@/components/UserDetails/UserDetails";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../../lib/prisma";

export default async function UserProfile({ params }) {
  const urlUserEmail = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    select: {
      email: true,
    },
  });

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
