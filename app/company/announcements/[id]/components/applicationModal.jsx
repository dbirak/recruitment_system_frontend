"use client";

import Loading from "@/components/loadings/loading";
import Modal from "@/components/modals/modal";
import { axiosWithBearer } from "@/utils/api/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import CvTaskAnswer from "./applicationModalComponents/cvTaskAnswer";
import TestTaskAnswer from "./applicationModalComponents/testTaskAnswer";
import OpenTaskAnswer from "./applicationModalComponents/openTaskAnswer";
import Modal3 from "@/components/modals/modal3";
import FileTaskAnswer from "./applicationModalComponents/fileTaskAnswer";

const ApplicationModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState(null);

  const getApplicationfromStep = useQuery("getApplicationfromStep", () => {
    axiosWithBearer
      .post("/company/application/task", props.data)
      .then((res) => {
        setApplication(res.data);
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
  });

  const closeApplicationModal = () => {
    props.closeApplicationModal();
  };

  return (
    <div>
      {isLoading && (
        <Modal>
          <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
            {props.name} -{" "}
            {props.stepModal.task.task_name === "cvTask"
              ? "CV"
              : props.stepModal.task.task_name === "testTask"
              ? "test"
              : props.stepModal.task.task_name === "openTask"
              ? "pytanie otwarte"
              : "przesyłanie plików"}
          </h1>

          <Loading />
        </Modal>
      )}

      {!isLoading && application.task.task_name === "cvTask" && (
        <Modal>
          <CvTaskAnswer
            closeApplicationModal={closeApplicationModal}
            stepModal={props.stepModal}
            data={props.data}
            name={props.name}
            application={application}
          />
        </Modal>
      )}

      {!isLoading && application.task.task_name === "testTask" && (
        <Modal>
          <TestTaskAnswer
            closeApplicationModal={closeApplicationModal}
            stepModal={props.stepModal}
            data={props.data}
            name={props.name}
            application={application}
          />
        </Modal>
      )}

      {!isLoading && application.task.task_name === "openTask" && (
        <Modal3>
          <OpenTaskAnswer
            closeApplicationModal={closeApplicationModal}
            stepModal={props.stepModal}
            data={props.data}
            name={props.name}
            application={application}
          />
        </Modal3>
      )}

      {!isLoading && application.task.task_name === "fileTask" && (
        <Modal>
          <FileTaskAnswer
            closeApplicationModal={closeApplicationModal}
            stepModal={props.stepModal}
            data={props.data}
            name={props.name}
            application={application}
          />
        </Modal>
      )}
    </div>
  );
};

export default ApplicationModal;
