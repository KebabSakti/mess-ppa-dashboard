function Button({
  loading = false,
  className = "",
  text,
  onClick,
}: {
  loading: boolean;
  className?: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary btn-block ${
        loading && "loading btn-disabled"
      } ${className}`}
    >
      {text}
    </button>
  );
}

export { Button };
