const express = require("express")
const { getallbooks, deletebookController, updatebook, createbookController } = require("../controller/bookController")
const BookRouter=express.Router()


BookRouter.post("/createbook",createbookController)
BookRouter.get("/allbooks",getallbooks)
BookRouter.delete("/delete/:noteId",deletebookController)
BookRouter.patch("/update/:noteId",updatebook)



module.exports=BookRouter