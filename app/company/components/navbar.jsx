"use client";

import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { baseApiUrl } from "@/utils/api/axios";
import { useState } from "react";

const Navbar = (props) => {
  const router = useRouter();

  const activeButtonStyle = "active bg-primary text-neutral";

  const navigate = (url) => {
    router.push(url);
  };

  const logout = async () => {
    window.localStorage.clear();
    router.push("/");
  };

  return (
    <div className="z-20">
      {/* main navbar */}
      <div className="navbar bg-base-100 shadow-lg fixed z-50 md:static md:z-0">
        <div className="navbar-start">
          <div className="dropdown dropdown-start">
            <label
              tabIndex={0}
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
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Image
            src="/logo/logo.png"
            width={40}
            height={40}
            alt=""
            priority={false}
          />
          <span className="text-center mx-auto ml-2 text-[25px] font-sans text-neutral font-semibold cursor-default select-none">
            WorkHunter
          </span>
        </div>
        <div className="navbar-end">
          <div className="tooltip tooltip-left" data-tip="Wyloguj się">
            <button
              onClick={logout}
              className="btn btn-ghost btn-square text-[19px] text-center"
            >
              <RiLogoutBoxRLine />
            </button>
          </div>
        </div>
      </div>

      {/* desktop sidebar */}
      <div className="z-20 bg-base-100 shadow-lg w-72 m-0 h-[calc(100vh-0px)] pt-7 overflow-hidden fixed top-0 hidden xl:block ">
        <div
          className="cursor-pointer w-fit mx-auto"
          onClick={() => navigate("/company/profile")}
        >
          <img
            className="shadow-xl p-2 border-secondary mx-auto mb-2 block w-[105px] h-[105px] object-cover"
            src={
              localStorage.getItem("avatar")
                ? baseApiUrl +
                  "/storage/avatarImage/" +
                  localStorage.getItem("avatar")
                : "/avatars/company.png"
            }
            alt=""
            width={105}
            height={105}
          />

          <div className="cursor-pointer w-fit mx-auto px-5 pt-2 font-semibold text-center mb-7">
            {localStorage.getItem("name") ? localStorage.getItem("name") : ""}
          </div>
        </div>

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
          <ul className="menu menu-lg font-medium bg-base-100 h-auto">
            <li>
              <a
                className={props.site === "home" ? activeButtonStyle : ""}
                onClick={() => {
                  navigate("/company/dashboard");
                }}
              >
                <AiFillHome />
                <span>Strona główna</span>
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
                      <span>Testy</span>
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
                      <span>Pytania otwarte</span>
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
                      <span>Przesyłanie plików</span>
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a
                className={
                  props.site === "announcements" ? activeButtonStyle : ""
                }
                onClick={() => {
                  navigate("/company/announcements");
                }}
              >
                <BiSolidCategoryAlt />
                <span>Twoje ogłoszenia</span>
              </a>
            </li>
            <li>
              <a
                className={props.site === "profile" ? activeButtonStyle : ""}
                onClick={() => {
                  navigate("/company/profile");
                }}
              >
                <BiSolidCategoryAlt />
                <span>Profil</span>
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
                <span>Ustawienia</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {props.children}

      {/* navbar mobile */}
      {/* <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <div className="bg-base-200 w-72 m-0 h-[calc(100vh-0px)] pt-7 overflow-hidden top-0">
            <img
              className="border-secondary mx-auto mb-7 block"
              src="/avatars/company.png"
              alt=""
              width={70}
              height={70}
            />
            <ul className="menu menu-md font-medium bg-base-200 h-auto">
              <li>
                <a className="active bg-primary text-neutral">
                  <AiFillHome />
                  <span>Strona główna</span>
                </a>
              </li>
              <li>
                <details open>
                  <summary>
                    <BiSolidCategoryAlt />
                    <span>Moduły</span>
                  </summary>
                  <ul>
                    <li>
                      <a>
                        <RxDotFilled />
                        <span>Testy</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <RxDotFilled />
                        <span>Pytania otwarte</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <RxDotFilled />
                        <span>Przesyłanie plików</span>
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
                  <span>Twoje ogłoszenia</span>
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
                  <span>Profil</span>
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
                  <span>Ustawienia</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
