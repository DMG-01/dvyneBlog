const express = require("express")
const connectDB = require("./db/connect")
require("dotenv").config()
const app = express()

const blogsRoute = require("./routes/blog")
const adminRoute = require("./routes/adminRoute")
const authRoute = require("./routes/auth")


app.use(express.json())

app.get("/",(req,res)=> {
    res.send(`Femi Blog`)
})

app.use("/api/v1/blog",blogsRoute)
app.use("/api/v1/admin",adminRoute)
app.use("/api/v1/auth",authRoute)

const start = async (req,res)=> {
    try {
    await connectDB(process.env.MONGO_URI)
    app.listen(3000,()=>{
        console.log(`app is listening on port 3000`)
    })}
    catch(error) {
      console.log(error)
    }
}

start()

