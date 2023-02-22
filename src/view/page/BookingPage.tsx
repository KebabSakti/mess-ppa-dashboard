import { useEffect, useState } from "react";
import { LuxonDatetime } from "../../common/helper/luxon_datetime";
import { BookingEntity } from "../../domain/entity/booking_entity";
import { StateEntity } from "../../domain/entity/state_entity";
import { BookingInteractor } from "../../domain/interactor/booking_interactor";
import { Button } from "../component/Button";
import { Modal } from "../component/Modal";
import { Navbar } from "../component/Navbar";
import Portal from "../component/Portal";

function BookingPage(props: { bookingInteractor: BookingInteractor }) {
  const [bookingDatas, setBookingDatas] = useState<
    StateEntity<BookingEntity[]>
  >({
    loading: true,
    data: [],
  });

  const [show, setShow] = useState(false);

  async function getBookingDatas() {
    try {
      setBookingDatas({ ...bookingDatas, loading: true });
      const results = await props.bookingInteractor.collections();
      setBookingDatas({ ...bookingDatas, loading: false, data: results });
    } catch (error: any) {
      setBookingDatas({
        ...bookingDatas,
        loading: false,
        error: error.message,
      });
    }
  }

  async function init() {
    getBookingDatas();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Portal>
        <Modal id="booking">
          {show && (
            <form className="mt-4 space-y-4 max-w-lg">
              <label className="input-group">
                <span className="w-40">Mess</span>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="input-group">
                <span className="w-40">Denah</span>
                <input
                  type="file"
                  name="denah"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </label>
              <label className="input-group">
                <span className="w-40">Foto</span>
                <input
                  type="file"
                  name="picture"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </label>
              <Button loading={false} text="Submit" />
            </form>
          )}
        </Modal>
      </Portal>
      <Navbar>
        <div className="flex space-x-2 pr-2">
          <input
            type="text"
            placeholder="Cari di sini"
            className="input input-sm input-bordered rounded-full"
          />
          <button className="btn btn-sm btn-ghost btn-circle">
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
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
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
            </div>
            <div className="overflow-x-auto">
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
                  {bookingDatas.data?.map((e, i) => (
                    <tr key={i}>
                      <th>{e.name}</th>
                      <td>
                        {e.room}/{e.mess}/{e.location}
                      </td>
                      <td>{LuxonDatetime.toHuman(e.checkin!)}</td>
                      <td>{e.checkout && LuxonDatetime.toHuman(e.checkout)}</td>
                      <th>{e.checkoutNote ?? "-"}</th>
                      <th>
                        <div className="badge badge-primary">
                          {e.checkout == null ? "Checkin" : "Checkout"}
                        </div>
                      </th>
                      <th>
                        <div className="btn-group">
                          <label
                            htmlFor="booking"
                            className="btn btn-sm btn-success"
                            onClick={() => setShow(!show)}
                          >
                            Detail
                          </label>
                          <button className="btn btn-sm btn-warning">
                            Delete
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="btn-group mx-auto">
              <button className="btn">Prev</button>
              <button className="btn">Next</button>
            </div>
          </div>
        </div>
        {/* CONTENT */}
      </div>
    </>
  );
}

export { BookingPage };
