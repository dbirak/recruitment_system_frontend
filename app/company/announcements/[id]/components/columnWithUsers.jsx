import {
  setColorBackground,
  setColorBackroundItem,
  setColorText,
} from "@/utils/tools/colorColumns";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const ColumnWithUsers = (props) => {
  var colorBackground;
  if (props.name === "Brak odpowiedzi") colorBackground = "orange-400";
  else if (props.name === "Nowe aplikacje") colorBackground = "primary";
  else if (props.name === "Zaakceptowani") colorBackground = "green-400";
  else if (props.name === "Odrzuceni") colorBackground = "red-400";

  var colorText;
  if (props.name === "Brak odpowiedzi") colorText = "neutral";
  else if (props.name === "Nowe aplikacje") colorText = "neutral";
  else if (props.name === "Zaakceptowani") colorText = "green-950";
  else if (props.name === "Odrzuceni") colorText = "red-950";

  var colorBackgroundItem;
  if (props.name === "Brak odpowiedzi") colorBackgroundItem = "orange-100";
  else if (props.name === "Nowe aplikacje") colorBackgroundItem = "base-200";
  else if (props.name === "Zaakceptowani") colorBackgroundItem = "green-100";
  else if (props.name === "Odrzuceni") colorBackgroundItem = "red-100";

  const showApplication = (userId, name, surname) => {
    props.showApplication(userId, name, surname);
  };

  return (
    <div className="mt-2 min-w-[290px] mx-auto w-[290px] overflow-hidden">
      <h1
        className={`text-center p-2 text-[24px] font-bold tracking-wide bg-${colorBackground} text-${colorText} `}
      >
        {props.name}
      </h1>
      <Droppable droppableId={props.droppableId}>
        {(provided) => (
          <ul
            className={`bg-${colorBackground} pb-[1px]`}
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
                    className={`p-3 text-[15px] bg-${colorBackgroundItem} mb-2 mx-2`}
                  >
                    <div className="tracking-wide w-full">
                      <div
                        className={`text-left w-full text-${colorText} text-[19px] font-semibold`}
                      >
                        {item.name} {item.surname}
                      </div>
                      <div
                        className={`text-left w-full text-${colorText} text-[15px] font-light`}
                      >
                        {item.email}
                      </div>
                      <div className={item.have_answer ? "" : "hidden"}>
                        <button
                          onClick={() =>
                            showApplication(item.id, item.name, item.surname)
                          }
                          className={`btn btn-sm btn-ghost rounded-none mt-[13px] mx-auto w-full bg-${colorBackground} hover:bg-${colorBackground} text-${colorText}`}
                        >
                          Zobacz odpowiedź
                        </button>
                      </div>
                      <div
                        className={
                          !item.have_answer
                            ? `block text-${colorText} my-3 text-[14px] text-center font-medium w-full mx-auto`
                            : "hidden"
                        }
                      >
                        {props.isActualStep
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
