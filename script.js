const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// const bells = new Audio ('./sounds/bell.wav');
// const startBtn = document.querySelector('.btn-start');
// const session = document.querySelector('.minutes');
// let myInterval;
// let state = true;
// let paused = false;
// let totalSeconds;


function addTask() {
    const task = inputBox.value.trim();
    if (!task){
        alert("Please write down a task");
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
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null && update.trim() !=="") {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        } else if (update !== null && update.trim() === ""){
            alert("Task cannot be empty!");
        }
    });

    deleteBtn.addEventListener("click", function(){
        if(confirm("Are you sure you want to delete this task?")){
            li.remove();
            updateCounters();
        }
    })
}

function updateCounters(){
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;

    updateCounters();
}


// const appTimer = () =>{
//     const sessionAmount = Number.parseInt(session.innerText);
//     if(state) {
//         state = false;
//         paused = false;
//         totalSeconds = sessionAmount*60;

//         const updateSeconds = () => {
//             if(!paused){
//                 totalSeconds--;

//                 const minuteDiv = document.querySelector('.minutes');
//                 const secondDiv = document.querySelector('.seconds');

//                 let minutesLeft = Math.floor(totalSeconds/60);
//                 let secondsLeft = totalSeconds % 60;

//                 if (secondsLeft < 10){
//                     secondDiv.textContent = '0' + secondsLeft;
//                 } else {
//                     secondDiv.textContent = secondsLeft;
//                 }
//                 minuteDiv.textContent = minutesLeft;

//                 if(minutesLeft === 0 && secondsLeft === 0) {
//                     bells.play()
//                     clearInterval(myInterval);
//                     state = true;
//                 }
//             }
//         };

//         myInterval = setInterval(updateSeconds, 1000);
//     } else {
//         alert('Session has already staryed.');
//     }
// };

// const pauseTimer = () =>{
//     paused = !paused;
//     const pauseBtn = document.getElementById('pauseBtn');
//     if (paused) {
//         pauseBtn.textContent = 'Resume';
//     } else {
//         pauseBtn.textContent = 'Pause';
//     }
// };

// const resetTimer = () => {
//     clearInterval(myInterval);
//     state = true;
//     paused= false;
//     totalSeconds = 0;

//     const minuteDiv = document.querySelector('.minutes');
//     const secondDiv = document.querySelector('.seconds');
//     minuteDiv.textContent = '25';
//     secondDiv.textContent = '00';

//     const pauseBtn = document.getElementById('pauseBtn');
//     pauseBtn.textContent = 'Pause';
// };

// document.getElementById('startBtn').addEventListener('click', appTimer);
// document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
// document.getElementById('resetBtn').addEventListener('click', resetTimer);

// // startBtn.addEventListener('click', appTimer);
