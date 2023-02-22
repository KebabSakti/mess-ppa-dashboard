
function BookingAddPage() {
  return (
    <>
      <div className="flex flex-col h-screen p-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="overflow-x-auto">{/* content */}</div>
            <div className="btn-group mx-auto">
              <button className="btn">Prev</button>
              <button className="btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { BookingAddPage };

