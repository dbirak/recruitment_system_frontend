"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../../components/title";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosWithBearer } from "@/utils/api/axios";
import Loading from "@/components/loadings/loading";
import { useQuery } from "react-query";
import AppliactionModule from "./components/appliacationModule";
import AnnouncementInfo from "./components/announcementInfo";
import AnnouncementTableInfo from "./components/announcementTableInfo";
import ShowTestModal from "../../modules/tests/components/showTestModal";
import ShowOpenQuestionModal from "../../modules/open-questions/components/showOpenQuestionModal";
import ShowSendFileModal from "../../modules/send-files/components/showSendFileModal";

const AnnouncementPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcement, setAnnouncement] = useState([]);

  const [isShowModal, setIsShowModal] = useState(false);
  const [taskModal, setTaskModal] = useState({
    taskType: "",
    taskInfo: { name: "", id: null },
  });

  const router = useRouter();
  const id = props.params.id;

  const showTask = (taskType, taskInfo) => {
    setTaskModal({
      taskType: taskType,
      taskInfo: { name: taskInfo.name, id: taskInfo.id },
    });

    setIsShowModal(true);
  };

  const closeTask = () => {
    setIsShowModal(false);
  };

  const getCompanyAnnouncementById = useQuery(
    "getCompanyAnnouncementById",
    () => {
      axiosWithBearer
        .get("/company/announcement/" + id)
        .then((res) => {
          setAnnouncement(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else if (error.response.status == 404) {
            router.push("/company/announcements");
          }
        })
        .finally(() => {});
    }
  );

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="announcements">
          <CompanyContainer>
            <Title name="Twoje ogłoszenia" />

            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <AnnouncementTableInfo announcement={announcement} />
                <AnnouncementInfo announcement={announcement} />
                <AppliactionModule
                  announcement={announcement}
                  showTask={showTask}
                  closeTask={closeTask}
                />
              </div>
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>

      {isShowModal && taskModal.taskType === "testTask" && (
        <ShowTestModal
          testShowInfo={taskModal.taskInfo}
          closeShowTestModal={closeTask}
        />
      )}

      {isShowModal && taskModal.taskType === "openTask" && (
        <ShowOpenQuestionModal
          openQuestionShowInfo={taskModal.taskInfo}
          closeShowOpenQuestionModal={closeTask}
        />
      )}

      {isShowModal && taskModal.taskType === "fileTask" && (
        <ShowSendFileModal
          fileTaskShowInfo={taskModal.taskInfo}
          closeShowSendFileModal={closeTask}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;
