const { ipcRenderer } = require('electron');

document.getElementById("returnButton").addEventListener("click", () => {
    ipcRenderer.invoke('goals-Page', []);
});