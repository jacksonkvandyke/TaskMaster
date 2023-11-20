let data;

//Add most recent goal to homepage
function addData(){
    //Add goal
    let chosengoal = null;
    for(element in data.Goals){
        //Set default
        if (chosengoal == null){
            chosengoal = data.Goals[element];
        }

        //Get element date
        let elementMonth = data.Goals[element].Date.slice(0, 2);
        let elementYear = data.Goals[element].Date.slice(3, 5);

        //Get chosen date
        let chosenMonth = data.Goals[element].Date.slice(0, 2);
        let chosenYear = data.Goals[element].Date.slice(3, 5);

        //Check which goal to choose
        if (elementYear < chosenYear){
            chosengoal = element;
        }else {
            if ((elementYear < chosenYear) && (elementMonth < chosenMonth)){
                chosengoal = element;
            }
        }
    }

    //Set the data
    let goalName = document.createElement('td');
    let goalMonth = document.createElement('td');

    if (chosengoal != null){
        goalName.textContent = chosengoal.Name;
        goalMonth.textContent = chosengoal.Date;
    }else {
        goalName.textContent = "No Goals"
        goalMonth.textContent = "N/A";
    }

    document.getElementById("currentGoal").appendChild(goalName);
    document.getElementById("currentGoal").appendChild(goalMonth);
    
    //Add task
    let chosentask = null;
    for(element in data.Tasks){
        //Set default
        if (chosentask == null){
            chosentask = data.Tasks[element];
        }

        //Get element date
        let elementMonth = data.Tasks[element].Date.slice(0, 2);
        let elementYear = data.Tasks[element].Date.slice(3, 5);

        //Get chosen date
        let chosenMonth = data.Tasks[element].Date.slice(0, 2);
        let chosenYear = data.Tasks[element].Date.slice(3, 5);

        //Check which goal to choose
        if (elementYear < chosenYear){
            chosentask = element;
        }else {
            if ((elementYear < chosenYear) && (elementMonth < chosenMonth)){
                chosentask = element;
            }
        }
    }

    //Set the data
    let taskName = document.createElement('td');
    let taskMonth = document.createElement('td');

    if (chosentask != null){
        taskName.textContent = chosentask.Name;
        taskMonth.textContent = chosentask.Date;
    }else {
        taskName.textContent = "No Tasks"
        taskMonth.textContent = "N/A";
    }

    document.getElementById("currentTask").appendChild(taskName);
    document.getElementById("currentTask").appendChild(taskMonth);
}

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    addData();
    
}

//Call get data
getData();