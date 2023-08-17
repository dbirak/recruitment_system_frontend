import Image from "next/image";
import { useRouter } from "next/navigation";

const AnnouncementItem = (props) => {
  const router = useRouter();

  const navigation = (url) => {
    router.push(url);
  };

  return (
    <div>
      <div
        onClick={() => navigation("/announcement/" + props.announcement.id)}
        className="card rounded-lg shadow-xl ease-in-out hover:scale-[1.03] duration-[0.3s] mb-4 h-[226px] w-full bg-base-100 cursor-pointer"
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
              <Image
                width={50}
                height={50}
                src={"/avatars/company.png"}
                alt={""}
              />
            </div>
            <div className="w-[calc(100%-66px)] ms-4">
              <div className="font-semibold truncate">
                {props.announcement.company.name}
              </div>
              <div className="text-[14px] truncate">
                {props.announcement.company.city},
                {props.announcement.company.province.province_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementItem;
