
var ulist=document.getElementById('expenseList')
var amountField=document.getElementById('amount')
var descField=document.getElementById('description')
var catField=document.getElementById('category')
var btnAddProduct=document.getElementById('addExpense')


function addItemtoList(id,amount,desc,cat){
    
    var li=document.createElement('li')
    li.className="list-group-item"

    var amoutEl=document.createElement('span')
    amoutEl.className='mr-2'
    amoutEl.textContent='Amount: $'+amount
    
    var descEl=document.createElement('span')
    descEl.className='mr-2'
    descEl.textContent='Description :'+desc;

    var catEl=document.createElement('span')
    catEl.className='mr-2'
    catEl.textContent='Category :'+cat;


    var btnDel=document.createElement('button')
    btnDel.className="btn btn-danger btn-sm"
    btnDel.textContent='Delete'

    var btnEdit=document.createElement('button')
    btnEdit.className='btn btn-info btn-sm'
    btnEdit.textContent='Edit'

    li.appendChild(amoutEl)
    li.appendChild(descEl)
    li.appendChild(catEl)
    li.appendChild(btnDel)
    li.appendChild(btnEdit)
    
    ulist.appendChild(li);

    
    btnDel.addEventListener('click',function(event){
        ulist.removeChild(li);
        axios.get(`http://localhost:3000/delete-product/${id}`)
        .then(result=>{
            console.log("Product DELETED")
        })
        .catch(err=>console.log(err))
        
    })

    btnEdit.addEventListener('click',function(event){
        
        ulist.removeChild(li);
       
        amountField.value=amount;
        descField.value=desc;
        catField.value=cat;
        btnAddProduct.onclick=event=>{
    
            const nobj={
                amount:amountField.value,
                description:descField.value,
                category:catField.value
            }
           
            axios.post(`http://localhost:3000/edit-product/${id}`,nobj)
            .then(result=>{
                result=result.data
                addItemtoList(result.id,result.amount,result.description,result.category);
                amountField.value=''
                descField.value=''
                catField.value=''
            })
            .catch(err=>console.log(err))
            
        }
    })
    
}


btnAddProduct.onclick=event=>{
    
    
    event.preventDefault();
    amount=amountField.value;
    desc=descField.value;
    cat=catField.value;
    
    obj={amount:amount,description:desc,category:cat}
  
    axios.post('http://localhost:3000/add-product',obj)
    .then(result=>{
        result=result.data
        addItemtoList(result.id,result.amount,result.description,result.category);
        
        amountField.value=''
        descField.value=''
        catField.value=''
    })
    .catch(err=>{
        console.log(err)
    })

    
}


async function getProduct(){
    const products=await axios.get('http://localhost:3000/get-product')

    for(const result of products.data){
        addItemtoList(result.id,result.amount,result.description,result.category);
    
    }
}

getProduct()