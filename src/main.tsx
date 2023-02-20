import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthRemote } from "./adapter/repository/auth_remote";
import { BookingRemote } from "./adapter/repository/booking_remote";
import { LocalRoute } from "./common/config/local_route";
import { AuthInteractor } from "./domain/interactor/auth_interactor";
import { BookingInteractor } from "./domain/interactor/booking_interactor";
import "./index.css";
import { Dashboard } from "./view/component/Dashboard";
import { Layout } from "./view/component/Layout";
import { BookingPage } from "./view/page/BookingPage";
import { LoginPage } from "./view/page/LoginPage";
import { LokasiPage } from "./view/page/LokasiPage";
import { MessPage } from "./view/page/MessPage";
import { RoomPage } from "./view/page/RoomPage";

//repositories
const authRepository = new AuthRemote();
const bookingRepository = new BookingRemote();
//interactors
const authInteractor = new AuthInteractor(authRepository);
const bookingInteractor = new BookingInteractor(bookingRepository);
//depedencies
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
        path: LocalRoute.root,
        element: <LoginPage {...loginPageDepencies} />,
      },
      {
        path: LocalRoute.dashboard,
        element: <Dashboard {...loginPageDepencies} />,
        children: [
          {
            path: LocalRoute.booking,
            element: <BookingPage {...bookingPageDepencies} />,
          },
          {
            path: LocalRoute.mess,
            element: <MessPage />,
          },
          {
            path: LocalRoute.location,
            element: <LokasiPage />,
          },
          {
            path: LocalRoute.room,
            element: <RoomPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);