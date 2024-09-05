// src/context/CarsContextProvider.jsx
import React, { createContext, useEffect, useState } from 'react';
import CarsContext from './CarsContext';

const CarsContextProvider = ({ children }) => {

    // const[car, setCar] = useState([]);
  const [car, setCar] = useState(()=> {
    const storedCar = localStorage.getItem('car');
    return storedCar ? JSON.parse(storedCar) : [];
  });

  useEffect(()=>{
    if(car !== null){
        localStorage.setItem('car', JSON.stringify(car))
    }
    else{
        localStorage.removeItem('car');
    }
  }, [car])

  return (
    <CarsContext.Provider value={{ car, setCar }}>
      {children}
    </CarsContext.Provider>
  );
};

export default CarsContextProvider;
