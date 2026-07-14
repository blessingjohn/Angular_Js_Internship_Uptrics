app.controller("DashboardController", function ($scope, TaskService) {

    function loadDashboard() {

        var tasks = TaskService.getTasks();

        // Dashboard Statistics
        $scope.totalTasks = tasks.length;
        $scope.pendingTasks = 0;
        $scope.inProgressTasks = 0;
        $scope.completedTasks = 0;
        $scope.overdueTasks = 0;

        // Today's Date
        $scope.today = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

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

        // Completion Percentage
        if ($scope.totalTasks > 0) {

            $scope.completionPercentage = Math.round(
                ($scope.completedTasks / $scope.totalTasks) * 100
            );

        } else {

            $scope.completionPercentage = 0;

        }

        // Latest 5 Tasks
        $scope.recentTasks = tasks.slice().reverse().slice(0, 5);

    }

    loadDashboard();

    // Refresh dashboard whenever this route loads
    $scope.$on("$routeChangeSuccess", function () {
        loadDashboard();
    });

});