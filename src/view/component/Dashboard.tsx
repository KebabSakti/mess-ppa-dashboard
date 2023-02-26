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
    {
      name: "Karyawan",
      link: LocalRoute.employee,
      active: false,
    },
    {
      name: "Tamu",
      link: LocalRoute.guest,
      active: false,
    },
    {
      name: "Roster",
      link: LocalRoute.roster,
      active: false,
    },
    {
      name: "Voucher",
      link: LocalRoute.voucher,
      active: false,
    },
    {
      name: "Setting",
      link: LocalRoute.config,
      active: false,
    },
  ]);

  function setActiveNav() {
    const updatedMenus = menus.map((element) => {
      const active = location.pathname.includes(element.name.toLowerCase());
      return { ...element, active: active };
    });

    setMenus(updatedMenus);
  }

  function init() {
    if (
      location.pathname == LocalRoute.dashboard ||
      location.pathname == LocalRoute.dashboard + "/"
    ) {
      navigate(LocalRoute.booking, { replace: true });
    }

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
          <Outlet />
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
