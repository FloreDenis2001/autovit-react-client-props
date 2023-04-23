import React, { useEffect, useState } from 'react'
import ServiceCar from '../services/Api';
import { errorNotification, successNotification } from './Notification';
import { HOME } from '../utile/constante';
import Masina from '../models/Masina';
interface PageProps{
    setPage:(page: string)=>(void);
    masinaId:number;
}

const UpdateCar:React.FC<PageProps>=({setPage,masinaId}) => {

    let serviceCar = new ServiceCar();

    const [marca, setMarca] = useState(" ");
    const [culoare, setCuloare] = useState("");
    const [anul, setAnul] = useState(1886);
    const [model,setModel]=useState(" ");
  
    const [car, setCar] = useState(Object);

   let [errors,setErrors]=useState([""]);

    useEffect(() => {


        findById();

    }, []);


    let checkErros = () => {

        let messages = [];
        setErrors([]);

        if (marca ==="") {
            messages.push("Trebuie sa introduceti marca");
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

        

        setCar({
            id: masinaId,
            marca: marca !== '' ? marca : undefined,
            culoare: culoare !== '' ? culoare : undefined,
            an: anul !== 0 ? anul : undefined,
            model:model
        });
        


    }, [marca, culoare, anul]);



    let updateCar = async () => {
        checkErros();

        if(errors.length==0){
        await serviceCar.updateCar(car);
        setTimeout(() => {
        }, 2500)

        successNotification("Updated","masina","topRight");
        }else {
            errors.forEach((err)=>{
                errorNotification(err,"erroare","topRight");
            })
        }
    }

    let deleteCar = async () => {

        let res = await serviceCar.deleteCar(car);
        if (res != null) {
        }

        setTimeout(() => {
        }, 2500)

    }

    let findById = async () => {

        if (masinaId!==null) {
           
            try{

                let findByIdCar = await serviceCar.findCarById(masinaId);
                console.log(findByIdCar);
                setAnul(findByIdCar!.an);
                setCuloare(findByIdCar!.culoare);
                setMarca(findByIdCar!.marca);
                setModel(findByIdCar!.model);
    

            }catch(eroare){
            
                const message = (eroare as Error).message;
                errorNotification(message,message,"bottomLeft");

                           
            }


        }


    }

    return (
        <>
            <h1>Update Car</h1>
            <form>
                <p>
                    <label htmlFor="marca">Marca</label>
                    <input name="marca" type="text" id="marca" value={marca} onChange={(e) => {
                        e.preventDefault();
                        setMarca(e.target.value);
                    }

                    } />
                </p>
                <p>
                    <label htmlFor="color">Culoare</label>
                    <input name="color" type="text" id="color" value={culoare} onChange={(e) => {
                         e.preventDefault();
                        setCuloare(e.target.value);
                    }

                    } />
                </p>
                <p>
                    <label htmlFor="year">Anul</label>
                    <input name="year" type="text" id="year" value={anul} onChange={(e) => {
                         e.preventDefault();
                         setAnul(+e.target.value);
                    }

                    } />
                </p>
                <p>
                    <input type="button" value="Update Car" onClick={updateCar} />
                </p>
            </form>

            <p>
                <a className="button" onClick={()=>setPage(HOME)}>Cancel</a>
            </p>
            <p><input type="button" value="Delete Car" onClick={deleteCar} /></p>



        </>
    )
}

export default UpdateCar;