"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import { IoMdAddCircle } from "react-icons/io";
import Navbar from "../../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../../components/title";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { axiosWithBearer } from "@/utils/api/axios";
import Swal from "sweetalert2";
import Loading from "@/components/loadings/loading";
import { MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import ShowOpenQuestionModal from "./components/showOpenQuestionModal";

const OpenQuestionsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isShowOpenTaskModal, setIsShowOpenTaskModal] = useState(false);
  const [openQuestionShowInfo, setOpenQuestionShowInfo] = useState({
    name: "",
    id: null,
  });

  const [allOpenTasks, setAllOpenTasks] = useState([]);
  const router = useRouter();

  const addOpenQuestionNavigate = () => {
    router.push("/company/modules/open-questions/add");
  };

  const getAllOpenTasks = useQuery("getAllOpenTasks", () => {
    axiosWithBearer
      .get("/company/open-task")
      .then((res) => {
        setAllOpenTasks(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else {
          Swal.fire({
            title: "Błąd",
            text: "Nie można pobrać pytań, ponieważ wystąpił błąd podczas połączenia z serwerem!",
            icon: "error",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--er))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {});
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const deleteOpenTask = (questionId) => {
    console.log(questionId);
  };

  const showOpenTask = (questionId, questionName) => {
    setOpenQuestionShowInfo({ name: questionName, id: questionId });
    setIsShowOpenTaskModal(true);
  };

  const closeShowOpenQuestionModal = () => {
    setIsShowOpenTaskModal(false);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="openQuestions">
          <CompanyContainer>
            <Title name="Moduły - Pytania otwarte" />
            <button
              onClick={addOpenQuestionNavigate}
              className="btn btn-primary w-full p-3 mb-5"
            >
              <span className="text-[20px]">
                <IoMdAddCircle />
              </span>
              Dodaj nowe pytanie
            </button>

            {isLoading ? (
              <Loading />
            ) : allOpenTasks.length === 0 ? (
              <p>Brak pytań!</p>
            ) : (
              <div>
                {allOpenTasks.map((item, index) => {
                  return (
                    <div
                      className="collapse collapse-sm collapse-arrow bg-base-200 mb-3 mt-5"
                      key={index}
                    >
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium">
                        {index + 1}. {item.name}
                      </div>
                      <div className="collapse-content">
                        <div className="overflow-x-auto mb-5">
                          <table className="table text-center">
                            <tbody>
                              {/* row 1 */}
                              <tr>
                                <th className="w-1/2">
                                  Czas trwania odpowiedzi
                                </th>
                                <td>{item.time} min</td>
                              </tr>
                              {/* row 2 */}
                              <tr>
                                <th className="w-1/2">Data utworzenia</th>
                                <td>
                                  {moment
                                    .utc(item.created_at)
                                    .add(2, "hours")
                                    .format("HH:mm DD.MM.YYYY")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="flex justify-around mt-6 w-[225px] mx-auto">
                          <div className="tooltip" data-tip="wyświetl pytanie">
                            <button
                              onClick={() => showOpenTask(item.id, item.name)}
                              className="btn btn-square btn-primary text-[22px]"
                            >
                              <MdRemoveRedEye />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="edytuj pytanie">
                            <button className="btn btn-square btn-warning text-[22px]">
                              <MdModeEdit />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="usuń pytanie">
                            <button
                              onClick={() => deleteOpenTask(item.id)}
                              className="btn btn-square btn-error text-[18px]"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>

      {isShowOpenTaskModal && (
        <ShowOpenQuestionModal
          openQuestionShowInfo={openQuestionShowInfo}
          closeShowOpenQuestionModal={closeShowOpenQuestionModal}
        />
      )}
    </div>
  );
};

export default OpenQuestionsPage;
