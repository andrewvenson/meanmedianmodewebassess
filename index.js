const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const {dataSet, locationInfo} = require("./input.js");
const {mean, median, mode} = require("./helperfuncs.js");

require("dotenv").config();

//enables cross origin on all requests - if in production would set cors options to specify ip/host that would be allowed to make requests to current server
app.use(cors());

app.get("/", async (req, res) => {
    // awaiting data from dataset input function due to this being an asynchronous func
    // by default grabs Lafayette temps
    const data = await dataSet();

    //initially sort dataset to prevent further sorting operations within helper funcs
    const input = await data.sort((a,b) => a-b);

    let dataObj = {
        mean: mean(input),
        median: median(input),
        mode: mode(input)
    };

    // return json object Part #3A
    res.json(dataObj);
});

// route for changing data
app.get("/location", async (req, res) => {
    // by default grabs Lafayette temps
    let data;
    const type = req.query.type;
    const val = req.query.val;

    const {name, country, coord: {lat, lon}} = await locationInfo(type,val);

    // awaiting data from dataset input function due to this being an asynchronous func
    if(typeof type !== 'undefined' && typeof val !== 'undefined'){
        // pass dynamic data to dataset
        data = await dataSet(type, val);
    }else{
        data = await dataSet();
    }

    //initially sort dataset to prevent further sorting operations within helper funcs
    const input = await data.sort((a,b) => a-b);

    let dataObj = {
        mean: mean(input),
        median: median(input),
        mode: mode(input),
        city: name,
        coord: `${lat}, ${lon}`,
        country: country
    };

    // return json object Part #3A
    res.json(dataObj);
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
