const { ipcRenderer } = require('electron');

//Control the navigation between pages
document.getElementById("go-to-homePage").addEventListener('click', () => {
    ipcRenderer.invoke('home-Page', []);

});

document.getElementById("go-to-goalsPage").addEventListener('click', () => {
    ipcRenderer.invoke('goals-Page', []);

});

document.getElementById("go-to-tasksPage").addEventListener('click', () => {
    ipcRenderer.invoke('tasks-Page', []);

});

document.getElementById("go-to-calendarPage").addEventListener('click', () => {
    ipcRenderer.invoke('calendar-Page', []);

});

document.getElementById("go-to-settingsPage").addEventListener('click', () => {
    ipcRenderer.invoke('settings-Page', []);

});






