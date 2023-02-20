import { useEffect, useState } from "react";
import { LuxonDatetime } from "../../common/helper/luxon_datetime";
import { BookingEntity } from "../../domain/entity/booking_entity";
import { StateEntity } from "../../domain/entity/state_entity";
import { BookingInteractor } from "../../domain/interactor/booking_interactor";
import { Toast } from "../component/Toast";

function BookingPage(props: { bookingInteractor: BookingInteractor }) {
  const [bookingDatas, setBookingDatas] = useState<
    StateEntity<BookingEntity[]>
  >({
    loading: true,
    data: [],
  });

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
      <Toast show={bookingDatas.error != null} message={bookingDatas.error!} />
      <div className="card bg-base-200">
        <div className="card-body">
          {/* <div className="flex justify-between">
            <input
              type="text"
              placeholder="Cari di sini"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary">Tambah Data</button>
          </div> */}
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
                  {/* <th></th> */}
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
                    {/* <th>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-success">
                          Detail
                        </button>
                        <button className="btn btn-sm btn-info">Edit</button>
                        <button className="btn btn-sm btn-warning">
                          Delete
                        </button>
                      </div>
                    </th> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="btn-group mx-auto">
            <button className="btn">Prev</button>
            <button className="btn">Next</button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export { BookingPage };
