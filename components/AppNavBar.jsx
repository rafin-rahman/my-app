"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const navigation = [
  {
    name: "Manage users",
    href: "/app/superAdmin/manageUsers",
    count: "5",
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { data: session } = useSession();
  return (
    <div className="flex  flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
      <Link href={"/"} className="flex h-16 shrink-0 items-center pt-2">
        <img className="h-8 w-auto" src="/logos/logo_dark.svg" alt="logo" />
        <div className={"text-white ml-2"}>MyApp</div>
      </Link>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              {session?.user?.image ? (
                <img
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src={session?.user?.image}
                  alt=""
                />
              ) : null}

              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{session?.user?.name}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
