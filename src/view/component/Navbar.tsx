function Navbar(props: any) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label
            htmlFor="my-drawer-2"
            tabIndex={0}
            className="btn btn-ghost btn-circle drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
        <div className="navbar-end">{props.children}</div>
      </div>
    </>
  );
}

export { Navbar };
