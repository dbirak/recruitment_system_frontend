const { useForm } = require("react-hook-form");

const CollapseItem = (props) => {
  const change = (value) => {
    props.updateSearchInfo({ [props.name]: value });
  };

  const styleBadge =
    props.searchInfo.length === 0
      ? "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px] hidden"
      : "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px]";

  const styleInputCorrect = "input input-bordered w-full appearance-none ";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
    getValues,
    watch,
    setValue,
    clearErrors,
  } = useForm();

  return (
    <div className="w-full">
      <div className="collapse collapse-arrow bg-base-100 mb-3 rounded-none">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-md font-medium">
          <div className="flex">
            <div>{props.header}</div>
            <div className={styleBadge}>1</div>
          </div>
        </div>
        <div className="collapse-content">
          <div className="w-full mb-3">
            <input
              type="text"
              className={
                errors[props.name] ? styleInputError : styleInputCorrect
              }
              defaultValue={props.searchInfo === null ? "" : props.searchInfo}
              placeholder={props.header}
              {...register(props.name, {
                onChange: (e) => change(e.target.value),
                maxLength: {
                  value: 15,
                  message: "Podany numer jest zbyt długis.",
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapseItem;
