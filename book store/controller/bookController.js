const bookModel = require("../model/bookModel")

const createbookController=async (req,res)=>{

    const {title,isbn,author,price,description}=req.body
    try {
        await bookModel.create({title,isbn,author,price,description,userId:req.user?._id})
        res.status(200).json({message:"book created"})
    } catch (error) {
        res.status(404).json({message:error})
    }
}

const deletebookController = async (req, res) => {
    const { noteId } = req.params;
    const userId = req.user?._id;
    if (!noteId) {
        return res.status(400).json({ message: "movie ID is required" });
    }
    try {
        const bookdata = await bookModel.findOne({ _id: noteId, userId: userId });
        if (!bookdata) {
            return res.status(404).json({ message: "book not found" });
        }
        await bookModel.findByIdAndDelete(noteId);
        res.status(200).json({ message: "book deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });  
    }
};

const updatebook=async(req,res)=>{
    const { noteId } = req.params;
    const userId = req.user?._id;
    if (!noteId) {
        return res.status(400).json({ message: "Note ID is required" });
    }
    try {
        const bookdata = await bookModel.findOne({ _id: noteId, userId: userId });
        if (!bookdata) {
            return res.status(404).json({ message: "book not found" });
        }
        await bookModel.findByIdAndUpdate(noteId,{...req.body});
        res.status(200).json({ message: "book updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });  
    }
}

const getallbooks=async(req,res)=>{
   
    try {
        const bookdata=await bookModel.find()
        if(!bookdata || bookdata.length==0){
            return res.status(400).json({ message: "Note Not Found" });
        }
        res.status(200).json({message:"book Fetched Successfully",bookdata});
    } catch (error) {
        return res.status(400).json({ message: error.message }); 
    }
}






module.exports={createbookController,deletebookController,updatebook,getallbooks}