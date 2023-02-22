function Modal(props: any) {
  return (
    <>
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={props.id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="py-4">{props.children}</div>
        </div>
      </div>
    </>
  );
}

export { Modal };
