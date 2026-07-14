app.controller("TaskController", function ($scope, TaskService) {

    // ============================
    // Load Tasks
    // ============================

    $scope.tasks = TaskService.getTasks();

    // ============================
    // Search, Filters & Sorting
    // ============================

    $scope.searchTask = "";

    $scope.statusFilter = "";
    $scope.priorityFilter = "";

    // Default sorting
    $scope.sortField = "dueDate";

    // Priority order
    var priorityOrder = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    };

    // Custom sorting function
    $scope.getSortValue = function (task) {

        if ($scope.sortField === "priority") {
            return priorityOrder[task.priority];
        }

        return task[$scope.sortField];
    };

    // Status & Priority Filters
    $scope.filterTasks = function (task) {

        var statusMatch =
            !$scope.statusFilter ||
            task.status === $scope.statusFilter;

        var priorityMatch =
            !$scope.priorityFilter ||
            task.priority === $scope.priorityFilter;

        return statusMatch && priorityMatch;

    };

    // ============================
    // Default Form
    // ============================

    $scope.newTask = {

        title: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending",
        dueDate: ""

    };

    // ============================
    // Format Date
    // ============================

    function formatDate(date) {

        if (!date) return "";

        var d = new Date(date);

        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var day = ("0" + d.getDate()).slice(-2);

        return year + "-" + month + "-" + day;

    }

    // ============================
    // Edit Mode
    // ============================

    var editTask = TaskService.getEditTask();

    if (editTask) {

        $scope.newTask = angular.copy(editTask);

        if ($scope.newTask.dueDate) {

            $scope.newTask.dueDate =
                new Date($scope.newTask.dueDate);

        }

        $scope.editId = editTask.id;

    }

    // ============================
    // Add / Update Task
    // ============================

    $scope.addTask = function () {

        if (
            !$scope.newTask.title ||
            !$scope.newTask.assignedTo ||
            !$scope.newTask.dueDate
        ) {

            alert("Please fill all required fields.");

            return;

        }

        // UPDATE

        if ($scope.editId) {

            TaskService.updateTask({

                id: $scope.editId,

                title: $scope.newTask.title,

                assignedTo: $scope.newTask.assignedTo,

                priority: $scope.newTask.priority,

                status: $scope.newTask.status,

                dueDate: formatDate($scope.newTask.dueDate)

            });

            TaskService.clearEditTask();

            $scope.editId = null;

            alert("Task Updated Successfully!");

        }

        // ADD

        else {

            TaskService.addTask({

                id: Date.now(),

                title: $scope.newTask.title,

                assignedTo: $scope.newTask.assignedTo,

                priority: $scope.newTask.priority,

                status: $scope.newTask.status,

                dueDate: formatDate($scope.newTask.dueDate)

            });

            alert("Task Added Successfully!");

        }

        // Reset Form

        $scope.newTask = {

            title: "",

            assignedTo: "",

            priority: "Medium",

            status: "Pending",

            dueDate: ""

        };

    };

    // ============================
    // Delete Task
    // ============================

    $scope.deleteTask = function (id) {

        if (confirm("Are you sure you want to delete this task?")) {

            TaskService.deleteTask(id);

        }

    };

    // ============================
    // Edit Task
    // ============================

    $scope.editTask = function (task) {

        TaskService.setEditTask(task);

        window.location.href = "#!/create";

    };

});