import React from 'react';

const FormRow = ({ type, id, value, handleChange, labelText }) => {
  return (
  <div>
      <label htmlFor={id}>{labelText || id}: </label>
      <input type={type} value={value} id={id} onChange={handleChange}/>
  </div>
  );
};

export default FormRow;
