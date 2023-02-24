import { useState } from "react";
import { Outlet } from "react-router";
import { Modal } from "./Modal";
import Portal from "./Portal";

function Layout() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Portal>
        <Modal className="w-40" show={false}>
          <p className="text-center">
            <button className="btn btn-ghost loading">Loading</button>
          </p>
        </Modal>
      </Portal>
      <Outlet context={{ udin: "udin" }} />
    </>
  );
}

export { Layout };
