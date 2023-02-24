import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RosterEntity } from "../../../domain/entity/roster_entity";
import { StateEntity } from "../../../domain/entity/state_entity";
import { RosterInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new RosterInteractor();

function RosterIndexPage(props: any) {
  const navigate = useNavigate();
  const [collection, setCollection] = useState<StateEntity<RosterEntity[]>>({
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

      props.setToast(error.message);
    }
  }

  async function store(inputs: any) {
    try {
      props.setLoading(true);

      await interactor.store(inputs);

      props.setLoading(false);
      props.setToast("Data berhasil di proses");
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

  // useEffect(() => {
  //   const nrp: any = [];
  //   const name: any = [];
  //   const employee: any = [];

  //   collection.data?.map((e) => {
  //     nrp.push(e.nrp);
  //     name.push(e.name);
  //   });

  //   const uniqueNrp: any = [...new Set(nrp)];
  //   const uniqueName: any = [...new Set(name)];

  //   for (let i = 0; i < uniqueNrp.length; i++) {
  //     employee.push({
  //       [uniqueNrp[i]]: {
  //         nrp: uniqueNrp[i],
  //         name: uniqueName[i],
  //         rosters: [],
  //       },
  //     });
  //   }

  //   let rosters: any = [];
  //   employee.map((e: any) => {
  //     rosters = collection.data?.filter((f) => f.nrp == "1042214");
  //   });

  //   const status: any = [];
  //   rosters.map((s: any) => {
  //     status.push(s.status);
  //   });

  //   console.log(employee);
  // }, [collection]);

  return (
    <>
      <Navbar title="ROSTER KARYAWAN" />
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body">
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
                  <button className="btn">Submit</button>
                </form>
                {/* <div className="overflow-x-auto">
                  <table className="table table-compact table-zebra w-full">
                    <thead></thead>
                    <tbody></tbody>
                  </table>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { RosterIndexPage };

