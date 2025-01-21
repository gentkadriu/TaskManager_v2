const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Load tasks from the backend
const loadTasks = async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.name;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
};

// Add a new task to the backend
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = document.getElementById('taskInput').value;

    try {
        await fetch('http://localhost:3000/backend/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: task })
        });
        loadTasks(); // Reload the tasks list
        document.getElementById('taskInput').value = '';
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Load tasks on page load
loadTasks();
