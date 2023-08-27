

const form=document.getElementById('expense-form')
const inputAmount=document.getElementById('amount')
const inputDescription=document.getElementById('description')
const inputCategory=document.getElementById('category')
const list=document.getElementById('expense-list')
const buttonPremium=document.getElementById('premium-button')
const labelPremium=document.getElementById('premium-label')
const buttonShowLeaderboard=document.getElementById('show-leaderboard')
const labelLedarboard=document.getElementById('label-leaderboard')
const listLeaderboard=document.getElementById('leaderboard-list')
const tableYearly=document.getElementById('yearly-table')
const tableMonthly=document.getElementById('monthly-table')
const divPremiumData=document.getElementById('premium-data')
const buttonDownload=document.getElementById('download')
const tableOldFiles=document.getElementById('old-files')
const buttonPrev=document.getElementById('prevButton')
const buttonNext=document.getElementById('nextButton')
const inputPageLimit=document.getElementById('rowsPerPage')

var page=1;


function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

function addItem(obj){
    var data=`Amount :- ${obj.amount}||
         Description:- ${obj.description}||
         Category :- ${obj.category}`

    

    const li=document.createElement('li')
    
    const text=document.createTextNode(data)

    const deleteButton=document.createElement('button')
    

    deleteButton.textContent='Delete'

    li.appendChild(text)
    li.appendChild(deleteButton)


    list.appendChild(li);


    deleteButton.addEventListener('click',event=>{
        const token=localStorage.getItem('token')

        if(token==null)
        window.location.href='../Login/index.html'

        const headers={authorization:token}
        
        axios.get(`http://localhost:3000/Expense/getDeleteExpense/${obj.id}`,{headers})
        .then(result=>{
            console.log(result)
            list.removeChild(li)
        })
        .catch(err=>{
            console.log(err)
        })
        
    })

    
    
}

const addFunction=async event=>{
    event.preventDefault();
    obj={
        amount:inputAmount.value,
        description:inputDescription.value,
        category:inputCategory.value
    }

    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'

    try{
            
            
        const result=await axios.post('http://localhost:3000/Expense/postAddExpense/',obj,{headers:{Authorization:token}})
        
        addItem(result.data)
        inputAmount.value=''
        inputDescription.value=''
        inputCategory.value=''
            
    }
     
    catch(error)
    {
       console.log("Something went wrong")
    }

    
}

function getMaxPage(count,pageLimit){
    const x1=parseInt(count/pageLimit)
    const x2=count/pageLimit;

    if(x2>x1){
        return x1+1;
    }
    else{
        return x1;
    }
}


async function getExpenseByPage(page){
    const token=localStorage.getItem('token')
    clearList();
    if(token==null)
    window.location.href='../Login/index.html'
    
    const pageLimit=localStorage.getItem('pageLimit')
    const headers={authorization:token,pageLimit}
    const result=await axios.get(`http://localhost:3000/Expense/getExpenseByPage/${page}`,{headers})

    const data=result.data.data;
    const count=result.data.count;

    const maxPage=getMaxPage(count,pageLimit)
    for (const product of result.data.data){
        addItem(product)
    }
    if(page==1){
        buttonPrev.style.display='none'
    }
    else if(page==maxPage){
        buttonNext.style.display='none'
    }
    else{
        buttonNext.style.display='block'
        buttonPrev.style.display='block'
    }
   
}
buttonNext.onclick=(event)=>{
    page=page+1;
    getExpenseByPage(page);
}
buttonPrev.onclick=(event)=>{
    page=page-1;
    getExpenseByPage(page)
}
document.addEventListener('DOMContentLoaded',(event)=>{
    buttonPrev.textContent='< Prev Page'
    buttonNext.textContent='Next Page > '
    var pageLimit=localStorage.getItem('pageLimit')
    if(pageLimit==null){
        pageLimit=inputPageLimit.value;
        localStorage.setItem('pageLimit',pageLimit)
    }
    else{
        inputPageLimit.value=pageLimit
    }
    getProducts();
    getExpenseByPage(1);
})

form.onsubmit=addFunction
async function getProducts(){
    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'
    const headers={authorization:token}
    const result=await axios.get('http://localhost:3000/Expense/getExpenses',{headers})
    
    if(result.data.isPremium)
    {
        labelPremium.textContent="Premimum User"
        buttonPremium.style.display = 'none';
        //divPremiumData.style.display='block';
        buttonDownload.style.display='block';

    }
    else{
        buttonShowLeaderboard.style.display='none';
    }
    labelLedarboard.style.display='none'
    if(result.data.isPremium){
            
        for (const product of result.data.expense){
            //addItem(product)
            add2MonthlyTable(new Date(product.createdAt),product.description,product.category,product.amount)
        }
        add2YearlyTable(new Date(result.data.totalExpense.createdAt).getMonth(),result.data.totalExpense.sum)
    
    for(const files of result.data.oldFiles){
        
        add2OldFilesTable(new Date(files.createdAt),files.fileUrl)
    }
}
}



