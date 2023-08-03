"use client";

import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import moment from "moment";

const SixthStep = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const changeStep = async (activities) => {
    props.changeStep(activities);
    console.log(props.earnInformation);
  };

  const addAnnouncementRequest = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/company/announcement", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Pytanie zostało poprawnie utworzone!",
            icon: "success",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--su))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            router.push("/company/modules/send-files");
          });
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              Swal.fire({
                title: "Błąd",
                text: "Nie można utworzyć pytania, ponieważ zawiera w sobie niepoprawne dane!",
                icon: "error",
                color: "hsl(var(--n))",
                background: "hsl(var(--b1))",
                confirmButtonColor: "hsl(var(--er))",
                allowOutsideClick: false,
                backdrop: "#000000a6",
                confirmButtonText: "Zamknij",
              }).then((result) => {});
            }
          } else console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const submitAnnouncement = () => {
    setIsLoading(true);
    let data = { ...props.announcementInfo, etapy: props.stepInformation };

    console.log(data);
    //addAnnouncementRequest.mutate(data);
  };

  return (
    <div>
      <table className="table text-center">
        <tbody>
          {/* row 1 */}
          <tr>
            <th className="w-1/2">Nazwa stanowiska</th>
            <td>{props.announcementInfo.nazwa}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th className="w-1/2">Opis</th>
            <td>{props.announcementInfo.opis}</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th className="w-1/2">Data zakończenia</th>
            <td>
              {moment
                .utc(props.announcementInfo.data_zakonczenia)
                .format("DD.MM.YYYY")}
            </td>
          </tr>
          {/* row 4 */}
          <tr>
            <th className="w-1/2">Kategoria</th>
            <td>{props.additionalInformation.kategoria.category_name}</td>
          </tr>
          {/* row 5 */}
          <tr>
            <th className="w-1/2">Rodzaj umowy</th>
            <td>{props.additionalInformation.umowa.contract_name}</td>
          </tr>
          {/* row 6 */}
          <tr>
            <th className="w-1/2">Wymiar czasowy</th>
            <td>{props.additionalInformation.czas_pracy.work_time_name}</td>
          </tr>
          {/* row 7 */}
          <tr>
            <th className="w-1/2">Typ pracy</th>
            <td>{props.additionalInformation.typ_pracy.work_type_name}</td>
          </tr>
          {/* row 8 */}
          <tr>
            <th className="w-1/2">Wynagrodzenie</th>
            <td>
              {props.announcementInfo.min_wynagrodzenie === null
                ? "Brak informacji"
                : props.announcementInfo.max_wynagrodzenie === null
                ? props.announcementInfo.min_wynagrodzenie +
                  " zł " +
                  props.earnInformation.selectValue.earn_time_name
                : props.announcementInfo.min_wynagrodzenie +
                  " zł - " +
                  props.announcementInfo.max_wynagrodzenie +
                  " zł " +
                  props.earnInformation.selectValue.earn_time_name}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Obowiązki przyszłego pracownika:
          </div>
        </div>

        {props.announcementInfo.obowiazki.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Rzeczy, które wymagasz od przyszłego pracownika:
          </div>
        </div>

        {props.announcementInfo.wymagania.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Rzeczy, które oferujesz przyszłemu pracownikowi:
          </div>
        </div>

        {props.announcementInfo.oferta.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-center text-[14px] w-[10%] grid items-center">
            Numer etapu
          </div>
          <div className="font-bold w-[45%] text-center text-[14px] grid items-center">
            Nazwa modułu
          </div>
          <div className="font-bold w-[45%] text-center text-[14px] grid items-center">
            Nazwa zadania
          </div>
        </div>

        <div className="flex justify-between my-5">
          <div className="text-[14px] text-center w-[10%] grid items-center">
            Etap 1
          </div>
          <div className="text-[14px] w-[45%] text-center grid items-center">
            Przesyłanie plików
          </div>
          <div className="text-[14px] w-[45%] text-center grid items-center">
            Prośba o przesłanie swojego CV
          </div>
        </div>

        {props.stepInformation.map((item, index) => (
          <div key={index} className="flex justify-between my-5">
            <div className="text-[14px] text-center w-[10%] grid items-center">
              Etap {index + 2}
            </div>
            <div className="text-[14px] w-[45%] text-center grid items-center">
              {item.module === "test"
                ? "Test"
                : item.module === "openTask"
                ? "Pytanie otwarte"
                : "Przesyłanie plików"}
            </div>
            <div className="text-[14px] w-[45%] text-center grid items-center">
              {item.task.name}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10 overflow-x-hidden">
        <button
          onClick={() => changeStep("down")}
          className="btn btn-primary w-[150px]"
        >
          <TiArrowLeftThick />
          wstecz
        </button>
        {isLoading ? (
          <button
            onClick={submitAnnouncement}
            className="btn btn-success w-[150px] btn-disabled"
          >
            <span className="loading loading-spinner"></span>
          </button>
        ) : (
          <button
            onClick={submitAnnouncement}
            className="btn btn-success w-[150px]"
          >
            utwórz pytanie
          </button>
        )}
      </div>
    </div>
  );
};

export default SixthStep;
