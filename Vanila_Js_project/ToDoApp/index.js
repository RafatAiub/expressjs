// Immediately Invoked Function Expression (IIFE) to avoid global scope pollution
(function () {
    // Select DOM elements only once for optimization
    const taskInput = document.getElementById("new-task");
    const addTaskButton = document.getElementById("add-task");
    const taskListContainer = document.getElementById("task-list");
  
    // Load tasks from localStorage when the page loads
    window.addEventListener("DOMContentLoaded", loadTasks);
  
    // Event listener to add new task
    addTaskButton.addEventListener("click", handleAddTask);
  
    // Function to load tasks from localStorage and display them
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => renderTask(task));
    }
  
    // Function to add a new task
    function handleAddTask() {
      const taskText = taskInput.value.trim();
      if (!taskText) return; // Prevent empty tasks
  
      // Create task object with additional properties for tracking
      const task = {
        id: Date.now(), // Unique ID for each task
        text: taskText,
        completed: false
      };
  
      // Render and save task
      renderTask(task);
      saveTask(task);
  
      // Clear input field after adding
      taskInput.value = "";
    }
  
    // Function to render a single task
    function renderTask(task) {
      // Create task element
      const taskElement = document.createElement("div");
      taskElement.className = "task-item";
      taskElement.setAttribute("data-id", task.id); // Add ID for tracking
  
      // Create checkbox for completion
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTask(task.id));
  
      // Create text node for task text
      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      if (task.completed) taskText.classList.add("completed"); // Strike-through for completed tasks
  
      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(task.id));
  
      // Append all elements to task container
      taskElement.appendChild(checkbox);
      taskElement.appendChild(taskText);
      taskElement.appendChild(deleteButton);
      taskListContainer.appendChild(taskElement);
    }
  
    // Function to save task to localStorage
    function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Function to toggle task completion status
    function toggleTask(taskId) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed; // Toggle completion status
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      updateUI(); // Refresh UI to reflect changes
    }
  
    // Function to delete task
    function deleteTask(taskId) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter((task) => task.id !== taskId); // Remove task by ID
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateUI(); // Refresh UI to reflect changes
    }
  
    // Helper function to refresh the UI
    function updateUI() {
      taskListContainer.innerHTML = ""; // Clear current tasks
      loadTasks(); // Reload tasks from localStorage
    }
  })();
  