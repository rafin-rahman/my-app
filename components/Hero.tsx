import { SEO } from "@/utils/company";

const HeroSection = () => {
  return (
    <div className="text-center p-10 bg-gray-200">
      <h1 className="text-5xl font-bold">{SEO.companyName}</h1>
      <img
        className="mx-auto h-10 w-auto"
        src="/logos/logo_light.svg"
        alt="Logo"
      />
      <p className="mt-4">
        "Next-generation tools for your company management."
      </p>
    </div>
  );
};

export default HeroSection;
