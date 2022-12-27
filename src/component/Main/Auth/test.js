import React, { useState, useEffect } from 'react';

const testForm = () => {
  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return handleChange;
};

export default testForm;
