"use client";

import { useForm, useFieldArray } from "react-hook-form";
import Modal from "@/components/modals/modal";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const AddQuestionForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "odpowiedzi", // unique name for your Field Array
    }
  );

  const [answerInputs, setAnswerInputs] = useState(["", ""]);

  const styleInputCorrect =
    "input input-bordered w-full break-words owerflow-y-auto";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const onSubmitHandler = async (data) => {
    props.addQuestion(data);
  };

  const addAnswer = () => {
    setAnswerInputs((answerInputs) => [...answerInputs, ""]);
  };

  const removeAnswer = (index) => {
    const updatedAnswers = [...answerInputs];
    updatedAnswers.splice(index, 1);
    setAnswerInputs(updatedAnswers);

    remove(index);
  };

  return (
    <Modal>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        Dodaj nowe pytanie
      </h1>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          placeholder="Treść pytania"
          className={errors.pytanie ? styleInputError : styleInputCorrect}
          {...register("pytanie", {
            required: "Treść pytania jest wymagana.",
            maxLength: {
              value: 200,
              message: "Treść pytania jest zbyt długa.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.pytanie && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.pytanie.message}
            </span>
          )}
        </label>

        <div className="w-[85%] mx-auto border-b-2 h-1 border-dashed mb-8"></div>

        {answerInputs.map((item, index) => {
          const answerFieldName = `odpowiedzi.[${index}].odpowiedz`;
          const answerFieldError = errors?.odpowiedzi?.[index]?.odpowiedz;

          return (
            <div className="mb-8" key={index}>
              <input
                type="text"
                placeholder="Treść odpowiedzi"
                className={
                  answerFieldError ? styleInputError : styleInputCorrect
                }
                {...register(answerFieldName, {
                  required: "Treść odpowiedzi jest wymagana.",
                  maxLength: {
                    value: 200,
                    message: "Treść pytania jest zbyt długa.",
                  },
                })}
              />

              <label className="label">
                {answerFieldError && (
                  <span className="label-text-alt text-error text-[13px]">
                    {answerFieldError.message}
                  </span>
                )}
              </label>

              <div className="flex">
                <div className="flex justify-between w-full">
                  <div>Czy jest prawidłowa?</div>
                  <div className="w-[50px] grid justify-center items-center">
                    <input
                      {...register(`odpowiedzi.${index}.poprawna`)}
                      type="checkbox"
                      className="toggle toggle-sm toggle-success"
                    />
                  </div>
                </div>
                {index !== 0 && index !== 1 ? (
                  <div className="ps-6 text-error grid justify-center items-center text-[20px]">
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => {
                        removeAnswer(index);
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}

        <div
          onClick={addAnswer}
          className="w-full border-2 border-primary border-dashed text-center font-medium mb-6 text-primary p-2 cursor-pointer text-[20px] hover:font-medium hover:scale-[1.03] ease-in-out duration-[0.3s]"
        >
          Dodaj odpowiedź
        </div>

        <div className="w-full mx-auto mt-3 flex justify-around">
          <input
            className="btn btn-success w-[150px]"
            type="submit"
            value="Dodaj pytanie"
          />
          <button
            className="block btn btn-error w-[150px]"
            onClick={props.closeAddQuestionModal}
          >
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddQuestionForm;
