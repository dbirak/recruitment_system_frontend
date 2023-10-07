import { useState } from "react";
import Timer from "./timer";
import ConfirmModal from "./confirmModal";
import Loading2 from "@/components/loadings/loading2";
import { axiosWithBearer, axiosWithBearerFormData } from "@/utils/api/axios";
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
import { useForm } from "react-hook-form";

const FileTask = (props) => {
  const router = useRouter();

  const [value, setValue] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    getValues,
  } = useForm();

  const styleInputCorrectFile =
    "file-input file-input-neutral file-input-bordered w-full";

  const [showModal, setShowModal] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendFileTask = useMutation({
    mutationFn: (data) => {
      axiosWithBearerFormData
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

    onSubmitHandler();
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

  const onSubmitHandler = () => {
    const formData = new FormData();

    formData.append("id", props.data.id);
    formData.append("announcement_id", props.data.announcement_id);
    formData.append("step_number", props.data.step_number);

    console.log(getValues("file")["0"]);

    if (getValues("file") && getValues("file")["0"]) {
      formData.append("answer", getValues("file")["0"]);
    } else {
      formData.append("answer", null);
    }

    sendFileTask.mutate(formData);
  };

  return (
    <div>
      {!stopTimer ? (
        <Timer time={props.taskDetails.task_info.time} endTime={endTime} />
      ) : (
        <div></div>
      )}

      <div className="mt-5 mx-5 border-2 border-base-300 rounded-lg ">
        <ReactQuill
          theme="bubble"
          value={props.taskDetails.task_details.descryption}
          placeholder={""}
          readOnly
        />
      </div>

      <div className="mx-5 my-7">
        <div className="">
          <div className="grid items-center text-[17px] font-semibold mb-4">
            Twoja odpowiedź:{" "}
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <input
                type="file"
                placeholder="plik"
                className={styleInputCorrectFile}
                {...register("file", {
                  onChange: (e) => {
                    return e.target.files;
                  },
                })}
              />
            </form>
          </div>
        </div>
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

export default FileTask;
