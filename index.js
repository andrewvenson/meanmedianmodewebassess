const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const {dataSet} = require("./input.js");
const {mean, median, mode} = require("./helperfuncs.js");

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

app.listen(port, () => console.log(`Server started on port ${port}!`));
