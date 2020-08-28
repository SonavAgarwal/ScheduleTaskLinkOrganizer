var firebaseConfig = {
    apiKey: "AIzaSyB1YvwPEXVKpis9um5ulPNmsWxyhGW2J48",
    authDomain: "schedulelinkorganizer.firebaseapp.com",
    databaseURL: "https://schedulelinkorganizer.firebaseio.com",
    projectId: "schedulelinkorganizer",
    storageBucket: "schedulelinkorganizer.appspot.com",
    messagingSenderId: "499844671144",
    appId: "1:499844671144:web:afb041eaf67123fcb5c49d", 

    clientId: "499844671144-nbfj1pssfh8cip05ktflb2sgliq478j5.apps.googleusercontent.com",
    scopes: [
        "https://www.googleapis.com/auth/tasks"
    ], 
    discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"
    ]
};
firebase.initializeApp(firebaseConfig);