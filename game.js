document.addEventListener('DOMContentLoaded', () => {
    const joystick = document.getElementById('joystick');
    const character = document.getElementById('character');
    let joystickActive = false;
    let startX, startY;

    joystick.addEventListener('touchstart', (e) => {
        joystickActive = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    joystick.addEventListener('touchmove', (e) => {
        if (!joystickActive) return;
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        moveCharacter(deltaX, deltaY);
    });

    joystick.addEventListener('touchend', () => {
        joystickActive = false;
    });

    function moveCharacter(deltaX, deltaY) {
        const rect = character.getBoundingClientRect();
        character.style.left = rect.left + deltaX + 'px';
        character.style.top = rect.top + deltaY + 'px';
        startX += deltaX;
        startY += deltaY;
    }
});
