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
        className="card rounded-lg ease-in-out hover:scale-[1.03] md:h-[268px] duration-[0.3s] shadow-xl mb-11 w-full bg-base-100 cursor-pointer"
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
                <span className="font-medium">
                  {props.announcement.steps.actual_step_number === null
                    ? "-"
                    : props.announcement.steps.actual_step_number}
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center">
              <div className="mb-1">
                Data końca aktualnego etapu:{" "}
                <span className="font-medium">
                  {props.announcement.steps.expiry_date_actual_step === null
                    ? "-"
                    : moment
                        .utc(props.announcement.steps.expiry_date_actual_step)
                        .format("DD.MM.YYYY")}
                </span>
              </div>
              <div className="mb-1">
                Liczba odpowiedzi w aktualnym etapie:{" "}
                <span className="font-medium">
                  {props.announcement.steps
                    .applied_user_count_in_actual_step === null
                    ? "-"
                    : props.announcement.steps
                        .applied_user_count_in_actual_step}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {props.announcement.steps.announcement_status === "active" ? (
            <div className="w-full py-2 text-white text-center bg-green-800">
              Status ogłoszenia: <span className="font-bold">aktywne</span>
            </div>
          ) : props.announcement.steps.announcement_status ===
            "in_recruitment" ? (
            <div className="w-full py-2 text-white text-center bg-yellow-800">
              Status ogłoszenia:{" "}
              <span className="font-bold">w trakcie rekrutacji</span>
            </div>
          ) : (
            <div className="w-full py-2 text-white text-center bg-red-800">
              Status ogłoszenia: <span className="font-bold">zakończone</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;
