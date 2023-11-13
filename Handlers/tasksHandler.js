let data;

//Add tasks to table
function createCells(){
    //Get all task elements
    for(let i = 0; i < Object.keys(data.Tasks).length; i++){
        let currentData = data.Tasks[Object.keys(data.Tasks)[i]];
        let table = document.getElementById("allTasks");

        //Create the table elements and add them to the table
            //Task name
            let name = document.createElement("td");
            name.textContent = currentData.Name;
            table.appendChild(name);

            //Task description
            let description = document.createElement("td");
            description.textContent = currentData.Description;
            table.appendChild(description);

            //Task date
            let date = document.createElement("td");
            date.textContent = currentData.Date;
            table.appendChild(date);

            //Task status
            let status = document.createElement("td");
            status.textContent = currentData.Status;
            table.appendChild(status);

            //Task completed?
            let completed = document.createElement("td");
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = (currentData.Completed === 'true');
            checkBox.className = "checkBox";
            completed.appendChild(checkBox);
            table.appendChild(completed);

            //Add listener to update status on goal
            checkBox.addEventListener('change', () => {
                ipcRenderer.invoke("update-task", [i, checkBox.checked]);
            })
    }
}

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    createCells();
    
}

//Call get data
getData();