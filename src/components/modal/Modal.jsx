import React from "react";
import modalStyles from "../modal/modal.module.css";

function Modal({ header, body, wrapperColor }) {
  return (
    <div className={`${modalStyles.wrapper}`}>
      <section className={`${modalStyles.section} ${wrapperColor}`}>
        <h3>{header}!</h3>
        <p>{body}</p>
      </section>
    </div>
  );
}

export default Modal;
