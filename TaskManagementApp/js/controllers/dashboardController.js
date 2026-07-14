app.controller("DashboardController", function ($scope, TaskService) {

    function loadDashboard() {

        var tasks = TaskService.getTasks();

        // Dashboard Statistics
        $scope.totalTasks = tasks.length;

        $scope.pendingTasks = 0;
        $scope.inProgressTasks = 0;
        $scope.completedTasks = 0;
        $scope.overdueTasks = 0;

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        angular.forEach(tasks, function (task) {

            if (task.status === "Pending") {
                $scope.pendingTasks++;
            }

            if (task.status === "In Progress") {
                $scope.inProgressTasks++;
            }

            if (task.status === "Completed") {
                $scope.completedTasks++;
            }

            if (
                task.status !== "Completed" &&
                new Date(task.dueDate) < today
            ) {
                $scope.overdueTasks++;
            }

        });

        // Show only the latest 5 tasks
        $scope.recentTasks = tasks.slice().reverse().slice(0, 5);

    }

    loadDashboard();

    // Refresh whenever the dashboard page opens
    $scope.$on("$routeChangeSuccess", function () {
        loadDashboard();
    });

});