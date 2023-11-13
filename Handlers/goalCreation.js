//Add listener to create new goal
document.getElementById("newGoal").addEventListener("submit", () => {
    event.preventDefault();

    //Check if new goal is appropriate for creation
    let goalName = document.getElementById("goalName").value;
    let goalDate = document.getElementById("goalDate").value;
    let goalDescription = document.getElementById("goalDescription").value;

    //Check if all values are filled
    if (goalName.length == 0) return;
    if (goalDate == null) return;
    if (goalDescription.length == 0) return;

    //Create goal
    ipcRenderer.invoke("create-new-goal", [goalName, goalDate, goalDescription]);

})
