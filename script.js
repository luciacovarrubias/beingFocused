
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");


function showPlaceholder(){
    const input = document.getElementById('principalTitle');
    if (!input.value) {
        input.placeholder = 'Hora de planear ...';
    }
}

function changeTitle(){
    const input = document.getElementById('principalTitle');
    const title = document.getElementById('dynamicTitle');

    title.textContent = input.value;
    input.value = '';
    showPlaceholder();
}


function addTask() {
    const task = inputBox.value.trim();
    if (!task){
        showCustomAlert("La tarea no puede estar vacía");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="delete-btn"><i class="fa-regular fa-trash-can" style="color: #cacfd8;"></i></span>
        <span class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #cacfd8;"></i></span>
        `;

    listContainer.appendChild(li);
    inputBox.value = "";

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", function(){
        const update = prompt("Editar tarea:", taskSpan.textContent);
        if (update !== null && update.trim() !=="") {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        } else if (update !== null && update.trim() === ""){
            showCustomAlert("La tarea no puede estar vacía");
        }
    });

    deleteBtn.addEventListener("click", function(){
        if(confirm("Estas seguro de eliminar esta tarea?")){
            li.remove();
            updateCounters();
        }
    })
}


function showCustomAlert(message) {
    const alertBox = document.querySelector(".alerts");
    const alertMsg = alertBox.querySelector(".msg");
    
    alertMsg.textContent = message;
    alertBox.classList.remove("hide");
    alertBox.classList.add("show");
    
    setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.classList.add("hide");
    }, 3000);
}

document.querySelector(".close-btn").addEventListener("click", function() {
    const alertBox = document.querySelector(".alerts");
    alertBox.classList.remove("show");
    alertBox.classList.add("hide");
});

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function updateCounters(){
    const completedTasks = listContainer.querySelectorAll(".completed").length;
    const uncompletedTasks = listContainer.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;

}

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

const descanso = new Audio("sound/descanso.wav");
const descansoLargo = new Audio ("sound/descansoLargo.wav");
const ciclo = new Audio ("sound/ciclo.wav");

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
                document.getElementById('timerLabel').textContent = 'Descanso';
                descansoLargo.play();
            } else {
                currentTime = breakTime;
                document.getElementById('timerLabel').textContent = 'Pausa';
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

var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();

initCalendar();
console.log(startDay());

function initCalendar(){
    $("#text_day").text(day);
    $("#text_month").text(monthName[currentMonth]);
    $("#text_month_02").text(monthName[month]);
    $("#text_year").text(year);

    $(".item_day").remove();

    for(let i = startDay(); i>0; i--){
        $(".container_days").append(`<span class = "week_days_item item_day prev_days">${getTotalDays(month-1)-(i-1)}</span>`);
    }

    for (let i=1; i<=getTotalDays(month); i++){
        if (i==day && month==currentMonth){
            $(".container_days").append(`<span class="week_days_item item_day today">${i}</span>`);
        } else {
            $(".container_days").append(`<span class = "week_days_item item_day">${i}</span>`);
        }
    }
};

function getNextMonth(){
    if(month !== 11){
        month++;
    } else {
        year++;
        month = 0;
    }
    initCalendar();
}

function getPrevMonth(){
    if (month !== 0){
        month--;
    } else {
        year--;
        month = 11;
    }
    initCalendar();
}

function startDay (){
    var start = new Date(year, month, 1);
    return start.getDay();
}

function leapYear(){
    return((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays(m){
    if (m === -1) m = 11;

    var numMonthReal = m +1;

    if (numMonthReal === 1 || numMonthReal === 3 || numMonthReal === 5 || numMonthReal === 7 ||
        numMonthReal === 8 || numMonthReal === 10 || numMonthReal === 12 ){
        return 31;
    } else if (numMonthReal === 4 || numMonthReal === 6 || numMonthReal === 9 || numMonthReal === 11){
        return 30;
    } else {
        return leapYear() ? 29:28;
    }
}

$("#next_month").click(function(){
    getNextMonth();
});

$("#last_month").click(function(){
    getPrevMonth();
});