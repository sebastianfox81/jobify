import React from 'react';

const FormRow = ({ type, id, value, handleChange, labelText }) => {
  return (
  <div className="form-row">
      <label className="form-label" htmlFor={id}>{labelText || id}: </label>
      <input className="form-input" type={type} value={value} id={id} onChange={handleChange}/>
  </div>
  );
};

export default FormRow;
