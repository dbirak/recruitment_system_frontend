"use-client";

import { useEffect, useState } from "react";

import EditorToolbar, {
  modules,
  formats,
} from "./../../../components/editorToolbar";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { TiArrowRightThick } from "react-icons/ti";

const FirstStep = (props) => {
  const [value, setValue] = useState(props.descryption);

  const handleChange = (value) => {
    setValue(value);
  };

  const changeStep = async (activities) => {
    await props.setDescryption(value);
    props.changeStep(activities);
  };

  return (
    <div>
      <EditorToolbar />
      <ReactQuill
        className="text-[30px]"
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={"Wprowadż treść swojego pytania..."}
        modules={modules}
        formats={formats}
      />

      <div className="flex justify-between mt-10">
        <div></div>
        {/* <button className="btn btn-primary w-[150px]">
          <TiArrowLeftThick />
          wstecz
        </button> */}
        <button
          onClick={() => changeStep("up")}
          className={
            value !== "" && value !== "<p><br></p>"
              ? "btn btn-primary w-[150px]"
              : "btn btn-primary w-[150px] btn-disabled"
          }
        >
          dalej
          <TiArrowRightThick />
        </button>
      </div>
    </div>
  );
};

export default FirstStep;
