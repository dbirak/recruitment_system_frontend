import { AdditionalContext } from "@/utils/contexts/AdditionalContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import SendCvModal from "./SendCvModal";
import Swal from "sweetalert2";

const ApplicationModule = (props) => {
  const router = useRouter();

  const [isCvSendModal, setIsCvModal] = useState(false);

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  const successCvSend = () => {
    setIsCvModal(false);
    Swal.fire({
      title: "Sukces",
      text: "Twoje CV zostało przesłane!",
      icon: "success",
      color: "hsl(var(--n))",
      background: "hsl(var(--b1))",
      confirmButtonColor: "hsl(var(--su))",
      allowOutsideClick: false,
      backdrop: "#000000a6",
      confirmButtonText: "Zamknij",
    }).then((result) => {
      window.location.href = "/announcement/" + props.announcement.id;
    });
  };

  const openCvSendModal = () => {
    setIsCvModal(true);
  };

  const closeCvSendModal = () => {
    setIsCvModal(false);
  };

  return (
    <div>
      {!(localStorage.getItem("token") || sessionStorage.getItem("token")) && (
        <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] text-center mx-auto py-5 px-4 mt-8 mb-4">
          <button
            onClick={redirectToLoginPage}
            className="btn btn-neutral w-full mx-auto"
          >
            <div className="text-[20px]">
              <AiFillFileText />
            </div>
            Aplikuj teraz
          </button>
        </div>
      )}

      {(localStorage.getItem("token") ||
        (sessionStorage.getItem("token") &&
          props.announcement.hasOwnProperty("steps"))) && (
        <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] text-center mx-auto py-5 px-4 mt-8 mb-4">
          <button
            onClick={openCvSendModal}
            className="btn btn-neutral w-full mx-auto"
          >
            <div className="text-[20px]">
              <AiFillFileText />
            </div>
            Aplikuj teraz
          </button>
        </div>
      )}

      {isCvSendModal && (
        <SendCvModal
          closeCvSendModal={closeCvSendModal}
          announcement={props.announcement}
          successCvSend={successCvSend}
        />
      )}
    </div>
  );
};

export default ApplicationModule;
