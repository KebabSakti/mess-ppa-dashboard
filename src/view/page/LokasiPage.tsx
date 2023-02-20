import { useEffect, useState } from "react";
import { InnEntity } from "../../domain/entity/inn_entity";
import { LocationEntity } from "../../domain/entity/location_entity";
import { StateEntity } from "../../domain/entity/state_entity";
import {
  InnInteractor,
  LocationInteractor,
} from "../../domain/interactor/god_interactor";
import { Button } from "../component/Button";

function LokasiPage() {
  const innInteractor = new InnInteractor();
  const locInt = new LocationInteractor();
  const [addMode, setAddMode] = useState(false);

  const [collections, setCollections] = useState<StateEntity<InnEntity[]>>({
    loading: false,
    data: [],
  });

  const [locs, setLocs] = useState<StateEntity<LocationEntity[]>>({
    loading: false,
    data: [],
  });

  const [loading, setLoading] = useState(true);

  async function getCollections() {
    try {
      setLoading(true);
      const results = await innInteractor.collections();

      setCollections({
        loading: false,
        data: results,
      });

      setLoading(false);
    } catch (error: any) {
      setCollections({
        loading: false,
        error: error.message,
      });

      setLoading(false);
    }
  }

  async function getLocs() {
    try {
      setLoading(true);
      const results = await locInt.collections();

      setLocs({
        loading: false,
        data: results,
      });

      setLoading(false);
    } catch (error: any) {
      setLocs({
        loading: false,
        error: error.message,
      });

      setLoading(false);
    }
  }

  async function store(inputs: any) {
    try {
      setLoading(true);

      await locInt.store(inputs);

      getLocs();
      setAddMode(false);
    } catch (error: any) {
      setAddMode(false);
      setLoading(false);
    }
  }

  async function del(inputs: any) {
    try {
      setLoading(true);

      await locInt.delete(inputs);

      getLocs();
      setAddMode(false);
    } catch (error: any) {
      setAddMode(false);
      setLoading(false);
    }
  }

  async function init() {
    getCollections();
    getLocs();
  }

  function formOnSubmit(e: any) {
    e.preventDefault();

    store({
      innId: e.target.elements.innId.value,
      name: e.target.elements.name.value,
    });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {/* <Toast show={collections.error != null} message={collections.error!} /> */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex justify-between">
            {/* <input
              type="text"
              placeholder="Cari di sini"
              className="input input-bordered w-full max-w-xs"
            /> */}
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddMode(!addMode);
              }}
            >
              Tambah Data
            </button>
          </div>
          {addMode ? (
            <form className="mt-4 space-y-4 max-w-lg" onSubmit={formOnSubmit}>
              <label className="input-group">
                <span className="w-40">Mess</span>
                <select name="innId" className="input input-bordered w-full">
                  {collections.data?.map((e, i) => {
                    return (
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="input-group">
                <span className="w-40">Lokasi</span>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <Button loading={loading} text="Submit" />
            </form>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Lokasi</th>
                    <th>Mess</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {locs.data?.map((e, i) => (
                    <tr key={i}>
                      <th>{e.name}</th>
                      <th>{e.inn}</th>
                      <th>
                        <div className="btn-group">
                          {/* <button className="btn btn-sm btn-success">
                          Detail
                        </button> */}
                          {/* <button className="btn btn-sm btn-info">Edit</button> */}
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => {
                              del({ id: e.id });
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* <div className="btn-group mx-auto">
            <button className="btn">Prev</button>
            <button className="btn">Next</button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export { LokasiPage };
