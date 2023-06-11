import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="w-auto">
      <Image
        src="/logo/logo.png"
        alt=""
        width={70}
        height={70}
        className="cursor-pointer block mx-auto"
        onClick={() => {
          router.push("/");
        }}
      />
      <div
        className="w-[160px] pt-2 text-center mx-auto text-[28px] font-sans text-primary-focus font-semibold cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        WorkHunter
      </div>
    </div>
  );
};

export default Logo;
