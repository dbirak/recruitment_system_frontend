"use client";

import Loading from "@/components/loadings/loading";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { TiArrowLeftThick, TiArrowRightThick, TiTimes } from "react-icons/ti";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import AddStepModal from "./addStepModal";
import EditStepModal from "./editStepModal";

const FifthStep = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddStepModal, setIsAddStepModal] = useState(false);
  const [info, setInfo] = useState(null);
  const [stepsInformation, setStepsInformation] = useState(
    props.stepInformation
  );

  const [isEditStepModal, setIsEditStepModal] = useState(false);
  const [editedStep, setEditedStep] = useState({});

  const changeStep = async (activities) => {
    if (activities === "down") {
      props.setStepInformation(stepsInformation);
      props.changeStep(activities);
    } else if (activities === "up") {
      for (let i = 0; i < stepsInformation.length; i++) {
        for (let j = i + 1; j < stepsInformation.length; j++) {
          if (
            JSON.stringify(stepsInformation[i]) ===
            JSON.stringify(stepsInformation[j])
          ) {
            Swal.fire({
              title: "Błąd",
              text: "Nie można przejść do następnego kroku, ponieważ co najmniej dwa etapy zawierają te same zadania!",
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
            return;
          }
        }
      }
      props.setStepInformation(stepsInformation);
      props.changeStep(activities);
    }
  };

  const getAddAnnouncementModuleInfo = useQuery(
    "getAddAnnouncementModuleInfo",
    () => {
      axiosWithBearer
        .get("/company/announcement/module")
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

  const openAddItemModal = () => {
    setIsAddStepModal(true);
  };

  const closeAddItemModal = () => {
    setIsAddStepModal(false);
  };

  const openEditItemModal = (index) => {
    setEditedStep({
      index: index,
      step: stepsInformation[index],
    });

    console.log(editedStep);
    setIsEditStepModal(true);
  };

  const closeEditItemModal = () => {
    setIsEditStepModal(false);
  };

  const addStep = (data) => {
    let temp = stepsInformation;

    temp.push(data);

    setStepsInformation(temp);

    console.log(stepsInformation);

    closeAddItemModal();
  };

  const removeStep = (index) => {
    let temp = [...stepsInformation];

    temp.splice(index, 1);

    setStepsInformation(temp);
  };

  const editStep = (data) => {
    let temp = stepsInformation;

    temp[data.index] = data.step;

    setStepsInformation(temp);

    closeEditItemModal();
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-2 mb-5">
        <div className="flex justify-between">
          <div className="font-bold text-center text-[14px] w-[10%] grid items-center">
            Numer etapu
          </div>
          <div className="font-bold w-[40%] text-center text-[14px] grid items-center">
            Nazwa modułu
          </div>
          <div className="font-bold w-[40%] text-center text-[14px] grid items-center">
            Nazwa zadania
          </div>
          <div className="font-bold text-center w-[10%] text-[14px] grid items-center">
            Opcje
          </div>
        </div>

        <div className="flex justify-between my-5">
          <div className="text-[14px] text-center w-[10%] grid items-center">
            Etap 1
          </div>
          <div className="text-[14px] w-[40%] text-center grid items-center">
            Przesyłanie plików
          </div>
          <div className="text-[14px] w-[40%] text-center grid items-center">
            Prośba o przesłanie swojego CV
          </div>
          <div className="text-[14px] w-[10%] grid items-center text-center">
            -
          </div>
        </div>

        {stepsInformation.map((item, index) => (
          <div key={index} className="flex justify-between my-5">
            <div className="text-[14px] text-center w-[10%] grid items-center">
              Etap {index + 2}
            </div>
            <div className="text-[14px] w-[40%] text-center grid items-center">
              {item.module === "test"
                ? "Test"
                : item.module === "openTask"
                ? "Pytanie otwarte"
                : "Przesyłanie plików"}
            </div>
            <div className="text-[14px] w-[40%] text-center grid items-center">
              {item.task.name}
            </div>
            <div className="text-[14px] w-[10%] grid items-center text-center">
              <div className="flex justify-around">
                <div className="text-[18px] grid items-center text-warning">
                  <div className="tooltip" data-tip="edytuj">
                    <MdModeEdit
                      onClick={() => openEditItemModal(index)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="text-[23px] grid items-center text-error">
                  <div className="tooltip" data-tip="usuń">
                    <TiTimes
                      onClick={() => removeStep(index)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={openAddItemModal}
          className="btn btn-success w-full p-2 my-3"
        >
          <span className="text-[18px]">
            <IoMdAddCircle />
          </span>
          Dodaj kolejny etap
        </button>
      </div>

      <div className="flex justify-between mt-10 overflow-x-hidden">
        <button
          onClick={() => changeStep("down")}
          className="btn btn-primary w-[150px]"
        >
          <TiArrowLeftThick />
          wstecz
        </button>
        <button
          onClick={() => changeStep("up")}
          className="btn btn-primary w-[150px]"
        >
          dalej
          <TiArrowRightThick />
        </button>
      </div>

      {isAddStepModal && (
        <AddStepModal
          closeAddItemModal={closeAddItemModal}
          addStep={addStep}
          info={info}
        />
      )}

      {isEditStepModal && (
        <EditStepModal
          editedStep={editedStep}
          editStep={editStep}
          closeEditItemModal={closeEditItemModal}
          info={info}
        />
      )}
    </div>
  );
};

export default FifthStep;
