"use client";

import Modal from "@/components/modals/modal";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

const BeginNewStepModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const beginNewStepRequest = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/company/announcement/new-step", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Nowy etap został rozpoczęty!",
            icon: "success",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--su))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            location.reload();
          });
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else if (error.response.status == 422) {
            Swal.fire({
              title: "Błąd",
              text: "Nie można rozpocząć nowego etapu, ponieważ zawiera w sobie niepoprawne dane!",
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
          } else
            Swal.fire({
              title: "Błąd",
              text: error.response.data.message,
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    const selectedDateTime = new Date(data.data_zakonczenia);
    const today = new Date();

    selectedDateTime.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDateTime <= today) {
      setError("data_zakonczenia", {
        type: "manual",
        message:
          "Data zakończenia etapu musi być późniejsza, niż dzisiejsza data.",
      });
      return;
    }

    let json = {
      data_zakonczenia: data.data_zakonczenia,
      announcement_id: props.stepModal.announcement_id,
      step_id: props.stepModal.id,
      step_number: props.stepModal.step_number,
    };

    setIsLoading(true);

    beginNewStepRequest.mutate(json);
  };

  const closeBeginNewStepModal = () => {
    props.closeBeginNewStepModal();
  };

  return (
    <Modal>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        Rozpocznij nowy etap
      </h1>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex justify-between mx-0 ">
          <div className=" grid items-center w-[240px] h-[48px]">
            Data zakończenia nowego etapu:
          </div>
          <div className="w-[calc(100%-250px)] h-fit">
            <input
              type="date"
              placeholder="Data zakończenia etapu"
              className={
                errors.data_zakonczenia ? styleInputError : styleInputCorrect
              }
              {...register("data_zakonczenia", {
                required: "Data zakończenia etapu jest wymagana.",
              })}
            />
            <label className="label mb-5">
              {errors.data_zakonczenia && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors.data_zakonczenia.message}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="w-full mx-auto mt-3 flex justify-around">
          {isLoading ? (
            <button
              type="submit"
              className="btn btn-neutral w-[150px] btn-disabled"
            >
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button type="submit" className="btn btn-neutral w-[150px]">
              Rozpocznij
            </button>
          )}

          <button
            className="block btn btn-base-100 w-[150px]"
            onClick={closeBeginNewStepModal}
          >
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BeginNewStepModal;
