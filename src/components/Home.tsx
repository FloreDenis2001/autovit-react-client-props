import React, { useEffect, useState } from 'react'
import Masina from '../models/Masina';
import ServiceCar from '../services/Api';
import { Car } from './Car';
import { HOME, NEWCAR } from '../utile/constante';

interface PageProps{
    setPage:(page: string)=>(void);
    cars:Masina[];
    setUpdatedId :(setUpdatedId:number)=>void;
}

const  Home:React.FC<PageProps>=({setPage,cars,setUpdatedId})=>{


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
                            return <Car setPage={setPage} setUpdatedId={setUpdatedId} car={car} key={car.id}/>
                        })
                        
                    }
                </tbody>
            </table>

            <button type='button' onClick={()=>setPage(NEWCAR)}>Add Car</button>
    </>
);

}


export default Home;