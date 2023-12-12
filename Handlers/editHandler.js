const { ipcRenderer } = require('electron');

//Get edit data
let data;
let editData;

async function getData(){
    data = await ipcRenderer.invoke('gather-data');
    editData = await ipcRenderer.invoke('get-edit-data');
    
    //Edit goal
    if (editData[1] == 0){
        editGoal();

    }

    //Edit task
    if (editData[1] == 1){
        editTask();

    }

}

function editGoal(){
    holder = document.getElementById('holder');

    //Name
    nameLabel = document.createElement('h4');
    nameLabel.textContent = "Name: "
    holder.appendChild(nameLabel)

    newName = document.createElement('input');
    newName.value = editData[0].Name;
    nameLabel.appendChild(newName);


    //Date
    dateLabel = document.createElement('h4');
    dateLabel.textContent = "Date: "
    holder.appendChild(dateLabel)

    newDate = document.createElement('input');
    newDate.value = editData[0].Date;
    dateLabel.appendChild(newDate);


    //Description
    descriptionLabel = document.createElement('h4');
    descriptionLabel.textContent = "Description: "
    holder.appendChild(descriptionLabel)

    newDescription = document.createElement('textarea');
    newDescription.value = editData[0].Description;
    descriptionLabel.appendChild(newDescription);

    //Data update
    document.getElementById('updateButton').addEventListener('click', () => {
        //Update the specified data at specified location
        data.Goals[newDate.value] = data.Goals[editData[2]];
        delete data.Goals[editData[2]];
        data.Goals[newDate.value].Name = newName.value;
        data.Goals[newDate.value].Date = newDate.value;
        data.Goals[newDate.value].Description = newDescription.value;

        //Update data
        ipcRenderer.invoke('update-data', data);
        ipcRenderer.invoke('close-edit');
    
    })

    //Data delete
    document.getElementById('deleteButton').addEventListener('click', () => {
        //Update the specified data at specified location
        delete data.Goals[editData[2]];

        //Update data
        ipcRenderer.invoke('update-data', data);
        ipcRenderer.invoke('close-edit');
    
    })

}

function editTask(){
    holder = document.getElementById('holder');

    //Name
    nameLabel = document.createElement('h4');
    nameLabel.textContent = "Name: "
    holder.appendChild(nameLabel)

    newName = document.createElement('input');
    newName.value = editData[0].Name;
    nameLabel.appendChild(newName);


    //Date
    dateLabel = document.createElement('h4');
    dateLabel.textContent = "Date: "
    holder.appendChild(dateLabel)

    newDate = document.createElement('input');
    newDate.type = "date";

    //Parsed data
    year = editData[0].Date.slice(6, 10);
    month = editData[0].Date.slice(0, 2);
    day = editData[0].Date.slice(3, 5);
    totalDate = year + "-" + month + "-" + day
    newDate.value = totalDate.toString();
    dateLabel.appendChild(newDate);


    //Description
    descriptionLabel = document.createElement('h4');
    descriptionLabel.textContent = "Description: "
    holder.appendChild(descriptionLabel)

    newDescription = document.createElement('textarea');
    newDescription.value = editData[0].Description;
    descriptionLabel.appendChild(newDescription);

    //Data update
    document.getElementById('updateButton').addEventListener('click', () => {
        //Update the specified data at specified location
        data.Tasks[editData[2]].Name = newName.value;

        //Parse date value
        day = newDate.value.slice(8, 10);
        month = newDate.value.slice(5, 7);
        year = newDate.value.slice(0, 4);
        data.Tasks[editData[2]].Date = month + "/" + day + "/" + year;

        data.Tasks[editData[2]].Description = newDescription.value;

        //Update data
        ipcRenderer.invoke('update-data', data);
        ipcRenderer.invoke('close-edit');

    })

    //Data delete
    document.getElementById('deleteButton').addEventListener('click', () => {
        //Update the specified data at specified location
        delete data.Tasks[editData[2]];
    
        //Update data
        ipcRenderer.invoke('update-data', data);
        ipcRenderer.invoke('close-edit');
        
    })

}

//Data delete

getData();