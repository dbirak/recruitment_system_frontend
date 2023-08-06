import Image from "next/image";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div>
      {/* main navbar */}
      <div className="navbar bg-base-100 drop-shadow-lg">
        <div className="navbar-start ms-6">
          <Image
            src="/logo/logo.png"
            width={40}
            height={40}
            alt=""
            priority={false}
          />
          <span className="text-center mx-auto ml-2 text-[25px] font-sans text-primary-focus font-semibold cursor-default select-none">
            WorkHunter
          </span>
        </div>
        <div className="navbar-center">
          <button className="btn btn-ghost me-5 text-center">Ogłoszenia</button>
          <button className="btn btn-ghost me-5 text-center">Firmy</button>
          <button className="btn btn-ghost me-5 text-center">O stronie</button>
        </div>
        <div className="navbar-end me-6">
          <button className="btn btn-ghost me-5 text-center">Logowanie</button>
          <button className="btn btn-neutral text-base-100 text-center">
            Dołącz do nas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
