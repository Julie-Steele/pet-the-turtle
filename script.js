
  
let score = -5;
let newX, newY;
let background = 0;

const button = document.getElementById('clicker-button');

var username;

document.getElementById('username-submit').addEventListener('click', function(event) {
    event.preventDefault();
    username = document.getElementById('username-input').value;
    var usernameDisplay = document.createElement('p');
    usernameDisplay.textContent = 'Username: ' + username;
    document.getElementById('username-container').appendChild(usernameDisplay);
});

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAOlqg0z1GGoKSJEF0pxlQjkGZ3TuWvgBo",
    authDomain: "pet-the-turtle.firebaseapp.com",
    projectId: "pet-the-turtle",
    storageBucket: "pet-the-turtle.appspot.com",
    messagingSenderId: "199689071494",
    appId: "1:199689071494:web:63682b452608e2cda21a07",
    measurementId: "G-RFFJBWCQH5"
  };


firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// // #test 
// db.collection("scores").doc('testing').set({
//     score: 100,
//     username: "testing"
// })
updateScoreInFirebase('testing2', 200);

button.addEventListener('click', function() {
    scoreup(); // This function will be called when the button is clicked
});

// Function to update score in Firebase
function updateScoreInFirebase(username, score) {
    db.collection("scores").doc(username).set({
        score: score,
        username: username
    })
    
    .then(function() {
        console.log("Score successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating score: ", error);
    });
}


const buffer = 100; // Buffer distance from cursor and edge

document.addEventListener('mousemove', function(e){
    // Recalculate maxX and maxY in case of window resize
    const maxX = window.innerWidth*.8 - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    let buttonRect = button.getBoundingClientRect();
    let buttonX = buttonRect.left + (buttonRect.width / 2);
    let buttonY = buttonRect.top + (buttonRect.height / 2);
    let deltaX = buttonX - e.clientX;
    let deltaY = buttonY - e.clientY;

    // Normalize delta to ensure movement is proportional
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let maxDistance = score; // Use score as the max distance for dynamic behavior
    let moveX = (deltaX / distance) * maxDistance;
    let moveY = (deltaY / distance) * maxDistance;

    // Calculate new position based on movement
    newX = buttonX + moveX;
    newY = buttonY + moveY;

    var curtext = document.getElementById('clicker-button').innerText
    if (curtext == "||") {
        document.getElementById('clicker-button').innerText = ")(";
    }
    else {
        document.getElementById('clicker-button').innerText = "||";
    }

    // Teleport to a random location if moving out of viewport or too close to cursor
    if (newX < buffer || newX > maxX - buffer) {
        do {
            newX = Math.random() * maxX;
        } while (Math.abs(newX - e.clientX) < buffer);
    }

    if (newY < buffer || newY > maxY - buffer) {
        do {
            newY = Math.random() * maxY;
        } while (Math.abs(newY - e.clientY) < buffer);
    }

    // Update button position
    button.style.left = newX - (button.offsetWidth / 2) + 'px';
    button.style.top = newY - (button.offsetHeight / 2) + 'px';
    button.style.position = 'absolute';
});

// document.addEventListener('mousemove', updateButtonPosition);

function getRandomPosition() {
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    let newX, newY;

    // Generate a random position within the viewport, away from the edges
    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
    } while (newX < buffer || newY < buffer || maxX - newX < buffer || maxY - newY < buffer);

    return { newX, newY };
}

function updateButtonPosition(e) {
    let { newX, newY } = getRandomPosition();

    // Update button position
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.position = 'absolute';
}

function scoreup() {
    if (score <= 0) {
        score++;
    }
    else{
        score *=2;
    }
    document.getElementById('score').innerText = score;

    background += 20;

    document.body.style.backgroundColor = `hsl(${background}, 100%, 70%)`;

    // Randomize the button location independently of the mouse position
    updateButtonPosition();

    // Update the score in Firebase
    updateScoreInFirebase(username, score);
    updateLeaderboard();
}


window.addEventListener('keydown', function(event) {
    if (event.key === 'd' || event.key === 'D') {
        scoreup();
        
    }
});

// Function to fetch scores from Firebase and update the leaderboard
function updateLeaderboard() {
    var leaderboardList = document.getElementById('leaderboard-list');

    // Clear the current leaderboard
    leaderboardList.innerHTML = '';

    // Fetch scores from Firebase
    db.collection('scores').orderBy('score', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Create a new list item for each score and append it to the leaderboard
            var listItem = document.createElement('li');
            listItem.textContent = doc.id + ': ' + doc.data().score;
            leaderboardList.appendChild(listItem);
        });
    });
}

// Call the function to update the leaderboard
updateLeaderboard();