import React from "react";
import inputStyles from "../input/input.module.css";
import { FaChevronDown } from "react-icons/fa6";

function Input({
  type,
  value,
  name,
  onChange,
  icon_A: Icon_A,
  icon_B: Icon_B,
  placeholder,
  header,
  click
  
}) {
  return (
    <div>
   <h3 className={inputStyles.header}>   {header}</h3>
      <div className={inputStyles.wrapper}>
        <span> {Icon_A && <Icon_A />}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
        <p className={inputStyles.eye_icon} onClick={click}> {Icon_B && <Icon_B />}</p>
      </div>
    </div>
  );
}

export default Input;

export function Gender({
  onClick,
  maleOnChange,
  femaleOnChange,
  type,
  maleChecked,
  femaleChecked,
  maleName,
  femaleName,
  maleValue,
  femaleValue,
}) {
  return (
    <div>
      <section className={inputStyles.gender}>
        <aside>
          <div>
            <label htmlFor="gender">
              {" "}
              Male
              <input
                id="gender"
                type={type}
                onChange={maleOnChange}
                checked={maleChecked}
                name={maleName}
                value={maleValue}
              />
            </label>
          </div>

          <div>
            <label htmlFor="gender">
              Female
              <input
                id="gender"
                type={type}
                onChange={femaleOnChange}
                checked={femaleChecked}
                name={femaleName}
                value={femaleValue}
              />
            </label>
          </div>
        </aside>

        <span onClick={onClick} tabIndex={"0"} >
          <FaChevronDown />
        </span>
      </section>



    </div>
  );
}
