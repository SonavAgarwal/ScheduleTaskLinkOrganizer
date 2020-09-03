function goHomePage() {
    flash();
    document.getElementById("homePage").style.display = "block";
    document.getElementById("signinPage").style.display = "none";
    document.getElementById("addInfoPage").style.display = "none";
    console.log("went home");
    document.getElementById("backHome").style.display = "block";
    document.getElementById("submitInfoButton").innerHTML = "Update";
}

function goSignInPage() {
    flash();
    document.getElementById("homePage").style.display = "none";
    document.getElementById("signinPage").style.display = "block";
    document.getElementById("addInfoPage").style.display = "none";
    console.log("went to signin");
}

function goAddClassesPage() {
    flash();
    document.getElementById("homePage").style.display = "none";
    document.getElementById("signinPage").style.display = "none";
    document.getElementById("addInfoPage").style.display = "block";
    console.log("went to add info");
}

function flash() {
    var box = document.getElementById("transition");
    box.classList.add("flash");
    box.style.opacity;
    
    window.setTimeout(flashMiddle, 100);
    window.setTimeout(flashFinish, 2100);
}

function flashMiddle() {
    var box = document.getElementById("transition");
    box.style.opacity = 0;
}

function flashFinish() {
    var box = document.getElementById("transition");
    box.style.opacity = 1;
    box.classList.remove("flash");
    // box.style.display = "none";
    // box.style.opacity = 1;
}

function renderSelectedClass(selectedClassName) {

    // unhighlight old class
    classTitles[selectedClass].parentElement.style.backgroundColor = "var(--backgroundColor)";

    //find new class by name
    for (var i = 0; i < classData.length; i++) {
        if (classData[i].name == selectedClassName) {

            //set data
            selectedClass = i;
            document.getElementById("className").innerHTML = classData[i].name;

            document.getElementById("zoomLink").innerHTML = "Zoom Link: " + classData[i].zoom;
            document.getElementById("zoomLink").parentElement.href = classData[i].zoom;

            document.getElementById("zoomPassword").innerHTML = "Zoom Password: " + classData[i].zoompwd;
            
            document.getElementById("canvasLink").innerHTML = "Canvas Class: " + classData[i].canvas;
            document.getElementById("canvasLink").parentElement.href = classData[i].canvas;
            
            document.getElementById("other").innerHTML = "Other: " + classData[i].other;
            document.getElementById("other").parentElement.href = classData[i].other;
                
        }
    }

    document.getElementById("zoomLink").style.display = "block";
    document.getElementById("zoomPassword").style.display = "block";
    document.getElementById("canvasLink").style.display = "block";
    document.getElementById("other").style.display = "block";
    document.getElementById("tasksDiv").style.height = "15vh";

    //hightlight new class
    classTitles[selectedClass].parentElement.style.backgroundColor = "var(--highlightColor)";

    if (taskListId != null) getTasks();

    manual = false;
}

function renderAllTasksBox() {
    classTitles[selectedClass].parentElement.style.backgroundColor = "var(--backgroundColor)";
    // if (taskListId != null) getTasks();

    selectedClass = 7;
    document.getElementById("className").innerHTML = "All Tasks";
    document.getElementById("zoomLink").style.display = "none";
    document.getElementById("zoomPassword").style.display = "none";
    document.getElementById("canvasLink").style.display = "none";
    document.getElementById("other").style.display = "none";

    document.getElementById("tasksDiv").style.height = "55vh";

    renderAllTasks();

    //hightlight new class
    classTitles[selectedClass].parentElement.style.backgroundColor = "var(--highlightColor)";
}

function renderClassesList() {
    for (var i = 0; i < classTitles.length - 1; i++) {
        classTitles[i].innerHTML = (i + 1) + ". " + classData[i].name;
    }
}

function previewSelectedTheme() {
    var select = document.getElementById("themeSelect");
    document.getElementById("colorScheme").href = "themes/" + select.options[select.selectedIndex].value + ".css";
}