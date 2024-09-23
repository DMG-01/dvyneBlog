const express = require("express")
const connectDB = require("./db/connect")
require("dotenv").config()
const app = express()

const blogsRoute = require("./routes/blog")
const adminRoute = require("./routes/adminRoute")


app.use(express.json())

app.get("/",(req,res)=> {
    res.send(`Femi Blog`)
})

app.use("/api/v1/blog",blogsRoute)
app.use("/api/v1/admin",adminRoute)

const start = async (req,res)=> {
    try {
    await connectDB(process.env.MONGO_URI)
    app.listen(3000,()=>{
        console.log(`app is listening on port 3000`)
    })}
    catch(error) {
        res.send(error)
    }
}

start()

