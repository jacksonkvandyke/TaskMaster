//Add listener to create new goal
document.getElementById("newTask").addEventListener("submit", () => {
    event.preventDefault();

    //Check if new goal is appropriate for creation
    let taskName = document.getElementById("taskName").value;
    let taskDate = document.getElementById("taskDate").value;
    let taskDescription = document.getElementById("taskDescription").value;

    //Check if all values are filled
    if (taskName.length == 0) return;
    if (taskDate == null) return;
    if (taskDescription.length == 0) return;

    //Create goal
    ipcRenderer.invoke("create-new-task", [taskName, taskDate, taskDescription]);
})
