
document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn'); 
    const taskInput = document.getElementById('task-input'); 
    const taskList = document.getElementById('task-list'); 

    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    function saveStoredTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(function(taskText) {
            addTask(taskText, false);
        });
    }

    function addTask(taskText, save = true) {

        taskText = taskText.trim();

        if (taskText === '') {
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
            const tasks = getStoredTasks().filter(function(item) {
                return item !== taskText;
            });
            saveStoredTasks(tasks);
        };

   
        li.appendChild(removeBtn);

        taskList.appendChild(li);

        taskInput.value = '';

        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveStoredTasks(tasks);
        }
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
