const express = require("express")
const app = express()

const blogsRoute = require("./routes/blog")
const adminRoute = require("./routes/adminRoute")


app.use(express.json())

app.get("/",(req,res)=> {
    res.send(`Femi Blog`)
})

app.use("/api/v1/blog",blogsRoute)
app.use("/api/v1/admin",adminRoute)

const start = (req,res)=> {
    try {
    app.listen(3000,()=>{
        console.log(`app is listening on port 3000`)
    })}catch(error) {
        res.send(error)
    }
}

start()

