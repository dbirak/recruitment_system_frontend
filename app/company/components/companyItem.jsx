import { baseApiUrl } from "@/utils/api/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbPointFilled } from "react-icons/tb";

const CompanyItem = (props) => {
  const router = useRouter();

  const navigation = (url) => {
    router.push(url);
  };

  return (
    <div>
      <div
        onClick={() => navigation("/company/" + props.company.id)}
        className="card rounded-lg shadow-xl ease-in-out hover:scale-[1.03] duration-[0.3s] mb-4 h-[222px] w-full bg-base-100 cursor-pointer"
      >
        <div className="card-body">
          <div className="flex flex-grow mt-4 overflow-hidden max-h-[90px] w-auto">
            <div className="w-[90px] h-[90px]">
              <img
                className="object-cover w-[90px] h-[90px]"
                width={90}
                height={90}
                src={
                  props.company.avatar === null
                    ? "/avatars/company.png"
                    : baseApiUrl +
                      "/storage/avatarImage/" +
                      props.company.avatar
                }
                alt={""}
              />
            </div>
            <div className="word-break block ms-8 overflow-hidden text-[22px] max-h-[90px] font-semibold w-[calc(100%-122px)]">
              <div>{props.company.name}</div>
              <div className="text-[15px] font-normal h-[24px]">
                {props.company.post_code}, {props.company.city}
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-5">
            <div>
              <span className="font-semibold">Numer KRS: </span>
              {props.company.krs === null ? "-" : props.company.krs}
            </div>
            <div>
              <span className="font-semibold">Numer NIP: </span>
              {props.company.nip}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
