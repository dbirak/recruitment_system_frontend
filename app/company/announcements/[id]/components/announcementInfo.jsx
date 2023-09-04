import { TbPointFilled } from "react-icons/tb";

const AnnouncementInfo = (props) => {
  return (
    <div>
      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Obowiązki przyszłego pracownika:
          </div>
        </div>

        {props.announcement.duties.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Rzeczy, które wymagasz od przyszłego pracownika:
          </div>
        </div>

        {props.announcement.requirements.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
        <div className="flex justify-between">
          <div className="font-bold text-[14px] grid items-center">
            Rzeczy, które oferujesz przyszłemu pracownikowi:
          </div>
        </div>

        {props.announcement.offer.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[14px]">
              <span className="grid items-center me-3 ms-6 text-[15px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementInfo;
