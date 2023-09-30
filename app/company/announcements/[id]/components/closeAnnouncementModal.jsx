"use client";

import Modal from "@/components/modals/modal";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

const CloseAnnouncementModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const closeAnnouncement = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/company/announcement/end", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Ogłoszenie zostało poprawnie zakończone!",
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
          } else if (error.response.status == 422) {
            Swal.fire({
              title: "Błąd",
              text: "Nie można rozpocząć nowego etapu, ponieważ zawiera w sobie niepoprawne dane!",
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
          } else
            Swal.fire({
              title: "Błąd",
              text: error.response.data.message,
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
          setIsLoading(false);
          props.hideCloseAnnouncementModal();
        });
    },
  });

  const endAnnouncement = () => {
    setIsLoading(true);

    closeAnnouncement.mutate(props.lastStepInfo);
  };

  return (
    <div>
      <Modal>
        <h1 className="text-center text-[18px] font-semibold">
          Czy na pewno chcesz zakończyć ogłoszenie?
        </h1>

        <div className="w-full mx-auto mt-6 flex justify-around">
          {isLoading ? (
            <button className="btn btn-neutral w-[150px] btn-disabled">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              onClick={endAnnouncement}
              type="ssubmit"
              className="btn btn-neutral w-[150px]"
            >
              Zakończ
            </button>
          )}

          <button
            className="block btn btn-base-100 w-[150px]"
            onClick={props.hideCloseAnnouncementModal}
          >
            Anuluj
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CloseAnnouncementModal;
