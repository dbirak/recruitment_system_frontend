"use client";

import {
  TiArrowLeftThick,
  TiArrowRightThick,
  TiTick,
  TiTimes,
} from "react-icons/ti";

const ThirdStep = (props) => {
  const submitTest = () => {
    let json = Object.assign({}, props.questions, props.additionalInformation);

    console.log(json);
  };

  const changeStep = (activities) => {
    props.changeStep(activities);
  };

  return (
    <div>
      <div className="overflow-x-auto mb-5">
        <table className="table text-center">
          <tbody>
            {/* row 1 */}
            <tr>
              <th className="w-1/2">Nazwa testu</th>
              <td>{props.additionalInformation.nazwa}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="w-1/2">Liczba pytań</th>
              <td>{props.questions.pytania.length}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th className="w-1/2">Czas trwania testu</th>
              <td>{props.additionalInformation.czas} min</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        {props.questions.pytania.map((item, index) => {
          return (
            <div
              className="collapse collapse-sm collapse-arrow bg-base-200 mb-3"
              key={index}
            >
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
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={() => changeStep("down")}
          className="btn btn-primary w-[150px]"
        >
          <TiArrowLeftThick />
          wstecz
        </button>
        <button onClick={submitTest} className="btn btn-success w-[150px]">
          utwórz test
        </button>
      </div>
    </div>
  );
};

export default ThirdStep;
