const man = document.getElementById('man');
const gameContainer = document.getElementById('game-container');

let manPosition = 50; // Initial position of the man (percentage)
let rocks = [];

function moveLeft() {
  if (manPosition > 0) {
    manPosition -= 5;
    updateManPosition();
  }
}

function moveRight() {
  if (manPosition < 100) {
    manPosition += 5;
    updateManPosition();
  }
}

function updateManPosition() {
  man.style.left = `${manPosition}%`;
}

function createRock() {
  const rock = document.createElement('div');
  rock.className = 'rock';
  const randomPosition = Math.random() * 100;
  rock.style.left = `${randomPosition}%`;
  gameContainer.appendChild(rock);
  rocks.push(rock);
}

function moveRocks() {
  rocks.forEach((rock) => {
    const currentTop = parseFloat(rock.style.top) || 0;
    rock.style.top = `${currentTop + 2}px`;

    // Check collision with the man
    const manRect = man.getBoundingClientRect();
    const rockRect = rock.getBoundingClientRect();

    if (
      rockRect.bottom >= manRect.top &&
      rockRect.top <= manRect.bottom &&
      rockRect.left <= manRect.right &&
      rockRect.right >= manRect.left
    ) {
      gameOver();
    }

    // Remove rocks that have gone out of the screen
    if (rockRect.top >= window.innerHeight) {
      rock.remove();
    }
  });
}

function gameOver() {
  alert('Game Over!');
  location.reload(); // Reload the page to restart the game
}

setInterval(createRock, 300); // Create a new rock every 2 seconds
setInterval(moveRocks, 16); // Move rocks every 16 milliseconds (60 FPS)

