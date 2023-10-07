"use client";

import { MdModeEditOutline } from "react-icons/md";

const CompanyName = (props) => {
  const editName = () => {
    props.showEditItemModal({
      header: "Edytuj nazwę przedsiębiorstwa",
      placeholder: "Wpisz nazwę przedsiębiorstwa",
      defaultValue: props.profile.name,
      validaitionRules: {
        required: "Pole nazwa przedsiębiorstwa jest wymagane.",
        maxLength: {
          value: 50,
          message: "Podana nazwa jest zbyt długa.",
        },
        pattern: {
          value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż. _-]{1,}$/,
          message: "Nieprawidłowa nazwa.",
        },
      },
      place: "name",
    });
  };

  return (
    <div className="text-[32px] text-center mt-5 w-full ">
      <div
        className="tooltip font-normal tooltip-right tooltip-base-100"
        data-tip="Edytuj nazwę"
      >
        <span
          onClick={editName}
          className="hover:brightness-[0.25] hover:cursor-pointer font-bold duration-150 ease-in-out"
        >
          {props.profile.name}
        </span>
      </div>
    </div>
  );
};

export default CompanyName;
