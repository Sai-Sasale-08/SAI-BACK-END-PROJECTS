const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.end("This Home page")
    }
    else if (req.url == '/about') {
        res.end("This is about page")
    }
    else if (req.url == '/contact') {
        res.end("This is contact page")
    }
    else if (req.url == '/getproduct') {
        fs.readFile("./db.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                res.end()
            }
            else {
                const productdata = JSON.parse(data)
                console.log(productdata)
                res.end(JSON.stringify(productdata.product))
            }
        })
    }
    else if (req.url == '/getcustomer') {
        fs.readFile("./db.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                res.end()
            }
            else {
                const customerdata = JSON.parse(data)
                res.end(JSON.stringify(customerdata.customer))
            }
        })
    }
    else if (req.url == '/adddata' && req.method == "POST") {
        let str = "";
        req.on('data', (chunk) => {
            str = str + chunk;
        })
        req.on('close', () => {
            fs.readFile('./db.json','utf-8',(err,data)=>{
                if(err){
                    res.end(err)
                }
                else{
                    const newdata = JSON.parse(data)
                    newdata.product.push(JSON.parse(str))
                    fs.writeFile('./db.json',JSON.stringify(newdata),(err)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.end("Data added successfully")
                            }
                            })
                }
            })
            fs.readFile('./db.json', 'utf-8', (err, data) => {
                if (err) {
                    res.end(err)
                }
                else {
                    const newdata = JSON.parse(data)
                    newdata.customer.push(JSON.parse(str))
                    fs.writeFile('db.json', JSON.stringify(newdata), (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.end("Data added successfully")
                        }
                    })
                }
            })
        })
        res.end()
    }
    else {
        res.end("This Page in not Found 404")
    }
})

server.listen(8080, () => {
    console.log("server is running on port 8080")
})