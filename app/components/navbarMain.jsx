"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavbarMain = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const navigation = (url) => {
    router.push(url);
  };

  const styleNavbar = scrolled
    ? "navbar bg-base-100 drop-shadow-lg fixed top-0 ease-in-out duration-[0.5s] z-10"
    : "navbar bg-none drop-shadow-lg fixed top-0 ease-in-out duration-[0.5s] z-10";

  const styleRegisterButton = scrolled
    ? "btn btn-neutral text-base-100 text-center ease-in-out duration-[0.5s]"
    : "btn text-neutral btn-base-100 text-center ease-in-out duration-[0.5s]";

  const styleText = scrolled
    ? "text-center mx-auto ml-2 text-[25px] font-sans text-neutral font-semibold cursor-default select-none ease-in-out duration-[0.5s]"
    : "text-center mx-auto ml-2 text-[25px] font-sans text-base-300 font-semibold cursor-default select-none ease-in-out duration-[0.5s]";

  const styleButton = scrolled
    ? "btn btn-ghost me-5 text-center ease-in-out duration-[0.5s]"
    : "btn btn-ghost text-base-200 me-5 text-center ease-in-out duration-[0.5s]";

  const imageSrc = scrolled ? "/logo/logo.png" : "/logo/logoMain.png";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 133) {
        // Wysokość od której zmiana ma się pojawić
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* main navbar */}
      <div className={styleNavbar}>
        <div className="navbar-start ms-6 ease-in-out duration-[0.5s]">
          <Image
            src={imageSrc}
            width={40}
            height={40}
            alt=""
            key={""}
            priority={false}
            className="ease-in-out duration-[0.5s]"
          />
          <span className={styleText}>WorkHunter</span>
        </div>
        <div className="navbar-center">
          <button className={styleButton}>Ogłoszenia</button>
          <button className={styleButton}>Firmy</button>
          <button className={styleButton}>O stronie</button>
        </div>
        <div className="navbar-end me-6">
          <button onClick={() => navigation("/login")} className={styleButton}>
            Logowanie
          </button>
          <button
            onClick={() => navigation("/register")}
            className={styleRegisterButton}
          >
            Dołącz do nas
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarMain;
