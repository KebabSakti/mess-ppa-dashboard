import { createPortal } from "react-dom";

const portal: any = document.getElementById("portal");

const Portal = (props: any) => {
  return createPortal(props.children, portal);
};

export default Portal;
