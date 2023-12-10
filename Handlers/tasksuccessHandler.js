const { ipcRenderer } = require('electron');
let data;

document.getElementById("returnButton").addEventListener("click", () => {
    ipcRenderer.invoke('tasks-Page', []);
});