let score = 0;

const button = document.getElementById('clicker-button');
const maxX = window.innerWidth - button.offsetWidth;
const maxY = window.innerHeight - button.offsetHeight;

document.addEventListener('mousemove', function(e) {
    let buttonRect = button.getBoundingClientRect();
    let buttonX = buttonRect.left + (buttonRect.width / 2);
    let buttonY = buttonRect.top + (buttonRect.height / 2);
    let deltaX = buttonX - e.clientX;
    let deltaY = buttonY - e.clientY;

    // Normalize delta
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let maxDistance = 50; // Maximum distance the button will move per event
    let moveX = (deltaX / distance) * maxDistance;
    let moveY = (deltaY / distance) * maxDistance;

    // Calculate new position
    let newX = buttonX + moveX;
    let newY = buttonY + moveY;

    // Ensure the button stays within the viewport
    

    if (newX < 0 + buttonRect.width / 2) newX = maxX - buttonRect.width / 2;
    if (newY < 0 + buttonRect.height / 2) newY = maxY - buttonRect.height / 2;


    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    button.style.left = newX - (buttonRect.width / 2) + 'px';
    button.style.top = newY - (buttonRect.height / 2) + 'px';
    button.style.position = 'absolute';
});

button.addEventListener('click', function() {
    score++;
    document.getElementById('score').innerText = score;
});
