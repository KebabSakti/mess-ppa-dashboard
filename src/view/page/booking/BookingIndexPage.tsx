import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { LuxonDatetime } from "../../../common/helper/luxon_datetime";
import { BookingEntity } from "../../../domain/entity/booking_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { BookingInteractor } from "../../../domain/interactor/booking_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

function BookingIndexPage(props: { bookingInteractor: BookingInteractor }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    // page: 1,
    // limit: 10,
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

  async function deleteBoking(id: string) {
    try {
      await props.bookingInteractor.delete({ id: id });
      getBookingCollection();
    } catch (error: any) {
      console.log(error);
    }
  }

  function addBtnOnClick() {
    navigate(LocalRoute.bookingAdd);
  }

  function onSearch(e: any) {
    setFilter({ ...filter, search: e.target.value });
  }

  function paginateOnClick(key: string) {
    // if (key == "next") {
    //   if (filter.page < filter.limit) {
    //     setFilter({ ...filter, page: filter.page + 1 });
    //   }
    // } else {
    //   if (filter.page > 0) {
    //     setFilter({ ...filter, page: filter.page - 1 });
    //   }
    // }
  }

  function detailOnClick(id: string) {
    navigate(`${LocalRoute.bookingDetail}/${id}`);
  }

  function deleteOnClick(id: string) {
    if (window.confirm("Proses ini tidak dapat dikembalikan, lanjutkan?")) {
      deleteBoking(id);
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
      <Navbar title="LIST BOOKING">
        <div className="flex space-x-2 pr-2">
          <input
            type="text"
            placeholder="Cari di sini"
            className="input input-sm w-full input-bordered rounded-full"
            onChange={debounce((e) => onSearch(e), 500)}
          />
          {/* <button
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
          </button> */}
        </div>
      </Navbar>
      <div className="flex flex-col h-screen p-4">
        {/* CONTENT */}
        <div className="card bg-base-200">
          <div className="card-body">
            {bookingCollection.loading ? (
              <Shimmer />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Jenis</th>
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
                            <th>
                              {e.guest ? (
                                <div className="badge badge-info">
                                  Tamu
                                </div>
                              ) : (
                                <div className="badge badge-primary">
                                  Karyawan
                                </div>
                              )}
                            </th>
                            <td>
                              {e.room}/{e.mess}/{e.location}
                            </td>
                            <td>{LuxonDatetime.toHuman(e.checkin!)}</td>
                            <td>
                              {e.checkout && LuxonDatetime.toHuman(e.checkout)}
                            </td>
                            <th>{e.checkoutNote ?? "-"}</th>
                            <th>
                              {e.checkout == null ? (
                                <div className="badge badge-success">
                                  Checkin
                                </div>
                              ) : (
                                <div className="badge badge-error">
                                  Checkout
                                </div>
                              )}
                            </th>
                            <th>
                              <div className="btn-group">
                                <button
                                  className="btn btn-sm btn-info"
                                  onClick={() => detailOnClick(e.id!)}
                                >
                                  Detail
                                </button>
                                <button
                                  className="btn btn-sm btn-error"
                                  onClick={() => deleteOnClick(e.id!)}
                                >
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
              </>
            )}
          </div>
        </div>
        {/* CONTENT */}
      </div>
    </>
  );
}

export { BookingIndexPage };
