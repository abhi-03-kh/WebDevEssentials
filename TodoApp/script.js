document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const addTask = () => {                                         // this function handles adding a new task
    const taskInput = document.getElementById("task-input")
    const text = taskInput.value.trim();                     // removes extra spaces

    if (text) {
        tasks.push({text:text, completed: false});         //stops task to initially completed
        taskInput.value = "";                        //clear the input field
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;  //inverts the completed status
    console.log({tasks});
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);         //removes the task from tasks at "tasks" array
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("task-input")
    taskInput.value = tasks[index].text          //sets input value to the text of the task being edited

    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {                                             //for progress bar & text count
    const completedTasks = tasks.filter(task => task.completed).length    
    const totalTasks = tasks.length
    const progress = (completedTasks/totalTasks)*100
    const progressBar = document.getElementById("tp1")
    progressBar.style.width = `${progress}%`;                    //sets the progress bar based on the completion percentage

    document.getElementById("tc1").innerText = `${completedTasks} / ${totalTasks}`;

    if (tasks.length &&  completedTasks === totalTasks) {
        blashedConfetti();
    }
};



const updateTasksList = ()=> {                            // updates displayed taskList 
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";                                //clears current task list

    tasks.forEach((task, index) => {             // iterates over each task and creates a list item for it
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                  <input type = "checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                  <p>${task.text}</p>
                </div>
                <div class="icons">
                  <img src="assets/edit.svg" onClick = "editTask(${index})" />
                  <img src="assets/bin.svg" onClick = "deleteTask(${index})" />
                </div>
        </div>`;
        listItem.addEventListener("change", ()=> toggleTaskComplete(index))     //toggle for checkbox

        taskList.appendChild(listItem)     // Adds the listItem as a child of the taskList container
    });
};

document.getElementById("new-task").addEventListener("click",function(e){
    e.preventDefault();

    addTask();
});

const blashedConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}