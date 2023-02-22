import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { LuxonDatetime } from "../../../common/helper/luxon_datetime";
import { BookingEntity } from "../../../domain/entity/booking_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { BookingInteractor } from "../../../domain/interactor/booking_interactor";
import { Navbar } from "../../component/Navbar";

function BookingIndexPage(props: { bookingInteractor: BookingInteractor }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    search: "",
  });
  const [bookingCollection, setBookingCollection] = useState<
    StateEntity<BookingEntity[]>
  >({
    loading: true,
    data: [],
  });

  async function getBookingCollection() {
    try {
      setBookingCollection({ ...bookingCollection, loading: true });
      const results = await props.bookingInteractor.collections(filter);

      setBookingCollection({
        ...bookingCollection,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setBookingCollection({
        ...bookingCollection,
        loading: false,
        error: error.message,
      });
    }
  }

  function addBtnOnClick() {
    navigate(LocalRoute.bookingAdd);
  }

  function onSearch(e: any) {
    setFilter({ ...filter, search: e.target.value });
  }

  function paginateOnClick(key: string) {
    if (key == "next") {
      if (filter.page < 5) {
        setFilter({ ...filter, page: filter.page + 1 });
      }
    } else {
      if (filter.page > 0) {
        setFilter({ ...filter, page: filter.page - 1 });
      }
    }
  }

  async function init() {
    getBookingCollection();
  }

  useEffect(() => {
    getBookingCollection();
  }, [filter]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="DAFTAR BOOKING">
        <div className="flex space-x-2 pr-2">
          <input
            type="text"
            placeholder="Cari di sini"
            className="input input-sm w-full input-bordered rounded-full"
            onChange={debounce((e) => onSearch(e), 500)}
          />
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={addBtnOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </Navbar>
      <div className="flex flex-col h-screen p-4">
        {/* CONTENT */}
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
                <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
                <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
                <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
                <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
                <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              </div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
              <div className="flex-1 card bg-base-100 h-4 animate-pulse"></div>
            </div>
            {/* <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <input
                type="date"
                className="input input-bordered"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <input
                type="date"
                className="input input-bordered"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div> */}
            {/* <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Kamar</th>
                    <th>Checkin</th>
                    <th>Checkout</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookingCollection.loading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <h1 className="font-semibold animate-pulse">
                          Loading..
                        </h1>
                      </td>
                    </tr>
                  ) : (
                    bookingCollection.data?.map((e, i) => (
                      <tr key={i}>
                        <th>{e.name}</th>
                        <td>
                          {e.room}/{e.mess}/{e.location}
                        </td>
                        <td>{LuxonDatetime.toHuman(e.checkin!)}</td>
                        <td>
                          {e.checkout && LuxonDatetime.toHuman(e.checkout)}
                        </td>
                        <th>{e.checkoutNote ?? "-"}</th>
                        <th>
                          <div className="badge badge-primary">
                            {e.checkout == null ? "Checkin" : "Checkout"}
                          </div>
                        </th>
                        <th>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-info">
                              Detail
                            </button>
                            <button className="btn btn-sm btn-error">
                              Delete
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="btn-group mx-auto">
              <button className="btn" onClick={() => paginateOnClick("prev")}>
                Prev
              </button>
              <button className="btn" onClick={() => paginateOnClick("next")}>
                Next
              </button>
            </div> */}
          </div>
        </div>
        {/* CONTENT */}
      </div>
    </>
  );
}

export { BookingIndexPage };
