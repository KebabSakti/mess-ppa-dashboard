import { useState } from "react";
function useVisibility(): any {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  return [visible, toggle];
}

export { useVisibility };
