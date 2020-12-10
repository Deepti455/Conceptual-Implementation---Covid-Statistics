const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')

app.get("/totalRecovered",async(req,res)=>{
    const allData=await connection.find();
    let sum=0;
    allData.forEach((data)=>{
        sum+=data.recovered;
    });
    res.send({data: {_id: "total", recovered:sum}});
});

app.get("/totalActive",async(req,res)=>{
    const allData=await connection.find();
    let infected=0;
    let recovered=0;
    allData.forEach((data)=>{
        infected+=data.infected;
        recovered+=data.recovered;
    });
    res.send({data: {_id: "total", active:infected-recovered}});
});

app.get("/totalDeath",async(req,res)=>{
    const allData=await connection.find();
    let death=0;
    allData.forEach((data)=>{
        death+=data.death;
    });
    res.send({data: {_id: "total", death: death}});
});

app.get("/hotspotStates",async(req,res)=>{
    const allData=await connection.find();
    let hostspot=0;
    let myres=[];
    allData.forEach((data)=>{
        hotspot=((data.infected - data.recovered)/data.infected)
        if(hotspot>0.1)
            myres.push({state: data.state, rate: hotspot});  
    });
    res.send({data: myres});
});

app.get("/healtytStates",async(req,res)=>{
    const allData=await connection.find();
    let healty=0;
    let myres=[];
    allData.forEach((data)=>{
        healty=(death/infected).
        if(healty<0.005)
            // roundVal={$round: [ "$healty", 5 ]}
            myres.push({state: data.state, mortality: healty});  
    });
    res.send({data: myres});
});









app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;