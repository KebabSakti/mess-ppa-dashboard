import { Button } from "../../component/Button";
import { Navbar } from "../../component/Navbar";

function BookingAddPage() {
  function formOnSubmit() {}

  return (
    <>
      <Navbar title="TAMBAH DATA" />
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="overflow-x-auto">
              <form className="space-y-4" onSubmit={formOnSubmit}>
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
                <Button loading={false} text="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { BookingAddPage };
