import Answer from "./Answer";

const Question = (props) => {
  const userAnswer = (answerId, answer) => {
    props.userAnswer(answerId, answer);
  };

  return (
    <div className="mb-8 px-6">
      <div className="flex justify-between w-auto mb-3">
        <div className="grid place-content-center grid-cols-1">
          <div className="text-[23px] font-semibold text-neutral">
            {props.question}
          </div>
        </div>
        <div className="grid grid-cols-1 place-content-center align-center min-w-[165px] text-right">
          <div>
            <span className="text-[23px] font-semibold">Pytanie </span>
            <span className="text-[23px] font-bold text-black">
              {props.questionNumber} / {props.questionsCount}
            </span>
          </div>
        </div>
      </div>
      <div className="form-control">
        {props.answers.map((item) => {
          return (
            <Answer
              answer={item.odpowiedz}
              key={item.id}
              questionId={props.questionId}
              answerId={item.id}
              userAnswer={userAnswer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Question;
