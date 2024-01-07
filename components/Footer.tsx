import { SEO } from "@/utils/company";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      {/*  current year (e.g. 2023) */}
      <p>
        © {new Date().getFullYear()} {SEO.companyName}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
