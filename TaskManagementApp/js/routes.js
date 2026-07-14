app.config(function ($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "views/dashboard.html",
            controller: "DashboardController"
        })

        .when("/tasks", {
            templateUrl: "views/task-list.html",
            controller: "TaskController"
        })

        .when("/create", {
            templateUrl: "views/create-task.html",
            controller: "TaskController"
        })

        .otherwise({
            redirectTo: "/"
        });

});