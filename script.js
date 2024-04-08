let score = -5;
let newX, newY;
let background = 0;

const button = document.getElementById('clicker-button');

const buffer = 100; // Buffer distance from cursor and edge

document.addEventListener('mousemove', function(e){
    // Recalculate maxX and maxY in case of window resize
    const maxX = window.innerWidth - button.offsetWidth;
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
}

button.addEventListener('click', function(e) {
    scoreup();
});


window.addEventListener('keydown', function(event) {
    if (event.key === 'd' || event.key === 'D') {
        scoreup();
    }
});