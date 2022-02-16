import React from "react";

const FormRowSelect = ({ labelText, id, value, handleChange, list}) => {
  return (
    <div className="form-row">
      <label htmlFor={id} className="form-label">
        {labelText || id}
      </label>
      <select
        name="jobType"
        id={id}
        className="form-select"
        value={value}
        onChange={handleChange}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
