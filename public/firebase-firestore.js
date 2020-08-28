var db = firebase.firestore();

var classData = [];
var selectedTheme;


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
<<<<<<< HEAD
            // console.log("Document successfully written!");
=======
            console.log("Document successfully written!");
>>>>>>> a520c3a3a484a6c2caca7024ba6529f4e1aac331
            
        })
        .catch(function(error) {
            // console.error("Error writing document: ", error);
        });
        ct++;
    });

    var select = document.getElementById("themeSelect");
<<<<<<< HEAD
    db.collection("users").doc(signedInFbUser.uid).set({
=======
    db.collection("users").doc(signedInUser.uid).set({
>>>>>>> a520c3a3a484a6c2caca7024ba6529f4e1aac331
        theme: select.options[select.selectedIndex].value
    }, { merge: true }).then(function() {
        location.reload();
        return false;
    });

    // getData();
    // setTimeout(startApp(), 2000);
    
}

function getData() {
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

    db.collection("users").doc(signedInUser.uid).get().then(function(doc) {
        selectedTheme = doc.data().theme;
        document.getElementById("colorScheme").href = "themes/" + doc.data().theme + ".css";
    });
}