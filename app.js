const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };

function gameLoop() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= tileCount || head.y >= tileCount ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert('Game Over!');
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
    case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
    case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
    case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
  }
});

setInterval(gameLoop, 200);
