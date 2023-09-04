"use client";

import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import ColumnWithUsers from "./columnWithUsers";
import Modal3 from "@/components/modals/modal3";

const ManageUsersModal = () => {
  const [notAppliedList, setNotAppliedList] = useState([]);
  const [appliedList, setAppliedList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);

  const handleDragStart = (item) => {
    if (!item.source) return;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      let items, item;

      if (source.droppableId == "characters1") {
        items = Array.from(notAppliedList);
        [item] = items.splice(source.index, 1);
        setNotAppliedList(items);
      }

      if (source.droppableId == "characters2") {
        items = Array.from(appliedList);
        [item] = items.splice(source.index, 1);
        setAppliedList(items);
      }

      if (source.droppableId == "characters3") {
        items = Array.from(acceptedList);
        [item] = items.splice(source.index, 1);
        setAcceptedList(items);
      }

      if (source.droppableId == "characters4") {
        items = Array.from(rejectedList);
        [item] = items.splice(source.index, 1);
        setRejectedList(items);
      }

      if (destination.droppableId == "characters1") {
        items = Array.from(notAppliedList);
        items.splice(destination.index, 0, item);
        setNotAppliedList(items);
      }

      if (destination.droppableId == "characters2") {
        items = Array.from(appliedList);
        items.splice(destination.index, 0, item);
        setAppliedList(items);
      }

      if (destination.droppableId == "characters3") {
        items = Array.from(acceptedList);
        items.splice(destination.index, 0, item);
        setAcceptedList(items);
      }

      if (destination.droppableId == "characters4") {
        items = Array.from(rejectedList);
        items.splice(destination.index, 0, item);
        setRejectedList(items);
      }
    } else {
      let items;

      if (source.droppableId == "characters1")
        items = Array.from(notAppliedList);
      if (source.droppableId == "characters2") items = Array.from(appliedList);
      if (source.droppableId == "characters3") items = Array.from(acceptedList);
      if (source.droppableId == "characters4") items = Array.from(rejectedList);

      const [reorderedItem] = items.splice(source.index, 1);

      items.splice(destination.index, 0, reorderedItem);
      if (destination.droppableId == "characters1") setNotAppliedList(items);
      else if (destination.droppableId == "characters2") setAppliedList(items);
      else if (destination.droppableId == "characters3") setAcceptedList(items);
      else if (destination.droppableId == "characters4") setRejectedList(items);
    }
  };

  return (
    <div>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragEnd={handleOnDragEnd}
      >
        {/* <Modal3> */}
        <div className="flex flex-col xl:flex-row xl:justify-between">
          <div className="flex xl:w-1/2 w-full sm:flex-row flex-col justify-around">
            <ColumnWithUsers
              items={notAppliedList}
              droppableId={"characters1"}
              name={"Nowe osoby"}
            />
            <ColumnWithUsers
              items={appliedList}
              droppableId={"characters2"}
              name={"Nowe osoby"}
            />
          </div>
          <div className="flex xl:w-1/2 w-full sm:flex-row flex-col justify-around"></div>
        </div>
        {/* </Modal3> */}
      </DragDropContext>
    </div>
  );
};

export default ManageUsersModal;
