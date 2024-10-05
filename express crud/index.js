const express=require("express")
const fs=require("fs")
const cors=require("cors")
const { stringify } = require("querystring")

const app=express()

app.use(cors())
app.use(express.json())

app.get("/getproduct",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
    
})

app.post("/addproduct",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            const newdata=JSON.parse(data)
            newdata.push(req.body)
            fs.writeFile("./db.json",JSON.stringify(newdata),(err)=>{
                if(err)
                {
                    res.send(err)
                }
                else{
                    res.send("product add")
                
                }
                
            })
            
        }
    })
})



app.patch("/editprice/:id",(req,res)=>{
    const {id}=req.params;
    
    fs.readFile("./db.json","utf-8",(err,data)=>{

        if(err)
        {
            res.send(err)
        }
        else{
            const newdata=JSON.parse(data)
            const index=newdata.findIndex((el)=>el.id==id)
            if(index != -1)
            {
                newdata[index]={...newdata[index], ...req.body};
                fs.readFile("./db.json",JSON>stringify(newdata),(err)=>{
                    if(err)
                    {
                        res.send(err)
                    }
                    else{
                        res.send("p upadate")
                    }
                })
            }
            else{
                res.send("product not found")
            }
            
        }
    })
})


app.listen(8080,()=>{
    console.log("Server Is Running On Port 8080")
})