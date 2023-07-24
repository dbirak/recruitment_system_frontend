import Loading from "@/components/loadings/loading";
import Modal3 from "@/components/modals/modal3";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const ShowOpenQuestionModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [question, setQuestion] = useState([]);

  const getQuestion = useQuery("getQuestion", () => {
    axiosWithBearer
      .get("/company/open-task/" + props.openQuestionShowInfo.id)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else {
          Swal.fire({
            title: "Błąd",
            text: "Nie można pobrać pytania, ponieważ wystąpił błąd podczas połączenia z serwerem!",
            icon: "error",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--er))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            closeShowTestModal();
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const closeShowOpenQuestionModal = () => {
    props.closeShowOpenQuestionModal();
  };

  return (
    <div>
      <Modal3>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5 break-words">
          {props.openQuestionShowInfo.name}
        </h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <ReactQuill
              theme="bubble"
              value={question.descryption}
              placeholder={""}
              readOnly
            />

            <button
              onClick={closeShowOpenQuestionModal}
              className="btn btn-primary w-full rounded-none mt-5"
            >
              Zamknij
            </button>
          </div>
        )}
      </Modal3>
    </div>
  );
};

export default ShowOpenQuestionModal;
