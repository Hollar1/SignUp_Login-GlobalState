import React from "react";
import spinnerStyles from "../spinner/spinner.module.css";
import { BounceLoader } from "react-spinners";

function Spinner({ children }) {
  return (
    <div className={spinnerStyles.wrapper}>
      <section>
        <BounceLoader color="brown" size={100} />
      </section>
    </div>
  );
}

export default Spinner;
