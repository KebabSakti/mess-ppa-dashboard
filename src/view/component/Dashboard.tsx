import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { LocalRoute } from "../../common/config/local_route";
import { AuthInteractor } from "../../domain/interactor/auth_interactor";

function Dashboard(props: { authInteractor: AuthInteractor }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([
    {
      name: "Booking",
      link: LocalRoute.booking,
      active: false,
    },
    {
      name: "Mess",
      link: LocalRoute.mess,
      active: false,
    },
    {
      name: "Lokasi",
      link: LocalRoute.location,
      active: false,
    },
    {
      name: "Kamar",
      link: LocalRoute.room,
      active: false,
    },
    // {
    //   name: "Voucher",
    //   link: LocalRoute.voucher,
    //   active: false,
    // },
    // {
    //   name: "Roster",
    //   link: LocalRoute.roster,
    //   active: false,
    // },
    // {
    //   name: "User",
    //   link: LocalRoute.user,
    //   active: false,
    // },
  ]);

  function setActiveNav() {
    const updatedMenus = menus.map((element) => {
      const active = element.link == location.pathname;

      return { ...element, active: active };
    });

    setMenus(updatedMenus);
  }

  function init() {
    setActiveNav();
  }

  useEffect(() => {
    init();
  }, [location]);

  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <label
                htmlFor="my-drawer-2"
                tabIndex={0}
                className="btn btn-ghost btn-circle drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
            <div className="navbar-center">
              <a className="btn btn-ghost normal-case text-xl"></a>
            </div>
            <div className="navbar-end"></div>
          </div>
          <div className="flex flex-col h-screen p-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-200 text-base-content">
            <div className="flex flex-col items-center space-y-3 mt-3 mb-10">
              <img src={logo} alt="logo" className="w-20" />
              <p className="text-2xl font-bold">DASHBOARD</p>
            </div>
            {menus.map((e, i) => {
              return (
                <li key={i}>
                  <Link to={e.link} className={e.active ? "active" : ""}>
                    {e.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                onClick={() => {
                  props.authInteractor.logout();
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export { Dashboard };
