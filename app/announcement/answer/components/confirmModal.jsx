import Modal from "@/components/modals/modal";

const ConfirmModal = (props) => {
  return (
    <div>
      <Modal>
        <h1 className="text-center text-[18px] font-semibold">
          Czy na pewno chcesz przesłać swoje rozwiązanie?
        </h1>

        <div className="w-full mx-auto mt-6 flex justify-around">
          <button
            onClick={props.endTask}
            type="submit"
            className="btn btn-neutral w-[150px]"
          >
            Wyślij
          </button>

          <button
            className="block btn btn-base-100 w-[150px]"
            onClick={props.closeConfrimModal}
          >
            Anuluj
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
