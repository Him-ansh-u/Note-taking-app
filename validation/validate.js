const validate=(req,res)=>{
    if(!req.body.noteTitle ){
        res.status(400).send('Invalid inputs')
        return
    }
    if(!req.body.noteBody ){
        res.status(400).send('Invalid inputs')
        return
    }
}

module.exports=validate