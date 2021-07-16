const axios = require("axios");
require("dotenv").config();

// exported module in obj format for scalability
module.exports = {
    dataSet: async () => {
        // original arr being tested in Part #1 of assessment
        // let data = [4, 7, 12, 3, 2, 4, 8, 9, 10];

        // Part #2 open weather Lafayette call
        const APIKEY = process.env.APIKEY;
        // Lafayette geo coordinates
        const lat = "30.2240897";
        const lon = "-92.01984270000003";
        // data points to be removed
        const part = "current,minutely,hourly,alerts";
        // imperial = fahrenheit
        const units = "imperial";

        // One call api
        const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=${units}&appid=${APIKEY}`;

        // using axios, hopefully this is okay
        const response = await axios.get(endpoint);
        return response.data.daily.slice(0,3).map(item => item.temp.day);
    }
}

