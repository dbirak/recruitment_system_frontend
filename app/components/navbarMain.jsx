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

  const styleHamburgerButton = scrolled
    ? "text-[34px] text-neutral"
    : "text-[34px] text-base-200";

  const imageSrc = scrolled ? "/logo/logo.png" : "/logo/logoMain.png";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 133) {
        // Wysokość od której zmiana ma się pojawić
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
        <div className="navbar-center hidden lg:flex">
          <button
            onClick={() => navigation("/announcement")}
            className={styleButton}
          >
            Ogłoszenia
          </button>
          <button
            onClick={() => navigation("/company")}
            className={styleButton}
          >
            Firmy
          </button>
          <button onClick={() => navigation("/about")} className={styleButton}>
            O stronie
          </button>
        </div>

        <div className="hidden lg:flex navbar-end me-6">
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

        <div className="flex lg:hidden navbar-end me-6">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-square btn-ghost outline-0 ease-in-out duration-[0.5s]"
            >
              <button className={styleHamburgerButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-7 h-7 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 opacity-50 rounded-box w-52"
            >
              <button
                onClick={() => navigation("/announcement")}
                className="btn btn-sm btn-ghost text-center"
              >
                Ogłoszenia
              </button>
              <button
                onClick={() => navigation("/company")}
                className="btn btn-sm btn-ghost text-center"
              >
                Firmy
              </button>
              <button
                onClick={() => navigation("/about")}
                className="btn btn-sm btn-ghost text-center"
              >
                O stronie
              </button>
              <div className="h-fit border-b-2 my-2 border-dotted"></div>
              <button
                onClick={() => navigation("/login")}
                className="btn btn-sm btn-ghost text-center"
              >
                Logowanie
              </button>
              <button
                onClick={() => navigation("/register")}
                className="btn btn-sm btn-neutral text-base-100 text-center"
              >
                Dołącz do nas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMain;
