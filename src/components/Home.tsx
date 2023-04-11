import React, { useEffect, useState } from 'react'
import Masina from '../models/Masina';
import ServiceCar from '../services/Api';
import { Car } from './Car';
const  Home:React.FC=()=>{
 let serviceCar=new ServiceCar();
 let [cars,setCars]=useState(Array<Masina>);
let getAllCars = async () : Promise<void>=>{
    let data = await serviceCar.getAllCars();
    setCars(data);
}

useEffect(()=>{getAllCars},[]);

return(
    <>
     <h1>Cars</h1>
            <p><a>Cars</a></p>
            <table>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Model</th>
                        <th>Culoare</th>
                        <th>Anul</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map(car=>{
                            return <Car car={car} key={car.id}/>
                        })
                        
                    }
                </tbody>
            </table>

            <button type='button'>Add Car</button>
    </>
);

}


export default Home;