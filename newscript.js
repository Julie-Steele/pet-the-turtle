let score = -5;
let newX, newY;
let background = 0;

const button1 = document.getElementById('clicker-button1');
const button2 = document.getElementById('clicker-button2');
const buffer = 100; // Buffer distance from cursor and edge

function moveButton(e, button) {
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

    var curtext = button.innerText;
    if (curtext == "||") {
        button.innerText = ")(";
    }
    else {
        button.innerText = "||";
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
}

document.addEventListener('mousemove', function(e){
    moveButton(e, button1);
    moveButton(e, button2);
});

function updateButtonPosition(button) {
    let { newX, newY } = getRandomPosition(button);

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
    updateButtonPosition(button1);
    updateButtonPosition(button2);
}

button1.addEventListener('click', function(e) {
    scoreup();
});

button2.addEventListener('click', function(e) {
    scoreup();
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'd' || event.key === 'D') {
        scoreup();
    }
});