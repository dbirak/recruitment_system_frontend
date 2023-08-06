"use client";

import Loading from "@/components/loadings/loading";
import { axiosWithBearer } from "@/utils/api/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus } from "react-icons/fa";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const FourthStep = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [radioInfo, setRadioInfo] = useState(props.earnInformation.radioInfo);
  const [selectedValue, setSelectedV] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
    getValues,
    watch,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const changeStep = async (activities) => {
    let temp = {
      min_wynagrodzenie: null,
      max_wynagrodzenie: null,
      typ_wynagrodzenia: 0,
    };

    if (radioInfo == 1) {
      temp.min_wynagrodzenie = null;
      temp.max_wynagrodzenie = null;
      temp.typ_wynagrodzenia = 0;
    } else if (radioInfo == 2) {
      temp.min_wynagrodzenie = getValues("min_wynagrodzenie");
      temp.max_wynagrodzenie = getValues("max_wynagrodzenie");
      temp.typ_wynagrodzenia = parseInt(getValues("typ_wynagrodzenia"));
    } else if (radioInfo == 3) {
      temp.min_wynagrodzenie = getValues("min_wynagrodzenie");
      temp.max_wynagrodzenie = null;
      temp.typ_wynagrodzenia = parseInt(getValues("typ_wynagrodzenia"));
    }

    let earnInfoTemp = {
      radioInfo: parseInt(radioInfo),
      selectValue: info.find(
        (item) => item.id === parseInt(getValues("typ_wynagrodzenia"))
      ),
    };

    props.setEarnInformation(earnInfoTemp);
    props.updateAnnoucementInfo(temp);

    props.changeStep(activities);
  };

  const radioValue = watch("radio1", props.earnInformation.radioInfo);
  useEffect(() => {
    setRadioInfo(radioValue);
  }, [radioValue]);

  const getAddAnnouncementEarnTimeInfo = useQuery(
    "getAddAnnouncementEarnTimeInfo",
    () => {
      axiosWithBearer
        .get("/company/announcement/earn-time")
        .then((res) => {
          setInfo(res.data);
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else {
            Swal.fire({
              title: "Błąd",
              text: "Nie można pobrać informacji, ponieważ wystąpił błąd podczas połączenia z serwerem!",
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  );

  const onSubmitHandler = async (data) => {
    let temp = {
      min_wynagrodzenie: null,
      max_wynagrodzenie: null,
      typ_wynagrodzenia: 0,
    };

    if (
      radioInfo == 2 &&
      parseFloat(data.max_wynagrodzenie) <= parseFloat(data.min_wynagrodzenie)
    ) {
      Swal.fire({
        title: "Błąd",
        text: "Maksymalna kwota musi być większa od kwoty minimalnej!",
        icon: "error",
        color: "hsl(var(--n))",
        background: "hsl(var(--b1))",
        confirmButtonColor: "hsl(var(--er))",
        allowOutsideClick: false,
        backdrop: "#000000a6",
        confirmButtonText: "Zamknij",
      }).then((result) => {});
    } else {
      if (radioInfo == 1) {
        temp.min_wynagrodzenie = null;
        temp.max_wynagrodzenie = null;
        temp.typ_wynagrodzenia = 0;
      } else if (radioInfo == 2) {
        if (parseFloat(data.min_wynagrodzenie) > 99999.99) {
          setError("min_wynagrodzenie", {
            type: "manual",
            message: "Kwota wynagrodzenia jest za wysoka.",
          });
          return;
        }
        if (parseFloat(data.max_wynagrodzenie) > 99999.99) {
          setError("max_wynagrodzenie", {
            type: "manual",
            message: "Kwota wynagrodzenia jest za wysoka.",
          });
          return;
        }

        temp.min_wynagrodzenie = parseFloat(data.min_wynagrodzenie);
        temp.max_wynagrodzenie = parseFloat(data.max_wynagrodzenie);
        temp.typ_wynagrodzenia = parseInt(data.typ_wynagrodzenia);
      } else if (radioInfo == 3) {
        if (parseFloat(data.min_wynagrodzenie) > 99999.99) {
          setError("min_wynagrodzenie", {
            type: "manual",
            message: "Kwota wynagrodzenia jest za wysoka.",
          });
          return;
        }

        temp.min_wynagrodzenie = parseFloat(data.min_wynagrodzenie);
        temp.max_wynagrodzenie = null;
        temp.typ_wynagrodzenia = parseInt(data.typ_wynagrodzenia);
      }

      let earnInfoTemp = {
        radioInfo: parseInt(radioInfo),
        selectValue: info.find(
          (item) => item.id === parseInt(data.typ_wynagrodzenia)
        ),
      };

      await props.setEarnInformation(earnInfoTemp);
      await props.updateAnnoucementInfo(temp);
      props.changeStep("up");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="font-semibold mb-3 mt-2">
        Czy chcesz zamieścić w ogłoszeniu informacje dotyczące wynagrodzenia:
      </h2>
      <div className="form-control">
        <label className="label cursor-pointer flex justify-start">
          <input
            type="radio"
            name="radio1"
            className="radio checked:bg-primary me-3"
            value={1}
            defaultChecked={props.earnInformation.radioInfo === 1}
            {...register("radio1")}
          />
          <span className="label-text text-left">
            Nie chce podawać zarobków
          </span>
        </label>
        <label className="label cursor-pointer flex justify-start">
          <input
            type="radio"
            name="radio1"
            value={2}
            defaultChecked={props.earnInformation.radioInfo === 2}
            className="radio checked:bg-primary me-3"
            {...register("radio1")}
          />
          <span className="label-text text-left">
            Chce podać widełki wynagrodzenia
          </span>
        </label>
        <label className="label cursor-pointer flex justify-start">
          <input
            type="radio"
            name="radio1"
            value={3}
            defaultChecked={props.earnInformation.radioInfo === 3}
            className="radio checked:bg-primary me-3"
            {...register("radio1")}
          />
          <span className="label-text text-left">
            Chce podać konkretną kwotę wynagrodzenia
          </span>
        </label>
      </div>

      {radioInfo == 1 && (
        <div className="flex justify-between mt-10 overflow-x-hidden">
          <button
            onClick={() => changeStep("down")}
            className="btn btn-primary w-[150px]"
          >
            <TiArrowLeftThick />
            wstecz
          </button>
          <button
            onClick={onSubmitHandler}
            className="btn btn-primary w-[150px]"
          >
            dalej
            <TiArrowRightThick />
          </button>
        </div>
      )}

      {radioInfo == 2 && (
        <div className="mt-7">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex justify-between">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Kwota minimalna (PLN)"
                  className={
                    errors.min_wynagrodzenie
                      ? styleInputError
                      : styleInputCorrect
                  }
                  defaultValue={props.announcementInfo.min_wynagrodzenie}
                  {...register("min_wynagrodzenie", {
                    required: "Minimalne wynagrodzenie jest wymagane.",
                    maxLength: {
                      value: 10,
                      message: "Minimalne wynagrodzenie jest zbyt długie.",
                    },
                    pattern: {
                      value: /^[1-9]\d*(\.\d{1,2})?$/,
                      message: "Nieprawidłowa kwota.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors.min_wynagrodzenie && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors.min_wynagrodzenie.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="w-[110px] h-[48px] text-center grid items-center">
                <span className=" text-[20px] text-center grid items-center mx-auto">
                  <FaMinus />
                </span>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Kwota maksymalna (PLN)"
                  className={
                    errors.max_wynagrodzenie
                      ? styleInputError
                      : styleInputCorrect
                  }
                  defaultValue={props.announcementInfo.max_wynagrodzenie}
                  {...register("max_wynagrodzenie", {
                    required: "Maksymalne wynagrodzenie jest wymagane.",
                    maxLength: {
                      value: 10,
                      message: "Maksymalne wynagrodzenie jest zbyt długie.",
                    },
                    pattern: {
                      value: /^[1-9]\d*(\.\d{1,2})?$/,
                      message: "Nieprawidłowa kwota.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors.max_wynagrodzenie && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors.max_wynagrodzenie.message}
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div>
              <select
                className={
                  errors.typ_wynagrodzenia
                    ? styleInputErrorSelect
                    : styleInputCorrecSelect
                }
                defaultValue={props.announcementInfo.typ_wynagrodzenia}
                {...register("typ_wynagrodzenia", {
                  pattern: {
                    value: /^(?!0$).+$/,
                    message: "Proszę wybrać rodzaj wynagrodzenia.",
                  },
                })}
              >
                <option key={0} value="0" defaultValue>
                  Rodzaj wynagrodzenia
                </option>
                {info.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.earn_time_name}
                  </option>
                ))}
              </select>
              <label className="label mb-5">
                {errors.typ_wynagrodzenia && (
                  <span className="label-text-alt text-error text-[13px]">
                    {errors.typ_wynagrodzenia.message}
                  </span>
                )}
              </label>
            </div>

            <div className="flex justify-between mt-10 overflow-x-hidden">
              <button
                onClick={() => changeStep("down")}
                className="btn btn-primary w-[150px]"
              >
                <TiArrowLeftThick />
                wstecz
              </button>
              <button type="submit" className="btn btn-primary w-[150px]">
                Dalej <TiArrowRightThick />
              </button>
            </div>
          </form>
        </div>
      )}

      {radioInfo == 3 && (
        <div className="mt-7">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex justify-between">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Podaj kwotę (PLN)"
                  className={
                    errors.min_wynagrodzenie
                      ? styleInputError
                      : styleInputCorrect
                  }
                  defaultValue={props.announcementInfo.min_wynagrodzenie}
                  {...register("min_wynagrodzenie", {
                    required: "Kwota wynagrodzenia jest wymagana.",
                    maxLength: {
                      value: 10,
                      message: "Kwota wynagrodzenia jest zbyt długia.",
                    },
                    pattern: {
                      value: /^[1-9]\d*(\.\d{1,2})?$/,
                      message: "Nieprawidłowa kwota.",
                    },
                  })}
                />
                <label className="label mb-5">
                  {errors.min_wynagrodzenie && (
                    <span className="label-text-alt text-error text-[13px]">
                      {errors.min_wynagrodzenie.message}
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div>
              <select
                className={
                  errors.typ_wynagrodzenia
                    ? styleInputErrorSelect
                    : styleInputCorrecSelect
                }
                defaultValue={props.announcementInfo.typ_wynagrodzenia}
                {...register("typ_wynagrodzenia", {
                  pattern: {
                    value: /^(?!0$).+$/,
                    message: "Proszę wybrać rodzaj wynagrodzenia.",
                  },
                })}
              >
                <option key={0} value="0" defaultValue>
                  Rodzaj wynagrodzenia
                </option>
                {info.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.earn_time_name}
                  </option>
                ))}
              </select>
              <label className="label mb-5">
                {errors.typ_wynagrodzenia && (
                  <span className="label-text-alt text-error text-[13px]">
                    {errors.typ_wynagrodzenia.message}
                  </span>
                )}
              </label>
            </div>

            <div className="flex justify-between mt-10 overflow-x-hidden">
              <button
                onClick={() => changeStep("down")}
                className="btn btn-primary w-[150px]"
              >
                <TiArrowLeftThick />
                wstecz
              </button>
              <button type="submit" className="btn btn-primary w-[150px]">
                Dalej <TiArrowRightThick />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FourthStep;
