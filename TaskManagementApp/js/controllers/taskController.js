app.controller("TaskController", function ($scope, TaskService) {

    // Load all tasks
    $scope.tasks = TaskService.getTasks();

    // Default form object
    $scope.newTask = {
        title: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending"
    };

    // Check if user came from Edit button
    var editTask = TaskService.getEditTask();

    if (editTask) {
        $scope.newTask = angular.copy(editTask);
        $scope.editId = editTask.id;
    }

    // Add or Update Task
    $scope.addTask = function () {

        if ($scope.editId) {

            // Update existing task
            for (var i = 0; i < $scope.tasks.length; i++) {

                if ($scope.tasks[i].id === $scope.editId) {

                    $scope.tasks[i].title = $scope.newTask.title;
                    $scope.tasks[i].assignedTo = $scope.newTask.assignedTo;
                    $scope.tasks[i].priority = $scope.newTask.priority;
                    $scope.tasks[i].status = $scope.newTask.status;

                    break;
                }

            }

            TaskService.clearEditTask();

            $scope.editId = null;

            alert("Task Updated!");

        } else {

            // Add new task
            TaskService.addTask({

                id: $scope.tasks.length + 1,
                title: $scope.newTask.title,
                assignedTo: $scope.newTask.assignedTo,
                priority: $scope.newTask.priority,
                status: $scope.newTask.status

            });

            alert("Task Added!");
        }

        // Clear form
        $scope.newTask = {
            title: "",
            assignedTo: "",
            priority: "Medium",
            status: "Pending"
        };

    };

    // Delete Task
    $scope.deleteTask = function (id) {

        for (var i = 0; i < $scope.tasks.length; i++) {

            if ($scope.tasks[i].id === id) {

                $scope.tasks.splice(i, 1);

                break;
            }

        }

    };

    // Edit Task
    $scope.editTask = function (task) {

        TaskService.setEditTask(task);

        window.location.href = "#!/create";

    };

});