import React, { useContext } from 'react';
import { Button } from '@mantine/core'; 
import DataTable from './DataTable';
import NavBar from './NavBar';
import CarsContext from '../src/context/CarsContext';
import './Cars.css';

function Cars() {
  const { car } = useContext(CarsContext);

  return (
    <>
    <NavBar />
    <div className='ParentDiv'>
      <h1>Cars Information</h1>
      <DataTable data={car} />
    </div>
    </>
  );
}

export default Cars;
