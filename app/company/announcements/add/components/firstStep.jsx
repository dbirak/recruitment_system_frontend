"use client";

import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FirstStep = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleTextareaCorrect =
    "textarea textarea-bordered h-[150px] text-[16px] w-full";
  const styleTextareaError =
    "textarea textarea-bordered h-[150px] text-[16px] w-full textarea-error text-error";

  const changeStep = async (activities) => {
    props.changeStep(activities);
  };

  const onSubmitHandler = async (data) => {
    await props.updateAnnoucementInfo(data);
    props.changeStep("up");
  };

  return (
    <div>
      <div className="mx-auto">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="text"
            placeholder="Nazwa stanowiska pracy"
            className={errors.nazwa ? styleInputError : styleInputCorrect}
            defaultValue={props.announcementInfo.nazwa}
            {...register("nazwa", {
              required: "Nazwa stanowiska pracy jest wymagana.",
              maxLength: {
                value: 100,
                message: "Nazwa stanowiska pracy jest zbyt długa.",
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

          <textarea
            type="text"
            placeholder="Opis stanowiska pracy"
            className={errors.opis ? styleTextareaError : styleTextareaCorrect}
            defaultValue={props.announcementInfo.opis}
            {...register("opis", {
              required: "Opis stanowiska pracy jest wymagany.",
              maxLength: {
                value: 500,
                message: "Opis jest zbyt długi.",
              },
            })}
          ></textarea>
          <label className="label mb-5">
            {errors.opis && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.opis.message}
              </span>
            )}
          </label>

          <div className="flex justify-between mt-10 overflow-x-hidden">
            <div></div>
            {/* <button
              onClick={() => changeStep("down")}
              className="btn btn-primary w-[150px]"
            >
              <TiArrowLeftThick />
              wstecz
            </button> */}
            <button type="submit" className="btn btn-primary w-[150px]">
              Dalej <TiArrowRightThick />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirstStep;
