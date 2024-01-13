"use client";

import Modal from "@/components/modals/modal";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useMutation } from "react-query";

const confirmModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTask = () => {
    setIsLoading(true);

    deleteTaskRequest.mutate();
  };

  const closeConfrimModal = () => {
    props.closeShowOpenTaskDeleteModal();
  };

  const deleteTaskRequest = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .delete("/company/open-task/" + props.deleteTaskId)
        .then((res) => {
          props.successDelete();
        })
        .catch((error) => {
          props.errorDelete();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <div>
      <Modal>
        <h1 className="text-center text-[18px] font-semibold">
          Czy na pewno chcesz usunąć wybrane pytanie otwarte?
        </h1>

        <div className="w-full mx-auto mt-6 flex justify-around">
          {isLoading ? (
            <button className="btn btn-error w-[150px]">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              onClick={deleteTask}
              type="submit"
              className="btn btn-error w-[150px]"
            >
              Usuń
            </button>
          )}

          <button
            className="block btn btn-base-100 w-[150px]"
            onClick={closeConfrimModal}
          >
            Anuluj
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default confirmModal;
