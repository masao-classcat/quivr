"use client";
import { useEffect } from "react";

import { useSupabase } from "@/lib/context/SupabaseProvider";
import { redirectToPreviousPageOrChatPage } from "@/lib/helpers/redirectToPreviousPageOrChatPage";

import {
  FooterSection,
  HomeHeader,
  HomeSection,
  IntroSection,
} from "./components";
import { HomeHeaderBackground } from "./components/HomeHeader/components/HomeHeaderBackground";

const HomePage = (): JSX.Element => {
  const { session } = useSupabase();

  useEffect(() => {
    if (session?.user !== undefined) {
      redirectToPreviousPageOrChatPage();
    }
  }, [session?.user]);

  return (
    <>
      <HomeHeaderBackground />
      <HomeHeader />

      <main
        className="relative flex flex-col items-center"
        data-testid="home-page"
      >
        <HomeSection bg="transparent">
          <IntroSection />
        </HomeSection>

        <HomeSection
          bg="bg-gradient-to-b from-[#D07DF9] to-[#7A27FD]"
          slantBefore="up"
        >
          <FooterSection />
        </HomeSection>
      </main>
    </>
  );
};

export default HomePage;
