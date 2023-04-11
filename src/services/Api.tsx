import React from 'react'
import HttpResponse from '../models/HttpResponse';
import Masina from '../models/Masina';

class ServiceCar {
  
    api<U,T>(path:string,method:string,body:U,token:string):Promise<HttpResponse<T>>{
         const url="http://localhost:8080/api/v1"+path;
         const options:RequestInit={
            method,
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                Authentification:`Bearer${token}`,
                method:"no-cors"
            },
            body: body== null ? null : JSON.stringify(body),
         };
        return fetch(url,options);
    }



    
  getAllCars = async (): Promise<Masina[]> => {
    let data = await this.api<null, Masina[]>("/masini/all", "GET", null, "");
    if (data.status === 200) {
      let cars = await data.json();
      return cars;
    } else {
      return Promise.reject([]);
    }
  }

  addCar = async (masina: Masina): Promise<HttpResponse<Masina>> => {
    let data = await this.api<Masina, Masina>("/masini/add", "POST", masina, "");



    try {

      if (data.status === 201) {
        let addedcar = await data.json();
        return addedcar
      }


      throw new Error("error");

    } catch (err) {

      return {
        ...data,
        message: "Wrong fetch !"
      }
    }

  }

  updateCar = async (masina: Masina): Promise<HttpResponse<Masina>> => {
    let data = await this.api<Masina, Masina>("/masini/update", "PUT", masina, "");
    try {
      if (data.status === 200) {
        let car = data.json();
        return car;
      } else {
        throw new Error("Masina nu exista!");
      }
    } catch (e) {

      return {
        ...data,
        message: "Wrong fetch !"
      }
    }
  }


 
  

  

  deleteCar = async (masina: Masina) => {
    console.log(masina);
    let data = await this.api<Masina, Masina>("/masini/removebyid/" + masina.id, "DELETE", masina, "");
    try {
      if (data.status === 200) {
        return  masina;
      } else {
        throw new Error("Masina nu exista !");
      }
    } catch (e) {
      return {
        ...data,
        message: "Wrong fetch !"
      }
    }

  }


  findCarById = async (id:String):Promise<Masina>=> {
    let data = await this.api<null, Masina>("/masini/findById/" +id,"GET",null, "");

      if (data.status === 200) {
        let car = data.json();
        return car;
      } else {
        throw new Error("Masina nu exista !");
      }

  }



}
export default ServiceCar;