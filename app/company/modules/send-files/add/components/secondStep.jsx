"use client";

import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SecondStep = (props) => {
  const [time, setTime] = useState(props.additionalInformation.czas);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const changeStep = (activities) => {
    props.changeStep(activities);
  };

  const onSubmitHandler = async (data) => {
    data.czas = parseInt(data.czas);

    props.setAdditionalInformation(data);
    props.changeStep("up");
  };

  const changeTime = (e) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <div className="mx-auto">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="text"
            placeholder="Nazwa pytania"
            className={errors.nazwa ? styleInputError : styleInputCorrect}
            defaultValue={props.additionalInformation.nazwa}
            {...register("nazwa", {
              required: "Nazwa pytania jest wymagana.",
              maxLength: {
                value: 100,
                message: "Nazwa pytania jest zbyt długa.",
              },
              pattern: {
                value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż _-]{1,}$/,
                message: "Nieprawidłowa nazwa pytania.",
              },
            })}
          />
          <label className="label mb-5">
            {errors.nazwa && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.nazwa.message}
              </span>
            )}
          </label>

          <div className="flex">
            <div className="w-[260px]">Czas trwania odpowiedzi: </div>
            <div className="grid items-center w-[100%]">
              <input
                type="range"
                min={1}
                max={180}
                defaultValue={props.additionalInformation.czas}
                className="w-full range"
                step={1}
                {...register("czas", {
                  onChange: (e) => {
                    const newValue = e.target.value;
                    setTime(newValue);
                  },
                })}
              />
            </div>
            <div className="w-[120px] text-right grid items-center justify-end">
              {time} min
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={() => changeStep("down")}
              className="btn btn-primary w-[150px]"
            >
              <TiArrowLeftThick />
              wstecz
            </button>
            <button type="submit" className="btn btn-primary w-[150px]">
              Dalej <TiArrowRightThick />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecondStep;
