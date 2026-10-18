"use strict";

const taskForm = document.getElementById("task-form");
const taskId = document.getElementById("task-id");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const taskDuration = document.getElementById("task-duration");
const taskTag = document.getElementById("task-tag");
const taskSubmit = document.getElementById("task-submit");
const taskList = document.getElementById("task-list");
const taskSearch = document.getElementById("task-search");
const taskFilter = document.getElementById("task-filter");

const eventForm = document.getElementById("event-form");
const eventTitle = document.getElementById("event-title");
const eventDate = document.getElementById("event-date");
const eventList = document.getElementById("event-list");

const totalTasks = document.getElementById("total-task");
const completedTasks = document.getElementById("completed-task");
const pendingTasks = document.getElementById("pending-task");
const upcomingEvents = document.getElementById("upcoming-events");

const exportButton = document.getElementById("export-data");
const importInput = document.getElementById("import-data");
const message = document.getElementById("message");

function loadData(key) {
    try {
        const saved = localStorage.getItem(key);

        if (!saved) {
            return [];
        }
        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }

 }

 let tasks = loadData("campusTasks");
 let events =loadData("campusEvents");

 function saveData() {
    try {
        localStorage.setItem(
            "campusTasks",
            JSON.stringify(tasks)
        );

        localStorage.setItem(
            "campusEvents",
            JSON.stringify(events)
        );
    } catch (error) {
        console.error("Error saving data:", error);
        showMessage("unable to save data.");
    }
 }

 function showMessage(text) {
    if (message) {
        message.textContent = text;
    }
 }
 
 function generateId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID == "function"
    ) {
        return crypto.randomUUID();
    }

    return Date.now(). toString(36) +
     Math.random().toString(36).slice(2);
}

function updateDashboard() {
    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = tasks.length - completed;

    const now = new Date();

    const today =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2,"0");

    const upcoming = events.filter(
        event => event.date >= today
    ).length;

    if (totalTasks) {
        totalTasks.textContent = tasks.length;
    }

    if(completedTasks) {
        completedTasks.textContent = completed;
    }

    if (pendingTasks) {
        pendingTasks.textContent = pending;
    }
    
    if (upcomingEvents) {
        upcomingEvents.textContent = upcoming;
    }
}

function renderTasks() {
    taskList.innerHTML ="";

    const searchText = taskSearch
    ? taskSearch.value.toLowerCase().trim()
    : "";
     const selectedFilter = taskFilter
     ? taskFilter.value.toLowerCase()
     : "all";

     const filteredTasks = tasks.filter(task => {
        const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText);

        const matchesFilter =
            selectedFilter === "all" ||
            selectedFilter === "" ||
            (selectedFilter === "completed" && task.completed) ||
            (selectedFilter === "pending" && !task.completed);

            return matchesSearch && matchesFilter;
        });

        if (filteredTasks.length=== 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent ="No tasks found";
            taskList.appendChild(emptyMessage);
            return;
        }
       
        filteredTasks.forEach(task => {
            const card = document.createElement("article")
            card.className = "item-card";

            if (task.completed) {
                card.classList.add("completed");

            }

            const title = document.createElement("h3");
            title.textContent = task.title;

            const description = document.createElement("p");
            description.textContent = task.description;

            const date = document.createElement("p")
            date.textContent = "Due Date: " + task.date;

            const priority = document.createElement("p");
            priority.className = "priority-" + task.priority;

            const completeButton = document.createElement("button");
            completeButton.type = "button";

            completeButton.textContent = task.completed
            ? "Mark pending"
            : "Complete";

            completeButton.addEventListener("click", function() {
                task.completed = !task.completed;

                saveData();
                renderTasks();
                updateDashboard();

                showMessage("Task status updated");
            });

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.textContent = "Edit";

            editButton.addEventListener("click", function() {
                if(taskId) {
                    taskId.value = task.id;
                }

                taskTitle.value = task.title;
                taskDescription.value = task.description;
                taskDate.value =task.date;
                taskPriority.value = task.priority;
                taskDuration.value = task.duration ?? "";
                taskTag.value = task.tag ?? "";

                if (taskSubmit) {
                    taskSubmit.textContent = "Update Task";
                }

            taskTitle.focus();

            taskForm.scrollIntoView({
                behavior: "smooth",
                block: "start"

            });

        
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent ="Delete";

        deleteButton.addEventListener("click", function() {
            const confirmed = confirm(
                "Are you sure you want to delete this task?"
            );

            if(!confirmed) {
                return;
            }

            tasks = tasks.filter(
                item => item.id !== task.id
            );

            if (taskId && taskId.value === task.id) {
                taskForm.reset();
                taskId.value = "";

                if (taskSubmit) {
                    taskSubmit.textContent = "Add Task";
                }
            }
        
            saveData();
            renderTasks()
            updateDashboard();

            showMessage("Task deleted successfully.");


        });

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(date);
        card.appendChild(priority);
        card.appendChild(completeButton);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        taskList.appendChild(card);
    });

}

if (taskForm) {
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const  title = taskTitle.value;
        const description = taskDescription.value.trim();
        const date = taskDate.value;
        const priority = taskPriority.value;
        const duration = Number(taskDuration.value);
        const tag =taskTag.value.trim();


        const taskError = validateTask(title, date, priority, duration, tag);

        if (taskError) {
            showMessage(taskError);
            return;
        }

        if (taskId && taskId.value !== ""){
            const existingTask = tasks.find(
                task => task.id === taskId.value
            );

            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
                existingTask.date = date;
                existingTask.priority = priority;
                existingTask.duration = duration;
                existingTask.tag = tag;
                existingTask.updatedAt = new Date().toISOString();

                showMessage("Task updated succesfully!");
            }
        } else {
            const now = new Date().toISOString();

            const newTask = {
                id: generateId(),
                title: title,
                description: description,
                date: date,
                priority: priority,
                duration: duration,
                tag: tag,
                completed: false,
                createdAt: now,
                updatedAt: now
            };

            tasks.push(newTask);

            showMessage("Task added successfully!");
        }

        saveData();

        taskForm.reset();

        if (taskId) {
            taskId.value = "";
        }

        if (taskSubmit) {
            taskSubmit.textContent = "Add Task";
        }

        renderTasks();
        updateDashboard();
    });

}
 if (taskSearch) {
    taskSearch.addEventListener("input", function() {
        renderTasks();
    });
}
 
    
if (taskFilter) {
    taskFilter.addEventListener("change", function() {
        renderTasks();
    });                                                                                                                                                         
}





