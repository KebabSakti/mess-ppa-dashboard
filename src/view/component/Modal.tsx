function Modal(props: any) {
  return (
    <>
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className={`modal ${props.show && "modal-open"}`}>
        <div className={`modal-box relative ${props.className}`}>
          {props.showCloseButton && (
            <label
              htmlFor={props.id}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
          )}
          {props.children}
        </div>
      </div>
    </>
  );
}

export { Modal };
