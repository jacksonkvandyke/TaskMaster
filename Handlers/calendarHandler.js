//Create the general date object
dateObject = new Date();

function createCalendar(){
//Get the calendar objects
calendar = document.getElementById('calendar');
calendarDates = document.getElementById('calendarDates');
calendarHolder = document.getElementById('calendarHolder');

//Get starting day of month
let day = 1;
let currentDay = new Date(dateObject.getFullYear(), dateObject.getMonth(), day);
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
            day += 1;

        }else {
            //New date
            let newDate = document.createElement('td');
            calendarRow.appendChild(newDate);
            newDate.textContent = previousDay.getDate();
            newDate.id = "outsideElement";
            backDay += 1;

        }
    }

}

}

createCalendar();