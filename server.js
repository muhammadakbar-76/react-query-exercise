const express = require("express");
const app = express();
const cors = require("cors");

const favLangs = ["javascript","typescript","C#","Kotlin"];

app.use(express.json());

app.use(cors({
    origin: "*"
}))

app.get('/api/get-records',(req,res) => {
    return res.json({lang: favLangs});
})

app.post("/api/create-record", (req,res) => {
    const record = req.body.record;
    favLangs.push(record);
    return res.json({status: "OK"});
});

app.listen(3001, () => {
    console.log("server started on 3001");
})