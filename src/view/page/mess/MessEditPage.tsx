import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { RemoteApi } from "../../../common/config/remote_api";
import { BadRequest } from "../../../common/error/bad_request";
import { InnEntity } from "../../../domain/entity/inn_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { InnInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new InnInteractor();

function MessEditPage(props: any) {
  const { id } = useParams();
  const navigate: any = useNavigate();
  const [single, setSingle] = useState<StateEntity<InnEntity>>({
    loading: true,
    data: null,
  });

  async function getSingle() {
    try {
      setSingle({ ...single, loading: true });
      const results = await interactor.single({ id: id });

      setSingle({
        ...single,
        loading: false,
        data: results,
      });
    } catch (error: any) {
      setSingle({
        ...single,
        loading: false,
        error: error.message,
      });
    }
  }

  async function update(inputs: any) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(inputs);

      if (error) {
        throw new BadRequest(error.message);
      }

      props.setLoading(true);

      await interactor.update(inputs);

      props.setLoading(false);
      props.setToast("Data berhasil di proses");
      navigate(LocalRoute.mess, { replace: true });
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
      id: id,
      name: event.target["name"].value,
      denah: event.target["denah"].files[0],
      picture: event.target["picture"].files[0],
      active: event.target["active"].checked ? 1 : 0,
    };

    update(inputs);
  }

  async function init() {
    getSingle();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="EDIT MESS">
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
            {single.loading ? (
              <Shimmer />
            ) : (
              <>
                <form className="space-y-4" onSubmit={formOnSubmit}>
                  <div className="flex flex-col space-y-2">
                    <label>Nama Mess</label>
                    <input
                      name="name"
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      defaultValue={single.data?.name}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>
                      Denah [
                      <a
                        href={RemoteApi.url + single.data?.map}
                        target="_blank"
                      >
                        Lihat
                      </a>
                      ]
                    </label>
                    <div>
                      <input
                        name="denah"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                      />
                      <p className="text-red-400 text-sm">
                        * Kosongkan jika tidak mengganti gambar
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>
                      Foto [
                      <a
                        href={RemoteApi.url + single.data?.picture}
                        target="_blank"
                      >
                        Lihat
                      </a>
                      ]
                    </label>
                    <div>
                      <input
                        name="picture"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                      />
                      <p className="text-red-400 text-sm">
                        * Kosongkan jika tidak mengganti gambar
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>Aktif</label>
                    <input
                      name="active"
                      type="checkbox"
                      className="toggle toggle-success"
                      defaultChecked={single.data?.active}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { MessEditPage };
