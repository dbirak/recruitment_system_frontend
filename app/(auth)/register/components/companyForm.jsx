"use client";

import { axiosBase } from "@/utils/api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const CompanyForm = () => {
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

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const registerRequest = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/auth/register/company", data)
        .then((res) => {
          const token = res.data.token;
          const role = res.data.data.role.role_name;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          window.localStorage.setItem("name", res.data.company.name);

          window.location = "/company/profile";
        })
        .catch((error) => {
          if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }

            if (
              error.response.data.message ==
              "Podane hasła różnią się od siebie!"
            ) {
              setError("hasło", { message: "" });
              setError("powtórz hasło", {
                message: error.response.data.message,
              });
            }
          } else console.log(error);

          setIsLoading(false);
        })
        .finally(() => {});
    },
  });

  const onSubmitHandler = async (data) => {
    data.województwo = parseInt(data.województwo);
    setIsLoading(true);

    registerRequest.mutate(data);
  };

  return (
    <div className="max-h-[468px] pe-3 overflow-y-scroll">
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
          placeholder="Nazwa przedsiębiorstwa"
          className={errors.nazwa ? styleInputError : styleInputCorrect}
          {...register("nazwa", {
            required: "Pole nazwa przedsiębiorstwa jest wymagane.",
            maxLength: {
              value: 50,
              message: "Podana nazwa jest zbyt długa.",
            },
            pattern: {
              value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż. _-]{1,}$/,
              message: "Nieprawidłowa nazwa.",
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

        <input
          type="text"
          placeholder="Ulica"
          className={errors.ulica ? styleInputError : styleInputCorrect}
          {...register("ulica", {
            required: "Pole ulica jest wymagane.",
            maxLength: {
              value: 30,
              message: "Podana ulica jest zbyt długia.",
            },
            pattern: {
              value: /^[a-zA-Z0-9Ą-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż. _-]{1,}$/,
              message: "Nieprawidłowa ulica.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.ulica && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.ulica.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Kod pocztowy"
          className={
            errors["kod pocztowy"] ? styleInputError : styleInputCorrect
          }
          {...register("kod pocztowy", {
            required: "Pole kod pocztowy jest wymagane.",
            maxLength: {
              value: 6,
              message: "Podany kod pocztowy jest zbyt długi.",
            },
            pattern: {
              value: /\d{2}-\d{3}/,
              message: "Proszę podać kod pocztowy w formacie XX-XXX.",
            },
          })}
        />
        <label className="label mb-5">
          {errors["kod pocztowy"] && (
            <span className="label-text-alt text-error text-[13px]">
              {errors["kod pocztowy"].message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Miasto"
          className={errors.miasto ? styleInputError : styleInputCorrect}
          {...register("miasto", {
            required: "Pole miasto jest wymagane.",
            maxLength: {
              value: 30,
              message: "Podana miasto jest zbyt długie.",
            },
            pattern: {
              value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż _-]{1,}$/,
              message: "Niepoprawne miasto.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.miasto && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.miasto.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Numer KRS (opcjonalnie)"
          className={errors.krs ? styleInputError : styleInputCorrect}
          {...register("krs", {
            maxLength: {
              value: 10,
              message: "Podany KRS jest zbyt długi.",
            },
            pattern: {
              value: /^$|^[0-9]{10}$/,
              message: "Niepoprawny numer KRS.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.krs && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.krs.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Numer REGON"
          className={errors.regon ? styleInputError : styleInputCorrect}
          {...register("regon", {
            required: "Pole numer REGON jest wymagane.",
            maxLength: {
              value: 9,
              message: "Podany numer REGON jest zbyt długi.",
            },
            pattern: {
              value: /^[0-9]{9,9}$/,
              message: "Niepoprawny numer REGON.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.regon && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.regon.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Numer NIP"
          className={errors.nip ? styleInputError : styleInputCorrect}
          {...register("nip", {
            required: "Pole numer NIP jest wymagane.",
            maxLength: {
              value: 10,
              message: "Podany numer NIP jest zbyt długi.",
            },
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Niepoprawny numer NIP.",
            },
          })}
        />
        <label className="label mb-5">
          {errors.nip && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.nip.message}
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Numer telefonu"
          className={
            errors["numer telefonu"] ? styleInputError : styleInputCorrect
          }
          {...register("numer telefonu", {
            required: "Pole numer telefonu jest wymagane.",
            maxLength: {
              value: 9,
              message: "Podany numer telefonu jest zbyt długi.",
            },
            pattern: {
              value: /^[0-9]{9,9}$/,
              message: "Niepoprawny numer telefonu.",
            },
          })}
        />
        <label className="label mb-5">
          {errors["numer telefonu"] && (
            <span className="label-text-alt text-error text-[13px]">
              {errors["numer telefonu"].message}
            </span>
          )}
        </label>

        <select
          className={
            errors.województwo ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={"Województwo"}
          {...register("województwo", {
            required: "Pole województwo jest wymagane.",
            minLength: {
              value: 1,
              message: "Niepoprawne województwo.",
            },
          })}
        >
          <option value="0" defaultValue disabled>
            Województwo
          </option>
          <option value="1">Dolnośląskie</option>
          <option value="2">Kujawsko-Pomorskie</option>
          <option value="3">Lubelskie</option>
          <option value="4">Lubuskie</option>
          <option value="5">Łódzkie</option>
          <option value="6">Małopolskie</option>
          <option value="7">Mazowieckie</option>
          <option value="8">Opolskie</option>
          <option value="9">Podkarpackie</option>
          <option value="10">Podlaskie</option>
          <option value="11">Pomorskie</option>
          <option value="12">Śląskie</option>
          <option value="13">Świętokrzyskie</option>
          <option value="14">Warmińsko-Mazurskie</option>
          <option value="15">Wielkopolskie</option>
          <option value="16">Zachodniopomorskie</option>
        </select>

        <label className="label mb-5">
          {errors.województwo && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.województwo.message}
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
              value="Zarejestruj się"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
