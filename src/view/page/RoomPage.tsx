import React from "react";
import { useEffect, useState } from "react";
import { InnEntity } from "../../domain/entity/inn_entity";
import { LocationEntity } from "../../domain/entity/location_entity";
import { RoomEntity } from "../../domain/entity/room_entity";
import { StateEntity } from "../../domain/entity/state_entity";
import {
  InnInteractor,
  LocationInteractor,
  RoomInteractor,
} from "../../domain/interactor/god_interactor";
import { Button } from "../component/Button";

function RoomPage() {
  const locInt = new LocationInteractor();
  const roomInc = new RoomInteractor();

  const [addMode, setAddMode] = useState(false);

  const [rooms, setRooms] = useState<StateEntity<RoomEntity[]>>({
    loading: false,
    data: [],
  });

  const [locs, setLocs] = useState<StateEntity<LocationEntity[]>>({
    loading: false,
    data: [],
  });

  const [loading, setLoading] = useState(true);

  async function getRooms() {
    try {
      setLoading(true);
      const results = await roomInc.collections();

      setRooms({
        loading: false,
        data: results,
      });

      setLoading(false);
    } catch (error: any) {
      setRooms({
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

      await roomInc.store(inputs);

      getRooms();
      setAddMode(false);
    } catch (error: any) {
      setAddMode(false);
      setLoading(false);
    }
  }

  async function del(inputs: any) {
    try {
      setLoading(true);

      await roomInc.delete(inputs);

      getRooms();
      setAddMode(false);
    } catch (error: any) {
      setAddMode(false);
      setLoading(false);
    }
  }

  async function init() {
    getRooms();
    getLocs();
  }

  function formOnSubmit(e: any) {
    e.preventDefault();

    store({
      locationId: e.target.elements.locationId.value,
      name: e.target.elements.name.value,
      capacity: e.target.elements.capacity.value,
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
                <span className="w-40">Lokasi</span>
                <select name="locationId" className="input input-bordered w-full">
                  {locs.data?.map((e, i) => {
                    return (
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="input-group">
                <span className="w-40">Nama Kamar</span>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="input-group">
                <span className="w-40">Kapasitas</span>
                <input
                  type="number"
                  name="capacity"
                  min={1}
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
                    <th>Kamar</th>
                    <th>Kapasitas</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.data?.map((e, i) => (
                    <tr key={i}>
                      <th>{e.name}</th>
                      <th>{e.capacity}</th>
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

export { RoomPage };
