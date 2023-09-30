import { baseURL } from "@/utils/api/axios";
import { AiFillFileText } from "react-icons/ai";

const FileTaskAnswer = (props) => {
  const showUserFile = () => {
    fetch(
      baseURL +
        "/company/answer/file-task/" +
        props.application.info.storage_name,
      {
        method: "GET",
        headers: {
          responseType: "arraybuffer",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = props.application.info.original_name;
        alink.click();

        // window.open(fileURL, "_blank");
      });
    });
  };

  const closeApplicationModal = () => {
    props.closeApplicationModal();
  };

  return (
    <div>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        {props.name} - przesłanie pliku
      </h1>

      <div>
        <a className="link link-neutral flex" onClick={showUserFile}>
          <div className="text-[20px] me-3 grid items-center h-auto w-[24px]">
            <AiFillFileText />
          </div>
          <div>{props.application.info.original_name}</div>
        </a>
      </div>

      <button
        onClick={closeApplicationModal}
        className="btn btn-primary w-full rounded-none mt-5"
      >
        Zamknij
      </button>
    </div>
  );
};

export default FileTaskAnswer;
