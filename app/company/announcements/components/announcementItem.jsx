import moment from "moment";
import Image from "next/image";
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
        onClick={() =>
          navigation("/company/announcements/" + props.announcement.id)
        }
        className="card rounded-lg ease-in-out hover:scale-[1.03] md:h-[268px] duration-[0.3s] shadow-xl mb-4 w-full bg-base-100 cursor-pointer"
      >
        <div className="card-body">
          <h2 className="card-title word-break block md:max-h-[56px] overflow-hidden">
            {props.announcement.name}
          </h2>
          <p className="h-[24px]">
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

          <div className="flex items-center text-center justify-around mt-4 text-[13px]">
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
          <div className="border-t-2 border-dotted text-[13px] text-right pt-1"></div>
          <div className="block md:flex justify-around text-[14px]">
            <div className="w-full md:w-1/2 text-center">
              <div className="mb-1">
                Data dodania:{" "}
                <span className="font-medium">
                  {moment
                    .utc(props.announcement.created_at)
                    .format("DD.MM.YYYY")}
                </span>
              </div>
              <div className="mb-1">
                Aktualny etap rekrutacji:{" "}
                <span className="font-medium">1 / 4</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center">
              <div className="mb-1">
                Data końca aktualnego etapu:{" "}
                <span className="font-medium">
                  {moment
                    .utc(props.announcement.created_at)
                    .format("DD.MM.YYYY")}
                </span>
              </div>
              <div className="mb-1">
                Aktualna liczba aplikacji:{" "}
                <span className="font-medium">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;
