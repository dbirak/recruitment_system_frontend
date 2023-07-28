"use client";

import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { GrAdd } from "react-icons/gr";
import { TbPointFilled } from "react-icons/tb";
import { TiTimes } from "react-icons/ti";
import { useState } from "react";
import AddItemModal from "./addItemModal";
import Swal from "sweetalert2";

const SecondStep = (props) => {
  const [isAddItemModal, setIsAddItemModal] = useState(false);
  const [place, setPlace] = useState("");

  const [info, setInfo] = useState({
    obowiazki: props.announcementInfo.obowiazki,
    wymagania: props.announcementInfo.wymagania,
    oferta: props.announcementInfo.oferta,
  });

  const changeStep = async (activities) => {
    props.changeStep(activities);
  };

  const openAddItemModal = (place) => {
    setPlace(place);
    setIsAddItemModal(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModal(false);
  };

  const addItem = (item, place) => {
    let temp = info;

    if (place === "obowiazki") {
      temp.obowiazki.push(item);
    } else if (place === "wymagania") {
      temp.wymagania.push(item);
    } else if (place === "oferta") {
      temp.oferta.push(item);
    }

    setInfo(temp);

    closeAddItemModal();
  };

  const removeItem = (index, place) => {
    if (place === "obowiazki") {
      let temp = [...info.obowiazki];
      temp.splice(index, 1);
      setInfo((prevInfo) => ({ ...prevInfo, obowiazki: temp }));
    } else if (place === "wymagania") {
      let temp = [...info.wymagania];
      temp.splice(index, 1);
      setInfo((prevInfo) => ({ ...prevInfo, wymagania: temp }));
    } else if (place === "oferta") {
      let temp = [...info.oferta];
      temp.splice(index, 1);
      setInfo((prevInfo) => ({ ...prevInfo, oferta: temp }));
    }
  };

  const changeStepDown = async () => {
    await props.updateAnnoucementInfo(info);
    props.changeStep("down");
  };

  const changeStepUp = async () => {
    if (
      info.obowiazki.length === 0 ||
      info.oferta.length === 0 ||
      info.wymagania.length === 0
    ) {
      Swal.fire({
        title: "Błąd",
        text: "Nie można przejść do następnego kroku, ponieważ każda lista musi zawierać co najmniej jeden element!",
        icon: "error",
        color: "hsl(var(--n))",
        background: "hsl(var(--b1))",
        confirmButtonColor: "hsl(var(--er))",
        allowOutsideClick: false,
        backdrop: "#000000a6",
        confirmButtonText: "Zamknij",
      }).then((result) => {});
    } else {
      await props.updateAnnoucementInfo(info);
      props.changeStep("up");
    }
  };

  return (
    <div>
      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-2 mb-5">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Wymień zakres obowiązków przyszłego pracownika:
          </div>
          <div>
            <button
              onClick={() => openAddItemModal("obowiazki")}
              className="btn btn-success btn-square"
            >
              <GrAdd />
            </button>
          </div>
        </div>

        {info.obowiazki.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
            <div className="grid items-center text-[20px] text-error me-4">
              <TiTimes
                onClick={() => removeItem(index, "obowiazki")}
                className="me-0 w-fit block cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Wymień rzeczy jakie wymagasz od przyszłego pracownika:
          </div>
          <div>
            <button
              onClick={() => openAddItemModal("wymagania")}
              className="btn btn-success btn-square"
            >
              <GrAdd />
            </button>
          </div>
        </div>

        {info.wymagania.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
            <div className="grid items-center text-[20px] text-error me-4">
              <TiTimes
                onClick={() => removeItem(index, "wymagania")}
                className="me-0 w-fit block cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-5">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Wymień rzeczy jakie chcesz zaoferować przyszłemu pracownikowi:
          </div>
          <div>
            <button
              onClick={() => openAddItemModal("oferta")}
              className="btn btn-success btn-square"
            >
              <GrAdd />
            </button>
          </div>
        </div>

        {info.oferta.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
            <div className="grid items-center text-[20px] text-error me-4">
              <TiTimes
                onClick={() => removeItem(index, "oferta")}
                className="me-0 w-fit block cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10 overflow-x-hidden">
        <button onClick={changeStepDown} className="btn btn-primary w-[150px]">
          <TiArrowLeftThick />
          wstecz
        </button>
        <button onClick={changeStepUp} className="btn btn-primary w-[150px]">
          dalej
          <TiArrowRightThick />
        </button>
      </div>

      {isAddItemModal && (
        <AddItemModal
          closeAddItemModal={closeAddItemModal}
          addItem={addItem}
          place={place}
        />
      )}
    </div>
  );
};

export default SecondStep;
