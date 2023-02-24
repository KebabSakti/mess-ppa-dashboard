import Joi from "joi";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { BadRequest } from "../../../common/error/bad_request";
import { InnInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";

const interactor = new InnInteractor();

function MessAddPage(props: any) {
  const navigate: any = useNavigate();

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
      name: event.target["name"].value,
      denah: event.target["denah"].files[0],
      picture: event.target["picture"].files[0],
      active: event.target["active"].checked ? 1 : 0,
    };

    store(inputs);
  }

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
                <label>Nama Mess</label>
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
                <label>Foto</label>
                <input
                  name="picture"
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

export { MessAddPage };
