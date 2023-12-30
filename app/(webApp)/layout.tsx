import AppNavBar from "@/components/AppNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={"flex"}>
        <AppNavBar />{" "}
        <div className={"flex-1 flex flex-col min-h-screen py-2"}>
          {children}
        </div>
      </div>
    </>
  );
}
