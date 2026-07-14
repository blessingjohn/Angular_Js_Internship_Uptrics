app.service("TaskService", function () {

    var STORAGE_KEY = "taskManagementTasks";

    // Load tasks from Local Storage
    var tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // Default data if Local Storage is empty
    if (!tasks) {

        tasks = [

            {
                id: 1,
                title: "Design Login Page",
                assignedTo: "John",
                priority: "High",
                status: "Pending",
                dueDate: "2026-07-10"
            },

            {
                id: 2,
                title: "Build Dashboard",
                assignedTo: "Alice",
                priority: "Medium",
                status: "In Progress",
                dueDate: "2026-07-15"
            },

            {
                id: 3,
                title: "Test Application",
                assignedTo: "David",
                priority: "Low",
                status: "Completed",
                dueDate: "2026-07-20"
            }

        ];

        saveTasks();
    }

    // Remove AngularJS internal properties before saving
    function cleanTasks() {

        return tasks.map(function (task) {

            return {
                id: task.id,
                title: task.title,
                assignedTo: task.assignedTo,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate
            };

        });

    }

    function saveTasks() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(cleanTasks())
        );

    }

    var editTask = null;

    // Get all tasks
    this.getTasks = function () {
        return tasks;
    };

    // Add task
    this.addTask = function (task) {

        tasks.push({
            id: task.id,
            title: task.title,
            assignedTo: task.assignedTo,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate
        });

        saveTasks();

    };

    // Update task
    this.updateTask = function (updatedTask) {

        for (var i = 0; i < tasks.length; i++) {

            if (tasks[i].id === updatedTask.id) {

                tasks[i].title = updatedTask.title;
                tasks[i].assignedTo = updatedTask.assignedTo;
                tasks[i].priority = updatedTask.priority;
                tasks[i].status = updatedTask.status;
                tasks[i].dueDate = updatedTask.dueDate;

                break;

            }

        }

        saveTasks();

    };

    // Delete task
    this.deleteTask = function (id) {

        for (var i = 0; i < tasks.length; i++) {

            if (tasks[i].id === id) {

                tasks.splice(i, 1);
                break;

            }

        }

        saveTasks();

    };

    // Edit task handling
    this.setEditTask = function (task) {

        editTask = angular.copy(task);

    };

    this.getEditTask = function () {

        return editTask;

    };

    this.clearEditTask = function () {

        editTask = null;

    };

});