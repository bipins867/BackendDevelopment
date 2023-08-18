const addButton=document.getElementById('addButton')
const inputName=document.getElementById('name')
const inputDescription=document.getElementById('description')
const inputPrice=document.getElementById("price")
const inputQuantity=document.getElementById('quantity')

const list=document.getElementById('productList')

function buyProduct(id,n,li){
    
    const obj={quantity:n}
    axios.post(`http://localhost:3000/buyProduct/${id}`,obj)
    .then(result=>{
        const obj=result.data
        var data=`Name :- ${obj.name}||
         Description:- ${obj.description}||
         Price:- ${obj.price}||
         Quantity :- ${obj.quantity}`
        li.childNodes[0].nodeValue=data
        //addItem(result.data)
    })
    .catch(err=>{
        console.log("Out of Stock")
    })
}

function addItem(obj){
    var data=`Name :- ${obj.name}||
         Description:- ${obj.description}||
         Price:- ${obj.price}||
         Quantity :- ${obj.quantity}`

    

    const li=document.createElement('li')
    
    const text=document.createTextNode(data)

    const editButton=document.createElement('button')
    const buy1Button=document.createElement('button')
    const buy2Button=document.createElement('button')
    const buy3Button=document.createElement('button')

    editButton.textContent='Edit'
    buy1Button.textContent='Buy 1'
    buy2Button.textContent='Buy 2'
    buy3Button.textContent='Buy 3'

    li.appendChild(text)
    li.appendChild(editButton)
    li.appendChild(buy1Button)
    li.appendChild(buy2Button)
    li.appendChild(buy3Button)
    list.appendChild(li);


    editButton.addEventListener('click',event=>{
        list.removeChild(li)
        
        inputName.value=obj.name;
        inputDescription.value=obj.description;
        inputPrice.value=obj.price;
        inputQuantity.value=obj.quantity;
        
        
        addButton.onclick=event=>{
    
            nobj={
                name:inputName.value,
                description:inputDescription.value,
                price:inputPrice.value,
                quantity:inputQuantity.value
            }
            axios.post(`http://localhost:3000/editProduct/${obj.id}`,nobj)
            .then(result=>{
                
                addItem(result.data)
                inputName.value=''
                inputDescription.value=''
                inputPrice.value=''
                inputQuantity.value=''
                addButton.textContent='Add Product'
             })
            .catch(err=>console.log(err))
            
        }
        addButton.textContent='Update Product'
    })

    buy1Button.onclick=event=>buyProduct(obj.id,1,li)
    buy2Button.onclick=event=>buyProduct(obj.id,2,li)
    buy3Button.onclick=event=>buyProduct(obj.id,3,li)
    
}

addButton.onclick=event=>{
    
    obj={
        name:inputName.value,
        description:inputDescription.value,
        price:inputPrice.value,
        quantity:inputQuantity.value
    }
    
    axios.post('http://localhost:3000/addProduct/',obj)
    .then(result=>{
       
        addItem(result.data)
        inputName.value=''
        inputDescription.value=''
        inputPrice.value=''
        inputQuantity.value=''
    })
    .catch(err=>console.log(err))

    
}


async function getProducts(){

    const result=await axios.get('http://localhost:3000/getProducts')
    
    for (const product of result.data){
        addItem(product)
    }
}
getProducts();