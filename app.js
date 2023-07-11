const express= require('express')
const app= express()
const mongoose=require('mongoose')


const DATABASE_URL=process.env.DATABASE_URL || 'mongodb://localhost:27017/MERN'
const PORT=process.env.PORT || 9000

const Note=require('./models/notes.js')

const getNote=require('./middleware/getNote.js')

app.use(express.json())
app.use(express.static('public'))


mongoose.connect(DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=> console.log(error))
db.once('open',()=> console.log('connected to db'))

app.get('/note',async (req,res)=>{
    try{
        const note= await Note.find();
        res.json(note)
    }catch{
        res.status(404).json({
            message:"Note not found"
        })
    }
    

})

app.get('/note/:id',getNote, async (req,res)=>{
  res.json(res.note)
})


app.post("/note" ,async (req, res) => {
    const note=new Note({
        noteTitle:req.body.noteTitle,
        noteBody:req.body.noteBody
    })
    try {
      const newNote = await note.save();
      res.status(201).json(newNote);
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    } 
  })

app.patch('/note/:id',getNote,async (req,res)=>{
  if(req.body.noteTitle !=null){
    res.note.noteTitle=req.body.noteTitle
  }
  if(req.body.noteBody !=null){
    res.note.noteBody=req.body.noteBody
  }
  try {
    const updatedNote = await res.note.save();
    res.status(201).json(updatedNote);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  } 
})

app.delete('/note/:id',getNote, async(req,res)=>{
  try{
    await Note.deleteOne(res.note)
    res.json({
      message:'Deleted'
    })
  }catch(err){
    res.status(500).json({
      message:'Could not delete'
    })
  }
})
app.listen(PORT,()=>{
    console.log(`App is listening to port : ${PORT}`)
})