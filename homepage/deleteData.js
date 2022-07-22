const deleteBtn = document.getElementById("deleteBtn");

let pathVar="";
deleteBtn.addEventListener("click", async()=>{
    console.log(document.getElementsByClassName("fa-trash-can")[0].value);
    let checkBoxList = document.getElementsByClassName("deleteCheckbox");
    let idList=[];
    for (let i=0; i<checkBoxList.length; i++){
        if (checkBoxList[i].checked){
            idList.push(checkBoxList[i].value)
            console.log(checkBoxList[i].value);
        }
    }

    if (idList.length>=1){
        pathVar="";
        for (let i=0; i<idList.length; i++){
            pathVar+=idList[i]+",";
        }
        pathVar=pathVar.slice(0, -1);

        let apiPromise = await new Promise(deleteOnDb);
    }
    
});


async function deleteOnDb(resolve, reject){

    await fetch(`http://localhost:8080/employee/delete/id/${pathVar}`)
    .then(response =>{
        console.log(response.status);
    });

    resolve("done");
}