(function () {
    "use strict";

    angular.module("myApp")
        .controller("MainController", function ($scope, $routeSegment) {

        	$scope.$routeSegment = $routeSegment;
            $scope.title = "Main Here";
        });
}());