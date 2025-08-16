let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const dueDate = document.getElementById("taskDueDate").value;

    if (title === "" || dueDate === "") {
        alert("El título y la fecha son obligatorios");
        return;
    }

    tasks.push({
        title,
        description,
        dueDate,
        completed: false
    });

    saveTasks();
    renderTasks();
    clearForm();
}

function clearForm() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDueDate").value = "";
}

function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";

            li.innerHTML = `
                <div>
                    <strong>${task.title}</strong> - ${task.description} <br>
                    <small>Vence: ${task.dueDate}</small>
                </div>
                <div class="actions">
                    <button onclick="toggleComplete(${index})">${task.completed ? "Desmarcar" : "Completar"}</button>
                    <button onclick="editTask(${index})">Editar</button>
                    <button onclick="deleteTask(${index})">Eliminar</button>
                </div>
            `;
            list.appendChild(li);
        });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks(document.getElementById("filter").value);
}

function deleteTask(index) {
    if (confirm("¿Eliminar esta tarea?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(document.getElementById("filter").value);
    }
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDueDate").value = task.dueDate;

    deleteTask(index);
}

function filterTasks() {
    const filter = document.getElementById("filter").value;
    renderTasks(filter);
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});
