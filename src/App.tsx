import { useEffect, useState } from "react";
import { Outlet, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { AuthRemote } from "./adapter/repository/auth_remote";
import { BookingRemote } from "./adapter/repository/booking_remote";
import { LocalRoute } from "./common/config/local_route";
import { AuthInteractor } from "./domain/interactor/auth_interactor";
import { BookingInteractor } from "./domain/interactor/booking_interactor";
import { Dashboard } from "./view/component/Dashboard";
import { Layout } from "./view/component/Layout";
import { Modal } from "./view/component/Modal";
import Portal from "./view/component/Portal";
import { BookingAddPage } from "./view/page/booking/BookingAddPage";
import { BookingDetailPage } from "./view/page/booking/BookingDetailPage";
import { BookingEditPage } from "./view/page/booking/BookingEditPage";
import { BookingIndexPage } from "./view/page/booking/BookingIndexPage";
import { EmployeeAddPage } from "./view/page/employee/EmployeeAddPage";
import { EmployeeIndexPage } from "./view/page/employee/EmployeeIndexPage";
import { EmployeeEditPage } from "./view/page/employee/EmployeeEditPage";
import { LocationAddPage } from "./view/page/location/LocationAddPage";
import { LocationEditPage } from "./view/page/location/LocationEditPage";
import { LocationIndexPage } from "./view/page/location/LocationIndexPage";
import { LoginPage } from "./view/page/LoginPage";
import { MessAddPage } from "./view/page/mess/MessAddPage";
import { MessEditPage } from "./view/page/mess/MessEditPage";
import { MessIndexPage } from "./view/page/mess/MessIndexPage";
import { RoomAddPage } from "./view/page/room/RoomAddPage";
import { RoomEditPage } from "./view/page/room/RoomEditPage";
import { RoomIndexPage } from "./view/page/room/RoomIndexPage";
import { RosterIndexPage } from "./view/page/roster/RosterIndexPage";
import { GuestIndexPage } from "./view/page/guest/GuestIndexPage";
import { VoucherIndexPage } from "./view/page/voucher/VoucherIndexPage";
import { ConfigIndexPage } from "./view/page/config/ConfigIndexPage";
import { ConfigEditPage } from "./view/page/config/ConfigEditPage";

function App() {
  const [loading, setLoading] = useState<any>(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  //repositories
  const authRepository = new AuthRemote();
  const bookingRepository = new BookingRemote();
  //interactors
  const authInteractor = new AuthInteractor(authRepository);
  const bookingInteractor = new BookingInteractor(bookingRepository);
  //depedencies
  const globalDepencies = {
    loading,
    setLoading,
    setToast,
  };
  const loginPageDepencies = {
    authInteractor,
  };
  const bookingPageDepencies = {
    bookingInteractor,
  };

  const router = createBrowserRouter([
    {
      path: LocalRoute.root,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <LoginPage {...loginPageDepencies} />,
        },
        {
          path: LocalRoute.dashboard,
          element: <Dashboard {...loginPageDepencies} />,
          children: [
            {
              path: LocalRoute.booking,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <BookingIndexPage {...bookingPageDepencies} />,
                },
                {
                  path: LocalRoute.bookingDetail + "/:id",
                  element: <BookingDetailPage {...bookingPageDepencies} />,
                },
                {
                  path: LocalRoute.bookingAdd,
                  element: <BookingAddPage />,
                },
                {
                  path: LocalRoute.bookingEdit,
                  element: <BookingEditPage />,
                },
              ],
            },
            {
              path: LocalRoute.mess,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <MessIndexPage />,
                },
                {
                  path: LocalRoute.messAdd,
                  element: <MessAddPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.messEdit + "/:id",
                  element: <MessEditPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.location,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <LocationIndexPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.locationAdd,
                  element: <LocationAddPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.locationEdit + "/:id",
                  element: <LocationEditPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.room,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <RoomIndexPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.roomAdd,
                  element: <RoomAddPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.roomEdit + "/:id",
                  element: <RoomEditPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.employee,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <EmployeeIndexPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.employeeAdd,
                  element: <EmployeeAddPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.employeeEdit + "/:id",
                  element: <EmployeeEditPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.guest,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <GuestIndexPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.roster,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <RosterIndexPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.voucher,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <VoucherIndexPage {...globalDepencies} />,
                },
              ],
            },
            {
              path: LocalRoute.config,
              element: <Outlet />,
              children: [
                {
                  index: true,
                  element: <ConfigIndexPage {...globalDepencies} />,
                },
                {
                  path: LocalRoute.configEdit + "/:id",
                  element: <ConfigEditPage {...globalDepencies} />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <Portal>
        {toast != null && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-info">
              <span>{toast}</span>
            </div>
          </div>
        )}
        <Modal className="w-40" show={loading}>
          <p className="text-center">
            <button className="btn btn-ghost loading">Loading</button>
          </p>
        </Modal>
      </Portal>
      <RouterProvider router={router} />
    </>
  );
}

export { App };