if (exportButton) {
    exportButton.addEventListener("click", function() {
        const plannerData = {
            tasks: tasks,
            events: events
        };

        const jsonData = JSON.stringify(
            plannerData,
            null,
            2
        );

        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = "campus-Life-planner.json";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(url);

        showMessage("Data exported successfully");
});

}

if(importInput) {
    importInput.addEventListener("change", async function (event) {
        const file = event.target.files[0];s

        if(!file) {
            return;
        }

        try {
            const fileContent = await file.text();
            const importedData = JSON.parse(fileContent);

            if (
                !importedData ||
                !Array.isArray(importedData.tasks) ||
                !Array.isArray(importedData.events)

            ){
                throw new Error("Invalid JSON backup format.");
            }

            const validTasks = importedData.tasks.every(task =>
                task &&
                typeof task.id ==="string" &&
                typeof task.title === "string" &&
                typeof task.description === "string" &&
                typeof task.date === "string" &&
                ["low", "medium", "high"].includes(task.priority) &&
                typeof task.completed === "boolean"
            );

            const validEvents = importedData.events.every(event =>
                event &&
                typeof event.id === "string" &&
                typeof event.title === "string" &&
                typeof event.date === "string"

            );

            if (!validTasks || !validEvents) {
                throw new Error ("Invalid planner data.");
            }
            
            const confirmed = confirm(
                "Importing will replace your  current task and events.Continue?"
            );

            if (!confirmed) {
                return;
            }

            tasks = importedData.tasks;
            events = importedData.events;

            saveData();
            renderTasks();
            renderEvents();
            updateDashboard();

            showMessage("Data imported successfully!");
        } catch (error) {
            console.error("Import error:", error);

            showMessage(
                "Import failed: " + error.message
            );
        } finally {
            importInput.value = "";
        }
    });
}

function initializeApp() {
    if (!taskForm || !taskTitle  || !taskDescription ||
        !taskDate || !taskPriority || !taskList ||
        !eventForm || !eventTitle || !eventDate ||
        !eventList) {
        console.error(
            "some required HTML elements are missing .Check their IDs."
        );
        return;

    }

    renderTasks();
    renderEvents();
    updateDashboard();
    setupEventForm();

    console.log( "Campus Life Planner is ready!");
}

initializeApp();

