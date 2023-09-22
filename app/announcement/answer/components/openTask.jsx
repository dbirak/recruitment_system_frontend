import { useState } from "react";
import Timer from "./timer";
import ConfirmModal from "./confirmModal";
import Loading2 from "@/components/loadings/loading2";
import { axiosWithBearer } from "@/utils/api/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import EditorToolbar, {
  modules,
  formats,
} from "./../../../company/modules/components/editorToolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const OpenTask = (props) => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const [question, setQuestion] = useState(
    props.taskDetails.task_details.descryption
  );
  const [showModal, setShowModal] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendAnswer = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/user/task/answer", data)
        .then((res) => {
          setIsLoading(false);

          Swal.fire({
            title: "Sukces",
            text: "Twoja odpowiedź została przesłana!",
            icon: "success",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--su))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            router.push("/announcement/" + props.data.announcement_id);
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Błąd",
            text: "Wystąpił błąd podczas wysyłania odpowiedzi!",
            icon: "error",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--er))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            router.push("/");
          });
        })
        .finally(() => {});
    },
  });

  const endTime = () => {
    setStopTimer(true);
    setShowModal(false);
    setIsLoading(true);

    let data = {
      ...props.data,
      answer: value,
    };

    sendAnswer.mutate(data);
  };

  const endTask = () => {
    endTime();
  };

  const closeConfrimModal = () => {
    setShowModal(false);
  };

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      {!stopTimer ? (
        <Timer time={props.taskDetails.task_info.time} endTime={endTime} />
      ) : (
        <div></div>
      )}

      <div className="mt-5 mx-5 border-2 border-base-300 rounded-lg">
        <ReactQuill
          theme="bubble"
          value={props.taskDetails.task_details.descryption}
          placeholder={""}
          readOnly
        />
      </div>

      <div className="mx-5 my-7">
        <EditorToolbar />
        <ReactQuill
          className="text-[30px]"
          theme="snow"
          value={value}
          onChange={handleChange}
          placeholder={"Wprowadż treść swojej odpowiedzi..."}
          modules={modules}
          formats={formats}
        />
      </div>

      <div className="w-full">
        <button
          onClick={() => {
            showModal === false ? setShowModal(true) : setShowModal(false);
          }}
          className="block mx-auto btn btn-neutral cursor-pointer w-[175px] text-center tracking-tight"
        >
          Wyślij odpowiedż
        </button>
      </div>

      {showModal && (
        <ConfirmModal endTask={endTask} closeConfrimModal={closeConfrimModal} />
      )}

      {isLoading && <Loading2 />}
    </div>
  );
};

export default OpenTask;
