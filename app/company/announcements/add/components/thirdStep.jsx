"use client";

import Loading from "@/components/loadings/loading";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const ThirdStep = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
    getValues,
  } = useForm();

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const changeStep = async (activities) => {
    let data = getValues();

    data.kategoria = parseInt(data.kategoria);
    data.umowa = parseInt(data.umowa);
    data.czas_pracy = parseInt(data.czas_pracy);
    data.typ_pracy = parseInt(data.typ_pracy);

    props.updateAnnoucementInfo(data);
    props.changeStep(activities);
  };

  const getAddAnnouncementInfo = useQuery("getAddAnnouncementInfo", () => {
    axiosWithBearer
      .get("/company/announcement/info")
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
  });

  const onSubmitHandler = async (data) => {
    data.kategoria = parseInt(data.kategoria);
    data.umowa = parseInt(data.umowa);
    data.czas_pracy = parseInt(data.czas_pracy);
    data.typ_pracy = parseInt(data.typ_pracy);

    let additionalInfo = {
      kategoria: info.categories.find((item) => item.id === data.kategoria),
      umowa: info.contracts.find((item) => item.id === data.umowa),
      czas_pracy: info.workTimes.find((item) => item.id === data.czas_pracy),
      typ_pracy: info.workTypes.find((item) => item.id === data.typ_pracy),
    };

    await props.updateAnnoucementInfo(data);
    await props.setAdditionalInformation(additionalInfo);

    props.changeStep("up");
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <select
          className={
            errors.kategoria ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={props.announcementInfo.kategoria}
          {...register("kategoria", {
            pattern: {
              value: /^(?!0$).+$/,
              message: "Proszę wybrać kategorię.",
            },
          })}
        >
          <option key={0} value="0" defaultValue>
            Kategoria
          </option>
          {info.categories.map((item) => (
            <option key={item.id} value={parseInt(item.id)}>
              {item.category_name}
            </option>
          ))}
        </select>
        <label className="label mb-5">
          {errors.kategoria && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.kategoria.message}
            </span>
          )}
        </label>

        <select
          className={
            errors.umowa ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={props.announcementInfo.umowa}
          {...register("umowa", {
            pattern: {
              value: /^(?!0$).+$/,
              message: "Proszę wybrać rodzaj umowy.",
            },
          })}
        >
          <option key={0} value="0" defaultValue>
            Rodzaj umowy
          </option>
          {info.contracts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.contract_name}
            </option>
          ))}
        </select>
        <label className="label mb-5">
          {errors.umowa && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.umowa.message}
            </span>
          )}
        </label>

        <select
          className={
            errors.czas_pracy ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={props.announcementInfo.czas_pracy}
          {...register("czas_pracy", {
            pattern: {
              value: /^(?!0$).+$/,
              message: "Proszę wybrać wymiar czasu pracy.",
            },
          })}
        >
          <option key={0} value="0" defaultValue>
            Wymiar czasowy
          </option>
          {info.workTimes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.work_time_name}
            </option>
          ))}
        </select>
        <label className="label mb-5">
          {errors.czas_pracy && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.czas_pracy.message}
            </span>
          )}
        </label>

        <select
          className={
            errors.typ_pracy ? styleInputErrorSelect : styleInputCorrecSelect
          }
          defaultValue={props.announcementInfo.typ_pracy}
          {...register("typ_pracy", {
            pattern: {
              value: /^(?!0$).+$/,
              message: "Proszę wybrać model pracy.",
            },
          })}
        >
          <option key={0} value="0" defaultValue>
            Typ pracy
          </option>
          {info.workTypes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.work_type_name}
            </option>
          ))}
        </select>
        <label className="label mb-5">
          {errors.typ_pracy && (
            <span className="label-text-alt text-error text-[13px]">
              {errors.typ_pracy.message}
            </span>
          )}
        </label>

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
  );
};

export default ThirdStep;
