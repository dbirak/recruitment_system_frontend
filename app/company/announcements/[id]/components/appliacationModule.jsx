"use client";

import moment from "moment";
import React, { useState } from "react";

const AppliactionModule = (props) => {
  const showTask = (taskType, taskInfo) => {
    props.showTask(taskType, taskInfo);
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
                  showTask(item.task.task_name, item.info.task_info.id)
                }
                className="link link-neutral w-fit h-fit mx-auto"
              >
                Pytanie otwarte
              </a>
            ) : (
              <a
                onClick={() =>
                  showTask(item.task.task_name, item.info.task_info.id)
                }
                className="link link-neutral w-fit h-fit mx-auto"
              >
                Przesyłanie plików
              </a>
            )}
          </div>
          <div className="w-[28%] text-center sm:text-[14px] text-[12px] grid items-center">
            {item.info.application_info === "see_answers" ? (
              <button className="btn btn-base-100 btn-sm w-fit px-3 mx-auto">
                Zobacz aplikacje
              </button>
            ) : item.info.application_info === "manage_answers" ? (
              <button className="btn scale-[0.77] md:scale-[1] btn-base-100 btn-sm w-fit md:px-3 mx-auto">
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
              <button className="btn scale-[0.77] md:scale-[1] btn-base-100 btn-sm w-fit md:px-3 mx-auto">
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
    </div>
  );
};

export default AppliactionModule;
