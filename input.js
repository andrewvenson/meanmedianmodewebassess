const axios = require("axios");
require("dotenv").config();

// exported module in obj format for scalability
module.exports = {
 dataSet: async (type, val) => {
     // original arr being tested in Part #1 of assessment
     // let data = [4, 7, 12, 3, 2, 4, 8, 9, 10];

     // Part #2 open weather Lafayette call
     const APIKEY = process.env.APIKEY;
     // Lafayette geo coordinates
     let lat = "30.2240897";
     let lon = "-92.01984270000003";
     // imperial = fahrenheit
     const units = "imperial";
     // 3 day count
     const cnt = "24";

     // 5 day forecast api
     // defalut lafayette
     let endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&units=${units}&appid=${APIKEY}`;

     if(typeof type !== 'undefined'){
         switch(type){
             case "coords":
                 lat = val.split(",")[0];
                 lon = val.split(",")[1];
                 endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&units=${units}&appid=${APIKEY}`;
                 break;
             default:
                 endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${val}&cnt=${cnt}&units=${units}&appid=${APIKEY}`;
                 break;
         }
     }

     // using axios, hopefully this is okay
     const response = await axios.get(endpoint);

     return response.data.list.map(item => item.main.temp);
 }
}
 
