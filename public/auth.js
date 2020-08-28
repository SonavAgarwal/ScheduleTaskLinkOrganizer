// var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/tasks');

var signedInFbUser = null;
var isNew = false;
var authAccessToken;

gapi.load('client:auth2', clientInitTimeout);

function clientInitTimeout() {
    setTimeout(initGapiClient, 10);
}

function initGapiClient() {
    gapi.client.init({
        apiKey: firebaseConfig.apiKey,
        clientId: firebaseConfig.clientId,
        discoveryDocs: firebaseConfig.discoveryDocs,
        scope: firebaseConfig.scopes.join(' '),
      }).then(function () {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            // console.log(getCookie("accessToken"));
            // gapi.client.setToken({access_token: getCookie("accessToken")});
            // setTimeout(listTasks, 2000);
      }).catch(function(err) {
          console.log(err);
      });
}

// gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        var auth2 = gapi.auth2.getAuthInstance();
        var currentUser = auth2.currentUser.get();
        var authResponse = currentUser.getAuthResponse(true);
        var credential = firebase.auth.GoogleAuthProvider.credential(
        authResponse.id_token,
        authResponse.access_token
        );
    
        firebase.auth().signInWithCredential(credential)
        .then( function(userCredential) {

            signedInFbUser = userCredential.user;
            

            startApp();
        });
    } else {
        goSignInPage();
    }
    
}

function signIn() {
    gapi.auth2.getAuthInstance().signIn();
    // firebase.auth().signInWithRedirect(provider);
}

// signOut();

function signOut() {
    
    firebase.auth().signOut().then(function() {
        console.log("signed out successfully");
      }).catch(function(error) {
        // An error happened.
      });
    gapi.auth2.getAuthInstance().signOut();
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}