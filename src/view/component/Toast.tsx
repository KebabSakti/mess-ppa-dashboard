
function Toast({ show = false, message }: { show: boolean; message: string }) {
  return (
    <>
      {show && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <div>
              <span>{message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Toast };

