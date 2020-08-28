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

    //hightlight new class
    classTitles[selectedClass].parentElement.style.backgroundColor = "var(--highlightColor)";
<<<<<<< HEAD

    if (taskListId != null) getTasks();
=======
>>>>>>> a520c3a3a484a6c2caca7024ba6529f4e1aac331
}

function renderClassesList() {
    for (var i = 0; i < classTitles.length; i++) {
        classTitles[i].innerHTML = (i + 1) + ". " + classData[i].name;
    }
}

function previewSelectedTheme() {
    var select = document.getElementById("themeSelect");
    document.getElementById("colorScheme").href = "themes/" + select.options[select.selectedIndex].value + ".css";
}