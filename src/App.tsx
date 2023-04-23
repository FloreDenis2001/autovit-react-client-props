import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { HOME, NEWCAR , UPDATECAR } from './utile/constante';
import NewCar from './components/NewCar';
import ServiceCar from './services/Api';
import Masina from './models/Masina';
import UpdateCar from './components/UpdateCar';



function App() {

 let [cars,setCars]=useState([] as Array<Masina>);

 let serviceCar=new ServiceCar();
  useEffect(()=>{
    getAllCars();
 },[])

 let [updatedId,setUpdatedId]=useState(-1);

 let handleUpdateId=(updateId:number):void=>{
     setUpdatedId(updateId);
  }
 let getAllCars = async () : Promise<void>=>{
    
  let data = await serviceCar.getAllCars();
  setCars(data);
}

function addCar(masina:Masina){
  let auxCar=[...cars];
  let newcar={
      id:masina.id,
      an:masina.an,
      culoare:masina.culoare,
      marca:masina.marca,
      model:masina.model,
  }
  auxCar.push(newcar);
  setCars(auxCar);
}

function removeCar(masina:Masina){
   let auxCar=cars.filter(car=>car.id!==masina.id);
   setCars(auxCar);
}


  let [page,setPage]=useState(HOME);

  let handlePage=(pag:string):void=>{

    setPage(pag);
  }


  
  return (

    <>
  
  {(() => {
        switch (page) {
          case HOME:
            return <Home setUpdatedId={handleUpdateId} setPage={handlePage} cars={cars} />;


          case NEWCAR:
            return <NewCar setPage={setPage} changeListOfmasini={addCar}/>;

          case UPDATECAR:
            return <UpdateCar setPage={setPage} masinaId={updatedId} changeListOfCars={removeCar} />

          default:
            return <Home setUpdatedId={handleUpdateId} setPage={setPage} cars={cars}/>;
        }
      })()}
        
    </>

   

  );
}

export default App;
