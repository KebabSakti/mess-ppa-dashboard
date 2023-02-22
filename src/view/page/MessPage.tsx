  import { useEffect, useState } from "react";
import { InnEntity } from "../../domain/entity/inn_entity";
import { StateEntity } from "../../domain/entity/state_entity";
import { InnInteractor } from "../../domain/interactor/god_interactor";
import { Button } from "../component/Button";
import { Toast } from "../component/Toast";

function MessPage() {
  const innInteractor = new InnInteractor();
  const [addMode, setAddMode] = useState(false);

  const [collections, setCollections] = useState<StateEntity<InnEntity[]>>({
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

  async function store(inputs: any) {
    try {
      setLoading(true);

      await innInteractor.store(inputs);

      getCollections();
      setAddMode(false);
    } catch (error: any) {
      setAddMode(false);
      setLoading(false);
    }
  }

  async function del(inputs: any) {
    try {
      setLoading(true);

      await innInteractor.delete(inputs);

      getCollections();
      setAddMode(false);
    } catch (error: any) {
      setAddMode(false);
      setLoading(false);
    }
  }

  async function init() {
    getCollections();
  }

  function formOnSubmit(e: any) {
    e.preventDefault();

    store({
      name: e.target.elements.name.value,
      map: e.target.elements.denah.files[0],
      picture: e.target.elements.picture.files[0],
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
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="input-group">
                <span className="w-40">Denah</span>
                <input
                  type="file"
                  name="denah"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </label>
              <label className="input-group">
                <span className="w-40">Foto</span>
                <input
                  type="file"
                  name="picture"
                  className="file-input file-input-bordered w-full"
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
                    <th>Mess</th>
                    <th>Denah</th>
                    <th>Foto</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {collections.data?.map((e, i) => (
                    <tr key={i}>
                      <th>{e.name}</th>
                      <td>
                        <a href={e.map} target="_blank">
                          Lihat
                        </a>
                      </td>
                      <td>
                        <a href={e.picture} target="_blank">
                          Lihat
                        </a>
                      </td>
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

export { MessPage };
