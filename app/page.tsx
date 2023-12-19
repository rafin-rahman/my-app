import Image from "next/image";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Content1 from "@/components/Content1";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Content1
        title={"What is OFORM.IO?"}
        content={
          'Discover the future of form management with OFORM.IO – where convenience meets innovation. Bid farewell to the cumbersome world of paper forms and embrace the simplicity and efficiency of digital. OFORM.IO transforms your paperwork into smart, editable, and easily shareable online forms in just a few clicks. Our platform not only saves time and space but also significantly reduces errors and enhances data security. Ideal for businesses and individuals alike, OFORM.IO is your gateway to a streamlined, paper-free process. Experience the ease of managing forms digitally and elevate your productivity to new heights with OFORM.IO!"'
        }
        imageUrl={"/illustrations/pdf illustration.png"}
      />
      <Footer />
    </>
  );
}
