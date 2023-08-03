"use client";

import Modal from "@/components/modals/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditStepModal = (props) => {
  const [module, setModule] = useState(
    props.editedStep.step.module === "test"
      ? 1
      : props.editedStep.step.module === "openTask"
      ? 2
      : 3
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (props.editedStep.step.module === "test") {
      let index = props.info.tests.indexOf(props.editedStep.step.task) + 1;

      setValue("task", index.toString());

      console.log(index);
      console.log(props.editedStep);
      console.log(props.info.tests);
    }

    if (props.editedStep.step.module === "openTask") {
      let index = props.info.openTasks.indexOf(props.editedStep.step.task) + 1;

      setValue("task", index.toString());
    }

    if (props.editedStep.step.module === "fileTask") {
      let index = props.info.fileTasks.indexOf(props.editedStep.step.task) + 1;

      setValue("task", index.toString());
    }
  }, [props.info]);

  const onSubmitHandler = async (data) => {
    let selectedValue = {
      module: module === 1 ? "test" : module === 2 ? "openTask" : "fileTask",
      task:
        module === 1
          ? props.info.tests.find((item) => item.id === parseInt(data.task))
          : module === 2
          ? props.info.openTasks.find((item) => item.id === parseInt(data.task))
          : props.info.fileTasks.find(
              (item) => item.id === parseInt(data.task)
            ),
    };

    let updatedStep = {
      index: props.editedStep.index,
      step: selectedValue,
    };

    props.editStep(updatedStep);
  };

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  return (
    <div>
      <Modal>
        <h1 className="w-full text-[26px] font-semibold text-neutral border-b-2 pb-2 border-neutral mb-5">
          Edytuj etap
        </h1>

        <div>
          <select
            className={
              errors.modul ? styleInputErrorSelect : styleInputCorrecSelect
            }
            defaultValue={
              props.editedStep.step.module === "test"
                ? "1"
                : props.editedStep.step.module === "openTask"
                ? "2"
                : "3"
            }
            {...register("modul", {
              pattern: {
                value: /^(?!0$).+$/,
                message: "Proszę wybrać moduł.",
              },
              onChange: (e) => {
                setValue("task", "0");
                setModule(parseInt(e.target.value));
              },
            })}
          >
            <option key={0} value="0">
              Wybierz moduł
            </option>
            <option key={1} value="1">
              Test
            </option>
            <option key={2} value="2">
              Pytanie otwarte
            </option>
            <option key={3} value="3">
              Przesyłanie plików
            </option>
          </select>
          <label className="label mb-5">
            {errors.modul && (
              <span className="label-text-alt text-error text-[13px]">
                {errors.modul.message}
              </span>
            )}
          </label>
        </div>

        {module === 1 && (
          <div>
            <select
              className={
                errors.task ? styleInputErrorSelect : styleInputCorrecSelect
              }
              defaultValue={"0"}
              {...register("task", {
                pattern: {
                  value: /^(?!0$).+$/,
                  message: "Proszę wybrać test.",
                },
              })}
            >
              <option key={0} value="0" defaultValue>
                Wybierz test
              </option>
              {props.info.tests.map((item, index) => (
                <option className=" break-words" key={item.id} value={item.id}>
                  {index + 1}. {item.name}
                </option>
              ))}
            </select>
            <label className="label mb-5">
              {errors.task && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors.task.message}
                </span>
              )}
            </label>
          </div>
        )}

        {module === 2 && (
          <div>
            <select
              className={
                errors.task ? styleInputErrorSelect : styleInputCorrecSelect
              }
              defaultValue={"0"}
              {...register("task", {
                pattern: {
                  value: /^(?!0$).+$/,
                  message: "Proszę wybrać pytanie.",
                },
              })}
            >
              <option key={0} value="0" defaultValue>
                Wybierz pytanie
              </option>
              {props.info.openTasks.map((item, index) => (
                <option className=" break-words" key={item.id} value={item.id}>
                  {index + 1}. {item.name}
                </option>
              ))}
            </select>
            <label className="label mb-5">
              {errors.task && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors.task.message}
                </span>
              )}
            </label>
          </div>
        )}

        {module === 3 && (
          <div>
            <select
              className={
                errors.task ? styleInputErrorSelect : styleInputCorrecSelect
              }
              defaultValue={"0"}
              {...register("task", {
                pattern: {
                  value: /^(?!0$).+$/,
                  message: "Proszę wybrać pytanie.",
                },
              })}
            >
              <option key={0} value="0" defaultValue>
                Wybierz pytanie
              </option>
              {props.info.fileTasks.map((item, index) => (
                <option className=" break-words" key={item.id} value={item.id}>
                  {index + 1}. {item.name}
                </option>
              ))}
            </select>
            <label className="label mb-5">
              {errors.task && (
                <span className="label-text-alt text-error text-[13px]">
                  {errors.task.message}
                </span>
              )}
            </label>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="w-full mx-auto mt-3 flex justify-around">
            <input
              className="btn btn-success w-[150px]"
              type="submit"
              value="Dodaj"
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

export default EditStepModal;
