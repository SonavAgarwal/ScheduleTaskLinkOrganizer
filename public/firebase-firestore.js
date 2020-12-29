var db = firebase.firestore();

var classData = [];
var selectedTheme;

var timeData;


function updateStoredData() {
    
    var ct = 0;
    Array.from(document.getElementsByClassName("classAddInfoDiv")).forEach(classDiv => {
        var enteredInfo = classDiv.children;
        db.collection("users").doc(signedInFbUser.uid).collection("classes").doc("p" + ct).set({
            name: enteredInfo[1].value,
            zoom: enteredInfo[3].value,
            zoompwd: enteredInfo[4].value,
            canvas: enteredInfo[5].value,
            other: enteredInfo[6].value
        }, {merge: true})
        .then(function() {
            goHomePage();
            // console.log("Document successfully written!");
            console.log("Document successfully written!");
            
        })
        .catch(function(error) {
            // console.error("Error writing document: ", error);
        });
        ct++;
    });

    var select = document.getElementById("themeSelect");
    db.collection("users").doc(signedInFbUser.uid).set({
        "theme": select.options[select.selectedIndex].value
    }, { merge: true }).then(function() {
        location.reload();
        return false;
    });

    // getData();
    // setTimeout(startApp(), 2000);
    
}

function getData() {

    console.log("getting data");

    db.collection("schedules").doc("scheduleValues").get().then(function(doc) {
        var currentWeekSchedule = doc.data().weekSchedule;
        // console.log("weekschedluye");
        // console.log(currentWeekSchedule);
        if (currentWeekSchedule == "Labor") {
            timeData = JSON.parse(labor)[0].times;
        } else if (currentWeekSchedule == "Finals") {
            timeData = JSON.parse(finals)[0].times;
        } else {
            timeData = JSON.parse(normalScheduleData)[0].times;
        }
    });

    console.log(signedInFbUser.uid);
    db.collection("users").doc(signedInFbUser.uid).collection("classes").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            classData.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        });
        // console.log("class data");
        // console.log(classData);

    });

    db.collection("users").doc(signedInFbUser.uid).get().then(function(doc) {
        selectedTheme = doc.data().theme;
        document.getElementById("colorScheme").href = "themes/" + doc.data().theme + ".css";
    });
    
}