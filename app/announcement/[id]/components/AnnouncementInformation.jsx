import moment from "moment";
import { AiFillFileText } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  MdAccessTimeFilled,
  MdLocationOn,
  MdOutlineTimelapse,
  MdWork,
} from "react-icons/md";

const AnnouncementInformation = (props) => {
  return (
    <div className="block md:flex md:justify-between mx-7 ">
      <div className="mx-auto md:mx-0 w-3/4 md:w-1/2">
        <div className="text-right flex my-7">
          <div className="grid items center text-[35px] me-5">
            <MdLocationOn />
          </div>
          <div className="text-[16px] font-semibold grid items-center truncate overflow-hidden text-left">
            {props.announcement.company.street.charAt(0).toUpperCase() +
              props.announcement.company.street.slice(1).toLowerCase() +
              ", " +
              props.announcement.company.city.charAt(0).toUpperCase() +
              props.announcement.company.city.slice(1).toLowerCase() +
              ", " +
              props.announcement.company.province.province_name
                .charAt(0)
                .toUpperCase() +
              props.announcement.company.province.province_name
                .slice(1)
                .toLowerCase()}
          </div>
        </div>

        <div className="text-right flex my-7">
          <div className="grid items-center text-[35px] me-5">
            <BiSolidCategoryAlt />
          </div>
          <div className="text-[16px] font-semibold grid items-center text-left">
            {props.announcement.category.category_name}
          </div>
        </div>

        <div className="text-right flex my-7">
          <div className="grid items-center text-[35px] me-5">
            <AiFillFileText />
          </div>
          <div className="text-[16px] font-semibold grid items-center text-left">
            {props.announcement.contract.contract_name}
          </div>
        </div>
      </div>
      <div className="mx-auto md:mx-0 w-3/4 md:w-1/2">
        <div className="text-right flex my-7">
          <div className="grid items-center text-[35px] me-5">
            <MdOutlineTimelapse />
          </div>
          <div className="text-[16px] font-semibold grid items-center text-left">
            Dostępne jeszcze: {props.leftDaysNumber}{" "}
            {props.leftDaysNumber === 1 ? "dzień" : "dni"} - do{" "}
            {moment.utc(props.announcement.expiry_date).format("DD.MM.YYYY")}
          </div>
        </div>

        <div className="text-right flex my-7">
          <div className="grid items-center text-[35px] me-5">
            <MdAccessTimeFilled />
          </div>
          <div className="text-[16px] font-semibold grid items-center text-left">
            {props.announcement.work_time.work_time_name}
          </div>
        </div>

        <div className="text-right flex my-7">
          <div className="grid items-center text-[35px] me-5">
            <MdWork />
          </div>
          <div className="text-[16px] font-semibold grid items-center text-left">
            {props.announcement.work_type.work_type_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementInformation;
