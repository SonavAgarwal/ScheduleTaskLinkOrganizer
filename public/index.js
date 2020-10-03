//load resources and set up variables
// const timeData = JSON.parse(normalScheduleData)[0].times;
const numToDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var classTitles = document.getElementsByClassName("classText");
var selectedClass = 0;
var currentPeriod = -5;

var manual = false;

function startApp() {
    getData();
    populateData();
    getTaskList();
    
    if (isNew) {
        document.getElementById("backHome").style.display = "none";
        document.getElementById("submitInfoButton").innerHTML = "Submit Information";
        goAddClassesPage();
    } else {
        goHomePage();
    }
}

function populateData() {
    try {
        classData[0].name;
        try {
            checkTime();
            renderSelectedClass(classData[currentPeriod].name);
            window.setInterval(checkTime, 20000);
            renderClassesList();
            fillAddInfo();
        } catch (err) {
            console.log(err);
        }
        
    } catch {
        setTimeout(populateData, 250);
    }
}

function fillAddInfo() {
    var select = document.getElementById("themeSelect");

    var opt;
    for ( var i = 0, len = select.options.length; i < len; i++ ) {
        opt = select.options[i];
        if ( opt.value == selectedTheme ) {
            select.selectedIndex = i;
            break;
        }
    }
    
    // get selected option in sel (reference obtained above)
    var ct = 0;
    Array.from(document.getElementsByClassName("classAddInfoDiv")).forEach(classDiv => {
        var enteredInfo = classDiv.children;
        enteredInfo[1].value = classData[ct].name;
        enteredInfo[3].value = classData[ct].zoom;
        enteredInfo[4].value = classData[ct].zoompwd;
        enteredInfo[5].value = classData[ct].canvas;
        enteredInfo[6].value = classData[ct].other;
        ct++;
    });
}

function select(selectedClassName) {
    if (selectedClassName == "All Tasks") renderAllTasksBox();
    else renderSelectedClass(selectedClassName.substring(3));
    manual = true;
}

function checkTime() {

    console.log("updated");

    //get today
    var today = new Date();
    // console.log(today);

    //find the day of the week's schedule
    for (var i = 0; i < timeData.length; i++) {
        if (numToDay[today.getDay()] == timeData[i].day) {

            // console.log("found " + numToDay[today.getDay()]);
            //find the period of the day
            for (var j = 0; j < 8; j++) {
                try {
                    //get start and end times of period
                    var tempToday = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
                    tempToday = yyyy + '-' + mm + '-' + dd + " ";

                    var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    // console.log(currentTime);
                    
                    var realStartTime = timeData[i].periods[0][j]
                    var periodLength = timeData[i].periodLength;

                    var startTime = subtractTimes(realStartTime, "0:15");
                    var endTime = addTimes(realStartTime, periodLength);

                    var periodTime = new Date(tempToday + startTime + ":00");
                    var periodEndTime = new Date(tempToday + endTime + ":00");

                    var actualPeriodTime = new Date(tempToday + realStartTime + ":00");

                    // console.log("--------")
                    // console.log(today);
                    // console.log(periodTime);

                    //during this time period?
                    if (today > periodTime && today <= periodEndTime) {
                        // console.log(periodTime)
                        // console.log(j)
                        if (currentPeriod != j - 1) {

                            var displayedText = classData[j - 1].name;
                            if (displayedText.length > 11) displayedText = displayedText.substring(0, 10) + "...";

                            document.getElementById("time").innerHTML = "P" + (j + 0) + ": " + timeData[i].periods[0][j] + " " + displayedText;
                            currentPeriod = j - 1;
                            renderSelectedClass(classData[j - 1].name);
                        }

                        if (today < actualPeriodTime && today >= periodTime) {
                            // bar to 0
                            document.getElementById("bigProgressBar").style.width = "0";
                            var titleTimeString = secondsToTime(Math.abs(timeToSeconds(currentTime) - timeToSeconds(realStartTime + ":00")));
                            document.title = titleTimeString + " Passing";
                            setTimeout(changeTimeBy, 1000, -1, "Passing", 1, titleTimeString);
                        } else {
                            document.getElementById("bigProgressBar").style.width = ((timeToSeconds(currentTime) - timeToSeconds(realStartTime + ":00")) / timeToSeconds(periodLength + ":00") * 100)+ "%";
                            var titleTimeString = secondsToTime(Math.abs(timeToSeconds(periodLength + ":00") - (timeToSeconds(currentTime) - timeToSeconds(realStartTime + ":00"))));
                            document.title = titleTimeString + " " + classData[j - 1].name;
                            setTimeout(changeTimeBy, 1000, -1, classData[j - 1].name, 1, titleTimeString);
                        }

                        

                        return;
                    } else {
                        continue;
                    }
                } catch (err) {
                    ; //no period of some number
                }
                
            }
            break;
        }
    }
    
    //not in a period
    document.getElementById("time").innerHTML = "Free time";
    document.getElementById("bigProgressBar").style.width = 0;
    document.title = "Free Time"
    currentPeriod = 0;
    if (selectedClass != 7 && !manual) {
        select("All Tasks");
        manual = false;
    }
}

function changeTimeBy(t, classString, depth, old) {
    if (timeToSeconds(old) + t >= 0) {
        if (depth < 20) {
            var newTime = secondsToTime(timeToSeconds(old) + t);
            document.title = newTime + " " + classString; 
            setTimeout(changeTimeBy, 1000, t, classString, depth + 1, newTime);
        }
    } else {
        checkTime();
    }
}

function timeToSeconds(time) {
    var parts = time.split(":");
    return parts[0] * 60 * 60 + (parts[1] * 60) + (parts[2] * 1);
}

function timeToMin(time) {
    var parts = time.split(":");
    return parts[0] * 60 + (parts[1] * 1);
}

function secondsToTime(seconds) {
    var h = Math.floor(seconds / 3600);
    var m;
    if (seconds > 3600) {
        m = Math.floor((seconds - 3600) / 60);
    } else {
        m = Math.floor(seconds / 60);
    }
        
    var s = seconds % 60;
    return h + ':' + m + ":" + s;
}

function minToTime(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h + ':' + m;
}

function addTimes(time1, time2) {
    return minToTime(timeToMin(time1) * 1 + timeToMin(time2) * 1);
}

function subtractTimes(time1, time2) {
    return minToTime(timeToMin(time1) - timeToMin(time2));
}
