import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import NavBar from './NavBar';
import FormInput from './FormInput';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "../src/App.css";
import * as Yup from 'yup';
import CarsContext from '../src/context/CarsContext'
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { setCar } = useContext(CarsContext);
  const location = useLocation();
  const editData = location.state?.editData || {};

  const [values, setValues] = useState({
    make: editData.make || "",
    model: editData.model || "",
    manufactureYear: editData.manufactureYear || "",
    vin: editData.vin || "",
    vehiclePlateNumber: editData.vehiclePlateNumber || "",
    licensePlateNumber: editData.licensePlateNumber || "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  const validationSchema = Yup.object({
    make: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Make should only contain letters and spaces.")
      .required("Make is required"),
    model: Yup.string().required("Model is required"),
    manufactureYear: Yup.date().required("Manufacture year is required").nullable(),
    vehiclePlateNumber: Yup.string()
      .matches(/^[A-Za-z0-9-]{5,10}$/, "Vehicle plate number should be 5-10 characters and can include letters, numbers, and dashes.")
      .required("Vehicle plate number is required"),
    licensePlateNumber: Yup.string()
      .matches(/^[A-Za-z0-9-]{5,10}$/, "License plate number should be 5-10 characters and can include letters, numbers, and dashes.")
      .required("License plate number is required"),
    vin: Yup.string().required("VIN is required"),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message; 
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      console.log('Form submitted:', values);
      console.log('Setting car data:', values);
      setCar(prevCars => {
        console.log('Previous cars:', prevCars);
        const index = prevCars.findIndex(car => car.vin === values.vin);
        if (index !== -1) {
          const updatedCars = [...prevCars];
          updatedCars[index] = values;
          return updatedCars;
        } else {
          return [...prevCars, values];
        }
      });

      setValues({
        make: "",
        model: "",
        manufactureYear: "",
        vin: "",
        vehiclePlateNumber: "",
        licensePlateNumber: "",
      });

      toast.success('Submitted!  ', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    { id: 1, name: "make", type: "text", placeholder: "e.g., Toyota, Honda", label: "Make" },
    { id: 2, name: "model", type: "text", placeholder: "e.g., Corolla, Civic", label: "Model" },
    { id: 3, name: "manufactureYear", type: "date", placeholder: "Year of Manufacture", label: "Year of Manufacture" },
    { id: 4, name: "vehiclePlateNumber", type: "text", placeholder: "Vehicle Plate Number", label: "Vehicle Plate Number" },
    { id: 5, name: "licensePlateNumber", type: "text", placeholder: "License Plate Number", label: "License Plate Number" },
    { id: 6, name: "vin", type: "text", placeholder: "Vehicle Identification Number (VIN)", label: "VIN" },
  ];

  return (
    <div className="parentDiv">
      <ToastContainer />
      <div className="overlay">
        <NavBar />
        <div className="form-container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <Grid>
                {inputs.map((input) => (
                  <Grid.Col span={4} key={input.id}>
                    <FormInput
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                      errorMessage={errors[input.name]}
                    />
                  </Grid.Col>
                ))}
              </Grid>
              <button className="submitButton" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
