"use client";

import Navbar from "@/app/company/components/navbar";
import Title from "@/app/company/components/title";
import CompanyContainer from "@/components/layouts/companyContainer";
import Modal from "@/components/modals/modal";
import ProtectRoute from "@/utils/middleware/protectRoute";
import FirstStep from "./components/firstStep";
import { useState } from "react";
import SecondStep from "./components/secondStep";

const AddTestModulePage = () => {
  const [questions, setQuestions] = useState({ pytania: [] });
  const [step, setStep] = useState(1);

  const addQuestion = (question) => {
    let updatedQuestions = questions;
    updatedQuestions.pytania.push(question);
    setQuestions(updatedQuestions);

    console.log(questions);
  };

  const changeStep = (activities) => {
    let newStep = step;

    if (activities === "up") newStep++;
    else if (activities === "down") newStep--;

    setStep(newStep);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="tests">
          <CompanyContainer>
            <Title name="Dodaj nowy test" />
            <ul className="steps w-full mb-5 z-0">
              <li className={step >= 1 ? "step step-primary" : "step"}>
                Tworzenie pytań
              </li>
              <li className={step >= 2 ? "step step-primary" : "step"}>
                Dodatkowe informacje
              </li>
              <li className={step >= 3 ? "step step-primary" : "step"}>
                Podsumowanie
              </li>
            </ul>

            {step == 1 ? (
              <FirstStep
                addQuestion={addQuestion}
                questions={questions}
                changeStep={changeStep}
              />
            ) : step == 2 ? (
              <SecondStep changeStep={changeStep} />
            ) : (
              ""
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default AddTestModulePage;
