import Modal from "@/components/modals/modal";
import { useForm } from "react-hook-form";

const AddItemModal = (props) => {
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
    props.addItem(data.element, props.place);
  };

  return (
    <div>
      <Modal>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
          Dodaj element
        </h1>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="text"
            placeholder="Wpisz treść"
            className={errors.element ? styleInputError : styleInputCorrect}
            {...register("element", {
              required: "Treść jest wymagana.",
              maxLength: {
                value: 100,
                message: "Treść jest zbyt długa.",
              },
            })}
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
              value="Dodaj"
            />
            <button
              className="block btn btn-error w-[150px]"
              onClick={props.closeAddItemModal}
            >
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddItemModal;
