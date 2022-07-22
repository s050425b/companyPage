const submitBtn= document.getElementById("submitBtn");
const inputBox= document.getElementById("inputBox");
const dropList=document.getElementById("searchDrop");
let checkboxString1='<input type="checkbox" class="deleteCheckbox" >';
let deleteButtonString1=`<button class="fa-solid fa-trash-can"></button>`;
let editButtonString1=`<button class="fa-regular fa-pen-to-square listButton"></buton>`;
let searchUrl;
let tableString1;

submitBtn.addEventListener("click" , async()=>{
    let target;
    let targetName;
    if (document.getElementById("table-title").innerHTML=="Customer List"){
        target="customer";
        targetName="Customer";
    } else {
        target ="employee";
        targetName="Employee"
    }
    let inputValue=inputBox.value.trim();
    if (inputValue==null || inputValue==""){
        searchUrl="http://localhost:8080/"+target;
    }else {
        searchUrl="http://localhost:8080/"+ target + "/" + dropList.value + "/" + inputValue;
    }
    document.getElementById("table-title").innerHTML="Loading..."+`<i class="fa-solid fa-cog fa-spin"></i>`;
    console.log(searchUrl);
    let x = await new Promise(searchDB);
    document.getElementById("table-title").innerHTML=targetName+ " List";
    document.getElementById("table-container").innerHTML=tableString1;
});

async function searchDB(resolve, reject){
    await fetch(searchUrl)
    .then( (response) =>{
        return response.json();
    })
    .then( (customers)=>{
        tableString1="<thead><tr><th>Action</th><th>Id</th><th>Name</th><th>Age</th></tr></thead>";
        console.log(customers.status)
        if (customers.status==400){
            tableString1= "<table>" + tableString1 + "</table>";
            return ;
        }

        let count=1;
        customers.forEach(customer =>{
            checkboxString1=`<input type="checkbox" class="deleteCheckbox listButton" value="${customer.id}">`;
            deleteButtonString1=`<button class="fa-solid fa-trash-can listButton" value="${customer.id}"></button>`;
            editButtonString1=`<button class="fa-regular fa-pen-to-square listButton" value="${customer.id}"></button>`;
            if (count%2==0){
                tableString1+=`<tr class="even"><td class="actionList">${checkboxString1}${deleteButtonString1}${editButtonString1}</td><td>${customer.id}</td><td>${customer.name}</td><td>${customer.age}</td></tr>`;
            }else {
                tableString1+=`<tr class="odd"><td class="actionList">${checkboxString1}${deleteButtonString1}${editButtonString1}</td><td>${customer.id}</td><td>${customer.name}</td><td>${customer.age}</td></tr>`;
            }
            count++  
        });
    
        tableString1= "<table>" + tableString1 + "</table>";
    });
    resolve("success");
}

