"use client";

import {
  setColorBackground,
  setColorBackroundItem,
  setColorText,
} from "@/utils/tools/colorColumns";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

const ColumnWithUsers = (props) => {
  const [colorBackground, setColorBackground] = useState(() => {
    if (props.name === "Brak odpowiedzi") return "bg-orange-400";
    else if (props.name === "Nowe aplikacje") return "bg-primary";
    else if (props.name === "Zaakceptowani") return "bg-green-400";
    else if (props.name === "Odrzuceni") return "bg-red-400";
  });

  const [colorText, setColorText] = useState(() => {
    if (props.name === "Brak odpowiedzi") return "text-neutral";
    else if (props.name === "Nowe aplikacje") return "text-neutral";
    else if (props.name === "Zaakceptowani") return "text-green-950";
    else if (props.name === "Odrzuceni") return "text-red-950";
  });

  const [colorBackgroundItem, setColorBackroundItem] = useState(() => {
    if (props.name === "Brak odpowiedzi") return "bg-orange-100";
    else if (props.name === "Nowe aplikacje") return "bg-base-200";
    else if (props.name === "Zaakceptowani") return "bg-green-100";
    else if (props.name === "Odrzuceni") return "bg-red-100";
  });

  const showApplication = (userId, name, surname) => {
    props.showApplication(userId, name, surname);
  };

  return (
    <div className="mt-2 min-w-[290px] mx-auto w-[290px] overflow-hidden">
      <h1
        className={`text-center p-2 text-[24px] font-bold tracking-wide ${colorBackground} ${colorText} `}
      >
        {props.name}
      </h1>
      <Droppable droppableId={props.droppableId}>
        {(provided) => (
          <ul
            className={`${colorBackground} pb-[1px]`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.items.map((item, index) => (
              <Draggable
                key={item.id.toString()}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-3 text-[15px] ${colorBackgroundItem} mb-2 mx-2`}
                  >
                    <div className="tracking-wide w-full">
                      <div
                        className={`text-left w-full ${colorText} text-[19px] font-semibold`}
                      >
                        {item.name} {item.surname}
                      </div>
                      <div
                        className={`text-left w-full ${colorText} text-[15px] font-light`}
                      >
                        {item.email}
                      </div>
                      <div className={item.have_answer ? "" : "hidden"}>
                        <button
                          onClick={() =>
                            showApplication(item.id, item.name, item.surname)
                          }
                          className={`btn btn-sm btn-ghost rounded-none mt-[13px] mx-auto w-full ${colorBackground} hover:${colorBackground} ${colorText}`}
                        >
                          Zobacz odpowiedź
                        </button>
                      </div>
                      <div
                        className={
                          !item.have_answer
                            ? `block ${colorText} my-3 text-[14px] text-center font-medium w-full mx-auto`
                            : "hidden"
                        }
                      >
                        {!props.isActualStep()
                          ? "OCZEKIWANIE NA ODPOWIEDŹ"
                          : "BRAK ODPOWIEDZI"}
                      </div>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default ColumnWithUsers;
