import { TbPointFilled } from "react-icons/tb";

const AdditionalInformatio = (props) => {
  return (
    <div>
      <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-3 px-4 mt-8 mb-4">
        <div className="flex justify-between">
          <div className="font-bold text-[20px] grid items-center">
            Nasze wymagania:
          </div>
        </div>

        {props.announcement.requirements.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[15px]">
              <span className="grid items-center me-3 ms-6 text-[16px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-3 px-4 mt-8 mb-4">
        <div className="flex justify-between">
          <div className="font-bold text-[20px] grid items-center">
            Twoje obowiązki:
          </div>
        </div>

        {props.announcement.duties.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[15px]">
              <span className="grid items-center me-3 ms-6 text-[16px]">
                <TbPointFilled />
              </span>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-3 px-4 mt-8 mb-4">
        <div className="flex justify-between">
          <div className="font-bold text-[20px] grid items-center">
            Co oferujemy:
          </div>
        </div>

        {props.announcement.offer.map((item, index) => (
          <div className="flex justify-between my-4" key={index}>
            <div className="flex justify-between text-[15px]">
              <span className="grid items-center me-3 ms-6 text-[16px]">
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

export default AdditionalInformatio;
