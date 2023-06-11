import { axiosBase } from "@/utils/api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const UserForm = () => {
  const ruter = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const registerRequest = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/auth/register/user", data)
        .then((res) => {
          const token = res.data.token;
          const role = res.data.data.role.role_name;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          router.push("/");
        })
        .catch((error) => {
          if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }

            if (error.response.data.message) {
              setError("hasło", { message: "" });
              setError("powtórz hasło", {
                message: error.response.data.message,
              });
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
    registerRequest.mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type="text"
          placeholder="Imię"
          className={errors.imię ? styleInputError : styleInputCorrect}
          {...register("imię", {
            required: "Pole imię jest wymagane.",
            maxLength: {
              value: 30,
              message: "Podane imię jest zbyt długie.",
            },
            pattern: {
              value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż _-]{1,}$/,
              message: "Nieprawidłowe imię.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.imię && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.imię.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Nazwisko"
          className={errors.nazwisko ? styleInputError : styleInputCorrect}
          {...register("nazwisko", {
            required: "Pole nazwisko jest wymagane.",
            maxLength: {
              value: 30,
              message: "Podane nazwisko jest zbyt długie.",
            },
            pattern: {
              value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż _-]{1,}$/,
              message: "Nieprawidłowe nazwisko.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.nazwisko && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.nazwisko.message}
            </span>
          )}
        </label>

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

        <input
          type="password"
          placeholder="Powtórz hasło"
          className={
            errors["powtórz hasło"] ? styleInputError : styleInputCorrect
          }
          {...register("powtórz hasło", {
            required: "Pole powtórz hasło jest wymagane",
            maxLength: {
              value: 20,
              message: "Pole powtórz hasło jest zbyt długie.",
            },
          })}
        />
        <label className="label mb-5">
          {errors["powtórz hasło"] && (
            <span className="label-text-alt text-error text-[13px]">
              {errors["powtórz hasło"].message}
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
              value="Zarejestruj się"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
