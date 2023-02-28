import Joi from "joi";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { BadRequest } from "../../../common/error/bad_request";
import { InnEntity } from "../../../domain/entity/inn_entity";
import { LocationEntity } from "../../../domain/entity/location_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import {
  InnInteractor,
  LocationInteractor,
  RoomInteractor,
} from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";

const interactor = new RoomInteractor();
const messInteractor = new InnInteractor();
const locationInteractor = new LocationInteractor();

function RoomAddPage(props: any) {
  const navigate: any = useNavigate();
  const [mess, setMess] = useState<StateEntity<InnEntity[]>>({
    loading: true,
    data: [],
  });
  const [location, setLocation] = useState<StateEntity<LocationEntity[]>>({
    loading: true,
    data: [],
  });

  async function getMess() {
    try {
      setMess({ ...location, loading: true });
      const results = await messInteractor.collections();

      setMess({
        ...location,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setMess({
        ...location,
        loading: false,
        error: error.message,
      });
    }
  }

  async function getLocation(option: any) {
    try {
      setLocation({ ...location, loading: true });
      const results = await locationInteractor.collections(option);

      setLocation({
        ...location,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setLocation({
        ...location,
        loading: false,
        error: error.message,
      });
    }
  }

  async function store(inputs: any) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(inputs);

      if (error) {
        throw new BadRequest(error.message);
      }

      props.setLoading(true);

      await interactor.store(inputs);

      props.setLoading(false);
      props.setToast("Data berhasil di proses");
      navigate(LocalRoute.room, { replace: true });
    } catch (error: any) {
      props.setLoading(false);
      props.setToast(error.message);
    }
  }

  function backOnClick() {
    navigate(-1, { replace: true });
  }

  function formOnSubmit(event: any) {
    event.preventDefault();

    console.log(event.target["innId"]);

    const inputs = {
      innId: event.target["innId"].value,
      locationId: event.target["locationId"].value,
      inn: event.target["innId"].options[event.target["innId"].selectedIndex]
        .text,
      location:
        event.target["locationId"].options[
          event.target["locationId"].selectedIndex
        ].text,
      name: event.target["name"].value,
      capacity: event.target["capacity"].value,
      picture: event.target["picture"].files[0],
      active: event.target["active"].checked ? 1 : 0,
    };

    store(inputs);
  }

  function messOnChange(e: any) {
    const innId = e.target.value;
    getLocation({ innId: innId });
  }

  async function init() {
    getMess();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="TAMBAH KAMAR">
        <button className="btn btn-sm btn-circle" onClick={backOnClick}>
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
            <form className="space-y-4" onSubmit={formOnSubmit}>
              <div className="flex flex-col space-y-2">
                <label>Mess</label>
                <select
                  onChange={messOnChange}
                  name="innId"
                  className="select select-bordered w-full max-w-xs"
                  required
                >
                  <option> - Pilih Mess - </option>
                  {mess.data?.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label>Lokasi</label>
                <select
                  name="locationId"
                  className="select select-bordered w-full max-w-xs"
                  required
                >
                  {location.data?.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label>Nama</label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Kapasitas</label>
                <input
                  name="capacity"
                  type="number"
                  min={1}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Foto</label>
                <div>
                  <input
                    name="picture"
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label>Aktif</label>
                <input
                  name="active"
                  type="checkbox"
                  className="toggle toggle-success"
                />
              </div>
              <div className="flex flex-col max-w-xs space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <button
                  className="btn btn-info"
                  type="button"
                  onClick={backOnClick}
                >
                  Batal
                </button>
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export { RoomAddPage };
