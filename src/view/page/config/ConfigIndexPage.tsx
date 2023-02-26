import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LocalRoute } from "../../../common/config/local_route";
import { ConfigEntity } from "../../../domain/entity/config_entity";
import { EmployeeEntity } from "../../../domain/entity/employee_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { ConfigInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new ConfigInteractor();

function ConfigIndexPage(props: any) {
  const navigate = useNavigate();
  const [collection, setCollection] = useState<StateEntity<ConfigEntity[]>>({
    loading: true,
    data: [],
  });

  async function getCollection() {
    try {
      setCollection({ ...collection, loading: true });
      const results = await interactor.collections();

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

  function editOnClick(id: string) {
    navigate(`${LocalRoute.configEdit}/${id}`);
  }

  async function init() {
    getCollection();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="SETTING"></Navbar>
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body">
            {collection.loading ? (
              <Shimmer />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
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
                            <th>{e.key}</th>
                            <td>{e.value}</td>
                            <th>
                              <div className="btn-group">
                                <button
                                  className="btn btn-sm btn-warning"
                                  onClick={() => editOnClick(e.id!)}
                                >
                                  Edit
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

export { ConfigIndexPage };
