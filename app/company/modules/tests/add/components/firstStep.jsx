"use client";

import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  TiArrowLeftThick,
  TiArrowRightThick,
  TiTick,
  TiTimes,
} from "react-icons/ti";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import AddQuestionForm from "./addQuestionForm";

const FirstStep = (props) => {
  const [isAddQuestionModal, setIsAddQuestionModal] = useState(false);

  const openAddQuestionModal = () => {
    setIsAddQuestionModal(true);
  };

  const closeAddQuestionModal = () => {
    setIsAddQuestionModal(false);
  };

  const addQuestion = (question) => {
    props.addQuestion(question);

    closeAddQuestionModal();
  };

  const changeStep = (activities) => {
    props.changeStep(activities);
  };

  return (
    <div>
      <button
        onClick={openAddQuestionModal}
        className="btn btn-success  w-full p-3 mb-10"
      >
        <span className="text-[20px]">
          <IoMdAddCircle />
        </span>
        Dodaj nowe pytanie
      </button>

      {props.questions.pytania.map((item, index) => {
        return (
          <div className="collapse collapse-arrow bg-base-200 mb-3" key={index}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {index + 1}. {item.pytanie}
            </div>
            <div className="collapse-content">
              <div className="ms-3">
                {item.odpowiedzi.map((answer, index) => {
                  return answer.poprawna ? (
                    <p className="text-success flex" key={index}>
                      <span className="text-[24px] me-2">
                        <TiTick />
                      </span>
                      <span className="font-medium">{answer.odpowiedz}</span>
                    </p>
                  ) : (
                    <p className="text-error flex" key={index}>
                      <span className="text-[24px] me-2">
                        <TiTimes />
                      </span>
                      <span className="font-medium">{answer.odpowiedz}</span>
                    </p>
                  );
                })}
              </div>
              <div className="flex justify-around mt-5">
                <div className="tooltip" data-tip="edytuj pytanie">
                  <button className="btn btn-square btn-warning text-[22px]">
                    <MdModeEdit />
                  </button>
                </div>
                <div className="tooltip" data-tip="usuń pytanie">
                  <button className="btn btn-square btn-error text-[18px]">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between mt-10">
        <div></div>
        {/* <button className="btn btn-primary w-[150px]">
          <TiArrowLeftThick />
          wstecz
        </button> */}
        <button
          onClick={() => changeStep("up")}
          className={
            props.questions.pytania.length > 0
              ? "btn btn-primary w-[150px]"
              : "btn btn-primary w-[150px] btn-disabled"
          }
        >
          dalej
          <TiArrowRightThick />
        </button>
      </div>

      {isAddQuestionModal && (
        <AddQuestionForm
          closeAddQuestionModal={closeAddQuestionModal}
          addQuestion={addQuestion}
        />
      )}
    </div>
  );
};

export default FirstStep;
