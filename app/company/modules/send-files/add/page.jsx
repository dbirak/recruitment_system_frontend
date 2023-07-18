"use client";

import Navbar from "@/app/company/components/navbar";
import Title from "@/app/company/components/title";
import CompanyContainer from "@/components/layouts/companyContainer";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useState } from "react";

import ThirdStep from "./components/thirdStep";
import SecondStep from "./components/secondStep";
import FirstStep from "./components/firstStep";

const AddSendFilePage = () => {
  const [descryption, setDescryption] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState({
    nazwa: "",
    czas: 10,
  });

  const [step, setStep] = useState(1);

  const changeStep = (activities) => {
    let newStep = step;

    if (activities === "up") newStep++;
    else if (activities === "down") newStep--;

    setStep(newStep);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="sendFiles">
          <CompanyContainer>
            <Title name="Dodaj nowe pytanie" />
            <ul className="steps w-full mb-5 z-0">
              <li className={step >= 1 ? "step step-primary" : "step"}>
                Tworzenie pytania
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
                changeStep={changeStep}
                setDescryption={setDescryption}
                descryption={descryption}
              />
            ) : step == 2 ? (
              <SecondStep
                changeStep={changeStep}
                setAdditionalInformation={setAdditionalInformation}
                additionalInformation={additionalInformation}
              />
            ) : (
              <ThirdStep
                changeStep={changeStep}
                additionalInformation={additionalInformation}
                descryption={descryption}
              />
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default AddSendFilePage;
