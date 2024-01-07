import Hero from "@/components/Hero";
import Content1 from "@/components/Content1";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
