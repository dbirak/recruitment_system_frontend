"use client";

import moment from "moment";
import React, { useState } from "react";
import { BiSolidEnvelope } from "react-icons/bi";

const AppliactionModule = (props) => {
  const [lastStepInfo, setLastStepInfo] = useState(
    props.announcement.steps[props.announcement.steps.length - 1]
  );

  const showTask = (taskType, taskInfo) => {
    console.log(taskType, taskInfo);
    props.showTask(taskType, taskInfo);
  };

  const showManageUsersModal = (stepInfo, canManageUsers) => {
    props.showManageUsersModal(stepInfo, canManageUsers);
  };

  const showBeginNewStepModal = (stepInfo) => {
    props.showBeginNewStepModal(stepInfo);
  };

  const showCloseAnnouncementModal = () => {
    props.showCloseAnnouncementModal(lastStepInfo);
  };

  const showSendMailModal = (userInfo) => {
    props.showSendMailModal(userInfo);
  };

  return (
    <div className="relative bg-base-100 shadow-lg rounded-lg z-0 max-w-[1200px] text-center mx-auto py-5 px-4 mt-8 mb-4">
      <div className="flex justify-between mb-7">
        <div className="font-bold text-[20px] grid items-center">
          Szczegóły etapów rekrutacji:
        </div>
      </div>

      <div className="flex justify-between">
        <div className="font-bold text-center sm:text-[14px] text-[12px] w-[10%] grid items-center">
          Numer etapu
        </div>
        <div className="font-bold w-[22%] text-center sm:text-[14px] text-[12px] grid items-center">
          Nazwa modułu
        </div>
        <div className="font-bold w-[28%] text-center sm:text-[14px] text-[12px] grid items-center">
          Aplikacje
        </div>
        <div className="font-bold w-[20%] text-center sm:text-[14px] text-[12px] grid items-center">
          Statystyki
        </div>
        <div className="font-bold text-center w-[20%] sm:text-[14px] text-[12px] grid items-center">
          Data zakończenia etapu
        </div>
      </div>

      {props.announcement.steps.map((item, index) => (
        <div
          key={index}
          className="flex justify-between my-5 font-medium min-h-[32px]"
        >
          <div className="text-center sm:text-[14px] text-[12px] w-[10%] grid items-center">
            Etap {index + 1}
          </div>
          <div className="w-[22%] text-center sm:text-[14px] text-[12px] grid items-center">
            {item.task.task_name === "cvTask" ? (
              "Przesłanie CV"
            ) : item.task.task_name === "testTask" ? (
              <a
                onClick={() =>
                  showTask(item.task.task_name, item.info.task_info[0])
                }
                className="link link-neutral w-fit h-fit mx-auto"
              >
                Test
              </a>
            ) : item.task.task_name === "openTask" ? (
              <a
                onClick={() =>
                  showTask(item.task.task_name, item.info.task_info)
                }
                className="link link-neutral w-fit h-fit mx-auto"
              >
                Pytanie otwarte
              </a>
            ) : (
              <a
                onClick={() =>
                  showTask(item.task.task_name, item.info.task_info)
                }
                className="link link-neutral w-fit h-fit mx-auto"
              >
                Przesyłanie plików
              </a>
            )}
          </div>
          <div className="w-[28%] text-center sm:text-[14px] text-[12px] grid items-center">
            {item.info.application_info === "see_answers" ? (
              <button
                onClick={() => showManageUsersModal(item, false)}
                className="btn btn-base-100 btn-sm w-fit px-3 mx-auto"
              >
                Zobacz aplikacje
              </button>
            ) : item.info.application_info === "manage_answers" ? (
              <button
                onClick={() => showManageUsersModal(item, true)}
                className="btn scale-[0.77] md:scale-[1] btn-base-100 btn-sm w-fit md:px-3 mx-auto"
              >
                Zarządzaj aplikacjami
              </button>
            ) : (
              "-"
            )}
          </div>
          <div className="w-[20%] text-center sm:text-[14px] text-[12px]">
            {item.info.application_info !== null ? (
              <div>
                <div>
                  Liczba odpowiedzi: {item.info.stats.applied_users_count}
                </div>
                <div className="text-success">
                  Zaakceptowani: {item.info.stats.accepted_users_count}
                </div>
                <div className="text-error">
                  Odrzuceni: {item.info.stats.rejected_users_count}
                </div>
              </div>
            ) : (
              "-"
            )}
          </div>
          <div className="text-center w-[20%] sm:text-[14px] text-[12px] grid items-center">
            {item.info.can_change_expiry_date_info ? (
              <button
                onClick={() => showBeginNewStepModal(item)}
                className="btn scale-[0.77] md:scale-[1] btn-base-100 btn-sm w-fit md:px-3 mx-auto"
              >
                Rozpocznij etap
              </button>
            ) : item.expiry_date !== null ? (
              moment.utc(item.expiry_date).format("DD.MM.YYYY")
            ) : (
              "-"
            )}
          </div>
        </div>
      ))}

      {props.announcement.last_step_info.can_close_announcement && (
        <div>
          <button
            className="btn btn-neutral mt-3 w-full"
            onClick={showCloseAnnouncementModal}
          >
            zakończ ogłoszenie
          </button>
        </div>
      )}

      {props.announcement.last_step_info.winners_users !== null && (
        <div className="mt-10">
          <h1 className="text-center mb-3 font-bold text-[27px]">
            Gratulacje!
          </h1>
          <h1 className="font-semibold mb-5 text-[22px] text-left">
            Proces rekrutacyjny twojego ogłoszenia dobiegł końca. Poniżej
            znajdują się osoby, które pozytywnie przeszli przez wszystkie etapy
            rekrutacji:
          </h1>

          {props.announcement.last_step_info.winners_users.map(
            (item, index) => (
              <div
                className="card rounded-lg md:h-fit  shadow-xl mb-6 w-[93%] mx-auto bg-base-100"
                key={index}
              >
                <div className="card-body ">
                  <div className="text-[22px] text-left font-semibold">
                    {item.name} {item.surname}
                  </div>
                  <div className="text-[18px] text-left">{item.email}</div>
                  <div>
                    <button
                      className="btn btn-base-100 w-full mt-2"
                      onClick={() => showSendMailModal(item)}
                    >
                      <BiSolidEnvelope />
                      wyślij wiadomość
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AppliactionModule;
