

/** 
fetch('http://localhost:8080/employee',{
    method : "GET",
    mode: 'cors'
})
  .then(function(response) {
    console.log(response.type);
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    document.getElementById("root").innerHTML="Age: "+myJson[0].age;
  });

console.log("hello");*/

document.getElementsByClassName("nav-button")[0].addEventListener("click", async()=>{
    document.getElementById("table-title").innerHTML="Loading...";
    waiting();
})




let employees;
function waiting(){
    
    let tableString="";
    let fetchApi= new Promise(fetchEmployee);
    fetchApi.then(()=>{
        let count=1;
       employees.forEach(employee =>{
        if (count%2==0){
            tableString+=`<tr class="even"><td>${employee.id}</td><td>${employee.name}</td><td>${employee.age}</td></tr>`;
        }else {
            tableString+=`<tr class="odd"><td>${employee.id}</td><td>${employee.name}</td><td>${employee.age}</td></tr>`;
        }
        count++  
        });
        return "Table created";
    })
    .then( ()=>{
        tableString= "<table>" + tableString + "</table>";
        document.getElementById("table-title").innerHTML="Employee List";
        document.getElementById("table-container").innerHTML=tableString;
    });
}

function fetchEmployee(resolve, reject){
    fetch('http://localhost:8080/employee',{
        method : "GET",
        mode: 'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        employees= myJson;
        resolve("Fetch finish.");
    });
}


//____________________________________________________________


document.getElementsByClassName("nav-button")[1].addEventListener("click", async()=>{
    document.getElementById("table-title").innerHTML="Loading...";
    waiting2();
})

let customers;
function waiting2(){
    
    let tableString="";
    let fetchApi= new Promise(fetchCustomer);
    fetchApi.then(()=>{
        let count=1;
       customers.forEach(customer =>{
        if (count%2==0){
            tableString+=`<tr class="even"><td>${customer.id}</td><td>${customer.name}</td><td>${customer.age}</td></tr>`;
        }else {
            tableString+=`<tr class="odd"><td>${customer.id}</td><td>${customer.name}</td><td>${customer.age}</td></tr>`;
        }
        count++  
        });
        return "Table created";
    })
    .then( ()=>{
        tableString= "<table>" + tableString + "</table>";
        document.getElementById("table-title").innerHTML="Customer List";
        document.getElementById("table-container").innerHTML=tableString;
    });
}

function fetchCustomer(resolve, reject){
    fetch('http://localhost:8080/customer',{
        method : "GET",
        mode: 'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        customers= myJson;
        resolve("Fetch finish.");
    });
}
