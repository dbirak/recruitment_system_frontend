"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";
import CommentItem from "../[id]/components/commentItem";
import CommentRatingCounter from "./components/commentRatingCounter";
import CommentAvarage from "./components/commentAvarage";
import ModulesCounter from "./components/modulesCounter";
import AnnouncementCounter from "./components/announcementCounter";
import { useState } from "react";
import { axiosWithBearer } from "@/utils/api/axios";
import Loading from "@/components/loadings/loading";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import MoreCommentsModal from "./components/moreCommentsModal";

const DashboardCompany = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistcs] = useState(null);

  const [isShowMoreCommentModal, setIsShowMoreCommentModal] = useState(false);

  const showMoreCommentsModal = () => {
    setIsShowMoreCommentModal(true);
  };

  const closeMoreCommentsModal = () => {
    setIsShowMoreCommentModal(false);
  };

  const getAllFileTasks = useQuery("getAllFileTasks", () => {
    axiosWithBearer
      .get("/company/statistics")
      .then((res) => {
        setStatistcs(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else {
          Swal.fire({
            title: "Błąd",
            text: "Nie można pobrać danych, ponieważ wystąpił błąd podczas połączenia z serwerem!",
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

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="home">
          <CompanyContainer>
            <Title name="Strona główna" />

            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] text-center mx-auto py-5 px-4 mt-8 mb-4">
                  <AnnouncementCounter statistics={statistics} />
                </div>

                <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-5 px-4 mt-8 mb-4">
                  <div>
                    <div className="text-center text-[23px] font-semibold">
                      Najnowsze opinie
                    </div>

                    {statistics.comments.map((comment, index) => (
                      <CommentItem key={index} comment={comment} />
                    ))}

                    {statistics.comments_counter === 0 && (
                      <p className="text-center w-full block text-[15px]">
                        Brak opini do wyświetlenia!
                      </p>
                    )}

                    {statistics.comments_counter > 2 && (
                      <button
                        className="btn btn-neutral mx-auto w-[150px] mt-7 block"
                        onClick={showMoreCommentsModal}
                      >
                        Pokaż więcej
                      </button>
                    )}
                  </div>
                </div>

                <div className="block md:flex gap-8 max-w-[1200px]">
                  <div className="relative bg-base-100 shadow-lg w-full rounded-lg z-20 text-center mx-auto py-5 px-4 mt-8 mb-4">
                    <CommentRatingCounter statistics={statistics} />
                  </div>
                  <div className="relative bg-base-100 shadow-lg w-full rounded-lg z-20 text-center mx-auto py-5 px-4 mt-8 mb-4">
                    <CommentAvarage statistics={statistics} />
                  </div>
                </div>

                <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-5 px-4 mt-8 mb-4">
                  <ModulesCounter statistics={statistics} />
                </div>
              </div>
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>

      {isShowMoreCommentModal && (
        <MoreCommentsModal
          statistics={statistics}
          closeMoreCommentsModal={closeMoreCommentsModal}
        />
      )}
    </div>
  );
};

export default DashboardCompany;
