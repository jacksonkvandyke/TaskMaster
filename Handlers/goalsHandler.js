let data;

//Set up basic timeline elements
async function settimeLine(){
    //Set initial date range values
    let dateLeft = document.getElementById("dateLeft");
    let dateRight = document.getElementById("dateRight");
    let range = document.getElementById("dateRange");
    
    //Update those values upon change
    if (range != null){
        //Check for a change in the date range
        range.addEventListener("change", () => {
            //Set the date range by checking for correct values
            let today = new Date();
            let target = new Date();
            target.setMonth(target.getMonth() + parseInt(range.value));
            let currentMonth = today.getMonth() + 1;
            let currentYear = today.getFullYear().toString().slice(2, 4);
            let newMonth = target.getMonth() + 1;
            let newYear = parseInt(target.getFullYear().toString().slice(2, 4));
    
            //Check if a placeholder needs to be added to month or year
            if (newMonth.toString().length < 2){
                newMonth = '0' + newMonth.toString();
            }
        
            if (newYear.toString().length < 2){
                newYear = '0' + newYear.toString();
            }
    
            //Create the new dates
            let newleftDate = currentMonth + "/" + currentYear;
            let newrightDate = newMonth + "/" + newYear;
    
            //Apply the new dates
            dateLeft.textContent = newleftDate;
            dateRight.textContent = newrightDate;
    
            //Create the new plots after clearing previous plots
            clearPlots();
            
        })
    
        //Set the date range on initial load of goals page
        let today = new Date();
        let target = new Date();
        target.setMonth(target.getMonth() + parseInt(range.value));
        let currentMonth = today.getMonth() + 1;
        let currentYear = today.getFullYear().toString().slice(2, 4);
        let newMonth = target.getMonth() + 1;
        let newYear = parseInt(target.getFullYear().toString().slice(2, 4));
    
        //Check if a placeholder needs to be added to month or year
        if (newMonth.toString().length < 2){
            newMonth = '0' + newMonth.toString();
        }
    
        if (newYear.toString().length < 2){
            newYear = '0' + newYear.toString();
        }
    
        //Create the new dates
        let newleftDate = currentMonth + "/" + currentYear;
        let newrightDate = newMonth + "/" + newYear;
    
        //Apply the new dates
        dateLeft.textContent = newleftDate;
        dateRight.textContent = newrightDate;
    }
    }
    
    //Gather data from local storage
    async function getData(){
        data = await ipcRenderer.invoke('gather-data', []);
        createPlots();
    
    }
    
    // Create plots based on gathered data
    function createPlots(){
        let referenceTimeline = document.getElementById("timeLine");
        let timelineHolder = document.getElementById("timelineHolder");
    
        //Get current range and date data
        let today = document.getElementById("dateLeft").textContent;
        let target = document.getElementById("dateRight").textContent;
    
        //Get the plot and create new plots based on data
        if (referenceTimeline != null){
            //Loop through each element in data
            for(let i = 0; i < Object.keys(data.Goals).length; i++){
                //Check if element should be added
                let currentDate = data.Goals[Object.keys(data.Goals)[i]];
                let currentMonth = currentDate.Date.slice(0, 2);
                let currentYear = currentDate.Date.slice(3, 5);
    
                //Get date range         
                let monthMin = today.slice(0, 2);
                let monthMax = target.slice(0, 2);
    
                let yearMin = today.slice(3, 5);
                let yearMax = target.slice(3, 5);
    
                //Check if element should be added based on date range
                let totalDifference = document.getElementById("dateRange").value;
                let totalyearDif = yearMax - currentYear;
                let totalmonthDif = monthMax - currentMonth;
                console.log(totalmonthDif)
                
                for (let i = 0; i < totalyearDif; i++){
                    totalmonthDif += 12;
                }
    
                if (1 - totalmonthDif/totalDifference > 1){
                    continue;
                }
    
                if (currentYear > yearMin && currentYear <= yearMax){
                    let newPlot = document.createElement('div');
                    newPlot.className = 'plot';
                    timelineHolder.appendChild(newPlot);
    
                    //Create plot details
                    let plotDetails = document.createElement('text');
                    newPlot.appendChild(plotDetails);
                    plotDetails.style.visibility = "hidden";
                    plotDetails.style.fontSize = "32px";
                    plotDetails.style.position = "relative";
                    plotDetails.style.display = "inline-block";
                    plotDetails.style.width = currentDate.Name + "ch";
                    plotDetails.style.border = "#bfa329 solid 4px";
                    plotDetails.style.backgroundColor = "#FED834"
                    plotDetails.textContent = currentDate.Name + ": " + currentDate.Description + " Complete by: " + currentDate.Date;
    
                    //Add hoverover events
                    newPlot.addEventListener('mouseover',() => {
                        let details = plotDetails;
                        details.style.visibility = "visible";
                    })
    
                    newPlot.addEventListener('mouseout',() => {
                        let details = plotDetails;
                        details.style.visibility = "hidden";
                    })
    
                    //Determine location of new element based on total month
                    newPlot.style.left = (96.75 * (1 - totalmonthDif/totalDifference)).toString() + "%";
                }
    
                if (currentYear == yearMin){
                    if (currentMonth >= monthMin && totalmonthDif <=  totalDifference){
                        let newPlot = document.createElement('div');
                        newPlot.className = 'plot';
                        timelineHolder.appendChild(newPlot);
    
                        //Create plot details
                        let plotDetails = document.createElement('text');
                        newPlot.appendChild(plotDetails);
                        plotDetails.style.visibility = "hidden";
                        plotDetails.style.fontSize = "32px";
                        plotDetails.style.position = "relative";
                        plotDetails.style.display = "inline-block";
                        plotDetails.style.width = currentDate.Name + "ch";
                        plotDetails.style.border = "#bfa329 solid 4px";
                        plotDetails.style.backgroundColor = "#FED834"
                        plotDetails.textContent = currentDate.Name + ": " + currentDate.Description + " Complete by: " + currentDate.Date;
    
                        //Add hoverover events
                        newPlot.addEventListener('mouseover',() => {
                            let details = plotDetails;
                            details.style.visibility = "visible";
                        })
    
                        newPlot.addEventListener('mouseout',() => {
                            let details = plotDetails;
                            details.style.visibility = "hidden";
                        })
    
                        //Determine location of new element based on total month
                        newPlot.style.left = (96.75 * (1 - totalmonthDif/totalDifference)).toString() + "%";
                    }
                }
    
            }
    
        }
    
    }
    
    function clearPlots(){
        let referenceTimeline = document.getElementById("timelineHolder");
        while(referenceTimeline.lastChild.className != "lineRight"){
            console.log(referenceTimeline.lastChild)
            referenceTimeline.removeChild(referenceTimeline.lastChild);
        }
        
        //Create the plots after clearing
        createPlots();
    }

//Add goal creation event
document.getElementById("create-new-goal").addEventListener('click', () => {
    ipcRenderer.invoke("go-to-goal-creation");
})
    
//Call functions
settimeLine();
getData();