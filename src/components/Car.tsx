import Masina from "../models/Masina";

interface CarProps{
    car:Masina;
}


export const Car : React.FC<CarProps>= ({car})=>{


    return (
        <tr>
            <td>{car.marca}</td>
            <td>{car.model}</td>
            <td>{car.culoare}</td>
            <td>{car.an}</td>
        </tr>
    )

}