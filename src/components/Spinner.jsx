import "../styles/spinner.css";

const Spinner = ({ ...props }) => {
  return (
    <div className="flex justify-center items-center z-50">
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
    </div>
  );
};

export default Spinner;
