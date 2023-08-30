import Modal from "@/components/modals/modal";
import { axiosWithBearerFormData } from "@/utils/api/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const SendCvModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const styleInputCorrectFile =
    "file-input file-input-neutral file-input-bordered w-full";
  const styleInputErrorFile = styleInputCorrectFile + " input-error text-error";

  const sendCvTask = useMutation({
    mutationFn: (data) => {
      setIsLoading(true);
      axiosWithBearerFormData
        .post("/user/application/cv", data)
        .then((res) => {
          props.successCvSend();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.clear();
            navigate("/");
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
              const validateMessage =
                error.response.data.errors[validateField][0];

              setError(validateField, { message: validateMessage });
            }
          } else console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = (data) => {
    const formData = new FormData();

    formData.append("cv", data.cv[0]);
    formData.append("announcement_id", props.announcement.id);

    sendCvTask.mutate(formData);
  };

  return (
    <div>
      <Modal>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
          Wyślij swoje CV
        </h1>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <input
            type="file"
            placeholder="CV"
            className={errors.cv ? styleInputErrorFile : styleInputCorrectFile}
            {...register("cv", {
              required: "Plik CV jest wymagany.",
              onChange: (e) => {
                return e.target.files;
              },
              validate: {
                validPdf: (file) => {
                  return (
                    (file && file[0]?.type === "application/pdf") ||
                    "Akceptowane są tylko pliki pdf."
                  );
                },
              },
            })}
            accept="application/pdf"
          />
          <label className="label mb-5">
            {errors.cv && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.cv.message}
              </span>
            )}
          </label>

          <div className="form-control">
            <label>
              <div className="flex label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-neutral me-4"
                  {...register("zgoda", {
                    required: "Zgoda jest wymagana.",
                  })}
                />
                <div className=" text-justify block text-[14px]">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych przez "
                  {props.announcement.company.name}" w celu prowadzenia
                  rekrutacji na aplikowane przeze mnie stanowisko.
                </div>
              </div>
            </label>
          </div>

          <label className="label mb-5">
            {errors.zgoda && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.zgoda.message}
              </span>
            )}
          </label>

          <div className="w-full mx-auto mt-3 flex justify-around">
            {isLoading ? (
              <button
                type="submit"
                className="btn btn-neutral w-[150px] btn-disabled"
              >
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button type="submit" className="btn btn-neutral w-[150px]">
                Wyślij
              </button>
            )}

            <button
              className="block btn btn-base-100 w-[150px]"
              onClick={props.closeCvSendModal}
            >
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SendCvModal;
