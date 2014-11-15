
(function () {
    "use strict";

    var app = angular.module("myApp", ["ngRoute", "route-segment", "view-segment", "ngAnimate"]);

    app.config(["$locationProvider", "$routeSegmentProvider", function ($locationProvider, $routeSegmentProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $routeSegmentProvider
            .when("/", "home")
            // section 1
            .when("/section1", "s1")
            .when("/section1/tiles", "s1.tiles")
            .when("/section1/tile/:id", "s1.tile")
            .when("/section1/tile/:id/tabuno", "s1.tile.tab1")
            .when("/section1/tile/:id/tabdos", "s1.tile.tab2")
            // section 2
            .when("/section2", "s2")
            .when("/section2/cards", "s2.cards")
            .when("/section2/cards/card/:id", "s2.cards.card");

        // home

        $routeSegmentProvider.segment("home", {
            "default": true,
            templateUrl: "partials/home.html"
        });

        // section 1

        $routeSegmentProvider.segment("s1", {
            templateUrl: "partials/section1.html",
            controller: "MainController"
        });

        $routeSegmentProvider.within("s1")
            .segment("tiles", {
                templateUrl: "partials/tiles.html",
                controller: "TilesController"
            })
            .segment("tile", {
                templateUrl: "partials/tile.html",
                dependencies: ["id"]
            })
            .within().segment("tab1", {
                templateUrl: "partials/tab1.html",
                dependencies: ["id"]
            }).segment("tab2", {
                templateUrl: "partials/tab2.html",
                dependencies: ["id"]
            });

        // section 2

        $routeSegmentProvider.segment("s2", {
            templateUrl: "partials/section2.html",
            controller: "MainController"
        });

        $routeSegmentProvider.within("s2")
            .segment("cards", {
                templateUrl: "partials/cards.html"
            })
            .within()
                .segment("card", {
                    template: "<p>This is card {{$routeSegment.$routeParams.id}}</p>",
                    dependencies: ["id"]
                });
    }]);
}());


(function () {
    "use strict";

    function CardsController () {
        this.list = [
            { id: 1, desc: "First Card", status: "Active" },
            { id: 2, desc: "Second Card", status: "Active" },
            { id: 3, desc: "Third Card", status: "Inactive" },
            { id: 4, desc: "Fourth Card", status: "Active" },
            { id: 5, desc: "Random Card", status: "Inactive" },
            { id: 6, desc: "Awesome Card", status: "Inactive" },
            { id: 7, desc: "Favorite Card", status: "Active" },
        ];
    }


    angular.module("myApp")
        .controller("CardsController", CardsController);

}());

(function () {
    "use strict";

    angular.module("myApp")
        .controller("MainController", ["$scope", "$routeSegment", function ($scope, $routeSegment) {

        	$scope.$routeSegment = $routeSegment;
            $scope.title = "Main Here";
        }]);
}());

(function () {
    "use strict";

    function TilesController () {
        this.list = [
            { id: 1, desc: "test what matters" },
            { id: 2, desc: "testing it" }
        ];
        this.newTile = "New Tile";
    }

    TilesController.prototype.addTile = function (id, description) {

        this.list.push({ id: id, desc: description });
    };

    TilesController.prototype.removeTileAt = function (index) {

        if (angular.isNumber(index) && index >= 0 && index < this.list.length) {
            return this.list.splice(index, 1);
        }
    };

    TilesController.prototype.getTileAt = function (index) {

        if (angular.isNumber(index) && index >= 0 && index < this.list.length) {
            return this.list[index];
        }
    };


    angular.module("myApp")
        .controller("TilesController", TilesController);

}());
