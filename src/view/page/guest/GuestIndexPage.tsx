import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { EmployeeEntity } from "../../../domain/entity/employee_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { GuestInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new GuestInteractor();

function GuestIndexPage(props: any) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    search: "",
  });
  const [collection, setCollection] = useState<StateEntity<EmployeeEntity[]>>({
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

  async function deleteData(id: string) {
    try {
      await interactor.delete({ id: id });
      getCollection();
    } catch (error: any) {
      props.setToast(error.message);
    }
  }

  function onSearch(e: any) {
    setFilter({ ...filter, search: e.target.value });
  }

  function addBtnOnClick() {
    navigate(LocalRoute.employeeAdd);
  }


  function deleteOnClick(id: string) {
    if (window.confirm("Proses ini tidak dapat dikembalikan, lanjutkan?")) {
      deleteData(id);
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
      <Navbar title="LIST TAMU">
        <div className="flex space-x-2 pr-2">
          <input
            type="text"
            placeholder="Cari di sini"
            className="input input-sm w-full input-bordered rounded-full"
            onChange={debounce((e) => onSearch(e), 500)}
          />
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={addBtnOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
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
                        <th>Telp</th>
                        <th></th>
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
                            <th>{e.phone}</th>
                            <th>
                              <div className="btn-group">
                                <button
                                  className="btn btn-sm btn-error"
                                  onClick={() => deleteOnClick(e.id!)}
                                >
                                  Delete
                                </button>
                              </div>
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

export { GuestIndexPage };

