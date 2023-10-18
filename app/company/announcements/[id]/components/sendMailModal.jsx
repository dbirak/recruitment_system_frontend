"use client";

import Modal3 from "@/components/modals/modal3";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidEnvelope } from "react-icons/bi";
import { TiArrowLeftThick } from "react-icons/ti";
import { useMutation } from "react-query";

const SendMailModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const sendMail = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      axiosWithBearer
        .post("/company/announcement/mail", data)
        .then((res) => {
          props.successMailSend();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }
          } else console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    let json = {
      company_id: props.userInfo.companyInfo.id,
      user_id: props.userInfo.userInfo.id,
      message: data.wiadomość,
      announcement_id: props.userInfo.announcement_id,
    };

    sendMail.mutate(json);
  };

  const styleTextareaCorrect =
    "textarea textarea-bordered h-[150px] text-[16px] w-full";
  const styleTextareaError =
    "textarea textarea-bordered h-[150px] text-[16px] w-full textarea-error text-error";

  const closeSendMailModal = () => {
    if (isLoading) return;
    props.closeSendMailModal();
  };

  return (
    <Modal3>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        Wyślij wiadomość
      </h1>

      <div>
        <div className="alert alert-neutral mb-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Twoja wiadomość zostanie wysłana za pośrednictwem portalu
            WorkHunter. Na przesłaną wiadomość użytkownik nie będzie mieć
            możliwości odpowiedzi, dlatego pamiętaj aby przesłać odpowiednie
            informacje dotyczące kontaktu.
          </span>
        </div>
      </div>

      <div className="mb-7">
        <p className="font-bold">Wiadomość od:</p>
        <p className="">{props.userInfo.companyInfo.name}</p>
      </div>

      <div className="mb-7">
        <p className="font-bold">Wiadomość do:</p>
        <p className="">
          {props.userInfo.userInfo.email} ({props.userInfo.userInfo.name}{" "}
          {props.userInfo.userInfo.surname})
        </p>
      </div>

      <div>
        <p className="font-bold mb-2">Treść wiadomości:</p>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <textarea
            type="text"
            placeholder="Wpisz treść swojej wiadomości"
            className={
              errors.wiadomość ? styleTextareaError : styleTextareaCorrect
            }
            {...register("wiadomość", {
              onChange: (e) => setMessageLength(e.target.value.length),
              required: "wiadomość jest wymagana.",
              maxLength: {
                value: 1000,
                message: "wiadomość jest zbyt długa.",
              },
            })}
          ></textarea>
          <label className="label">
            {errors.wiadomość && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.wiadomość.message}
              </span>
            )}
          </label>
          <div
            className={
              messageLength > 1000
                ? "text-right mb-6 text-error"
                : "text-right mb-6"
            }
          >
            {messageLength} / 1000
          </div>

          <div className="flex gap-5 justify-around w-full">
            <div className="w-full">
              {isLoading ? (
                <button
                  type="submit"
                  className="btn btn-neutral btn-disabled w-full"
                >
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button type="submit" className="btn btn-neutral w-full">
                  <BiSolidEnvelope /> Wyślij
                </button>
              )}
            </div>
            <div className="w-full">
              <button
                onClick={closeSendMailModal}
                className="btn btn-base-100 w-full"
              >
                <TiArrowLeftThick /> Anuluj
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal3>
  );
};

export default SendMailModal;
