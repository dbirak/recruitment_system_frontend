"use client";

import EditorToolbar, {
  modules,
  formats,
} from "./../../modules/components/editorToolbar";
import ReactQuill from "react-quill";
import { useState } from "react";
import Modal3 from "@/components/modals/modal3";
import { AiTwotoneSave } from "react-icons/ai";
import Title from "../../components/title";

const ChangeDescryptionModal = (props) => {
  const [value, setValue] = useState(
    props.profile.description === null ? "" : props.profile.description
  );

  const saveDescription = () => {
    props.editItem(value, "description");
  };

  return (
    <div>
      <Modal3>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5 break-words">
          Edycja opisu
        </h1>

        <div>
          <EditorToolbar />
          <ReactQuill
            className="text-[30px] font-sans"
            theme="snow"
            defaultValue={value}
            onChange={(value) => setValue(value)}
            placeholder={"Wprowadż treść swojego opisu..."}
            modules={modules}
            formats={formats}
          />
        </div>
        <button
          onClick={saveDescription}
          type="button"
          className="btn btn-neutral w-full mt-8 mb-2"
        >
          <AiTwotoneSave /> Zapisz
        </button>
      </Modal3>
    </div>
  );
};

export default ChangeDescryptionModal;
