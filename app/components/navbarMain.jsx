"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NavbarMain = () => {
  const [scrolled, setScrolled] = useState(false);

  const styleNavbar = scrolled
    ? "navbar bg-base-100 drop-shadow-lg fixed top-0 ease-in-out duration-[0.5s] z-10"
    : "navbar bg-none drop-shadow-lg fixed top-0 ease-in-out duration-[0.5s] z-10";

  const styleRegisterButton = scrolled
    ? "btn btn-neutral text-base-100 text-center"
    : "btn text-neutral btn-base-100 text-center";

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
        <div className="navbar-start ms-6">
          <Image
            src="/logo/logo.png"
            width={40}
            height={40}
            alt=""
            priority={false}
          />
          <span className="text-center mx-auto ml-2 text-[25px] font-sans text-primary-focus font-semibold cursor-default select-none">
            WorkHunter
          </span>
        </div>
        <div className="navbar-center">
          <button className="btn btn-ghost me-5 text-center">Ogłoszenia</button>
          <button className="btn btn-ghost me-5 text-center">Firmy</button>
          <button className="btn btn-ghost me-5 text-center">O stronie</button>
        </div>
        <div className="navbar-end me-6">
          <button className="btn btn-ghost me-5 text-center">Logowanie</button>
          <button className={styleRegisterButton}>Dołącz do nas</button>
        </div>
      </div>
    </div>
  );
};

export default NavbarMain;
