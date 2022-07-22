let tableString;
let url;
let checkboxString='<input type="checkbox" class="deleteCheckbox" >';
let deleteButtonString=`<button class="fa-solid fa-trash-can"></button>`;
let editButtonString=`<button class="fa-regular fa-pen-to-square listButton"></buton>`;

document.getElementsByClassName("nav-button")[0].addEventListener("click", async()=>{
    document.getElementById("table-title").innerHTML="Loading..."+`<i class="fa-solid fa-cog fa-spin"></i>`;
    url='http://localhost:8080/employee';
    let x = await new Promise( generateCustomerTable );
    document.getElementById("table-title").innerHTML="Employee List";
    document.getElementById("table-container").innerHTML=tableString;
})

document.getElementsByClassName("nav-button")[1].addEventListener("click", async()=>{
    document.getElementById("table-title").innerHTML="Loading..."+`<i class="fa-solid fa-cog fa-spin"></i>`;
    url='http://localhost:8080/customer';
    let x = await new Promise( generateCustomerTable );
    document.getElementById("table-title").innerHTML="Customer List";
    document.getElementById("table-container").innerHTML=tableString;
})

async function generateCustomerTable(resolve, reject){
    tableString="";
    await fetch(url,{
        method : "GET",
        mode: 'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        return myJson
    })
    .then( (customers) =>{
        let count=1;
        
        tableString="<thead><tr><th>Action</th><th>Id</th><th>Name</th><th>Age</th></tr></thead>"
        customers.forEach(customer =>{
        checkboxString=`<input type="checkbox" class="deleteCheckbox listButton" value="${customer.id}">`;
        deleteButtonString=`<button class="fa-solid fa-trash-can listButton" value="${customer.id}"></button>`;
        editButtonString=`<button class="fa-regular fa-pen-to-square listButton" value="${customer.id}"></button>`;
        if (count%2==0){
            tableString+=`<tr class="even"><td class="actionList"><div class="buttonList">${checkboxString}${deleteButtonString}${editButtonString}</div></td><td>${customer.id}</td><td>${customer.name}</td><td>${customer.age}</td></tr>`;
        }else {
            tableString+=`<tr class="odd"><td class="actionList"><div class="buttonList">${checkboxString}${deleteButtonString}${editButtonString}</div></td><td>${customer.id}</td><td>${customer.name}</td><td>${customer.age}</td></tr>`;
        }
        count++  
    });
    
    tableString= "<table>" + tableString + "</table>";
    });

    resolve("fetch done");
}


