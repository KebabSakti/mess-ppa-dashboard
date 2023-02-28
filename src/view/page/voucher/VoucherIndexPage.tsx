import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { RemoteApi } from "../../../common/config/remote_api";
import { LuxonDatetime } from "../../../common/helper/luxon_datetime";
import { StateEntity } from "../../../domain/entity/state_entity";
import { VoucherEntity } from "../../../domain/entity/voucher_entity";
import {
  ExportInteractor,
  VoucherInteractor,
} from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new VoucherInteractor();
const exportInteractor = new ExportInteractor();

function VoucherIndexPage(props: any) {
  const [filter, setFilter] = useState({
    search: "",
  });
  const [collection, setCollection] = useState<StateEntity<VoucherEntity[]>>({
    loading: true,
    data: [],
  });

  async function getCollection() {
    try {
      setCollection({ ...collection, loading: true });
      const results = await interactor.collections(filter);

      setCollection({
        ...collection,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setCollection({
        ...collection,
        loading: false,
        error: error.message,
      });
    }
  }

  function onSearch(e: any) {
    setFilter({ ...filter, search: e.target.value });
  }

  async function downloadBtnClick() {
    try {
      props.setLoading(true);

      await exportInteractor.single({ id: "voucher" });
      window.open(RemoteApi.url + "static/voucher_history.xlsx", "_blank");

      props.setLoading(false);
    } catch (error: any) {
      props.setLoading(false);
      props.setToast(error.message);
    }
  }

  async function init() {
    getCollection();
  }

  useEffect(() => {
    getCollection();
  }, [filter]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="VOUCHER TERPAKAI">
        <div className="flex space-x-2 pr-2">
          <input
            type="text"
            placeholder="Cari di sini"
            className="input input-sm w-full input-bordered rounded-full"
            onChange={debounce((e) => onSearch(e), 500)}
          />
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={downloadBtnClick}
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
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
              />
            </svg>
          </button>
        </div>
      </Navbar>
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body">
            {collection.loading ? (
              <Shimmer />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>NRP</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collection.loading ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            <h1 className="font-semibold animate-pulse">
                              Loading..
                            </h1>
                          </td>
                        </tr>
                      ) : (
                        collection.data?.map((e, i) => (
                          <tr key={i}>
                            <th>{e.name}</th>
                            <th>{e.nrp}</th>
                            <th>{LuxonDatetime.toHuman(e.date!)}</th>
                            <th>
                              <label className="badge badge-error">
                                Terpakai
                              </label>
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
      </div>
    </>
  );
}

export { VoucherIndexPage };
