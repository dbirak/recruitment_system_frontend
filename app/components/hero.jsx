"use client";

import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const router = useRouter();

  const navigate = (url) => {
    router.push("/register");
  };

  return (
    <div className="hero min-h-screen bg-[url('/assets/image1.jpg')]">
      <div className="hero-overlay bg-black bg-opacity-[0.85]"></div>
      <div className="hero-content flex-col lg:flex-row-reverse text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Witaj w WorkHunter!
          </h1>
          <p className="text-white">
            WorkHunter to kompleksowy system umożliwiający szukanie nowej pracy
            lub nowych pracowników. Zarejestruj się już teraz
          </p>
          <TypeAnimation
            sequence={[
              "i zacznij szukać swojej wymarzonej pracy.",
              1500,
              "i zacznij szukać swojego wymarzonego pracownika.",
              1500,
            ]}
            wrapper="p"
            speed={50}
            repeat={Infinity}
            style={{ color: "#ffffff" }}
          />

          <button
            onClick={() => navigate("/register")}
            className="mt-5 btn btn-base-300"
          >
            Zacznij teraz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
