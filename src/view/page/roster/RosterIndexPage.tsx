import { useEffect, useState } from "react";
import { StateEntity } from "../../../domain/entity/state_entity";
import { RosterInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new RosterInteractor();

function RosterIndexPage(props: any) {
  const [collection, setCollection] = useState<StateEntity<any>>({
    loading: true,
    data: [],
  });

  async function getCollection() {
    try {
      setCollection({ ...collection, loading: true });

      const results = await interactor.collections();
      const nrp: any = [];
      const name: any = [];
      const employee: any = [];

      results.map((e) => {
        nrp.push(e.nrp);
        name.push(e.name);
      });

      const uniqueNrp: any = [...new Set(nrp)];
      const uniqueName: any = [...new Set(name)];

      for (let i = 0; i < uniqueNrp.length; i++) {
        employee.push({
          nrp: uniqueNrp[i],
          name: uniqueName[i],
          rosters: [],
        });
      }

      employee.map((e: any, i: number) => {
        const rosters = results
          .filter((f: any) => f.nrp == e.nrp)
          .map((item: any) => {
            return item.status;
          });

        employee[i] = { ...e, rosters: rosters };
      });

      setCollection({
        ...collection,
        loading: false,
        data: employee,
      });
    } catch (error: any) {
      setCollection({
        ...collection,
        loading: false,
        error: error.message,
      });

      props.setToast(error.message);
    }
  }

  async function store(inputs: any) {
    try {
      props.setLoading(true);

      await interactor.store(inputs);

      props.setLoading(false);
      props.setToast("Data berhasil di proses");

      getCollection();
    } catch (error: any) {
      props.setLoading(false);
      props.setToast(error.message);
    }
  }

  function formOnSubmit(event: any) {
    event.preventDefault();

    const inputs = {
      roster: event.target["roster"].files[0],
    };

    store(inputs);
  }

  async function init() {
    getCollection();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="ROSTER KARYAWAN" />
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body space-y-4">
            {collection.loading ? (
              <Shimmer />
            ) : (
              <>
                <form className="flex space-x-2" onSubmit={formOnSubmit}>
                  <div className="form-control">
                    <label className="input-group">
                      <span>Upload Roster</span>
                      <input
                        name="roster"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                  </div>
                  <button className="btn btn-primary">Submit</button>
                </form>
                {collection.data!.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table table-compact table-zebra w-full">
                      <thead>
                        <tr>
                          <th>NRP</th>
                          <th>NAMA</th>
                          {collection.data![0].rosters.map(
                            (e: any, i: number) => (
                              <th key={i}>{i + 1}</th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {collection.data?.map((e: any, i: any) => (
                          <tr key={i}>
                            <td>{e.nrp}</td>
                            <td>{e.name}</td>
                            {e.rosters.map((r: any, t: any) => (
                              <td key={t}>
                                {r == "OFF" || r == "N" ? (
                                  <label className="text-success font-bold">
                                    {r}
                                  </label>
                                ) : (
                                  <label>{r}</label>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { RosterIndexPage };
