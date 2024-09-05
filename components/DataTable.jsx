import React, { useContext } from 'react';
import { Table, Button } from '@mantine/core';
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import CarsContext from '../src/context/CarsContext';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './DataTable.css'

function DataTable({ data }) {
  const {setCar} = useContext(CarsContext);
  const navigate = useNavigate();
  
  const handleEditClick = (item) => {
    navigate('/', { state: { editData: item } });
  };

  const handleDeleteClick = (item) => {
    setCar(prevCars => prevCars.filter(car => car.vin !== item.vin));
    toast.info('Deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{item.make}</Table.Td>
      <Table.Td>{item.model}</Table.Td>
      <Table.Td>{item.manufactureYear}</Table.Td>
      <Table.Td>{item.vin}</Table.Td>
      <Table.Td>{item.vehiclePlateNumber}</Table.Td>
      <Table.Td>{item.licensePlateNumber}</Table.Td>
      <Table.Td>
        <Button
          onClick={() => handleEditClick(item)}
          variant="outline"
          color="blue"
          size="s"
        >
          <FiEdit2 /> Edit
        </Button> {'  '}

        <Button
        onClick={()=> handleDeleteClick(item)} 
        variant="outline" 
        color="red" 
        size="s"
        > 
        <MdDeleteOutline/> Delete
        </Button>

      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <ToastContainer />
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Make</Table.Th>
            <Table.Th>Model</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>VIN</Table.Th>
            <Table.Th>Plate Number</Table.Th>
            <Table.Th>License No.</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export default DataTable;
