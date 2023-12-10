// Get all css files and current settings
let styleSheets = document.styleSheets;

function getSettings(){
    ////Background
    //Get css html element
    elementIndex = 0;
    for (let i = 0; i < styleSheets[0].rules.length; i++){
        if (styleSheets[0].rules[i].selectorText == 'html'){
            elementIndex = i;

        }

    }

    if (!data.Settings.backgroundColor){
        //Get current background color then add event to change it
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const hexVal = rgb2hex(styleSheets[0].rules[elementIndex].style.backgroundColor)
        document.getElementById('backgroundColor').value = hexVal;
        data.Settings.backgroundColor = hexVal;

    }else {
        document.getElementById('backgroundColor').value = data.Settings.backgroundColor;

    }

    ////Font style
    if (!data.Settings.fontStyle){
        //Get current background color then add event to change it
        document.getElementById('fontStyle').value = styleSheets[0].rules[elementIndex].style.fontFamily;
        data.Settings.fontStyle = styleSheets[0].rules[elementIndex].style.fontFamily;;

    }else {
        document.getElementById('fontStyle').value = data.Settings.fontStyle;

    }

    //Set new background
    document.getElementById('backgroundColor').addEventListener('change', () => {
    data.Settings.backgroundColor = document.getElementById('backgroundColor').value;
    ipcRenderer.invoke('update-data', data);

    })

    //Set new font
    document.getElementById('fontStyle').addEventListener('change', () => {
        data.Settings.fontStyle = document.getElementById('fontStyle').value;
        ipcRenderer.invoke('update-data', data);
    })


}

//Apply the settings
function applySettings(){
    //Get css html element
    elementIndex = 0;
    for (let i = 0; i < styleSheets[0].rules.length; i++){
        if (styleSheets[0].rules[i].selectorText == 'html'){
            elementIndex = i;
    
        }
    
    }

    styleSheets[0].rules[elementIndex].style.backgroundColor = data.Settings.backgroundColor;
    styleSheets[0].rules[elementIndex].style.fontFamily = data.Settings.fontStyle;

}

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    if (document.getElementById('backgroundColor')){
        await getSettings();

    }
    applySettings();
    
}

//Call get data
getData();
