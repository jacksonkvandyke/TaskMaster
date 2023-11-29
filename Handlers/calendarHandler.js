let date;

//Month adjust
monthAdjust = 0
let intialDate = new Date()

function createCalendar(){
//Set date of calendar
currentDate = document.getElementById('currentDate');
dateObject = new Date(intialDate.getFullYear(), (parseInt(intialDate.getMonth()) + monthAdjust));
setDate = dateObject.getMonth() + "/" + dateObject.getFullYear()
currentDate.textContent = setDate

//Get the calendar objects
calendar = document.getElementById('calendar');
calendarDates = document.getElementById('calendarDates');
calendarHolder = document.getElementById('calendarHolder');
currentDate = document.getElementById('currentDate');

//Get starting day of month
let day = 1;
let currentDay = new Date(dateObject.getFullYear(), dateObject.getMonth(), day);
currentDate.textContent = (currentDay.getMonth() + 1) + "/" + currentDay.getFullYear()
let backDay = day - currentDay.getDay();

//Add days to calendar
while (currentDay.getMonth() == dateObject.getMonth()){
    let calendarRow = document.createElement('tr');
    calendarHolder.appendChild(calendarRow);

    for(let calDate of calendarDates.children){
        currentDay = new Date(dateObject.getFullYear(), dateObject.getMonth(), day);
        previousDay = new Date(dateObject.getFullYear(), dateObject.getMonth(), backDay);

        //Current month and previous month days
        if ((currentDay.getDay().toString() == calDate.id.toString()) && (currentDay.getMonth() == dateObject.getMonth())){
            //New date
            let newDate = document.createElement('td');
            calendarRow.appendChild(newDate);
            newDate.textContent = currentDay.getDate();
            newDate.id = "currentElement";
            
            //Create the task text element
            taskText = document.createElement('div');
            taskText.id = 'taskText';
            newDate.appendChild(taskText);
            taskText.textContent = "Tasks:"

            //Create text documents for each task
            for (let i = 0; i < Object.keys(data.Tasks).length; i++){
                if (data.Tasks[Object.keys(data.Tasks)[i]].Date.toString() == (parseInt(currentDay.getMonth() + 1).toString() + "/" + currentDay.getDate() + "/" + currentDay.getFullYear()).toString()){
                    content = document.createElement('div');
                    content.id = 'taskContent';
                    taskText.appendChild(content);
                    content.textContent = data.Tasks[Object.keys(data.Tasks)[i]].Name;

                }
            }

            day += 1;

        }else {
            //New date
            let newDate = document.createElement('td');
            calendarRow.appendChild(newDate);
            newDate.textContent = previousDay.getDate();
            newDate.id = "outsideElement";

            //Create the task text element
            taskText = document.createElement('div');
            taskText.id = 'taskText';
            newDate.appendChild(taskText);
            taskText.textContent = "Tasks:"

            //Create text documents for each task
            for (let i = 0; i < Object.keys(data.Tasks).length; i++){
                if (data.Tasks[Object.keys(data.Tasks)[i]].Date.toString() == (parseInt(currentDay.getMonth() + 1).toString() + "/" + currentDay.getDate() + "/" + currentDay.getFullYear()).toString()){
                    content = document.createElement('div');
                    content.id = 'taskContent';
                    taskText.appendChild(content);
                    content.textContent = data.Tasks[Object.keys(data.Tasks)[i]].Name;
                    content.textContent = data.Tasks[Object.keys(data.Tasks)[i]].Name;

                }
            }

            backDay += 1;

        }
    }

}

}

function addGoals(){
//Add calendar goals data
    //Create text documents for each goal
    calendarGoals = document.getElementById('goalsContent');
    for (let i = 0; i < Object.keys(data.Goals).length; i++){
        if (data.Goals[Object.keys(data.Goals)[i]].Date.toString() == (parseInt(dateObject.getMonth() + 1).toString() + "/" + (dateObject.getFullYear()).toString().slice(2, 4))){
            content = document.createElement('div');
            content.id = 'goalContent';
            calendarGoals.appendChild(content);
            content.textContent = data.Goals[Object.keys(data.Goals)[i]].Name;

        }
    }

    if (calendarGoals.children.length == 0){
        content = document.createElement('div');
        content.id = 'goalContent';
        calendarGoals.appendChild(content);
        content.textContent = "No Goals"

    }

}

function clearCalendar(){
    calendarHolder = document.getElementById('calendarHolder');
    calendarGoals = document.getElementById('goalsContent');
    while (calendarHolder.children.length > 0){
        calendarHolder.removeChild(calendarHolder.firstChild)

    }
    while (calendarGoals.children.length > 0){
        calendarGoals.removeChild(calendarGoals.firstChild)

    }

}

//Add button events
document.getElementById('change-date-left').addEventListener('click', () => {
    monthAdjust -= 1
    clearCalendar()
    createCalendar();
    addGoals();

})

document.getElementById('change-date-right').addEventListener('click', () => {
    monthAdjust += 1
    clearCalendar()
    createCalendar();
    addGoals();

})

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    createCalendar();
    addGoals();
    
}

//Call get data
getData()