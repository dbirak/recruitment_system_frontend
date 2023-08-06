"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import NavbarMain from "./components/navbarMain";
import { TypeAnimation } from "react-type-animation";
import Hero from "./components/hero";
import MainContainer from "@/components/layouts/mainContainer";
import Title from "./company/components/title";

export default function Home() {
  return (
    <div className="h-[2000px]">
      <ProtectRoute role="null">
        <NavbarMain />
        <Hero />
        <MainContainer>
          <Title name="Najnowsze ogłoszenia" />
        </MainContainer>
      </ProtectRoute>
    </div>
  );
}
