import { baseApiUrl } from "@/utils/api/axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { TbPointFilled } from "react-icons/tb";

const AnnouncementItem = (props) => {
  const router = useRouter();

  const navigation = (url) => {
    router.push(url);
  };

  return (
    <div>
      <div
        onClick={() => navigation("/announcement/" + props.announcement.id)}
        className="card rounded-lg ease-in-out hover:scale-[1.03] md:h-[268px] duration-[0.3s] shadow-xl mb-11 w-full bg-base-100 cursor-pointer"
      >
        <div className="card-body">
          <h2 className="card-title word-break block max-h-[56px] overflow-hidden">
            {props.announcement.name}
          </h2>
          <p>
            {props.announcement.min_earn === null
              ? ""
              : props.announcement.min_earn + " zł "}
            {props.announcement.max_earn === null
              ? ""
              : "- " + props.announcement.max_earn + " zł "}
            {props.announcement.earn_time === null
              ? ""
              : props.announcement.earn_time.earn_time_name}
          </p>
          <div className="flex flex-wrap mt-4 overflow-hidden">
            <div className="grid items-center w-[50px] h-[50px]">
              <img
                className="object-cover w-full h-full"
                width={50}
                height={50}
                src={
                  props.announcement.company.avatar === null
                    ? "/avatars/company.png"
                    : baseApiUrl +
                      "/storage/avatarImage/" +
                      props.announcement.company.avatar
                }
                alt={""}
              />
            </div>
            <div className="w-[calc(100%-66px)] ms-4">
              <div className="font-semibold truncate">
                {props.announcement.company.name}
              </div>
              <div className="text-[14px] truncate">
                {props.announcement.company.city.charAt(0).toUpperCase() +
                  props.announcement.company.city.slice(1).toLowerCase()}
                , {props.announcement.company.province.province_name}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-4 text-[13px]">
            {props.announcement.category.category_name}
            <div className="grid items-center mx-2">
              <TbPointFilled />
            </div>
            {props.announcement.work_time.work_time_name}
            <div className="grid items-center mx-2">
              <TbPointFilled />
            </div>
            {props.announcement.work_type.work_type_name}
            <div className="grid items-center mx-2">
              <TbPointFilled />
            </div>
            {props.announcement.contract.contract_name}
          </div>
        </div>
        <div>
          {props.announcement.steps.recruitment_info === "accepted" ? (
            <div className="w-full py-2 text-white text-center bg-green-800">
              Status aplikacji: <span className="font-bold">zaakceptowano</span>
            </div>
          ) : props.announcement.steps.recruitment_info === "in_recruitment" ? (
            <div className="w-full py-2 text-white text-center bg-yellow-800">
              Status aplikacji:{" "}
              <span className="font-bold">w trakcie rekrutacji</span>
            </div>
          ) : (
            <div className="w-full py-2 text-white text-center bg-red-800">
              Status aplikacji: <span className="font-bold">odrzucono</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;
