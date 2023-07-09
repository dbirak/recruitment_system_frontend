"use client";

import Navbar from "@/app/company/components/navbar";
import Title from "@/app/company/components/title";
import CompanyContainer from "@/components/layouts/companyContainer";
import Modal from "@/components/modals/modal";
import ProtectRoute from "@/utils/middleware/protectRoute";
import FirstStep from "./components/firstStep";
import { createFactory, useState } from "react";
import SecondStep from "./components/secondStep";
import ThirdStep from "./components/thirdStep";

const AddTestModulePage = () => {
  const [questions, setQuestions] = useState({ pytania: [] });
  const [additionalInformation, setAdditionalInformation] = useState({
    nazwa: "",
    czas: 10,
  });

  const [step, setStep] = useState(1);

  const addQuestion = (question) => {
    let updatedQuestions = questions;
    updatedQuestions.pytania.push(question);
    setQuestions(updatedQuestions);
  };

  const changeStep = (activities) => {
    let newStep = step;

    if (activities === "up") newStep++;
    else if (activities === "down") newStep--;

    setStep(newStep);
  };

  const deleteQuestion = (index) => {
    console.log(index);

    const updatedQuestions = [...questions.pytania];
    updatedQuestions.splice(index, 1);
    setQuestions({ pytania: updatedQuestions });
  };

  const editQuestion = (question) => {
    let updatedQuestions = questions;
    updatedQuestions.pytania[question.index] = question.question;

    setQuestions(updatedQuestions);
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
                deleteQuestion={deleteQuestion}
                editQuestion={editQuestion}
              />
            ) : step == 2 ? (
              <SecondStep
                changeStep={changeStep}
                questions={questions}
                setAdditionalInformation={setAdditionalInformation}
                additionalInformation={additionalInformation}
              />
            ) : (
              <ThirdStep
                changeStep={changeStep}
                questions={questions}
                additionalInformation={additionalInformation}
              />
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default AddTestModulePage;
