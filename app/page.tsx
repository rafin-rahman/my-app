import Image from "next/image";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Content1 from "@/components/Content1";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserSessionInfo from "@/components/UserSessionInfo";

async function getPosts() {
  const posts = await prisma.posts.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts.map((post) => (
    <div key={post.id} className="p-4 bg-white shadow rounded-lg my-2">
      <h2 className="text-2xl text-gray-700">{post.title}</h2>
      <p className="text-gray-500">{post.author?.name}</p>
    </div>
  ));
}
export default async function Home() {
  const serverSession = await getServerSession(authOptions);
  return (
    <>
      <h1>Server side rendered</h1>
      <pre>{JSON.stringify(serverSession)}</pre>
      <h1>Client side rendered</h1>
      <UserSessionInfo />
      <h1>Checking :</h1>

      <NavBar />
      <Hero />
      <Content1
        title={"What is OFORM.IO?"}
        content={
          'Discover the future of form management with OFORM.IO – where convenience meets innovation. Bid farewell to the cumbersome world of paper forms and embrace the simplicity and efficiency of digital. OFORM.IO transforms your paperwork into smart, editable, and easily shareable online forms in just a few clicks. Our platform not only saves time and space but also significantly reduces errors and enhances data security. Ideal for businesses and individuals alike, OFORM.IO is your gateway to a streamlined, paper-free process. Experience the ease of managing forms digitally and elevate your productivity to new heights with OFORM.IO!"'
        }
        imageUrl={"/illustrations/pdf illustration.png"}
      />
      {getPosts()}
      <Footer />
    </>
  );
}
