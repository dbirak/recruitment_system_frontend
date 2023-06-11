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

  const styleTabUnactive = "tab tab-bordered tab-primary w-1/2 text-[16px] ";
  const styleTabActive = styleTabUnactive + "tab-active";

  return (
    <div>
      <ProtectRoute role="null">
        <MainContainer>
          <div className="max-w-[500px] mx-auto p-5 bg-base-300">
            <Logo />

            <div className="border-b-2 border-dotted border-primary my-5"></div>
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
        </MainContainer>
      </ProtectRoute>
    </div>
  );
};

export default RegisterPage;
