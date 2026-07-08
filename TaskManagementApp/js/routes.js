app.config(function ($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "views/dashboard.html"
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