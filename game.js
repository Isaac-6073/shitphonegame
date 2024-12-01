const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 60,
    width: 30,
    height: 30,
    speed: 5,
    dx: 0,
    dy: 0
};

function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;

    // 벽 충돌 감지
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function update() {
    clear();
    drawPlayer();
    newPos();
    requestAnimationFrame(update);
}

function moveUp() { player.dy = -player.speed; }
function moveDown() { player.dy = player.speed; }
function moveLeft() { player.dx = -player.speed; }
function moveRight() { player.dx = player.speed; }
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') moveRight();
    else if (e.key === 'ArrowLeft' || e.key === 'Left') moveLeft();
    else if (e.key === 'ArrowUp' || e.key === 'Up') moveUp();
    else if (e.key === 'ArrowDown' || e.key === 'Down') moveDown();
}
function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') player.dx = 0;
    if (e.key === 'ArrowUp' || e.key === 'Up' || e.key === 'ArrowDown' || e.key === 'Down') player.dy = 0;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// 터치 이벤트 추가
canvas.addEventListener('touchstart', (e) => {
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    const touchY = e.touches[0].clientY - canvas.offsetTop;

    if (touchX < player.x) moveLeft();
    if (touchX > player.x + player.width) moveRight();
    if (touchY < player.y) moveUp();
    if (touchY > player.y + player.height) moveDown();
});

canvas.addEventListener('touchend', () => {
    player.dx = 0;
    player.dy = 0;
});

update();
