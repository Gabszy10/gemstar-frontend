import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyComponent = (props) => {
    const {name,values, setValues} = props

  const handleChange = value => {
    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <ReactQuill
      theme="snow"
      value={values[name]}
      onChange={handleChange}
      />
  );
}

export default MyComponent