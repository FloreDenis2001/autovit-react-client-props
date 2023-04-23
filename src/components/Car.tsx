import Masina from "../models/Masina";
import React from "react"
import { UPDATECAR } from "../utile/constante";

interface CarProps{
    car:Masina;
    setUpdatedId :(setUpdatedId:number)=>void;
    setPage:(page:string)=>void;
}


export const Car : React.FC<CarProps>= ({setUpdatedId,car,setPage})=>{
    
  

    return (
        <tr>
            <td>{car.marca}</td>
            <td onClick={()=>{
                setUpdatedId(car.id?car.id:0);
                setPage(UPDATECAR);
            }}>{car.model}</td>
            <td>{car.culoare}</td>
            <td>{car.an}</td>
        </tr>
    )

}