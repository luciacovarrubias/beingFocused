let workTime = 25 * 60;
let breakTime = 5 * 60;
let longBreakTime = 10 * 60;
let currentTime = workTime;
let isWork = true;
let isPaused = true;
let cycles = 0;
let workSessions = 0;
let interval;
let totalTime;

const descanso = new Audio("../sound/descanso.wav");
const descansoLargo = new Audio ("../sound/descansoLargo.wav");
const ciclo = new Audio ("../sound/ciclo.wav");

function startTimer() {
    if (isPaused) {
        isPaused = false;
        totalTime = currentTime;
        interval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    if (!isPaused) {
        clearInterval(interval);
        isPaused = true;
    }
}

function resetTimer() {
    clearInterval(interval);
    isPaused = true;
    cycles = 0;
    workSessions = 0;
    document.getElementById('cycles').textContent = cycles;
    isWork = true;
    workTime = document.getElementById('workTime').value * 60;
    breakTime = document.getElementById('breakTime').value * 60;
    longBreakTime = document.getElementById('longBreakTime').value * 60;
    currentTime = workTime;
    document.getElementById('timerLabel').textContent = 'Trabajo';
    updateDisplay();
    resetProgressBar();
}

function updateTimer() {
    if (currentTime > 0) {
        currentTime--;
        updateProgressBar();
    } else {
        if (isWork) {
            workSessions++;
            if (workSessions % 4 === 0) {
                currentTime = longBreakTime;
                cycles++;
                ciclo.play();
                document.getElementById('cycles').textContent = cycles;
                document.getElementById('timerLabel').textContent = 'Descanso Largo';
                descansoLargo.play();
            } else {
                currentTime = breakTime;
                document.getElementById('timerLabel').textContent = 'Descanso';
                descanso.play();
            }
            isWork = false;
        } else {
            isWork = true;
            currentTime = workTime;
            document.getElementById('timerLabel').textContent = 'Trabajo';
        }
        totalTime = currentTime;
        resetProgressBar();
    }
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateProgressBar() {
    const progress = (workSessions % 4) / 4 * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function resetProgressBar() {
    document.getElementById('progressBar').style.width = '0%';
}

resetTimer();
