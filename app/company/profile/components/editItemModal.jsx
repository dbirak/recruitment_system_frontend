import Modal from "@/components/modals/modal";
import { useForm } from "react-hook-form";

const EditItemModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const styleInputCorrect =
    "input input-bordered w-full break-words owerflow-y-auto";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const onSubmitHandler = async (data) => {
    props.editItem(data.element, props.editItemInfo.place);
  };

  return (
    <div>
      <Modal>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
          {props.editItemInfo.header}
        </h1>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="text"
            placeholder={props.editItemInfo.placeholder}
            defaultValue={props.editItemInfo.defaultValue}
            className={errors.element ? styleInputError : styleInputCorrect}
            {...register("element", props.editItemInfo.validaitionRules)}
          />
          <label className="label mb-5">
            {errors.element && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.element.message}
              </span>
            )}
          </label>

          <div className="w-full mx-auto mt-3 flex justify-around">
            <input
              className="btn btn-success w-[150px]"
              type="submit"
              value="Edytuj"
            />
            <button
              className="block btn btn-error w-[150px]"
              onClick={props.closeEditItemModal}
            >
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditItemModal;
