import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LuxonDatetime } from "../../../common/helper/luxon_datetime";
import { BookingEntity } from "../../../domain/entity/booking_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { BookingInteractor } from "../../../domain/interactor/booking_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

function BookingDetailPage(props: { bookingInteractor: BookingInteractor }) {
  const { id } = useParams();
  const navigate: any = useNavigate();
  const [bookingSingle, setBookingSingle] = useState<
    StateEntity<BookingEntity>
  >({
    loading: true,
  });

  async function getBookingSingle() {
    try {
      setBookingSingle({
        ...bookingSingle,
        loading: true,
      });

      const results = await props.bookingInteractor.single({ id: id });

      setBookingSingle({
        ...bookingSingle,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setBookingSingle({
        ...bookingSingle,
        loading: false,
        error: error.message,
      });
    }
  }

  async function init() {
    getBookingSingle();
  }

  useEffect(() => {}, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="DETAIL BOOKING">
        <button
          className="btn btn-sm btn-circle"
          onClick={() => navigate(-1, { replace: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </Navbar>
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body">
            {bookingSingle.loading ? (
              <Shimmer />
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label>Ruangan</label>
                    <label className="font-bold text-lg">{`${bookingSingle.data?.room} - (${bookingSingle.data?.mess}/${bookingSingle.data?.location})`}</label>
                  </div>
                  <div className="flex flex-col">
                    <label>Checkin</label>
                    <label className="font-bold text-lg">
                      {`${LuxonDatetime.toHuman(
                        bookingSingle.data?.checkin!
                      )} (${bookingSingle.data?.checkinNote!})`}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>Checkout</label>
                    <label className="font-bold text-lg">
                      {bookingSingle.data?.checkout == null
                        ? "-"
                        : `${LuxonDatetime.toHuman(
                            bookingSingle.data?.checkout!
                          )} (${bookingSingle.data?.checkoutNote!})`}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>Nama</label>
                    <label className="font-bold text-lg">
                      {bookingSingle.data?.name}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>NRP</label>
                    <label className="font-bold text-lg">
                      {bookingSingle.data?.nrp == null
                        ? "-"
                        : bookingSingle.data?.nrp!}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>No Hp</label>
                    <label className="font-bold text-lg">
                      {bookingSingle.data?.phone == null
                        ? "-"
                        : bookingSingle.data?.phone!}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>Jenis</label>
                    <label className="font-bold text-lg">
                      {bookingSingle.data?.guest ? (
                        <div className="badge badge-info">Tamu</div>
                      ) : (
                        <div className="badge badge-primary">Karyawan</div>
                      )}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label>Status</label>
                    <label className="font-bold text-lg">
                      {bookingSingle.data?.checkout == null ? (
                        <div className="badge badge-success">Checkin</div>
                      ) : (
                        <div className="badge badge-error">Checkout</div>
                      )}
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { BookingDetailPage };
