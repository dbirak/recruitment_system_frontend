"use client";

import { parse } from "postcss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus } from "react-icons/fa";

const EarnItem = (props) => {
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [earnInfo, setEarnInfo] = useState({
    min_wynagrodzenie: null,
    max_wynagrodzenie: null,
    typ_wynagrodzenia: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
    getValues,
    watch,
    setValue,
    clearErrors,
  } = useForm();

  const styleBadge = !isInputEnabled
    ? "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px] hidden"
    : "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px]";

  const styleInputCorrect = "input input-bordered w-full appearance-none ";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const change = async (value, type) => {
    if (type === "checkbox") {
      setIsInputEnabled(value);

      if (value === false) {
        setValue("min_wynagrodzenie", "");
        setValue("max_wynagrodzenie", "");
        setValue("typ_wynagrodzenia", 0);

        let earn = {
          min_wynagrodzenie: null,
          max_wynagrodzenie: null,
          typ_wynagrodzenia: 0,
        };

        setEarnInfo(earn);

        props.updateSearchInfo(earn);
      }
    } else if (type === "select") {
      let earn = earnInfo;
      earn.typ_wynagrodzenia = parseInt(value);

      setEarnInfo(() => ({
        ...earn,
      }));

      props.updateSearchInfo(earn);
    } else {
      if (type === "max") {
        try {
          let earn = earnInfo;

          let parseDecimal = parseFloat(value);
          earn.max_wynagrodzenie = parseDecimal;

          setEarnInfo(() => ({
            ...earn,
          }));

          props.updateSearchInfo(earn);
        } catch {}
      }

      if (type === "min") {
        try {
          let earn = earnInfo;

          let parseDecimal = parseFloat(value);
          earn.min_wynagrodzenie = parseDecimal;

          setEarnInfo(() => ({
            ...earn,
          }));

          props.updateSearchInfo(earn);
        } catch {}
      }
    }
  };

  return (
    <div className="w-full">
      <div className="collapse collapse-arrow bg-base-100 mb-2 rounded-none">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-md font-medium">
          <div className="flex">
            <div>Zarobki</div>
            <div className={styleBadge}>1</div>
          </div>
        </div>
        <div className="collapse-content">
          <div className="ms-3">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  value={0}
                  onChange={(e) => change(e.target.checked, "checkbox")}
                  type="checkbox"
                  className="checkbox checkbox-sm"
                />
                <span className=" w-full ms-3">Podaj widełki zarobków</span>
              </label>
            </div>
            <div className="w-full mb-3 mt-4">
              <input
                type="number"
                placeholder="Kwota minimalna (PLN)"
                disabled={isInputEnabled === false}
                className={
                  errors.min_wynagrodzenie ? styleInputError : styleInputCorrect
                }
                {...register("min_wynagrodzenie", {
                  onChange: (e) => change(e.target.value, "min"),
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
            </div>
            <div className="w-full mb-3">
              <input
                type="number"
                disabled={isInputEnabled === false}
                placeholder="Kwota maksymalna (PLN)"
                className={
                  errors.max_wynagrodzenie ? styleInputError : styleInputCorrect
                }
                defaultValue=""
                {...register("max_wynagrodzenie", {
                  onChange: (e) => change(e.target.value, "max"),
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
            </div>
            <div className="w-full mb-3">
              <select
                disabled={isInputEnabled === false}
                className={
                  errors.typ_wynagrodzenia
                    ? styleInputErrorSelect
                    : styleInputCorrecSelect
                }
                defaultValue={0}
                {...register("typ_wynagrodzenia", {
                  onChange: (e) => change(e.target.value, "select"),
                  pattern: {
                    value: /^(?!0$).+$/,
                    message: "Proszę wybrać rodzaj wynagrodzenia.",
                  },
                })}
              >
                <option key={0} value="0" defaultValue>
                  Wszystkie rodzaje
                </option>
                {props.data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.earn_time_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnItem;
