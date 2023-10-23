"use client";

import CompanyContainer from "@/components/layouts/companyContainer";
import Navbar from "../../components/navbar";
import Title from "../../components/title";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Loading from "@/components/loadings/loading";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import ShowTestModal from "./components/showTestModal";
import moment from "moment";

const TestModulePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isShowTestModal, setIsShowTestModal] = useState(false);
  const [testShowInfo, setTestShowInfo] = useState({ name: "", id: null });

  const [allTests, setAllTests] = useState([]);
  const router = useRouter();

  const addTestNavigate = () => {
    router.push("/company/modules/tests/add");
  };

  const getAllTests = useQuery("getAllTests", () => {
    axiosWithBearer
      .get("/company/test")
      .then((res) => {
        setAllTests(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else {
          Swal.fire({
            title: "Błąd",
            text: "Nie można pobrać testów, ponieważ wystąpił błąd podczas połączenia z serwerem!",
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

  const deleteTest = (testId) => {};

  const showTest = (testId, testName) => {
    setTestShowInfo({ name: testName, id: testId });
    setIsShowTestModal(true);
  };

  const closeShowTestModal = () => {
    setIsShowTestModal(false);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="tests">
          <CompanyContainer>
            <Title name="Moduły - Testy" />
            <button
              onClick={addTestNavigate}
              className="btn btn-primary w-full p-3 mb-5"
            >
              <span className="text-[20px]">
                <IoMdAddCircle />
              </span>
              Dodaj nowy test
            </button>

            {isLoading ? (
              <Loading />
            ) : allTests.length === 0 ? (
              <p className="text-center w-full">Brak testów do wyświetlenia!</p>
            ) : (
              <div>
                {allTests.map((item, index) => {
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
                                <th className="w-1/2">Liczba pytań</th>
                                <td>{item.questions_count}</td>
                              </tr>
                              {/* row 2 */}
                              <tr>
                                <th className="w-1/2">Czas trwania testu</th>
                                <td>{item.time} min</td>
                              </tr>
                              {/* row 3 */}
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
                          <div className="tooltip" data-tip="wyświetl pytania">
                            <button
                              onClick={() => showTest(item.id, item.name)}
                              className="btn btn-square btn-primary text-[22px]"
                            >
                              <MdRemoveRedEye />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="edytuj test">
                            <button className="btn btn-square btn-warning text-[22px]">
                              <MdModeEdit />
                            </button>
                          </div>
                          <div className="tooltip" data-tip="usuń test">
                            <button
                              onClick={() => deleteTest(item.id)}
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

      {isShowTestModal && (
        <ShowTestModal
          testShowInfo={testShowInfo}
          closeShowTestModal={closeShowTestModal}
        />
      )}
    </div>
  );
};

export default TestModulePage;
