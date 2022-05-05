import React, { useState } from "react";

const ComplementaryAddress = () => {
    const [value, setValue] = useState('');
    // const [show, setShow] = useState(false);


    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value)
    };


  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Ej: Oficina 22"
        className="form-control searchBar-container shadow-none"
        onChange={(event) => handleChange(event)}
        value={value}
      />
    </div>
  );
};

export default ComplementaryAddress;
