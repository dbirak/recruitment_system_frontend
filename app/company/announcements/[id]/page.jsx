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
import ManageUsersModal from "./components/manageUsersModal";

const AnnouncementPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcement, setAnnouncement] = useState([]);

  const [isShowModal, setIsShowModal] = useState(false);
  const [taskModal, setTaskModal] = useState({
    taskType: "",
    taskInfo: { name: "", id: null },
  });

  const [isShowManageUsersModal, setIsShowManageUsersModal] = useState(false);
  const [canManageUsers, setCanManageUsers] = useState(false);
  const [stepModal, setStepModal] = useState(null);

  const router = useRouter();
  const id = props.params.id;

  const showTask = (taskType, taskInfo) => {
    setTaskModal({
      taskType: taskType,
      taskInfo: { name: taskInfo.name, id: taskInfo.id },
    });

    setIsShowModal(true);
  };

  const showManageUsersModal = (stepInfo, canManageUsers) => {
    setStepModal(stepInfo);
    setCanManageUsers(canManageUsers);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsShowManageUsersModal(true);
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
            {isLoading ? (
              <Loading />
            ) : isShowManageUsersModal ? (
              <div>
                <Title
                  name={
                    canManageUsers && stepModal.task.task_name === "cvTask"
                      ? "Zarządzaj aplikacjami - Przesłanie CV"
                      : canManageUsers &&
                        stepModal.task.task_name === "testTask"
                      ? "Zarządzaj aplikacjami - Test"
                      : canManageUsers &&
                        stepModal.task.task_name === "openTask"
                      ? "Zarządzaj aplikacjami - Pytanie otwarte"
                      : canManageUsers &&
                        stepModal.task.task_name === "fileTask"
                      ? "Zarządzaj aplikacjami - Przesłanie pliku"
                      : !canManageUsers && stepModal.task.task_name === "cvTask"
                      ? "Zobacz aplikacje - Przesłanie CV"
                      : !canManageUsers &&
                        stepModal.task.task_name === "testTask"
                      ? "Zobacz aplikacje - Test"
                      : !canManageUsers &&
                        stepModal.task.task_name === "openTask"
                      ? "Zobacz aplikacje - Pytanie otwarte"
                      : "Zobacz aplikacje - Przesłanie pliku"
                  }
                />

                <ManageUsersModal
                  stepModal={stepModal}
                  canManageUsers={canManageUsers}
                />
              </div>
            ) : (
              <div>
                <Title name="Twoje ogłoszenia" />

                <AnnouncementTableInfo announcement={announcement} />
                <AnnouncementInfo announcement={announcement} />
                <AppliactionModule
                  announcement={announcement}
                  showTask={showTask}
                  closeTask={closeTask}
                  showManageUsersModal={showManageUsersModal}
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

      {/* {isShowManageUsersModal && <ManageUsersModal />} */}
    </div>
  );
};

export default AnnouncementPage;
