let data;

//Add collapse to table
document.getElementById("collapse").addEventListener('click', () => {
    let collapsible = document.getElementById("collapseContent");
    if (collapsible.hidden){
        collapsible.removeAttribute("hidden");
        document.getElementById("collapse").innerHTML = `&#x25B2`;

    }else {
        collapsible.hidden = true;
        document.getElementById("collapse").innerHTML = "&#x25BC";

    }

})

//Sort all tasks and update status
async function updateData(){
    //Get all task elements
    for(let i = 0; i < Object.keys(data.Tasks).length; i++){
        //Order tasks
        for(let j = 0; j < Object.keys(data.Tasks).length; j++){
        //Get tasks
        let firstData = data.Tasks[Object.keys(data.Tasks)[i]];
        let secondData = data.Tasks[Object.keys(data.Tasks)[j]];
        
        //Check ordering of tasks
        firstDay = firstData.Date.slice(3, 5);
        firstMonth = firstData.Date.slice(0, 2);
        firstYear = firstData.Date.slice(6, 10);

        secondDay = secondData.Date.slice(3, 5);
        secondMonth = secondData.Date.slice(0, 2);
        secondYear =  secondData.Date.slice(6, 10);

        //Set positions
        if (firstYear < secondYear){
            let temp = firstData;
            data.Tasks[Object.keys(data.Tasks)[i]] = data.Tasks[Object.keys(data.Tasks)[j]];
            data.Tasks[Object.keys(data.Tasks)[j]] = temp;

        }else{
            if ((firstYear == secondYear) && (firstMonth < secondMonth)){
                let temp = firstData;
                data.Tasks[Object.keys(data.Tasks)[i]] = data.Tasks[Object.keys(data.Tasks)[j]];
                data.Tasks[Object.keys(data.Tasks)[j]] = temp;
            }else{
                if ((firstYear == secondYear) && (firstMonth == secondMonth) && (firstDay < secondDay)){
                    let temp = firstData;
                    data.Tasks[Object.keys(data.Tasks)[i]] = data.Tasks[Object.keys(data.Tasks)[j]];
                    data.Tasks[Object.keys(data.Tasks)[j]] = temp;

                }

            }

        }

        }
    }

}

//Add tasks to table
function createCells(){
    //Get all task elements
    for(let i = 0; i < Object.keys(data.Tasks).length; i++){
        let currentData = data.Tasks[Object.keys(data.Tasks)[i]];
        let table = document.getElementById("allTasks");
        let row = document.createElement("tr");
        table.append(row);

        //Create the table elements and add them to the table
            //Task name
            let name = document.createElement("td");
            name.textContent = currentData.Name;
            row.appendChild(name);

            //Task description
            let description = document.createElement("td");
            description.textContent = currentData.Description;
            row.appendChild(description);

            //Task date
            let date = document.createElement("td");
            date.textContent = currentData.Date;
            row.appendChild(date);

            //Task completed?
            let completed = document.createElement("td");
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = (currentData.Completed === true);
            checkBox.className = "checkBox";
            completed.appendChild(checkBox);
            row.appendChild(completed);

            //Delete task
            let deleteHolder = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.id = "deleteButton";
            deleteButton.addEventListener('click', () => {
                //Remove table row
                table.removeChild(row);

                //Check for the correct element in the data
                for(let j = 0; j < Object.keys(data.Tasks).length; j++){
                    if (data.Tasks[Object.keys(data.Tasks)[j]] == currentData)
                    delete data.Tasks[Object.keys(data.Tasks)[j]];

                }
                
                //Update data
                ipcRenderer.invoke("update-data", data);

            })
            deleteHolder.appendChild(deleteButton);
            row.appendChild(deleteHolder);

            //Add listener to update status on goal
            checkBox.addEventListener('change', () => {
                ipcRenderer.invoke("update-task", [i, checkBox.checked]);
            })
    }
}

//Add task creation event
document.getElementById("create-new-task").addEventListener('click', () => {
    ipcRenderer.invoke("go-to-task-creation");
})

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    await updateData();
    createCells();
    
}

//Call get data
getData();