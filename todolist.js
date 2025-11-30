// Get references to the necessary DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// --- EVENT LISTENERS ---

// 1. Add task when the button is clicked
addTaskBtn.addEventListener('click', addTask);

// 2. Add task when 'Enter' key is pressed in the input field
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 3. Handle toggling and deleting tasks on the list
taskList.addEventListener('click', handleTaskActions);

// 4. Load saved tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// --- CORE FUNCTIONS ---

/**
 * Creates a new task and adds it to the list.
 */
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create the task element
    const li = createTaskElement(taskText);

    // Add the new task to the list and clear the input
    taskList.appendChild(li);
    taskInput.value = '';

    // Save the updated list to Local Storage
    saveTasks();
}

/**
 * Handles clicks on the list (toggling complete or deleting).
 * @param {Event} e - The click event object.
 */
function handleTaskActions(e) {
    const clickedElement = e.target;

    // Check if the delete button was clicked
    if (clickedElement.classList.contains('delete-btn') || clickedElement.parentElement.classList.contains('delete-btn')) {
        // Find the parent <li> and remove it
        const li = clickedElement.closest('li');
        taskList.removeChild(li);
        saveTasks();
    } 
    // Check if the list item (task text) was clicked
    else if (clickedElement.tagName === 'LI') {
        clickedElement.classList.toggle('completed');
        saveTasks();
    }
}

// --- UTILITY FUNCTIONS ---

/**
 * Generates the HTML structure for a single task item.
 * @param {string} text - The text content of the task.
 * @param {boolean} isCompleted - Whether the task is marked completed.
 * @returns {HTMLLIElement} The created list item element.
 */
function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = text;
    
    if (isCompleted) {
        li.classList.add('completed');
    }

    // Create the delete button (with Font Awesome icon)
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // Use Font Awesome icon

    li.appendChild(deleteBtn);
    return li;
}

/**
 * Saves the current tasks in the list to the browser's Local Storage.
 */
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent.trim(), // Get text before the button
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

/**
 * Loads tasks from Local Storage when the application starts.
 */
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            const li = createTaskElement(task.text, task.completed);
            taskList.appendChild(li);
        });
    }
}