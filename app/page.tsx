import Hero from "@/components/Hero";
import Content1 from "@/components/Content1";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserSessionInfo from "@/components/UserSessionInfo";

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
      {/*<a href={"/protected"}>Protected</a>*/}
      {/*<h1 className=" text-center mt-20 text-2xl font-bold text-gray-800">*/}
      {/*  Server-side session*/}
      {/*</h1>*/}
      {/*<pre className="p-4 bg-gray-100 rounded-md overflow-x-auto ">*/}
      {/*  {JSON.stringify(serverSession, null, 2)}*/}
      {/*</pre>*/}

      {/*<h1 className="text-center  text-2xl font-bold text-gray-800">*/}
      {/*  Client-side session*/}
      {/*</h1>*/}
      {/*<UserSessionInfo />*/}

      <Hero />
      <Content1
        title={"Embracing Modernity"}
        content={
          "Introducing a dynamic, full-featured Next.js template website that encapsulates the pinnacle of modern web application development. Leveraging the power of Next.js v14, this application confirms to the updated Next.js architecture with the App directory structured for scaled growth and effective route management. It seamlessly integrates essential security features like authentication and RBAC (Role-Based Access Control) to manage secure access to protected routes, ensuring that your user's data is impeccably safeguarded."
        }
        imageUrl={"/illustrations/computer_illustration.webp"}
      />
      <Content1
        title={"Powering Robust Applications"}
        content={
          "Built as a full-stack solution, this application is powered by TypeScript to provide a robust typing system, increasing the reliability and maintainability of your codebase. It utilizes Prisma, an innovative open source database toolkit to serve as an ORM (Object-Relational Mapping) for your PostgreSQL database, providing you with a strongly typed, database-agnostic way to communicate with your database."
        }
        imageUrl={"/illustrations/computer_illustration_power.webp"}
      />
      <Content1
        title={"Ensuring Seamless User Experience"}
        content={
          "Authentication workflows are handled by NextAuth, a comprehensive library that provides session management, OAuth integration, and more, making user management a breeze. Lastly, the application employs Tailwind CSS, a utility-first CSS framework that allows for deep customization and clean, modern user interfaces. This potent combination of powerful technologies and thoughtful architecture makes this Next.js template website an excellent choice for developers looking to build scalable, secure, and visually appealing web applications."
        }
        imageUrl={"/illustrations/computer_illustration_UI.webp"}
      />
    </>
  );
}
