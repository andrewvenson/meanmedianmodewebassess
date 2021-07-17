const axios = require("axios");
require("dotenv").config();

const APIKEY = process.env.APIKEY;

const getResponse = async (type, val) => {
     // Part #2 open weather Lafayette call
     // Lafayette geo coordinates
     let lat = "30.2240897";
     let lon = "-92.01984270000003";
     // imperial = fahrenheit
     const units = "imperial";
     // 3 day count
     const cnt = "24";

     // 5 day forecast api
     // default lafayette
     let endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&units=${units}&appid=${APIKEY}`;

     if(typeof type !== 'undefined'){
         switch(type){
             case "coords":
                 lat = val.split(",")[0];
                 lon = val.split(",")[1];
                 console.log(lat, lon);
                 endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&units=${units}&appid=${APIKEY}`;
                 console.log(endpoint);
                 break;
             default:
                 endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${val}&cnt=${cnt}&units=${units}&appid=${APIKEY}`;
                 break;
         }
     }

     // using axios, hopefully this is okay
     // added this after assessment was sent - error handling ... neccessity!
     let responseObj = {
         response: null,
         error: null,
     }

     try{
         responseObj.response = await axios.get(endpoint);
     }catch (error){
         responseObj.error = "error";
     }

     return responseObj;
}

// exported module in obj format for scalability
module.exports = {
 dataSet: async (type, val) => {
     const {response, error} = await getResponse(type, val);
     if(error !== null){
         return error;
     }
     return response.data.list.map(item => item.main.temp);
 },
 locationInfo: async (type,val) => {
     const {response, error} = await getResponse(type, val);
     if(error !== null){
         return error;
     }
     return response.data.city;
 }
}
 
