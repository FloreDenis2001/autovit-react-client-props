import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { HOME, NEWCAR } from './utile/constante';
import NewCar from './components/NewCar';
import ServiceCar from './services/Api';
import Masina from './models/Masina';



function App() {

 let [cars,setCars]=useState([] as Array<Masina>);
 let serviceCar=new ServiceCar();
  useEffect(()=>{
    getAllCars();
 },[])


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
      key:masina.id   
  }
  auxCar.push(newcar);
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
            return <Home setPage={handlePage} cars={cars} />;


          case NEWCAR:
            return <NewCar setPage={setPage} changeListOfmasini={addCar}/>;

          // case EDIT_PAGE:
          //   return <EditCar carId={carId} setPage={setPage} />

          // case ALL_PAGE:
          //   return <AllCars setCarId={setCarId} carID={carId} setPage={setPage} />

          default:
            return <Home setPage={setPage} cars={cars}/>;
        }
      })()}
        
    </>

   

  );
}

export default App;
