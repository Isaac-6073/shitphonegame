document.addEventListener('DOMContentLoaded', () => {
    const joystick = document.getElementById('joystick');
    const joystickContainer = document.getElementById('joystick-container');
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
        moveJoystick(deltaX, deltaY);
        moveCharacter(deltaX, deltaY);
    });

    joystick.addEventListener('touchend', () => {
        joystickActive = false;
        resetJoystick();
    });

    function moveJoystick(deltaX, deltaY) {
        const rect = joystickContainer.getBoundingClientRect();
        const joystickRect = joystick.getBoundingClientRect();
        const newX = Math.min(Math.max(joystickRect.left + deltaX, rect.left), rect.right - joystickRect.width);
        const newY = Math.min(Math.max(joystickRect.top + deltaY, rect.top), rect.bottom - joystickRect.height);
        joystick.style.left = newX - rect.left + 'px';
        joystick.style.top = newY - rect.top + 'px';
    }

    function moveCharacter(deltaX, deltaY) {
        const rect = character.getBoundingClientRect();
        character.style.left = rect.left + deltaX + 'px';
        character.style.top = rect.top + deltaY + 'px';
        startX += deltaX;
        startY += deltaY;
    }

    function resetJoystick() {
        joystick.style.left = '50%';
        joystick.style.top = '50%';
    }
});
