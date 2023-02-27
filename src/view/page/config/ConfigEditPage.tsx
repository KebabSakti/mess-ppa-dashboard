import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { BadRequest } from "../../../common/error/bad_request";
import { ConfigEntity } from "../../../domain/entity/config_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import {
  ConfigInteractor
} from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new ConfigInteractor();

function ConfigEditPage(props: any) {
  const { id } = useParams();
  const navigate: any = useNavigate();
  const [single, setSingle] = useState<StateEntity<ConfigEntity>>({
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
        value: Joi.string().required(),
      }).unknown();

      const { error } = schema.validate(inputs);

      if (error) {
        throw new BadRequest(error.message);
      }

      props.setLoading(true);

      await interactor.update(inputs);

      props.setLoading(false);
      props.setToast("Data berhasil di proses");
      navigate(LocalRoute.config, { replace: true });
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
      value: event.target["value"].value,
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
      <Navbar title="EDIT SETTING">
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
                    <label>{single.data?.key}</label>
                    <input
                      name="value"
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      defaultValue={single.data?.value}
                      required
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

export { ConfigEditPage };

