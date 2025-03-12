let timerInterval;
let isRunning = false;
let isWorkMode = true;
let workDuration = 20 * 60;
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
    // Update progress bar
    const totalDuration = isWorkMode ? workDuration : breakDuration;
    const progressPercentage = ((totalDuration - currentTime) / totalDuration) * 100;
    document.querySelector('.progress').style.width = `${progressPercentage}%`;
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
    document.getElementById('focus-message').textContent = ''; // Clear the displayed focus message
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

updateTimerDisplay();

// Override start button event listener to show focus modal popup
startButton.addEventListener('click', () => {
    if (!isRunning) {
        showFocusPopup();
    }
});

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

// Function to show focus popup modal
function showFocusPopup() {
    const popup = document.getElementById('focus-popup');
    popup.style.display = 'flex';
}

// Listen for the 'Go' button click in the modal
document.getElementById('focus-go').addEventListener('click', () => {
    const focusInput = document.getElementById('focus-input');
    const focusMessage = document.getElementById('focus-message');
    focusMessage.textContent = focusInput.value;
    document.getElementById('focus-popup').style.display = 'none';
    focusInput.value = '';
    startTimer();
}); 