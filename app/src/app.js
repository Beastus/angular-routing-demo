
(function () {
    "use strict";

    var app = angular.module("myApp", ["ngRoute", "route-segment", "view-segment", "ngAnimate"]);

    app.config(function ($locationProvider, $routeSegmentProvider) {

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
    });
}());
