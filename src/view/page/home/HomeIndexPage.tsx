import { useEffect, useState } from "react";
import { StateEntity } from "../../../domain/entity/state_entity";
import { SummaryEntity } from "../../../domain/entity/summary_entity";
import { SummaryInteractor } from "../../../domain/interactor/god_interactor";
import { Navbar } from "../../component/Navbar";
import { Shimmer } from "../../component/Shimmer";

const interactor = new SummaryInteractor();

function HomeIndexPage() {
  const [single, setSingle] = useState<StateEntity<SummaryEntity>>({
    loading: true,
    data: null,
  });

  const [collection, setCollection] = useState<StateEntity<any>>({
    loading: true,
    data: [],
  });

  async function getSingle() {
    try {
      setSingle({ loading: true });
      const results = await interactor.single({ id: 1 });

      setSingle({
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

  async function getCollection() {
    try {
      setCollection({ loading: true });
      const results = await interactor.collections();

      setCollection({
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

  function init() {
    getSingle();
    getCollection();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Navbar title="HOME"></Navbar>
      <div className="flex flex-col h-screen p-4 space-y-4">
        <div className="stats shadow">
          <div className="stat bg-base-200">
            <div className="stat-title">Kapasitas Seluruh Mess</div>
            <div className="stat-value">
              {single.data != null && single.data?.messCapacity}
            </div>
          </div>
          <div className="stat bg-base-200">
            <div className="stat-title">Total User Checkin</div>
            <div className="stat-value">
              {single.data != null && single.data?.checkinTotal}
            </div>
          </div>
          <div className="stat bg-base-200">
            <div className="stat-title">Total Kasur Tersedia</div>
            <div className="stat-value">
              {single.data != null && single.data?.emptyBeds}
            </div>
          </div>
        </div>
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
                        <th>Mess</th>
                        <th>Kapasitas</th>
                        <th>User Checkin</th>
                        <th>Kasur Tersedia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collection.data?.map((e: any, i: any) => {
                        return (
                          <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.summary.messCapacity}</td>
                            <td>{e.summary.checkinTotal}</td>
                            <td>{e.summary.emptyBeds}</td>
                          </tr>
                        );
                      })}
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

export { HomeIndexPage };
