import "./Spinner.css";

const Spinner = ({ ...props }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <span class="loader" {...props}></span>
    </div>
  );
};

export default Spinner;
