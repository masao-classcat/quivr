"use client";
import { usePathname } from "next/navigation";

import { GITHUB_URL, TWITTER_URL } from "@/lib/config/CONSTANTS";
// import { DISCORD_URL, GITHUB_URL, TWITTER_URL } from "@/lib/config/CONSTANTS";
import { useSupabase } from "@/lib/context/SupabaseProvider";

// masao : 09-oct-23 : remove discord description.
const Footer = (): JSX.Element => {
  const { session } = useSupabase();

  const path = usePathname();
  const isHomePage = path === "/";
  const isContactPage = path === "/contact";
  const isLoginPage = path === "/login";

  if (
    session?.user !== undefined ||
    isHomePage ||
    isContactPage ||
    isLoginPage
  ) {
    return <></>;
  }

  return (
    <footer className="bg-white dark:bg-black border-t dark:border-white/10 mt-auto py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center gap-4">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Quivr GitHub"
        >
          <img
            className="h-8 w-auto dark:invert"
            src="/github.svg"
            alt="GitHub"
          />
        </a>
        <a
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Quivr Twitter"
        >
          <img className="h-8 w-auto" src="/twitter.svg" alt="Twitter" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