buttonPremium.onclick=async event=>{
    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'
    const headers={authorization:token}
    const result=await axios.get('http://localhost:3000/Purchase/createOrder',{headers})

    const option={
        key:result.data.keyId,
        order_id:result.data.order.id,
        handler:async response=>{
            
            const opt={orderId:response.razorpay_order_id}
            
            axios.post('http://localhost:3000/Purchase/updateTransactionStatus',opt,{headers})
            .then(res=>{
                
                if(res.status==201 || res.status==200)
                {
                    buttonPremium.style.display = 'none';
                    labelPremium.textContent="Premimum User"
                    
                    buttonShowLeaderboard.style.display='Block';
                   
                    alert("Transaction Successfulll")
                }
                else{
                    console.log(res)
                   
                }
                    
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const rzp=new Razorpay(option)
    rzp.open();

    rzp.on('payment.failed',(err)=>{
        const opt={orderId:response.razorpay_order_id}
            
        axios.post('http://localhost:3000/Purchase/updateTransactionStatus',opt,{headers})
        .then(res=>{
            alert("Transaction Failed")
        })
        .catch(err=>{
            console.log(err)
        })
    })

}

function addLeaderboardItems(obj){
    var data=`Name :- ${obj.name} || Total Expense :- ${obj.sum}`
    
    const li=document.createElement('li')
    li.appendChild(document.createTextNode(data))

    listLeaderboard.appendChild(li)
}

buttonShowLeaderboard.onclick=async event=>{
    const token=localStorage.getItem('token')
    //buttonShowLeaderboard.disabled=true;
    if(token==null)
    window.location.href='../Login/index.html'
    const headers={authorization:token}
    const result=await axios.get('http://localhost:3000/Premium/showLeaderboard',{headers})
    
    labelLedarboard.style.display='Block'
    //listLeaderboard.remove(listLeaderboard.children)
    
    while(listLeaderboard.firstChild){
        
        listLeaderboard.removeChild(listLeaderboard.firstChild)
    }
    
    
    if(result.data){
        result.data.forEach(obj => {
            addLeaderboardItems(obj)
        });
    }


}   


function add2MonthlyTable(date,description,category,expense){
    const tr=document.createElement('tr')
    const td1=document.createElement('td')
    const td2=document.createElement('td')
    const td3=document.createElement('td')
    const td4=document.createElement('td')

    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    td1.textContent=formattedDate;
    td2.textContent=description;
    td3.textContent=category;
    td4.textContent=expense;

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)

    tableMonthly.appendChild(tr)
    
    
}

function add2YearlyTable(month,expense){
    const tr=document.createElement('tr')
    const td1=document.createElement('td')
    const td2=document.createElement('td')
    const m=['January','Febraury','March','April','May','June','July','August','September','October','November','December']

    
    

    td1.textContent=m[month];
    td2.textContent=expense;
   
    

    tr.appendChild(td1)
    tr.appendChild(td2)
    

    tableYearly.appendChild(tr)
    
    
}
function add2OldFilesTable(date,link){
    const tr=document.createElement('tr')
    const td1=document.createElement('td')
    const td2=document.createElement('td')
    
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    
    
    td1.textContent=formattedDate;
    
    const button=document.createElement('button')
    button.textContent='Download'
    td2.appendChild(button);

    button.onclick=(event)=>{
        const a=document.createElement('a')
        a.href=link;
        a.download='Expense.csv'
        a.click();
    }
    
    
    
    
    

    tr.appendChild(td1)
    tr.appendChild(td2)
    

    tableOldFiles.appendChild(tr)
    
    
}


buttonDownload.onclick=async event=>{

    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'
    const headers={authorization:token}
    try
    {
        const result=await axios.get('http://localhost:3000/User/download',{headers})
        console.log(result)
        const aelement=document.createElement('a')
        aelement.href=result.data.fileUrl;
        aelement.download=encodeURIComponent('Expense.csv')
        aelement.click();
    }catch(err){
        console.log(err.response.data)
    }
}


inputPageLimit.onchange=event=>{
    localStorage.setItem('pageLimit',inputPageLimit.value)
}