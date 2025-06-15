document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn'); 
    const taskInput = document.getElementById('task-input'); 
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); 

        removeBtn.onclick = function() {
            taskList.removeChild(li);
            const tasks = getStoredTasks().filter((item) => item !== taskText);
            saveTasks(tasks);
        };

        li.appendChild(removeBtn);

        taskList.appendChild(li);

        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        taskInput.value = '';
    }

    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    loadTasks();

});
