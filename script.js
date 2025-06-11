let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timerDisplay = document.querySelector('.timer-display');
const lapsContainer = document.querySelector('.laps');

function updateTimeDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    timerDisplay.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateTimeDisplay, 1000);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    timerDisplay.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = timerDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
});
