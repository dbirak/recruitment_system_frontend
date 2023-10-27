"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { axiosWithBearer } from "@/utils/api/axios";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const styleInputCorrect =
    "input input-bordered w-full break-words owerflow-y-auto";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const changePassword = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      axiosWithBearer
        .post("/auth/company/change-password", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Twoje hasło zostało zmienione!",
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
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }
          } else {
            if (
              error.response.data.message === "Obecne hasło jest niepoprawne!"
            ) {
              setError("obecne hasło", {
                message: "Obecne hasło jest niepoprawne!",
              });
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    setIsLoading(true);

    changePassword.mutate(data);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="settings">
          <CompanyContainer>
            <Title name="Ustawienia" />
            <div className="max-w-[450px] mx-auto px-2">
              <h1 className="text-[25px] text-center mb-4 text-neutral font-semibold">
                Zmiana hasła
              </h1>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <input
                  type="password"
                  placeholder="Obecne hasło"
                  className={
                    errors["obecne hasło"] ? styleInputError : styleInputCorrect
                  }
                  {...register("obecne hasło", {
                    required: "Pole obecne hasło jest wymagane",
                    maxLength: {
                      value: 20,
                      message: "Wartośc pola obecne hasło jest zbyt długie.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors["obecne hasło"] && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors["obecne hasło"].message}
                    </span>
                  )}
                </label>

                <input
                  type="password"
                  placeholder="Nowe hasło"
                  className={
                    errors["nowe hasło"] ? styleInputError : styleInputCorrect
                  }
                  {...register("nowe hasło", {
                    required: "Pole nowe hasło jest wymagane",
                    maxLength: {
                      value: 20,
                      message: "Wartość pola nowe hasło jest zbyt długie.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors["nowe hasło"] && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors["nowe hasło"].message}
                    </span>
                  )}
                </label>

                <input
                  type="password"
                  placeholder="Powtórz nowe hasło"
                  className={
                    errors["powtórz nowe hasło"]
                      ? styleInputError
                      : styleInputCorrect
                  }
                  {...register("powtórz nowe hasło", {
                    required: "Pole powtórz nowe hasło jest wymagane",
                    maxLength: {
                      value: 20,
                      message:
                        "Wartość pola powtórz nowe hasło jest zbyt długie.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors["powtórz nowe hasło"] && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors["powtórz nowe hasło"].message}
                    </span>
                  )}
                </label>

                <div className="w-full mx-auto mt-3 flex justify-around">
                  {isLoading ? (
                    <button
                      className="block btn btn-neutral w-[150px] btn-disabled"
                      type="submit"
                    >
                      <span className="loading loading-spinner"></span>
                    </button>
                  ) : (
                    <button
                      className="block btn btn-neutral w-[150px]"
                      type="submit"
                    >
                      Zmień hasło
                    </button>
                  )}
                </div>
              </form>
            </div>
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default SettingsPage;
