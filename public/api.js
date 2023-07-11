


const postForm =document.getElementById('post-form')
const postNote=async (event)=>{
    event.preventDefault()
    var noteTitle=document.getElementById('post-note-Title').value
    var noteBody=document.getElementById('post-note-Body').value
    var options={
        method:'POST',
        body:JSON.stringify({
            noteTitle:noteTitle,
            noteBody:noteBody
        }),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    }
    await fetch('/note',options)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .then(res=>window.alert('Note Created'))
    .then(error=>console.error('Error: ' +error))
}
postForm.addEventListener('submit',postNote)




const getForm=document.getElementById('get-form')
const getNote= async (event)=>{
    event.preventDefault()
    var noteID=document.getElementById('get-noteID').value
    
    fetch(`/note/${noteID}`)
    .then((response)=>response.json())
    .then(data=>{
        if(!noteID){
            for(var i in data){
                document.getElementById('results').innerHTML+='Title: '+data[i].noteTitle+'<br>'+'Note ID: '+data[i]._id+'<br>'+'Body: '+data[i].noteBody+'<br><br>'
            }
        }else{
            document.getElementById('results').innerHTML+='Title: '+data.noteTitle+'<br>'+'Note ID: '+data._id+'<br>'+'Body: '+data.noteBody+'<br><br>'
        }
    })
}
getForm.addEventListener('submit',getNote)

const deleteForm=document.getElementById('del-form')
const deleteNote=async (event)=>{
    event.preventDefault()
    var noteID=document.getElementById('delete-noteID').value
    const options={
        method:'DELETE',
        body:JSON.stringify({
            noteID:noteID
        }),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    }
    fetch(`/note/${noteID}`,options)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        window.alert('Deleted')
    })
}
deleteForm.addEventListener('submit',deleteNote)


const putForm=document.getElementById('put-form')
const updateForm=async (event)=>{
    event.preventDefault()
    var noteID=document.getElementById('put-noteID').value
    var noteTitle=document.getElementById('put-noteTitle').value
    var noteBody=document.getElementById('put-noteBody').value
    
    var post={
        noteTitle:noteTitle,
        noteBody:noteBody
    }
    const option={
        method:'PATCH',
        headers:new Headers({
            'Content-Type':'application/json'
        }),
        body:JSON.stringify(post)
    }
    await fetch(`/note/${noteID}`,option)
    .then(res=> res.json())
    .then(data=> document.getElementById('results').innerHTML+="Note ID: "+noteID+"<br>"+"Note Title: "+data.noteTitle+"<br>"+"Note Body: "+noteBody)
    
}
putForm.addEventListener('submit',updateForm)