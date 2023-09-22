"use client";

import Logo from "@/app/(auth)/components/logo";
import MainContainer from "@/components/layouts/mainContainer";
import Loading from "@/components/loadings/loading";
import { axiosWithBearer } from "@/utils/api/axios";
import { AdditionalContext } from "@/utils/contexts/AdditionalContext";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import TestTask from "./components/testTask";
import OpenTask from "./components/openTask";

const AnswerPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  const [taskInfo, setTaskInfo] = useState({
    task: { task_name: "testTask" },
  });
  const [taskDetails, setTaskDetails] = useState(null);

  const [data, setData] = useState(null);

  const { additionalStepState, setAdditionalStepState } =
    useContext(AdditionalContext);

  const getTestTaskInfo = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/user/announcement/task-info", data)
        .then((res) => {
          setTaskInfo(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          router.push("/");
        })
        .finally(() => {});
    },
  });

  const getTestTaskDetails = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/user/task/info", data)
        .then((res) => {
          let response = res.data;

          if (taskInfo.task.task_name === "testTask") {
            var transformedData = {
              pytania: [],
            };

            var pytaniaMap = {};

            res.data.task_details.forEach((item) => {
              let questionId = item.question.id;
              let questionText = item.question.question;
              let answerId = item.answer.id;
              let answerText = item.answer.answer;
              let isCorrect = item.answer.is_correct;

              if (!pytaniaMap[questionId]) {
                pytaniaMap[questionId] = {
                  id: questionId,
                  pytanie: questionText,
                  odpowiedzi: [],
                };

                transformedData.pytania.push(pytaniaMap[questionId]);
              }

              pytaniaMap[questionId].odpowiedzi.push({
                id: answerId,
                odpowiedz: answerText,
              });
            });

            response.task_details = transformedData;
          }

          console.log(response);
          setTaskDetails(response);
          setIsLoadingTask(false);
        })
        .catch((error) => {
          router.push("/");
        })
        .finally(() => {});
    },
  });

  useEffect(() => {
    if (additionalStepState === null) {
      router.push("/");
    } else {
      let json = {
        id: additionalStepState.id,
        announcement_id: additionalStepState.announcement_id,
        step_number: additionalStepState.step_number,
      };
      setData(json);

      getTestTaskInfo.mutate(json);
    }
  }, []);

  const navigation = () => {
    router.push("/announcement/" + additionalStepState.announcement_id);
  };

  const beginTask = () => {
    setIsLoadingTask(true);

    getTestTaskDetails.mutate(data);
  };

  return (
    <div>
      <ProtectRoute role="user">
        <MainContainer>
          <div className="shadow-lg w-auto pb-8 mb-2">
            <div className="pointer-events-none">
              <Logo />
            </div>
            {taskDetails === null && (
              <div>
                {isLoading ? (
                  <Loading />
                ) : taskInfo.task.task_name === "testTask" ? (
                  <div className="max-w-[700px] mx-auto text-justify mt-6 font-medium px-2">
                    Czy na pewno chcesz teraz przesłać swoje rozwiązanie? Etap
                    będzie polegał na rozwiązaniu testu. Po rozpoczęciu testu
                    nie będzie możliwości jego ponownego rozwiązania. Twój wynik
                    zostanie przesłany do autora ogłoszenia, na podstawie
                    którego podejmie on decyzję odnośnie twojego dalszego
                    uczestnictwie w procesie rekrutacji. Test składa się z pytań
                    wielokrotnego wyboru. Mogą się pojawić także pytania, które
                    nie zawierają poprawnej odpowiedzi. Zamknięcie strony
                    spowoduje niezapisanie twojej odpowiedzi. Po uływie czasu
                    przeznaczonego na rozwiązanie testu, twoje odpowiedzi
                    zostaną automatycznie zapisana.
                    <table className="table text-center mt-6">
                      <tbody>
                        {/* row 1 */}
                        <tr>
                          <th className="w-1/2">Czas na odpowiedź</th>
                          <td>{taskInfo.task_info.time} min</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                          <th className="w-1/2">Liczba pytań</th>
                          <td>{taskInfo.task_info.questions_count}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : taskInfo.task.task_name === "openTask" ? (
                  <div className="max-w-[700px] mx-auto text-justify mt-6 font-medium px-2">
                    Czy na pewno chcesz teraz przesłać swoje rozwiązanie? Etap
                    będzie polegał na odpowiedzeniu na pytanie otwarte. Po
                    rozpoczęciu zadania nie będzie możliwości jego ponownego
                    rozwiązania. Twoja odpowiedź zostanie przesłana do autora
                    ogłoszenia, na podstawie której podejmie on decyzję odnośnie
                    twojego dalszego uczestnictwie w procesie rekrutacji.
                    Zamknięcie strony spowoduje niezapisanie twojej odpowiedzi.
                    Po upływie czasu przeznaczonego na odpowiedź, twoje
                    rozwiązanie zostanie automatycznie zapisane.
                    <table className="table text-center mt-6">
                      <tbody>
                        {/* row 1 */}
                        <tr className="border-0">
                          <th className="w-1/2">Czas na odpowiedź</th>
                          <td>{taskInfo.task_info.time} min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="max-w-[700px] mx-auto text-justify mt-5 font-medium px-2">
                    Czy na pewno chcesz teraz przesłać swoje rozwiązanie? Etap
                    będzie polegał na odpowiedzeniu na pytanie otwarte w formie
                    przesłanego pliku jako odpowiedź. Po rozpoczęciu zadania nie
                    będzie możliwości jego ponownego rozwiązania. Twoja
                    odpowiedź zostanie przesłana do autora ogłoszenia, na
                    podstawie której podejmie on decyzję odnośnie twojego
                    dalszego uczestnictwie w procesie rekrutacji. Zamknięcie
                    strony spowoduje niezapisanie twojej odpowiedzi. Po upływie
                    czasu przeznaczonego na odpowiedź, twoje rozwiązanie
                    zostanie automatycznie zapisane.
                    <table className="table text-center mt-6">
                      <tbody>
                        {/* row 1 */}
                        <tr className="border-0">
                          <th className="w-1/2">Czas na odpowiedź</th>
                          <td>{taskInfo.task_info.time} min</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {!isLoading && taskDetails === null && (
              <div className="max-w-[700px] px-2 mx-auto mt-8 flex justify-around">
                {isLoadingTask ? (
                  <button
                    type="submit"
                    className="btn btn-neutral w-[150px] btn-disabled"
                  >
                    <span className="loading loading-spinner"></span>
                  </button>
                ) : (
                  <button
                    onClick={beginTask}
                    type="submit"
                    className="btn btn-neutral w-[150px]"
                  >
                    Rozpocznij
                  </button>
                )}

                <button
                  className="block btn btn-base-100 w-[150px]"
                  onClick={navigation}
                >
                  Anuluj
                </button>
              </div>
            )}

            {!isLoading &&
              taskDetails !== null &&
              (taskInfo.task.task_name === "testTask" ? (
                <TestTask taskDetails={taskDetails} data={data} />
              ) : taskInfo.task.task_name === "openTask" ? (
                <OpenTask taskDetails={taskDetails} data={data} />
              ) : (
                <TestTask taskDetails={taskDetails} data={data} />
              ))}
          </div>
        </MainContainer>
      </ProtectRoute>
    </div>
  );
};

export default AnswerPage;
