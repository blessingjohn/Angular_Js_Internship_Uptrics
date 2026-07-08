app.service("TaskService", function () {

    var tasks = [

        {
            id: 1,
            title: "Design Login Page",
            assignedTo: "John",
            priority: "High",
            status: "Pending"
        },

        {
            id: 2,
            title: "Build Dashboard",
            assignedTo: "Alice",
            priority: "Medium",
            status: "In Progress"
        },

        {
            id: 3,
            title: "Test Application",
            assignedTo: "David",
            priority: "Low",
            status: "Completed"
        }

    ];

    this.getTasks = function () {
        return tasks;
    };

    this.addTask = function (task) {
        tasks.push(task);
    };

    var editTask = null;

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