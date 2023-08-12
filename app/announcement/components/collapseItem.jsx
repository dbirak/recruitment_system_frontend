const CollapseItem = (props) => {
  const change = (value) => {
    props.changeValue(value, props.name);
  };

  const styleBadge =
    props.searchInfo[props.name].length === 0
      ? "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px] hidden"
      : "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px]";

  return (
    <div className="w-full">
      <div className="collapse collapse-arrow bg-base-100 mb-3 rounded-none">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-md font-medium">
          <div className="flex">
            <div>{props.header}</div>
            <div className={styleBadge}>
              {props.searchInfo[props.name].length}
            </div>
          </div>
        </div>
        <div className="collapse-content">
          <div className="ms-3">
            {props.data.map((item, index) => (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer">
                  <input
                    value={item.id}
                    onChange={(e) => change(e.target.value)}
                    type="checkbox"
                    className="checkbox checkbox-sm"
                  />
                  <span className=" w-full ms-3">
                    {props.name === "umowa"
                      ? item.contract_name
                      : props.name === "czas_pracy"
                      ? item.work_time_name
                      : item.work_type_name}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapseItem;
