let data;

//Add most recent goal to homepage
function addData(){
    let chosen = null;
    for(element in data.Goals){
        //Set default
        if (chosen == null){
            chosen = data.Goals[element];
        }

        //Get element date
        let elementMonth = data.Goals[element].Date.slice(0, 2);
        let elementYear = data.Goals[element].Date.slice(3, 5);

        //Get chosen date
        let chosenMonth = data.Goals[element].Date.slice(0, 2);
        let chosenYear = data.Goals[element].Date.slice(3, 5);

        //Check which goal to choose
        if (elementYear < chosenYear){
            chosen = element;
        }else {
            if ((elementYear < chosenYear) && (elementMonth < chosenMonth)){
                chosen = element;
            }
        }
    }

    //Set the data
    let tableName = document.createElement('td');
    let tableMonth = document.createElement('td');

    if (chosen != null){
        tableName.textContent = data.Goals[element].Name;
        tableMonth.textContent = data.Goals[element].Date;
    }else {
        tableName.textContent = "No Goals"
        tableMonth.textContent = "N/A";
    }

    document.getElementById("currentGoal").appendChild(tableName);
    document.getElementById("currentGoal").appendChild(tableMonth);

}

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    addData();
    
}

//Call get data
getData();