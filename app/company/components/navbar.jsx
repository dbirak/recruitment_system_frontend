"use client";

import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Navbar = (props) => {
  const activeButtonStyle = "active bg-primary text-neutral";
  const router = useRouter();

  const navigate = (url) => {
    router.push(url);
  };

  return (
    <div className="z-20">
      {/* main navbar */}
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost visible xl:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="navbar-center">
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
        <div className="navbar-end">
          <button className="btn btn-ghost btn-square text-[19px] text-center">
            <RiLogoutBoxRLine />
          </button>
        </div>
      </div>

      {/* desktop sidebar */}
      <div className="z-20 bg-base-200 w-72 m-0 h-[calc(100vh-0px)] pt-7 overflow-hidden fixed top-0 hidden xl:block">
        <Image
          className="rounded-full border-secondary mx-auto mb-7 block"
          src="/avatars/company.png"
          alt=""
          width={105}
          height={105}
          priority={false}
        />
        <div className="overflow-y-auto max-h-[calc(100vh-170px)] hide-scrollbar">
          <style>
            {`
          .hide-scrollbar::-webkit-scrollbar {
            width: 0;
            background-color: transparent;
          }
          
          .hide-scrollbar::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
        `}
          </style>
          <ul className="menu menu-lg font-medium bg-base-200 h-auto">
            <li>
              <a
                className={props.site === "home" ? activeButtonStyle : ""}
                onClick={() => {
                  navigate("/company/dashboard");
                }}
              >
                <AiFillHome />
                Strona główna
              </a>
            </li>
            <li>
              <details open>
                <summary>
                  <BiSolidCategoryAlt />
                  Moduły
                </summary>
                <ul>
                  <li>
                    <a
                      className={
                        props.site === "tests" ? activeButtonStyle : ""
                      }
                      onClick={() => {
                        navigate("/company/modules/tests");
                      }}
                    >
                      <RxDotFilled />
                      Testy
                    </a>
                  </li>
                  <li>
                    <a
                      className={
                        props.site === "openQuestions" ? activeButtonStyle : ""
                      }
                      onClick={() => {
                        navigate("/company/modules/open-questions");
                      }}
                    >
                      <RxDotFilled />
                      Pytania otwarte
                    </a>
                  </li>
                  <li>
                    <a
                      className={
                        props.site === "sendFiles" ? activeButtonStyle : ""
                      }
                      onClick={() => {
                        navigate("/company/modules/send-files");
                      }}
                    >
                      <RxDotFilled />
                      Przesyłanie plików
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Twoje ogłoszenia
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Profil
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Ustawienia
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* navbar mobile */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          {props.children}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <div className="bg-base-200 w-72 m-0 h-[calc(100vh-0px)] pt-7 overflow-hidden top-0">
            <Image
              className="rounded-full border-secondary mx-auto mb-7 block"
              src="/avatars/company.png"
              alt=""
              width={70}
              height={70}
              priority={false}
            />
            <ul className="menu menu-md font-medium bg-base-200 h-auto">
              <li>
                <a className="active bg-primary text-neutral">
                  <AiFillHome />
                  Strona główna
                </a>
              </li>
              <li>
                <details open>
                  <summary>
                    <BiSolidCategoryAlt />
                    Moduły
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <RxDotFilled />
                        Testy
                      </a>
                    </li>
                    <li>
                      <a>
                        <RxDotFilled />
                        Pytania otwarte
                      </a>
                    </li>
                    <li>
                      <a>
                        <RxDotFilled />
                        Przesyłanie plików
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Twoje ogłoszenia
                </a>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Profil
                </a>
              </li>
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Ustawienia
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
