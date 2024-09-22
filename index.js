const express = require("express")
const app = express()

app.get("/",(req,res)=> {
    res.send(`Femi Blog`)
})

const start = (req,res)=> {
    try {
    app.listen(3000,()=>{
        console.log(`app is listening on port 3000`)
    })}catch(error) {
        res.send(error)
    }
}

start()

