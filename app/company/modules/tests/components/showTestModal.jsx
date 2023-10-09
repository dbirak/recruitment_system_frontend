import Loading from "@/components/loadings/loading";
import Modal2 from "@/components/modals/modal2";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const ShowTestModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [test, setTest] = useState([]);

  const getAllTests = useQuery("getAllTests", () => {
    axiosWithBearer
      .get("/company/test/" + props.testShowInfo.id)
      .then((res) => {
        setTest(res.data);

        var transformedData = {
          pytania: [],
        };

        var pytaniaMap = {};

        res.data.forEach((item) => {
          let questionId = item.question.id;
          let questionText = item.question.question;
          let answerText = item.answer.answer;
          let isCorrect = item.answer.is_correct;

          if (!pytaniaMap[questionId]) {
            pytaniaMap[questionId] = {
              pytanie: questionText,
              odpowiedzi: [],
            };

            transformedData.pytania.push(pytaniaMap[questionId]);
          }

          pytaniaMap[questionId].odpowiedzi.push({
            odpowiedz: answerText,
            poprawna: isCorrect,
          });
        });

        setTest(transformedData);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else {
          Swal.fire({
            title: "Błąd",
            text: "Nie można pobrać testu, ponieważ wystąpił błąd podczas połączenia z serwerem!",
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

  const closeShowTestModal = () => {
    props.closeShowTestModal();
  };

  return (
    <div>
      <Modal2>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5 break-words">
          {props.testShowInfo.name}
        </h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {test.pytania.map((item, index) => {
              return (
                <div
                  className="collapse collapse-sm collapse-arrow bg-base-200 mb-3"
                  key={index}
                >
                  <input type="checkbox" defaultChecked />
                  <div className="collapse-title text-xl font-medium">
                    {index + 1}. {item.pytanie}
                  </div>
                  <div className="collapse-content">
                    <div className="ms-3">
                      {item.odpowiedzi.map((answer, index) => {
                        return answer.poprawna ? (
                          <p className="text-success flex" key={index}>
                            <span className="text-[24px] me-2">
                              <TiTick />
                            </span>
                            <span className="font-medium">
                              {answer.odpowiedz}
                            </span>
                          </p>
                        ) : (
                          <p className="text-error flex" key={index}>
                            <span className="text-[24px] me-2">
                              <TiTimes />
                            </span>
                            <span className="font-medium">
                              {answer.odpowiedz}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={closeShowTestModal}
              className="btn btn-primary w-full rounded-none mt-5"
            >
              Zamknij
            </button>
          </div>
        )}
      </Modal2>
    </div>
  );
};

export default ShowTestModal;
