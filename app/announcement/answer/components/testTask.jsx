import { useState } from "react";
import Question from "./testComponents/Question";
import Timer from "./timer";
import { useEffect } from "react";
import ConfirmModal from "./confirmModal";
import Loading2 from "@/components/loadings/loading2";
import { axiosWithBearer } from "@/utils/api/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

const TestTask = (props) => {
  const router = useRouter();

  const [answers, setAnswers] = useState(
    props.taskDetails.task_details.pytania
  );
  const [showModal, setShowModal] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let prevAnswers = answers;

    for (let i = 0; i < prevAnswers.length; i++) {
      for (let j = 0; j < prevAnswers[i].odpowiedzi.length; j++) {
        prevAnswers[i].odpowiedzi[j].is_markered = false;
      }
    }

    setAnswers(prevAnswers);
  }, []);

  const sendAnswer = useMutation({
    mutationFn: (data) => {
      axiosWithBearer
        .post("/user/task/answer", data)
        .then((res) => {
          setIsLoading(false);

          Swal.fire({
            title: "Sukces",
            text: "Twoja odpowiedź została przesłana!",
            icon: "success",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--su))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            router.push("/announcement/" + props.data.announcement_id);
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Błąd",
            text: "Wystąpił błąd podczas wysyłania odpowiedzi!",
            icon: "error",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--er))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            router.push("/");
          });
        })
        .finally(() => {});
    },
  });

  const endTime = () => {
    setStopTimer(true);
    setShowModal(false);
    setIsLoading(true);

    let data = {
      ...props.data,
      answer: answers,
    };

    sendAnswer.mutate(data);
  };

  const endTask = () => {
    endTime();
  };

  const closeConfrimModal = () => {
    setShowModal(false);
  };

  const userAnswer = (answerId, questionId) => {
    let prevAnswers = answers;

    let questionIndex = prevAnswers.indexOf(
      prevAnswers.find((item) => item.id === questionId)
    );

    let answerIndex = prevAnswers[questionIndex].odpowiedzi.indexOf(
      prevAnswers[questionIndex].odpowiedzi.find((item) => item.id === answerId)
    );

    prevAnswers[questionIndex].odpowiedzi[answerIndex].is_markered
      ? (prevAnswers[questionIndex].odpowiedzi[answerIndex].is_markered = false)
      : (prevAnswers[questionIndex].odpowiedzi[answerIndex].is_markered = true);

    setAnswers(prevAnswers);
  };

  return (
    <div>
      {!stopTimer ? (
        <Timer time={props.taskDetails.task_info.time} endTime={endTime} />
      ) : (
        <div></div>
      )}

      {props.taskDetails.task_details.pytania.map((item, index) => (
        <Question
          key={index + 1}
          questionNumber={index + 1}
          question={item.pytanie}
          questionId={item.id}
          answers={item.odpowiedzi}
          userAnswer={userAnswer}
          questionsCount={props.taskDetails.task_info.questions_count}
        />
      ))}
      <div className="w-full">
        <button
          onClick={() => {
            showModal === false ? setShowModal(true) : setShowModal(false);
          }}
          className="block mx-auto btn btn-neutral cursor-pointer w-[175px] text-center tracking-tight"
        >
          Zakończ test
        </button>
      </div>

      {showModal && (
        <ConfirmModal endTask={endTask} closeConfrimModal={closeConfrimModal} />
      )}

      {isLoading && <Loading2 />}
    </div>
  );
};

export default TestTask;
