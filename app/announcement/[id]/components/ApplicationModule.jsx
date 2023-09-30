import { AdditionalContext } from "@/utils/contexts/AdditionalContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import SendCvModal from "./SendCvModal";
import Swal from "sweetalert2";
import moment from "moment";

const ApplicationModule = (props) => {
  const router = useRouter();

  const [isCvSendModal, setIsCvModal] = useState(false);
  const { additionalStepState, setAdditionalStepState } =
    useContext(AdditionalContext);

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  const styleColorNeutral =
    "flex justify-between my-5 font-medium min-h-[32px]";
  const styleColorSuccess = styleColorNeutral + " text-success";
  const styleColorError = styleColorNeutral + " text-error";

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

  const sendAnswer = (stepInfo) => {
    setAdditionalStepState(stepInfo);

    router.push("/announcement/answer");
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

      {(localStorage.getItem("token") || sessionStorage.getItem("token")) &&
        props.announcement.steps === null && (
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

      {(localStorage.getItem("token") || sessionStorage.getItem("token")) &&
        props.announcement.steps !== null && (
          <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] text-center mx-auto py-5 px-4 mt-8 mb-4">
            <div className="flex justify-between mb-7">
              <div className="font-bold text-[20px] grid items-center">
                Szczegóły aplikacji:
              </div>
            </div>

            <div className="flex justify-between">
              <div className="font-bold text-center sm:text-[14px] text-[12px] w-[10%] grid items-center">
                Numer etapu
              </div>
              <div className="font-bold w-[25%] text-center sm:text-[14px] text-[12px] grid items-center">
                Nazwa modułu
              </div>
              <div className="font-bold w-[25%] text-center sm:text-[14px] text-[12px] grid items-center">
                Odpowiedź
              </div>
              <div className="font-bold w-[20%] text-center sm:text-[14px] text-[12px] grid items-center">
                Status
              </div>
              <div className="font-bold text-center w-[20%] sm:text-[14px] text-[12px] grid items-center">
                Data zakończenia etapu
              </div>
            </div>

            {props.announcement.steps.map((item, index) => (
              <div
                key={index}
                className={
                  item.info.status_info === "accepted_user"
                    ? styleColorSuccess
                    : item.info.status_info === "rejected_user"
                    ? styleColorError
                    : styleColorNeutral
                }
              >
                <div className="text-center sm:text-[14px] text-[12px] w-[10%] grid items-center">
                  Etap {index + 1}
                </div>
                <div className="w-[25%] text-center sm:text-[14px] text-[12px] grid items-center">
                  {item.task.task_name === "cvTask"
                    ? "Przesłanie CV"
                    : item.task.task_name === "testTask"
                    ? "Test"
                    : item.task.task_name === "openTask"
                    ? "Pytanie otwarte"
                    : "Przesyłanie plików"}
                </div>
                <div className="w-[25%] text-center sm:text-[14px] text-[12px] grid items-center">
                  {item.info.answer_info === "sended" ? (
                    "Przesłano"
                  ) : item.info.answer_info === "not_sended" ? (
                    "Nie przesłano"
                  ) : item.info.answer_info === null ? (
                    "-"
                  ) : (
                    <button
                      onClick={() => sendAnswer(item)}
                      className="btn btn-base-100 btn-sm w-fit px-3 mx-auto"
                    >
                      Prześlij teraz
                    </button>
                  )}
                </div>
                <div className="w-[20%] text-center sm:text-[14px] text-[12px] grid items-center">
                  {item.info.status_info === "applied_user"
                    ? "Oczekiwanie na rozpatrzenie"
                    : item.info.status_info === "rejected_user"
                    ? "Odrzucono"
                    : item.info.status_info === "accepted_user"
                    ? "Zaakceptowano"
                    : "-"}
                </div>
                <div className="text-center w-[20%] sm:text-[14px] text-[12px] grid items-center">
                  {item.expiry_date === null
                    ? "-"
                    : moment.utc(item.expiry_date).format("DD.MM.YYYY")}
                </div>
              </div>
            ))}

            {props.announcement.last_step_info === "winner" && (
              <div className="mt-10">
                <h1 className="text-center mb-3 font-bold text-[27px]">
                  Gratulacje!
                </h1>
                <h1 className="font-semibold mb-3 text-[22px] text-left">
                  Autor ogłoszenia pozytywnie rozpatrzył twoją aplikację.
                  Wkrótce powinien skontaktować się z tobą poprzez wiadomość
                  e-mail.
                </h1>
              </div>
            )}
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
