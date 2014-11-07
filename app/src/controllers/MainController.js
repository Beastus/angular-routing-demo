(function () {
    "use strict";

    angular.module("myApp")
        .controller("MainController", function ($scope, $routeSegment) {

            $scope.title = "Main Here";
        });
}());