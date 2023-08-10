"use client";

import MainContainer from "@/components/layouts/mainContainer";
import ProtectRoute from "@/utils/middleware/protectRoute";
import UserForm from "./components/userForm";
import CompanyForm from "./components/companyForm";
import Logo from "../components/logo";
import { useState } from "react";

export const metadata = {
  title: "Zarejestruj się w serwisie WorkHuner",
  description: "",
};

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWorker, setIsWorker] = useState(true);

  const styleTabUnactive =
    "tab tab-bordered tab-primary w-1/2 text-[14px] sm:text-[16px]";
  const styleTabActive =
    styleTabUnactive +
    "tab-active text-neutral border-neutral text-[14px] sm:text-[16px]";

  return (
    <div>
      <ProtectRoute role="null">
        <div className="bg-[url('/assets/image2.jpg')] py-7 pt-[80px] px-5 hero block min-h-screen">
          <div className="hero-content block max-w-[500px] mx-auto p-5 bg-base-100">
            <Logo />

            <div className="border-b-2 border-dotted border-neutral my-5"></div>
            <div>
              <h1 className="font-semibold text-[26px] text-center mb-5">
                Rejestracja
              </h1>
              <div className="tabs w-full mb-7">
                <a
                  onClick={() => setIsWorker(true)}
                  className={isWorker ? styleTabActive : styleTabUnactive}
                >
                  Szukam pracy
                </a>
                <a
                  onClick={() => setIsWorker(false)}
                  className={!isWorker ? styleTabActive : styleTabUnactive}
                >
                  Szukam pracownika
                </a>
              </div>
              {isWorker ? <UserForm /> : <CompanyForm />}
            </div>
          </div>
        </div>
      </ProtectRoute>
    </div>
  );
};

export default RegisterPage;
