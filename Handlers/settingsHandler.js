// Get all css files and current settings
let styleSheets = document.styleSheets;

function getSettings(){
    //Get css elements
    let htmlIndex = 0;
    let headerIndex = 0;
    let subheaderIndex = 0;
    let buttonIndex = 0;
    for (let i = 0; i < styleSheets[0].rules.length; i++){
        if (styleSheets[0].rules[i].selectorText == 'html'){
            htmlIndex = i;

        }
        if (styleSheets[0].rules[i].selectorText == 'h1'){
            headerIndex = i;

        }
        if (styleSheets[0].rules[i].selectorText == 'h3'){
            subheaderIndex = i;

        }
        if (styleSheets[0].rules[i].selectorText == 'button'){
            buttonIndex = i;

        }

    }

    ////Background
    if (!data.Settings.backgroundColor){
        //Get current background color then add event to change it
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const hexVal = rgb2hex(styleSheets[0].rules[htmlIndex].style.backgroundColor)
        document.getElementById('backgroundColor').value = hexVal;
        data.Settings.backgroundColor = hexVal;

    }else {
        document.getElementById('backgroundColor').value = data.Settings.backgroundColor;

    }

    ////Header
    if (!data.Settings.headerColor){
        //Get current background color then add event to change it
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const hexVal = rgb2hex(styleSheets[0].rules[headerIndex].style.backgroundColor)
        document.getElementById('headerColor').value = hexVal;
        data.Settings.headerColor = hexVal;

    }else {
        document.getElementById('headerColor').value = data.Settings.headerColor;

    }

    ////Header border
    if (!data.Settings.headerborderColor){
        //Get current background color then add event to change it
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const hexVal = rgb2hex(styleSheets[0].rules[headerIndex].style.borderColor)
        document.getElementById('headerborderColor').value = hexVal;
        data.Settings.headerborderColor = hexVal;

    }else {
        document.getElementById('headerborderColor').value = data.Settings.headerborderColor;

    }

    ////Sub Header
    if (!data.Settings.subheaderColor){
        //Get current background color then add event to change it
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const hexVal = rgb2hex(styleSheets[0].rules[subheaderIndex].style.backgroundColor)
        document.getElementById('subheaderColor').value = hexVal;
        data.Settings.subheaderColor = hexVal;

    }else {
        document.getElementById('subheaderColor').value = data.Settings.subheaderColor;

    }

    ////Sub Header border
    if (!data.Settings.subheaderborderColor){
        //Get current background color then add event to change it
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const hexVal = rgb2hex(styleSheets[0].rules[subheaderIndex].style.borderColor)
        document.getElementById('subheaderborderColor').value = hexVal;
        data.Settings.subheaderborderColor = hexVal;

    }else {
        document.getElementById('subheaderborderColor').value = data.Settings.subheaderborderColor;

    }

    ////Font style
    if (!data.Settings.fontStyle){
        //Get current background color then add event to change it
        document.getElementById('fontStyle').value = styleSheets[0].rules[htmlIndex].style.fontFamily;
        data.Settings.fontStyle = styleSheets[0].rules[htmlIndex].style.fontFamily;;

    }else {
        document.getElementById('fontStyle').value = data.Settings.fontStyle;

    }

    ////Button color
    if (!data.Settings.buttonColor){
        document.getElementById('buttonColor').value = styleSheets[0].rules[buttonIndex].style.backgroundColor;
        data.Settings.buttonColor = styleSheets[0].rules[buttonIndex].style.backgroundColor;;

    }else {
        document.getElementById('buttonColor').value = data.Settings.buttonColor;

    }

    //Set new background
    document.getElementById('backgroundColor').addEventListener('change', () => {
    data.Settings.backgroundColor = document.getElementById('backgroundColor').value;
    ipcRenderer.invoke('update-data', data);

    })

    //Set new header background
    document.getElementById('headerColor').addEventListener('change', () => {
        data.Settings.headerColor = document.getElementById('headerColor').value;
        ipcRenderer.invoke('update-data', data);
        
    })

    //Set new header border color
    document.getElementById('headerborderColor').addEventListener('change', () => {
        data.Settings.headerborderColor = document.getElementById('headerborderColor').value;
        ipcRenderer.invoke('update-data', data);
            
    })

    //Set new sub header background
    document.getElementById('subheaderColor').addEventListener('change', () => {
        data.Settings.subheaderColor = document.getElementById('subheaderColor').value;
        ipcRenderer.invoke('update-data', data);
        
    })

    //Set new sub header border color
    document.getElementById('subheaderborderColor').addEventListener('change', () => {
        data.Settings.subheaderborderColor = document.getElementById('subheaderborderColor').value;
        ipcRenderer.invoke('update-data', data);
        
    })

    //Set new font
    document.getElementById('fontStyle').addEventListener('change', () => {
        data.Settings.fontStyle = document.getElementById('fontStyle').value;
        ipcRenderer.invoke('update-data', data);
    })

    //Set new button color
    document.getElementById('buttonColor').addEventListener('change', () => {
        data.Settings.buttonColor = document.getElementById('buttonColor').value;
        ipcRenderer.invoke('update-data', data);
    })

}

//Apply the settings
function applySettings(){
    //Get css html element
    let htmlIndex = 0;
    let headerIndex = 0;
    let subheaderIndex = 0;
    let buttonIndex = 0;
    for (let sheet = 0; sheet < styleSheets.length; sheet++){
        for (let i = 0; i < styleSheets[sheet].rules.length; i++){
            if (styleSheets[sheet].rules[i].selectorText == 'html'){
                htmlIndex = i;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'h1'){
                headerIndex = i;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'h3'){
                subheaderIndex = i;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'button'){
                buttonIndex = i;
    
            }
    
            //Find and apply the rest of the styles that need application
            if (styleSheets[sheet].rules[i].selectorText == 'h4'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'table'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'th'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'select'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'input'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            } 
            if (styleSheets[sheet].rules[i].selectorText == '.line'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == '.lineLeft' || styleSheets[sheet].rules[i].selectorText == '.lineRight'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
    
            } 
            if (styleSheets[sheet].rules[i].selectorText == '.plot'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == '#dateLeft' || styleSheets[sheet].rules[i].selectorText == '#dateRight'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'button.collapse'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'button.change-Date'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            }
            if (styleSheets[sheet].rules[i].selectorText == 'a#currentDate'){
                styleSheets[sheet].rules[i].style.backgroundColor = data.Settings.subheaderColor;
                styleSheets[sheet].rules[i].style.borderColor = data.Settings.subheaderborderColor;
    
            } 

    }
    
    }

    //html
    styleSheets[0].rules[htmlIndex].style.backgroundColor = data.Settings.backgroundColor;
    styleSheets[0].rules[htmlIndex].style.fontFamily = data.Settings.fontStyle;

    //h1
    styleSheets[0].rules[headerIndex].style.backgroundColor = data.Settings.headerColor;
    styleSheets[0].rules[headerIndex].style.borderColor = data.Settings.headerborderColor;

    //h3
    styleSheets[0].rules[subheaderIndex].style.backgroundColor = data.Settings.subheaderColor;
    styleSheets[0].rules[subheaderIndex].style.borderColor = data.Settings.subheaderborderColor;

    //Button
    styleSheets[0].rules[buttonIndex].style.backgroundColor = data.Settings.buttonColor;
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
