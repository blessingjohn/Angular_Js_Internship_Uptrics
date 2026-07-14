app.controller("TaskController", function ($scope, TaskService) {

    // Load all tasks
    $scope.tasks = TaskService.getTasks();

    // Default form object
    $scope.newTask = {
        title: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending",
        dueDate: ""
    };

    // Function to convert Date object to YYYY-MM-DD
    function formatDate(date) {

        if (!date) return "";

        var d = new Date(date);

        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var day = ("0" + d.getDate()).slice(-2);

        return year + "-" + month + "-" + day;
    }

    // Check if user is editing a task
    var editTask = TaskService.getEditTask();

    if (editTask) {

        $scope.newTask = angular.copy(editTask);

        // Convert stored string to Date object for input[type="date"]
        if ($scope.newTask.dueDate) {
            $scope.newTask.dueDate = new Date($scope.newTask.dueDate);
        }

        $scope.editId = editTask.id;
    }

    // Add or Update Task
    $scope.addTask = function () {

        if (
            !$scope.newTask.title ||
            !$scope.newTask.assignedTo ||
            !$scope.newTask.dueDate
        ) {
            alert("Please fill all required fields.");
            return;
        }

        // UPDATE TASK
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

        // ADD TASK
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

    // Delete Task
    $scope.deleteTask = function (id) {

        if (confirm("Are you sure you want to delete this task?")) {

            TaskService.deleteTask(id);

        }

    };

    // Edit Task
    $scope.editTask = function (task) {

        TaskService.setEditTask(task);

        window.location.href = "#!/create";

    };

});