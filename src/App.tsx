import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { HOME, NEWCAR } from './utile/constante';
import NewCar from './components/NewCar';



function App() {

  let [page,setPage]=useState(HOME);

  let handlePage=(pag:string):void=>{

    setPage(pag);
  }
  return (

    <>
  
  {(() => {
        switch (page) {
          case HOME:
            return <Home setPage={handlePage} />;


          case NEWCAR:
            return <NewCar setPage={setPage} />;

          // case EDIT_PAGE:
          //   return <EditCar carId={carId} setPage={setPage} />

          // case ALL_PAGE:
          //   return <AllCars setCarId={setCarId} carID={carId} setPage={setPage} />

          default:
            return <Home setPage={setPage}/>;
        }
      })()}
        
    </>

   

  );
}

export default App;
