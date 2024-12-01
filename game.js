const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const joystick = document.getElementById('joystick');
const stick = joystick.querySelector('.stick');

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

function handleJoystick(event) {
    const rect = joystick.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left - rect.width / 2;
    const y = event.touches[0].clientY - rect.top - rect.height / 2;

    const angle = Math.atan2(y, x);
    const distance = Math.min(Math.sqrt(x * x + y * y), rect.width / 2);

    stick.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;

    player.dx = Math.cos(angle) * player.speed * (distance / (rect.width / 2));
    player.dy = Math.sin(angle) * player.speed * (distance / (rect.width / 2));
}

function resetJoystick() {
    stick.style.transform = 'translate(-50%, -50%)';
    player.dx = 0;
    player.dy = 0;
}

joystick.addEventListener('touchstart', handleJoystick);
joystick.addEventListener('touchmove', handleJoystick);
joystick.addEventListener('touchend', resetJoystick);

update();
