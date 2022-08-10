import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "@/context/authContext";
import { ButtonLink } from "@/styled/ButtonLink";

import styles from "./MobileNav.module.scss";

const openNavLinks = [
  { id: 2, text: "PRO", link: "/pro" },
  { id: 2, text: "Blog", link: "/blog" },
  { id: 4, text: "Sponsors", link: "/sponsors" },
];

const MobileNav: FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <>
      <nav className="flex w-full flex-col">
        <ul className="flex flex-col gap-8 text-lg">
          {openNavLinks.map(({ id, text, link }) => (
            <li
              key={id}
              className={`${
                router.asPath.startsWith(link) && "border-b border-primary"
              }`}
            >
              <Link href={link}>
                <a className="">{text}</a>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/dashboard">
          <a className="mt-auto w-full rounded-md border border-primary p-4 text-primary">
            Go to dashboard
          </a>
        </Link>
      </nav>
    </>
  );
};

export default MobileNav;
