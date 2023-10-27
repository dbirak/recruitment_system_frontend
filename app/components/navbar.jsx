import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiSolidUser } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Navbar = () => {
  const router = useRouter();

  const navigation = (url) => {
    router.push(url);
  };

  const logout = () => {
    localStorage.clear();
    navigation("/");
  };

  return (
    <div>
      {/* navbar without auth */}
      {!localStorage.getItem("role") && !localStorage.getItem("token") && (
        <div>
          {/* main navbar */}
          <div className="navbar z-50 fixed bg-base-100 drop-shadow-lg">
            <div
              onClick={() => navigation("/")}
              className="navbar-start ms-6 cursor-pointer"
            >
              <Image
                src="/logo/logo.png"
                width={40}
                height={40}
                alt=""
                priority={false}
              />
              <span className="text-center mx-auto ml-2 text-[25px] font-sans text-neutral font-semibold cursor-pointer select-none">
                WorkHunter
              </span>
            </div>
            <div className="navbar-center hidden lg:flex">
              <button
                onClick={() => navigation("/announcement")}
                className="btn btn-ghost me-5 text-center"
              >
                Ogłoszenia
              </button>
              <button
                onClick={() => navigation("/company")}
                className="btn btn-ghost me-5 text-center"
              >
                Firmy
              </button>
              <button
                onClick={() => navigation("/about")}
                className="btn btn-ghost me-5 text-center"
              >
                O stronie
              </button>
            </div>

            <div className="hidden lg:flex navbar-end me-6">
              <button
                onClick={() => navigation("/login")}
                className="btn btn-ghost me-5 text-center"
              >
                Logowanie
              </button>
              <button
                onClick={() => navigation("/register")}
                className="btn btn-neutral text-base-100 text-center"
              >
                Dołącz do nas
              </button>
            </div>

            <div className="flex lg:hidden navbar-end me-6">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-square btn-ghost outline-0"
                >
                  <button className="text-[34px] text-neutral">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-7 h-7 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-52"
                >
                  <button
                    onClick={() => navigation("/announcement")}
                    className="btn btn-sm btn-ghost text-center"
                  >
                    Ogłoszenia
                  </button>
                  <button
                    onClick={() => navigation("/company")}
                    className="btn btn-sm btn-ghost text-center"
                  >
                    Firmy
                  </button>
                  <button
                    onClick={() => navigation("/about")}
                    className="btn btn-sm btn-ghost text-center"
                  >
                    O stronie
                  </button>
                  <div className="h-fit border-b-2 my-2 border-dotted"></div>
                  <button
                    onClick={() => navigation("/login")}
                    className="btn btn-sm btn-ghost text-center"
                  >
                    Logowanie
                  </button>
                  <button
                    onClick={() => navigation("/register")}
                    className="btn btn-sm btn-neutral text-base-100 text-center"
                  >
                    Dołącz do nas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* user navbar */}
      {localStorage.getItem("role") === "user" &&
        localStorage.getItem("token") && (
          <div>
            {/* main navbar */}
            <div className="navbar z-50 fixed bg-base-100 drop-shadow-lg">
              <div className="navbar-start ms-6 cursor-default">
                <Image
                  src="/logo/logo.png"
                  width={40}
                  height={40}
                  alt=""
                  priority={false}
                />
                <span className="text-center mx-auto ml-2 text-[25px] font-sans text-neutral font-semibold cursor-default select-none">
                  WorkHunter
                </span>
              </div>
              <div className="navbar-center hidden lg:flex">
                <button
                  onClick={() => navigation("/announcement")}
                  className="btn btn-ghost me-5 text-center"
                >
                  Ogłoszenia
                </button>
                <button
                  onClick={() => navigation("/company")}
                  className="btn btn-ghost me-5 text-center"
                >
                  Firmy
                </button>
                <button
                  onClick={() => navigation("/about")}
                  className="btn btn-ghost me-5 text-center"
                >
                  O stronie
                </button>
              </div>

              <div className="hidden lg:flex navbar-end me-6">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-circle btn-ghost outline-0"
                  >
                    <button className="text-[30px] text-neutral">
                      <BiSolidUser />
                    </button>
                  </label>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <button
                      onClick={() => navigation("/applications")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      Moje aplikacje
                    </button>
                    <button
                      onClick={() => navigation("/settings")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      Ustawienia
                    </button>
                    <button
                      onClick={logout}
                      className="btn btn-sm btn-neutral text-base-100 text-center"
                    >
                      Wyloguj się
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden navbar-end me-6">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-circle btn-ghost outline-0"
                  >
                    <button className="text-[30px] text-neutral">
                      <BiSolidUser />
                    </button>
                  </label>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <button
                      onClick={() => navigation("/announcement")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      Ogłoszenia
                    </button>
                    <button
                      onClick={() => navigation("/company")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      Firmy
                    </button>
                    <button
                      onClick={() => navigation("/about")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      O stronie
                    </button>
                    <div className="h-fit border-b-2 my-2 border-dotted"></div>
                    <button
                      onClick={() => navigation("/applications")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      Moje aplikacje
                    </button>
                    <button
                      onClick={() => navigation("/settings")}
                      className="btn btn-sm btn-ghost text-center"
                    >
                      Ustawienia
                    </button>
                    <button
                      onClick={logout}
                      className="btn btn-sm btn-neutral text-base-100 text-center"
                    >
                      Wyloguj się
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Navbar;
