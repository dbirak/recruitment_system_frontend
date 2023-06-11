"use client";

import MainContainer from "@/components/layouts/mainContainer";
import Loading from "@/components/loadings/loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../components/logo";
import { axiosBase } from "@/utils/api/axios";

export const metadata = {
  title: "Zaloguj się na swoje konto w WorkHuner",
  description: "",
};

const LoginPage = () => {
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

  const onSubmitHandler = async (data) => {
    setIsLoading(true);

    await axiosBase
      .post("/auth/login", data)
      .then((res) => {
        const token = res.data.token;
        const role = res.data.data.role.role_name;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        router.push("/");
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
  };

  return (
    <div>
      <MainContainer>
        <div className="max-w-[500px] mx-auto p-5 bg-base-300">
          <Logo />

          <div className="border-b-2 border-dotted border-primary my-5"></div>
          <div>
            <h1 className="font-semibold text-[26px] text-center mb-5">
              Logowanie
            </h1>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <input
                type="text"
                placeholder="Adres e-mail"
                className={errors.email ? styleInputError : styleInputCorrect}
                {...register("email", {
                  required: "Pole email jest wymagane.",
                  maxLength: {
                    value: 30,
                    message: "Adres email jest zbyt długi.",
                  },
                  pattern: {
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                    message: "Nieprawidłowy adres email.",
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

              <input
                type="password"
                placeholder="Hasło"
                className={errors.hasło ? styleInputError : styleInputCorrect}
                {...register("hasło", {
                  required: "Pole hasło jest wymagane",
                  maxLength: {
                    value: 20,
                    message: "Pole hasło jest zbyt długie.",
                  },
                })}
              />
              <label className="label mb-5">
                {errors.hasło && (
                  <span className="label-text-alt text-error text-[13px]">
                    {errors.hasło.message}
                  </span>
                )}
              </label>

              <div className="w-[150px] mx-auto mt-3">
                {isLoading ? (
                  <button className="btn btn-primary w-[150px] btn-disabled">
                    <span className="loading loading-spinner"></span>
                  </button>
                ) : (
                  <input
                    className="btn btn-primary w-[150px]"
                    type="submit"
                    value="Zaloguj się"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default LoginPage;