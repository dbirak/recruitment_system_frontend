"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import { useState } from "react";
import Navbar from "../../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../../components/title";
import FourthStep from "./components/fourthStep";
import FifthStep from "./components/fifthStep";
import SixthStep from "./components/sixthStep";
import FirstStep from "./components/firstStep";
import SecondStep from "./components/secondStep";
import ThirdStep from "./components/thirdStep";

const AddAnnouncementPage = () => {
  const [step, setStep] = useState(1);
  const [announcementInfo, setAnnouncementInfo] = useState({
    nazwa: "",
    opis: "",
    obowiazki: [],
    wymagania: [],
    oferta: [],
    kategoria: 0,
    umowa: 0,
    min_wynagrodzenie: null,
    max_wynagrodzenie: null,
    typ_wynagrodzenia: 0,
    czas_pracy: 0,
    typ_pracy: 0,
    data_zakonczenia: null,
  });

  const [additionalInformation, setAdditionalInformation] = useState({});
  const [earnInformation, setEarnInformation] = useState({
    radioInfo: 1,
    selectValue: "",
  });
  const [stepInformation, setStepInformation] = useState([]);

  const changeStep = (activities) => {
    let newStep = step;

    if (activities === "up") newStep++;
    else if (activities === "down") newStep--;

    setStep(newStep);
  };

  const updateAnnoucementInfo = async (info) => {
    setAnnouncementInfo((prevInfo) => ({ ...prevInfo, ...info }));
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="announcements">
          <CompanyContainer>
            <Title name="Dodaj nowe ogłoszenie" />
            <div className="overflow-x-auto">
              <ul className="steps w-full mb-5 overflow-x-auto">
                <li className={step >= 1 ? "step step-primary" : "step"}>
                  <span className="hidden md:block">Podstawowe informacje</span>
                </li>
                <li className={step >= 2 ? "step step-primary" : "step"}>
                  <span className="hidden md:block">
                    Szczegółowe informacje
                  </span>
                </li>
                <li className={step >= 3 ? "step step-primary" : "step"}>
                  <span className="hidden md:block">Dodatkowe informacje</span>
                </li>
                <li className={step >= 4 ? "step step-primary" : "step"}>
                  <span className="hidden md:block">Zarobki</span>
                </li>
                <li className={step >= 5 ? "step step-primary" : "step"}>
                  <span className="hidden md:block">Etapy rekrutacji</span>
                </li>
                <li className={step >= 6 ? "step step-primary" : "step"}>
                  <span className="hidden md:block">Podsumowanie</span>
                </li>
              </ul>

              {step == 1 ? (
                <FirstStep
                  changeStep={changeStep}
                  announcementInfo={announcementInfo}
                  updateAnnoucementInfo={updateAnnoucementInfo}
                />
              ) : step == 2 ? (
                <SecondStep
                  changeStep={changeStep}
                  announcementInfo={announcementInfo}
                  updateAnnoucementInfo={updateAnnoucementInfo}
                />
              ) : step == 3 ? (
                <ThirdStep
                  changeStep={changeStep}
                  updateAnnoucementInfo={updateAnnoucementInfo}
                  setAdditionalInformation={setAdditionalInformation}
                  announcementInfo={announcementInfo}
                />
              ) : step == 4 ? (
                <FourthStep
                  changeStep={changeStep}
                  updateAnnoucementInfo={updateAnnoucementInfo}
                  announcementInfo={announcementInfo}
                  earnInformation={earnInformation}
                  setEarnInformation={setEarnInformation}
                />
              ) : step == 5 ? (
                <FifthStep
                  changeStep={changeStep}
                  announcementInfo={announcementInfo}
                  stepInformation={stepInformation}
                  setStepInformation={setStepInformation}
                />
              ) : (
                <SixthStep
                  changeStep={changeStep}
                  announcementInfo={announcementInfo}
                  earnInformation={earnInformation}
                  additionalInformation={additionalInformation}
                  stepInformation={stepInformation}
                />
              )}
            </div>
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default AddAnnouncementPage;
