import React from 'react'
import HttpResponse from '../models/HttpResponse';
import Masina from '../models/Masina';

class ServiceCar {
  
    api<U,T>(path:string,method:string,body:U,token:string):Promise<HttpResponse<T>>{
         const url="http://localhost:8080/api/v1/"+path;
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

  



}
export default ServiceCar;