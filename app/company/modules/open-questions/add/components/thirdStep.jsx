"use client";

import { axiosWithBearer } from "@/utils/api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  TiArrowLeftThick,
  TiArrowRightThick,
  TiTick,
  TiTimes,
} from "react-icons/ti";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const ThirdStep = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addQuestionRequest = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/company/open-task", data)
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
            location.href = "/company/modules/open-questions";
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

  const submitQuestion = () => {
    setIsLoading(true);

    let json = Object.assign(
      {},
      { opis: props.descryption },
      props.additionalInformation
    );

    addQuestionRequest.mutate(json);
  };

  const changeStep = (activities) => {
    props.changeStep(activities);
  };

  return (
    <div>
      <div className="overflow-x-auto mb-5">
        <table className="table text-center">
          <tbody>
            {/* row 1 */}
            <tr>
              <th className="w-1/2">Nazwa pytania</th>
              <td>{props.additionalInformation.nazwa}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="w-1/2">Czas trwania odpowiedzi</th>
              <td>{props.additionalInformation.czas} min</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5 border-2 border-base-300 rounded-lg">
          <ReactQuill
            theme="bubble"
            value={props.descryption}
            placeholder={""}
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button
          onClick={() => changeStep("down")}
          className="btn btn-primary w-[150px]"
        >
          <TiArrowLeftThick />
          wstecz
        </button>
        {isLoading ? (
          <button
            onClick={submitQuestion}
            className="btn btn-success w-[150px] btn-disabled"
          >
            <span className="loading loading-spinner"></span>
          </button>
        ) : (
          <button
            onClick={submitQuestion}
            className="btn btn-success w-[150px]"
          >
            utwórz pytanie
          </button>
        )}
      </div>
    </div>
  );
};

export default ThirdStep;
