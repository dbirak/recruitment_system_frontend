"use client";

import MainContainer from "@/components/layouts/mainContainer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosBase } from "@/utils/api/axios";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useMutation } from "react-query";
import Logo from "../components/logo";
import Loading2 from "@/components/loadings/loading2";
import Swal from "sweetalert2";

export const metadata = {
  title: "Zresetuj hasło w systemie",
  description: "",
};

const ResetPasswordPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const loginRequest = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/auth/forgot-password", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Twój link resetujący hasło został wysłany na podany adres e-mail!",
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
          if (error.response.status == 401) {
            setError("email", { message: "" });
            setError("hasło", { message: error.response.data.message });
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
    setIsLoading(true);
    loginRequest.mutate(data);
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
                  type="text"
                  placeholder="Wpisz swój adres e-mail"
                  className={errors.email ? styleInputError : styleInputCorrect}
                  {...register("email", {
                    required: "Pole e-mail jest wymagane.",
                    maxLength: {
                      value: 30,
                      message: "Adres e-mail jest zbyt długi.",
                    },
                    pattern: {
                      value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                      message: "Nieprawidłowy adres e-mail.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors.email && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors.email.message}
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
