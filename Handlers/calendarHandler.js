let date;

//Month adjust
monthAdjust = 0
let intialDate = new Date();

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
                if ((parseInt(data.Tasks[Object.keys(data.Tasks)[i]].Date.slice(0, 2))).toString() + "/" + parseInt(data.Tasks[Object.keys(data.Tasks)[i]].Date.slice(3, 6)).toString() + "/" + parseInt(data.Tasks[Object.keys(data.Tasks)[i]].Date.slice(6, 10)).toString() == (parseInt(currentDay.getMonth() + 1).toString() + "/" + currentDay.getDate() + "/" + currentDay.getFullYear()).toString()){
                    content = document.createElement('div');
                    content.id = 'taskContent';
                    taskText.appendChild(content);
                    content.textContent = data.Tasks[Object.keys(data.Tasks)[i]].Name;

                    spacer = document.createElement('br');
                    content.appendChild(spacer);

                    editElement = document.createElement('button');
                    editElement.textContent = "Edit";
                    editElement.id = "editButton";
                    content.appendChild(editElement);
                    editElement.addEventListener('click', () => {
                        ipcRenderer.invoke('edit-Page', [data.Tasks[Object.keys(data.Tasks)[i]], 1, Object.keys(data.Tasks)[i]]);
            
                    })

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
            backDay += 1;

        }
    }

}

//Add calendar goals data
    //Create text documents for each goal
    calendarGoals = document.getElementById('goalsContent');
    for (let i = 0; i < Object.keys(data.Goals).length; i++){
        if (parseInt(data.Goals[Object.keys(data.Goals)[i]].Date.slice(0, 2)).toString() + "/" + parseInt(data.Goals[Object.keys(data.Goals)[i]].Date.slice(3, 6)).toString() == (parseInt(dateObject.getMonth() + 1).toString() + "/" + (dateObject.getFullYear()).toString().slice(2, 4))){
            content = document.createElement('div');
            content.id = 'goalContent';
            calendarGoals.appendChild(content);
            content.textContent = data.Goals[Object.keys(data.Goals)[i]].Name;

            spacer = document.createElement('br');
            content.appendChild(spacer);

            editElement = document.createElement('button');
            editElement.textContent = "Edit";
            editElement.id = "editButton";
            content.appendChild(editElement);
            editElement.addEventListener('click', () => {
                ipcRenderer.invoke('edit-Page', [data.Goals[Object.keys(data.Goals)[i]], 0, Object.keys(data.Goals)[i]]);
    
            })

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

})

document.getElementById('change-date-right').addEventListener('click', () => {
    monthAdjust += 1
    clearCalendar()
    createCalendar();

})

//Search bar
document.getElementById('searchBar').addEventListener('input', () => {
    //Clear contents prior to searching
    contents = document.getElementById('contents');
    while (contents.children.length > 0){
        contents.removeChild(contents.firstChild);

    }

    result = [];
    filter = document.getElementById('searchBar').value;

    if (filter.length == 0){
        return

    }

    for (let i = 0; i < Object.keys(data.Goals).length; i++){
        goalDate = data.Goals[Object.keys(data.Goals)[i]].Date.toString();
        goalName = data.Goals[Object.keys(data.Goals)[i]].Name.toString();

        currentLength = 0
        for (let j = 0; j < goalDate.length; j++){
            if (goalDate[j] == filter[currentLength]){
                currentLength += 1;

            }else {
                currentLength = 0;

            }

            if (currentLength == filter.length){
                result.push([data.Goals[Object.keys(data.Goals)[i]], 0, Object.keys(data.Goals)[i]])
                break;

            }

        }

        currentLength = 0
        for (let j = 0; j < goalName.length; j++){
            if (goalName[j] == filter[currentLength]){
                currentLength += 1;

            }else {
                currentLength = 0;

            }

            if (currentLength == filter.length){
                result.push([data.Goals[Object.keys(data.Goals)[i]], 0, Object.keys(data.Goals)[i]])
                break;

            }

        }

    }

    for (let i = 0; i < Object.keys(data.Tasks).length; i++){
        taskDate = data.Tasks[Object.keys(data.Tasks)[i]].Date.toString();
        taskName = data.Tasks[Object.keys(data.Tasks)[i]].Name.toString();

        currentLength = 0
        for (let j = 0; j < taskDate.length; j++){
            if (taskDate[j] == filter[currentLength]){
                currentLength += 1;

            }else {
                currentLength = 0;

            }

            if (currentLength == filter.length){
                result.push([data.Tasks[Object.keys(data.Tasks)[i]], 1, Object.keys(data.Tasks)[i]])
                break;

            }

        }

        currentLength = 0
        for (let j = 0; j < taskName.length; j++){
            if (taskName[j] == filter[currentLength]){
                currentLength += 1;

            }else {
                currentLength = 0;

            }

            if (currentLength == filter.length){
                result.push([data.Tasks[Object.keys(data.Tasks)[i]], 1, Object.keys(data.Tasks)[i]])
                break;

            }

        }

    }

    //Add all results to contents
    for (let i = 0; i < result.length; i++){
        newElement = document.createElement('div');
        
        //Add required info
        elementType = document.createElement('div');
        if (result[i][1] == 0){
            elementType.textContent = "Type: Goal"

        }else {
            elementType.textContent = "Type: Task"

        }
        newElement.appendChild(elementType);

        elementName = document.createElement('div');
        elementName.textContent = "Name: " + result[i][0].Name;
        newElement.appendChild(elementName);

        elementDate = document.createElement('div');
        elementDate.textContent = "Date: " + result[i][0].Date;
        newElement.appendChild(elementDate);

        editElement = document.createElement('button');
        editElement.addEventListener('click', () => {
            ipcRenderer.invoke('edit-Page', result[i]);

        })
        editElement.textContent = "Edit";
        editElement.id = "editButton";
        newElement.appendChild(editElement);

        newElement.id = "contentElement";
        contents.appendChild(newElement);

    }

})

//Gather data from local storage
async function getData(){
    data = await ipcRenderer.invoke('gather-data', []);
    await clearCalendar();
    createCalendar();
    
}

//Call get data
getData();