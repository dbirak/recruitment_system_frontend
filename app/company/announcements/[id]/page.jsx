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
import ManageUsers from "./components/manageUsers";
import ApplicationModal from "./components/applicationModal";
import BeginNewStepModal from "./components/beginNewStepModal";
import CloseAnnouncementModal from "./components/closeAnnouncementModal";
import SendMailModal from "./components/sendMailModal";
import Swal from "sweetalert2";
import ExtendDateStepModal from "./components/extendDateStepModal";

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

  const [isShowApplicationModal, setIsShowApplicationModal] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState(null);

  const [isShowBeginNewStepModal, setIsShowBeginNewStepModal] = useState(false);

  const [isExtendDateStepModal, setIsExtendDateStepModal] = useState(false);

  const [isShowCloseAnnouncementModal, setIsShowCloseAnnouncementModal] =
    useState(false);
  const [lastStepInfo, setLastStepInfo] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [isSendMailModal, setIsSendMailModal] = useState(false);

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

  const closeManageUsers = () => {
    setIsShowManageUsersModal(false);
  };

  const closeApplicationModal = () => {
    setIsShowApplicationModal(false);
  };

  const showBeginNewStepModal = (stepInfo) => {
    setStepModal(stepInfo);

    setIsShowBeginNewStepModal(true);
  };

  const closeBeginNewStepModal = () => {
    setIsShowBeginNewStepModal(false);
  };

  const showExtendDateStep = (stepInfo) => {
    setStepModal(stepInfo);

    setIsExtendDateStepModal(true);
  };

  const closeExtendDateStep = () => {
    setIsExtendDateStepModal(false);
  };

  const showSendMailModal = (item) => {
    let info = {
      userInfo: item,
      companyInfo: announcement.company,
      announcement_id: announcement.id,
    };

    setUserInfo(info);

    setIsSendMailModal(true);
  };

  const closeSendMailModal = () => {
    setIsSendMailModal(false);
  };

  const showCloseAnnouncementModal = (lastStepInfo) => {
    setLastStepInfo({
      announcement_id: lastStepInfo.announcement_id,
      step_id: lastStepInfo.id,
      step_number: lastStepInfo.step_number,
    });

    setIsShowCloseAnnouncementModal(true);
  };

  const hideCloseAnnouncementModal = () => {
    setIsShowCloseAnnouncementModal(false);
  };

  const successMailSend = () => {
    setIsSendMailModal(false);

    Swal.fire({
      title: "Sukces",
      text: "Twoja wiadomość została wysłana!",
      icon: "success",
      color: "hsl(var(--n))",
      background: "hsl(var(--b1))",
      confirmButtonColor: "hsl(var(--su))",
      allowOutsideClick: false,
      backdrop: "#000000a6",
      confirmButtonText: "Zamknij",
    }).then((result) => {});
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

  const showApplication = (userId, name, surname) => {
    setName(name + " " + surname);

    let data = {
      announcement_id: stepModal.announcement_id,
      user_id: userId,
      step_id: stepModal.id,
      step_number: stepModal.step_number,
    };

    setData(data);

    setIsShowApplicationModal(true);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="announcements">
          <CompanyContainer>
            {isLoading ? (
              <div>
                <Title name="Twoje ogłoszenia" />

                <Loading />
              </div>
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

                <ManageUsers
                  closeManageUsers={closeManageUsers}
                  stepModal={stepModal}
                  canManageUsers={canManageUsers}
                  showApplication={showApplication}
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
                  showBeginNewStepModal={showBeginNewStepModal}
                  closeBeginNewStepModal={closeBeginNewStepModal}
                  showCloseAnnouncementModal={showCloseAnnouncementModal}
                  showSendMailModal={showSendMailModal}
                  showExtendDateStep={showExtendDateStep}
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

      {isShowApplicationModal && (
        <ApplicationModal
          stepModal={stepModal}
          data={data}
          name={name}
          closeApplicationModal={closeApplicationModal}
        />
      )}

      {isShowBeginNewStepModal && (
        <BeginNewStepModal
          stepModal={stepModal}
          closeBeginNewStepModal={closeBeginNewStepModal}
        />
      )}

      {isExtendDateStepModal && (
        <ExtendDateStepModal
          stepModal={stepModal}
          closeBeginNewStepModal={closeBeginNewStepModal}
          closeExtendDateStep={closeExtendDateStep}
        />
      )}

      {isShowCloseAnnouncementModal && (
        <CloseAnnouncementModal
          hideCloseAnnouncementModal={hideCloseAnnouncementModal}
          lastStepInfo={lastStepInfo}
        />
      )}

      {isSendMailModal && (
        <SendMailModal
          userInfo={userInfo}
          closeSendMailModal={closeSendMailModal}
          successMailSend={successMailSend}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;
