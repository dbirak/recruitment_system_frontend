"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import { IoMdAddCircle } from "react-icons/io";
import Navbar from "../../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../../components/title";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OpenQuestionsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const addOpenQuestionNavigate = () => {
    router.push("/company/modules/open-questions/add");
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="openQuestions">
          <CompanyContainer>
            <Title name="Moduły - Pytania otwarte" />
            <button
              onClick={addOpenQuestionNavigate}
              className="btn btn-primary rounded-none w-full p-3 mb-5"
            >
              <span className="text-[20px]">
                <IoMdAddCircle />
              </span>
              Dodaj nowe pytanie otwarte
            </button>
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default OpenQuestionsPage;
