let timerInterval;
let isRunning = false;
let isWorkMode = true;
let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let currentTime = workDuration;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workButton = document.getElementById('work');
const breakButton = document.getElementById('break');
const durationButtons = document.querySelectorAll('.duration');

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                switchMode();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    currentTime = isWorkMode ? workDuration : breakDuration;
    updateTimerDisplay();
}

function switchMode() {
    isWorkMode = !isWorkMode;
    currentTime = isWorkMode ? workDuration : breakDuration;
    updateTimerDisplay();
    workButton.classList.toggle('active', isWorkMode);
    breakButton.classList.toggle('active', !isWorkMode);
}

function setWorkDuration(minutes) {
    workDuration = minutes * 60;
    if (isWorkMode) {
        currentTime = workDuration;
        updateTimerDisplay();
    }
    // Update active state of duration buttons
    durationButtons.forEach(button => {
        button.classList.remove('active');
        if (button.id === `duration-${minutes}`) {
            button.classList.add('active');
        }
    });
}

// Add click event listeners for duration buttons
durationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const minutes = parseInt(button.id.split('-')[1]);
        setWorkDuration(minutes);
    });
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workButton.addEventListener('click', () => {
    if (!isWorkMode) {
        switchMode();
    }
});
breakButton.addEventListener('click', () => {
    if (isWorkMode) {
        switchMode();
    }
});

updateTimerDisplay(); 