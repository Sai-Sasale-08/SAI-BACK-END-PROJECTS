const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const connection=require("./db")
const BookRouter = require("./routes/bookRoutes")
dotenv.config()
const app=express()


app.use(cors(
    {
        origin: ['http://localhost:3000','http://localhost:5173','http://localhost:5174'], // frontend origin
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      }
))
app.use(express.json())
app.use("/book",BookRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(".....Connected To DB.....")
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
})


