"use client";

import MainContainer from "@/components/layouts/mainContainer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosBase } from "@/utils/api/axios";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useMutation } from "react-query";
import Logo from "../../components/logo";
import Loading2 from "@/components/loadings/loading2";
import Swal from "sweetalert2";

export const metadata = {
  title: "Zresetuj hasło w systemie",
  description: "",
};

const ResetPasswordPage = (props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const resetPassword = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/auth/reset-password", data)
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
            router.push("/login");
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Błąd",
            text: "Wystąpił błąd podczes zmiany hasła!",
            icon: "error",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--er))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            router.push("/login");
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    setIsLoading(true);
    data.token = props.params.token;
    resetPassword.mutate(data);
  };

  return (
    <div>
      <ProtectRoute role="null">
        <div className="bg-[url('/assets/image2.jpg')] py-7 pt-[80px] px-5 hero block min-h-screen">
          <div className="hero-content block max-w-[500px] mx-auto p-5 bg-base-100 shadow-lg">
            <Logo />

            <div className="border-b-2 border-dotted border-neutral my-5"></div>
            <div>
              <h1 className="font-semibold text-[26px] text-center mb-5">
                Resetowanie hasła
              </h1>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                      message: "Pole nowe hasło jest zbyt długie.",
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
                      message: "Pole powtórz nowe hasło jest zbyt długie.",
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

                <div className="w-[150px] mx-auto mt-3">
                  {isLoading ? (
                    <button className="btn btn-neutral w-[150px] btn-disabled">
                      <span className="loading loading-spinner"></span>
                    </button>
                  ) : (
                    <input
                      className="btn btn-neutral w-[150px]"
                      type="submit"
                      value="Resetuj hasło"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </ProtectRoute>
    </div>
  );
};

export default ResetPasswordPage;
