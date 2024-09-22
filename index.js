const express = require("express")
const app = express()

const blogs = require("./routes/blog")

app.use(express.json())

app.get("/",(req,res)=> {
    res.send(`Femi Blog`)
})

app.use("/api/v1/blog",blogs)

const start = (req,res)=> {
    try {
    app.listen(3000,()=>{
        console.log(`app is listening on port 3000`)
    })}catch(error) {
        res.send(error)
    }
}

start()

