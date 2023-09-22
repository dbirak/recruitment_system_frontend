import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const OpenTaskAnswer = (props) => {
  const closeApplicationModal = () => {
    props.closeApplicationModal();
  };

  return (
    <div>
      <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
        {props.name} - pytanie otwarte
      </h1>

      <ReactQuill
        theme="bubble"
        value={props.application.info.answer}
        placeholder={""}
        readOnly
      />

      <button
        onClick={closeApplicationModal}
        className="btn btn-primary w-full rounded-none mt-5"
      >
        Zamknij
      </button>
    </div>
  );
};

export default OpenTaskAnswer;
