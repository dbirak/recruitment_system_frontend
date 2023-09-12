import { baseURL } from "@/utils/api/axios";
import { AiFillFilePdf } from "react-icons/ai";

const CvTaskAnswer = (props) => {
  const showUserCv = () => {
    fetch(
      baseURL +
        "/company/answer/cv-task/" +
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
        // let alink = document.createElement("a");
        // alink.href = fileURL;
        // alink.download = props.name + " - CV.pdf";
        // alink.click();

        window.open(fileURL, "_blank");
      });
    });
  };

  return (
    <div>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        {props.name} - CV
      </h1>

      <div
        onClick={showUserCv}
        className="flex rounded-lg p-3 bg-base-200 cursor-pointer hover:bg-neutral ease-in-out duration-300 text-neutral hover:text-white"
      >
        <div className="text-[40px] me-5">
          <AiFillFilePdf />
        </div>
        <div className="text-[23px] font-semibold grid items-center">
          Pobierz plik PDF
        </div>
      </div>

      <button
        onClick={props.closeApplicationModal}
        className="btn btn-primary w-full rounded-none mt-5"
      >
        Zamknij
      </button>
    </div>
  );
};

export default CvTaskAnswer;
