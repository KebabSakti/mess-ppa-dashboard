import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { BadRequest } from "../../../common/error/bad_request";
import { InnEntity } from "../../../domain/entity/inn_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import {
  InnInteractor,
  LocationInteractor,
} from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";

const interactor = new LocationInteractor();
const innInteractor = new InnInteractor();

function LocationAddPage(props: any) {
  const navigate: any = useNavigate();
  const [mess, setMess] = useState<StateEntity<InnEntity[]>>({
    loading: true,
    data: [],
  });

  async function getMess() {
    try {
      setMess({ ...mess, loading: true });
      const results = await innInteractor.collections();

      setMess({
        ...mess,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setMess({
        ...mess,
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
      navigate(LocalRoute.location, { replace: true });
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

    const inputs = {
      innId: event.target["innId"].value,
      inn: event.target["innId"].options[
        event.target["innId"].options.selectedIndex
      ].text,
      name: event.target["name"].value,
      denah: event.target["denah"].files[0],
      active: event.target["active"].checked ? 1 : 0,
    };

    store(inputs);
  }

  async function init() {
    getMess();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="TAMBAH MESS">
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
                  name="innId"
                  className="select select-bordered w-full max-w-xs"
                  required
                >
                  {mess.data?.map((e, i) => (
                    <option key={i} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label>Lokasi</label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Denah</label>
                <input
                  name="denah"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  required
                />
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

export { LocationAddPage };
