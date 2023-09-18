"use client";

import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import ColumnWithUsers from "./columnWithUsers";
import { useMutation, useQuery } from "react-query";
import { axiosWithBearer } from "@/utils/api/axios";
import Loading from "@/components/loadings/loading";
import Swal from "sweetalert2";
import { AiTwotoneSave } from "react-icons/ai";
import { TiArrowLeftThick } from "react-icons/ti";
import { useRouter } from "next/navigation";

const ManageUsers = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);

  const [notAppliedList, setNotAppliedList] = useState([]);
  const [appliedList, setAppliedList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);

  const getUsersApplicationStatus = useQuery(
    "getUsersApplicationStatus",
    () => {
      axiosWithBearer
        .get("/company/application/" + props.stepModal.id)
        .then((res) => {
          setNotAppliedList(res.data.info.not_applied_users);

          setAppliedList(res.data.info.applied_users);

          setAcceptedList(res.data.info.accepted_users);
          setRejectedList(res.data.info.rejected_users);

          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else if (error.response.status == 404) {
            router.push("/company/announcements");
          }
        })
        .finally(() => {});
    }
  );

  const handleDragStart = (item) => {
    if (!item.source) return;
  };

  const isActualStep = () => {
    const expiryData = new Date(props.stepModal.expiry_date);
    const today = new Date();

    expiryData.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return expiryData < today;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (!props.canManageUsers) {
      Swal.fire({
        title: "Błąd",
        text: "Nie możesz zarządzać aplikacjami w nieaktualnym etapie!",
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

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      let items, item;

      if (!isActualStep() && source.droppableId === "notApplied") {
        Swal.fire({
          title: "Błąd",
          text: "Nie możesz aktaulnie zarządzać osobami z tej kolumny! Zarządzanie osobami, które nie udzieliły odpowiedzi, a mają dostęp do tego etapu będzie możliwe po jego zakończeniu!",
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

      if (
        (source.droppableId == "notApplied" &&
          destination.droppableId == "applied") ||
        (source.droppableId == "applied" &&
          destination.droppableId == "notapplied") ||
        (destination.droppableId == "applied" &&
          source.droppableId !== "applied") ||
        (destination.droppableId == "notApplied" &&
          source.droppableId !== "notApplied")
      ) {
        Swal.fire({
          title: "Błąd",
          text: "Nie można przenieść aplikacji do tej kolumny",
          icon: "error",
          color: "hsl(var(--n))",
          background: "hsl(var(--b1))",
          confirmButtonColor: "hsl(var(--er))",
          allowOutsideClick: false,
          backdrop: "#000000a6",
          confirmButtonText: "Zamknij",
        }).then((result) => {
          return;
        });

        return;
      }

      if (source.droppableId == "notApplied") {
        items = Array.from(notAppliedList);
        [item] = items.splice(source.index, 1);
        setNotAppliedList(items);
      }

      if (source.droppableId == "applied") {
        items = Array.from(appliedList);
        [item] = items.splice(source.index, 1);
        setAppliedList(items);
      }

      if (source.droppableId == "accepted") {
        items = Array.from(acceptedList);
        [item] = items.splice(source.index, 1);
        setAcceptedList(items);
      }

      if (source.droppableId == "rejected") {
        items = Array.from(rejectedList);
        [item] = items.splice(source.index, 1);
        setRejectedList(items);
      }

      if (destination.droppableId == "notApplied") {
        items = Array.from(notAppliedList);
        items.splice(destination.index, 0, item);
        setNotAppliedList(items);
      }

      if (destination.droppableId == "applied") {
        items = Array.from(appliedList);
        items.splice(destination.index, 0, item);
        setAppliedList(items);
      }

      if (destination.droppableId == "accepted") {
        items = Array.from(acceptedList);
        items.splice(destination.index, 0, item);
        setAcceptedList(items);
      }

      if (destination.droppableId == "rejected") {
        items = Array.from(rejectedList);
        items.splice(destination.index, 0, item);
        setRejectedList(items);
      }
    } else {
      let items;

      if (source.droppableId == "notApplied")
        items = Array.from(notAppliedList);
      if (source.droppableId == "applied") items = Array.from(appliedList);
      if (source.droppableId == "accepted") items = Array.from(acceptedList);
      if (source.droppableId == "rejected") items = Array.from(rejectedList);

      const [reorderedItem] = items.splice(source.index, 1);

      items.splice(destination.index, 0, reorderedItem);
      if (destination.droppableId == "notApplied") setNotAppliedList(items);
      else if (destination.droppableId == "applied") setAppliedList(items);
      else if (destination.droppableId == "accepted") setAcceptedList(items);
      else if (destination.droppableId == "rejected") setRejectedList(items);
    }
  };

  const managmentUsersInStep = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/company/application/managment", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Twoje zmiany zostały poprawnie zapisane!",
            icon: "success",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--su))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            location.reload();
          });
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else
            Swal.fire({
              title: "Błąd",
              text: "Wystąpił problem podczas zapisywania zmian!",
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
        })
        .finally(() => {
          setIsSaved(false);
        });
    },
  });

  const submitUpdatedUsers = () => {
    let notAppliedId = notAppliedList === null ? null : [];
    let appliedId = [];
    let rejectedId = [];
    let acceptedId = [];

    if (notAppliedList !== null) {
      for (const item of notAppliedList) notAppliedId.push(item.id);
    }

    for (const item of appliedList) appliedId.push(item.id);
    for (const item of rejectedList) rejectedId.push(item.id);
    for (const item of acceptedList) acceptedId.push(item.id);

    let json = {
      id: props.stepModal.id,
      not_applied_users: notAppliedId,
      applied_users: appliedId,
      rejected_users: rejectedId,
      accepted_users: acceptedId,
    };

    setIsSaved(true);

    managmentUsersInStep.mutate(json);
  };

  const closeManageUsers = () => {
    props.closeManageUsers();
  };

  const showApplication = (userId, name, surname) => {
    props.showApplication(userId, name, surname);
  };

  if (isLoading) return <Loading />;
  else
    return (
      <div>
        <div className="flex justify-between gap-3 mb-8">
          <div className="w-full">
            <button
              onClick={closeManageUsers}
              className="btn btn-base-100 w-full"
            >
              <TiArrowLeftThick />
              {props.canManageUsers ? "Anuluj" : "Powrót"}
            </button>
          </div>
          {props.canManageUsers && (
            <div className="w-full">
              {isSaved ? (
                <button className="btn btn-primary btn-disabled w-full">
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button
                  onClick={submitUpdatedUsers}
                  className="btn btn-primary w-full"
                >
                  <AiTwotoneSave />
                  Zapisz
                </button>
              )}
            </div>
          )}
        </div>

        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleOnDragEnd}
        >
          <div
            className={
              notAppliedList !== null
                ? "grid justify-around grid-cols-1 sm:grid-cols-1 gap-2 md:grid-cols-2 md2:grid-cols-4"
                : "grid justify-around grid-cols-1 sm:grid-cols-1 gap-2 md:grid-cols-2 md2:grid-cols-3"
            }
          >
            {notAppliedList !== null && (
              <ColumnWithUsers
                items={notAppliedList}
                droppableId={"notApplied"}
                name={"Brak odpowiedzi"}
                showApplication={showApplication}
                isActualStep={isActualStep}
              />
            )}
            <ColumnWithUsers
              items={appliedList}
              droppableId={"applied"}
              name={"Nowe aplikacje"}
              showApplication={showApplication}
              isActualStep={isActualStep}
            />

            <ColumnWithUsers
              items={acceptedList}
              droppableId={"accepted"}
              name={"Zaakceptowani"}
              showApplication={showApplication}
              isActualStep={isActualStep}
            />

            <ColumnWithUsers
              items={rejectedList}
              droppableId={"rejected"}
              name={"Odrzuceni"}
              showApplication={showApplication}
              isActualStep={isActualStep}
            />
          </div>
        </DragDropContext>
      </div>
    );
};

export default ManageUsers;
