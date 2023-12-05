const { app, BrowserWindow, ipcMain } = require("electron");
const data = require('./dataDirectory/data.json');
const fs = require('fs');

let window;

//Create window
function createWindow(){
    window = new BrowserWindow({ 
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    //Load startup window
    window.loadFile("./Pages/homePage.html");
}

let editWindow;

//Create window
function createeditWindow(){
    editWindow = new BrowserWindow({ 
        width: 600,
        height: 450,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    editWindow.setAlwaysOnTop(true);
}

//Create edit window


app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

//Handle window changes
ipcMain.handle('home-Page', () => {
    window.loadFile("./Pages/homePage.html");

})

ipcMain.handle('goals-Page', () => {
    window.loadFile("./Pages/goalsPage.html");

})

ipcMain.handle('go-to-goal-creation', () => {
    window.loadFile("./Pages/goalcreationPage.html");

})

ipcMain.handle('tasks-Page', () => {
    window.loadFile("./Pages/tasksPage.html");

})

ipcMain.handle('go-to-task-creation', () => {
    window.loadFile("./Pages/taskcreationPage.html");

})

ipcMain.handle('calendar-Page', () => {
    window.loadFile("./Pages/calendarPage.html");

})

let editData;
ipcMain.handle('edit-Page', (event, argument) => {
    createeditWindow();
    editWindow.loadFile("./Pages/editPage.html");
    editData = argument;

})

ipcMain.handle('get-edit-data', () => {
    return editData;

})

ipcMain.handle('close-edit', () => {
    editWindow.close();

})

ipcMain.handle('settings-Page', () => {
    window.loadFile("./Pages/settingsPage.html");

})

//Handle data exchange
ipcMain.handle('gather-data', () => {
    return data

})

//Handle simple data update: Mainly used afters delete or simple changes
ipcMain.handle('update-data', async (event, argument) => {
    let newData = argument;
    let jsonFile = "./dataDirectory/data.json";
    let object = await JSON.stringify(newData);

    //Set data
    fs.writeFile(jsonFile, object, err => {
        if (err){
            console.log(err);
        }
    });

})

//Handle goal creation
ipcMain.handle('create-new-goal', async (event, argument) => {
    let goalData = await argument;

    //Create data section for goal
    let goalLocation = "Goal-" + `${goalData[1]}`;

    //Create goal
    data.Goals[goalLocation] = { "Name": `${goalData[0]}`, "Date": `${goalData[1]}`, "Description": `${goalData[2]}`}
    let jsonFile = "./dataDirectory/data.json";
    let object = await JSON.stringify(data);

    //Set data
    fs.writeFile(jsonFile, object, err => {
        if (err){
            console.log(err);
        }
    });

    //Send message on success
    window.loadFile("./Pages/goalSuccess.html");
})

//Handle task creation
ipcMain.handle('create-new-task', async (event, argument) => {
    let taskData = await argument;

    //Create data section for task
    let taskLocation = "Task-" + `${Object.keys(data.Tasks).length}`;

    //Correctly slice and restring the date
    day = taskData[1].slice(8, 10);
    month = taskData[1].slice(5, 7);
    year = taskData[1].slice(0, 4);
    taskData[1] = month + "/" + day + "/" + year;

    //Create goal
    data.Tasks[taskLocation] = { "Name": `${taskData[0]}`, "Date": `${taskData[1]}`, "Description": `${taskData[2]}`, 'Completed':false}
    let jsonFile = "./dataDirectory/data.json";
    let object = await JSON.stringify(data);

    //Set data
    fs.writeFile(jsonFile, object, err => {
        if (err){
            console.log(err);
        }
    });

    //Send message on success
    window.loadFile("./Pages/taskSuccess.html");
})

//Handle task update
ipcMain.handle('update-task', async (event, argument) => {
    let taskData = await argument;

    //Update task status
    data.Tasks[Object.keys(data.Tasks)[taskData[0]]].Completed = argument[1];
    let jsonFile = "./dataDirectory/data.json";
    let object = await JSON.stringify(data);

    //Set data
    fs.writeFile(jsonFile, object, err => {
        if (err){
            console.log(err);
        }
    });
})