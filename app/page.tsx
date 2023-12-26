import Hero from "@/components/Hero";
import Content1 from "@/components/Content1";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserSessionInfo from "@/components/UserSessionInfo";
import Link from "next/link";

async function getPosts() {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (posts.length === 0 || !posts)
      return (
        <div className="p-4 bg-white shadow rounded-lg my-2 text-center">
          <h2 className="text-2xl text-gray-700">OPS, no posts found</h2>
        </div>
      );

    return posts.map((post) => (
      <div
        key={post.id}
        className="p-4 bg-white shadow rounded-lg my-2 text-center"
      >
        <h2 className="text-2xl text-gray-700">{post.title}</h2>
        <p className="text-gray-500">{post.author?.name}</p>
      </div>
    ));
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
export default async function Home() {
  const serverSession = await getServerSession(authOptions);
  return (
    <>
      <Link href={"/protected"}>Protected</Link>
      <h1 className=" text-center mt-20 text-2xl font-bold text-gray-800">
        Server-side session
      </h1>
      <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto ">
        {JSON.stringify(serverSession, null, 2)}
      </pre>

      <h1 className="text-center  text-2xl font-bold text-gray-800">
        Client-side session
      </h1>
      <UserSessionInfo />

      <Hero />
      <Content1
        title={"What is OFORM.IO?"}
        content={
          'Discover the future of form management with OFORM.IO – where convenience meets innovation. Bid farewell to the cumbersome world of paper forms and embrace the simplicity and efficiency of digital. OFORM.IO transforms your paperwork into smart, editable, and easily shareable online forms in just a few clicks. Our platform not only saves time and space but also significantly reduces errors and enhances data security. Ideal for businesses and individuals alike, OFORM.IO is your gateway to a streamlined, paper-free process. Experience the ease of managing forms digitally and elevate your productivity to new heights with OFORM.IO!"'
        }
        imageUrl={"/illustrations/pdf illustration.png"}
      />

      {getPosts()}
    </>
  );
}
