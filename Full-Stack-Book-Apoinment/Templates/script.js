const btn=document.getElementById('button')
const name=document.getElementById('name')
const phone=document.getElementById('phone')
const email=document.getElementById('email')



function addItem(obj){
    var data=`${obj.name}|${obj.email}|${obj.phone}`
    
    
    const list=document.getElementById('list')

    const li=document.createElement('li')
    const text=document.createTextNode(data)

    const editButton=document.createElement('button')
    const deleteButton=document.createElement('button')

    editButton.textContent='Edit'
    deleteButton.textContent='Delete'

    li.appendChild(text)
    li.appendChild(editButton)
    li.appendChild(deleteButton)
    list.appendChild(li);


    editButton.addEventListener('click',event=>{
        list.removeChild(li)
        
        name.value=obj.name;
        email.value=obj.email;
        phone.value=obj.phone;

        btn.onclick=event=>{
    
            const nobj={name:name.value,phone:phone.value,email:email.value}
           
            axios.post(`http://localhost:3000/user/edit-user/${obj.id}`,nobj)
            .then(result=>{
                console.log(result)
                addItem(result.data)
                name.value=''
                phone.value=''
                email.value=''
            })
            .catch(err=>console.log(err))
            
        }
    })

    deleteButton.addEventListener('click',event=>{
        list.removeChild(li)
        axios.get(`http://localhost:3000/user/delete-user/${obj.id}`)
        .then(result=>{
            console.log("USER DELETED")
        })
        .catch(err=>console.log(err))
    })
}

btn.onclick=event=>{
    
    obj={name:name.value,phone:phone.value,email:email.value}
    
    axios.post('http://localhost:3000/user/add-user/',obj)
    .then(result=>{
       
        addItem(result.data)
        name.value=''
        phone.value=''
        email.value=''
        })
    .catch(err=>console.log(err))

    
}


async function getUsers(){

    const result=await axios.get('http://localhost:3000/user/get-user')
    
    for (const user of result.data){
        addItem(user)
    }
}
getUsers();