import React, { useEffect, useState } from 'react'
import Masina from "../models/Masina"
import ServiceCar from '../services/Api';
import { errorNotification, successNotification } from '../components/Notification';
import { HOME } from '../utile/constante';

interface PageProps{
    setPage:(page:string)=>void;
}

const NewCar: React.FC<PageProps> = ({setPage}) => {

    let serviceCar = new ServiceCar();
    const [marca, setMarca] = useState("");
    const [model, setModel] = useState("");
    const [culoare, setCuloare] = useState("");
    const [anul, setAnul] = useState(1864);


    const [errors, setErrors] = useState([""])


    const [isAdded, setAdded] = useState(false);


    const [car, setCar] = useState({
        an: 1864,
        culoare: "",
        marca: "",
        model: ""
    }as Masina);


    let addCar = async () => {

        checkErros();


        if(errors.length==0){

        await serviceCar.addCar(car);
          setAdded(true);
          setTimeout(()=>{setPage(HOME)},1500);
           successNotification("A fost adaugat","masina","topRight");
        }else{
            errors.forEach((err)=>{
                errorNotification(err,"eroare","topRight");
            })
        }
    }




    let checkErros = () => {

        let messages = [];
        setErrors([]);

        if (marca ==="") {

            messages.push("Trebuie sa introduceti marca");

        } 
         if (model === "") {
            messages.push("Trebuie sa introduceti modelul")
        } 
        if (anul === 0) {
            messages.push("Anul trebuie sa fie mai mare decat 1854");
        } 
         if (culoare === "") {
            messages.push("Trebuie sa introduceti culoarea");
        }

        setErrors(messages);
    }



    useEffect(() => {

        checkErros();
        let masina = {
            an: anul,
            culoare: culoare,
            marca: marca,
            model: model
        } as Masina;
        setCar(masina);
        console.table(car);


    }, [marca, model, culoare, anul]);

   
   

    return (

        <>
            <h1>New Car</h1>
            <form>
                <p>
                    <label htmlFor="Marca">Marca :</label>
                    <input name="marca" type="text" id="marca" value={marca} onChange={(e) => {
                        setMarca(e.target.value);
                    }} />
                </p>
                <p>
                    <label htmlFor="Model">Model : </label>
                    <input name="model" type="text" id="model" value={model} onChange={(e) => {
                        setModel(e.target.value);
                    }} />
                </p>
                <p>
                    <label htmlFor="Culoare">Culoare : </label>
                    <input name="culoare" type="text" id="culoare" value={culoare} onChange={(e) => {
                        setCuloare(e.target.value);
                    }} />
                </p>
                <p>
                    <label htmlFor="Anul">Anul : </label>
                    <input name="anul" type="number" id="Anul" min={1864} value={anul} onChange={(e) => {
                        setAnul(+e.target.value);
                    }} />
                </p>

                <p>
                    <input type="button" value="Create New Car" onClick={addCar} />
                </p>
                <p>
                    <a className='button' href='' onClick={()=>setPage(HOME)}>Cancel</a>
                </p>
            </form>


        </>
    )
}

export default NewCar;
