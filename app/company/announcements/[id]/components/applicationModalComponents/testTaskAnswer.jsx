"use client";

import Loading from "@/components/loadings/loading";
import { baseURL } from "@/utils/api/axios";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { TiTick, TiTimes } from "react-icons/ti";

const TestTaskAnswer = (props) => {
  const [questionCorrectCounter, setQuestionCorrectCounter] = useState(0);

  useEffect(() => {
    let count = 0;

    for (let i = 1; i <= props.application.info.length; i++) {
      if (props.application.info[i - 1].correct_answer) count++;
    }

    setQuestionCorrectCounter(count);
  }, []);

  return (
    <div>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        {props.name} - test
      </h1>

      <div>
        <table className="table text-center my-3 border-0">
          <tbody>
            {/* row 1 */}
            <tr className="border-0">
              <th className="w-1/2">Liczba zdobytych punktów:</th>
              <th className="w-1/2 text-right">
                {questionCorrectCounter} / {props.application.info.length} pkt
              </th>
            </tr>
          </tbody>
        </table>

        {props.application.info.map((item, index) => {
          return (
            <div
              className="collapse collapse-sm collapse-arrow bg-base-200 mb-3"
              key={index}
            >
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                {index + 1}. {item.question}
              </div>
              <div className="collapse-content">
                <div className="ms-3">
                  {item.answers.map((answer, index) => {
                    return answer.is_correct ? (
                      <p className="text-success flex" key={index}>
                        <span className="text-[24px] me-2">
                          {!answer.is_checked ? (
                            <div className="w-[24px] h-[24px]"></div>
                          ) : answer.is_checked !== answer.is_correct ? (
                            <TiTimes />
                          ) : (
                            <TiTick />
                          )}
                        </span>
                        <span className="font-medium">{answer.answer}</span>
                      </p>
                    ) : (
                      <p className="text-error flex" key={index}>
                        <span className="text-[24px] me-2">
                          {!answer.is_checked ? (
                            <div className="w-[24px] h-[24px]"></div>
                          ) : answer.is_checked !== answer.is_correct ? (
                            <TiTimes />
                          ) : (
                            <TiTick />
                          )}
                        </span>
                        <span className="font-medium">{answer.answer}</span>
                      </p>
                    );
                  })}
                </div>
                <div className="font-semibold text-right mt-2">
                  {item.correct_answer ? (
                    <div className="text-success">1 / 1 pkt</div>
                  ) : (
                    <div className="text-error"> 0 / 1 pkt</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={props.closeApplicationModal}
        className="btn btn-primary w-full rounded-none mt-5"
      >
        Zamknij
      </button>
    </div>
  );
};

export default TestTaskAnswer;
