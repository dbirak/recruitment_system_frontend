"use client";

import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

const SixthStep = (props) => {
  const changeStep = async (activities) => {
    props.changeStep(activities);
  };

  return (
    <div>
      <div className="flex justify-between mt-10 overflow-x-hidden">
        <button
          onClick={() => changeStep("down")}
          className="btn btn-primary w-[150px]"
        >
          <TiArrowLeftThick />
          wstecz
        </button>
        <button
          onClick={() => changeStep("up")}
          className="btn btn-primary w-[150px]"
        >
          dalej
          <TiArrowRightThick />
        </button>
      </div>
    </div>
  );
};

export default SixthStep;
