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

ipcMain.handle('calendar-Page', () => {
    window.loadFile("./Pages/calendarPage.html");

})

ipcMain.handle('settings-Page', () => {
    window.loadFile("./Pages/settingsPage.html");

})

//Handle data exchange
ipcMain.handle('gather-data', () => {
    return data

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