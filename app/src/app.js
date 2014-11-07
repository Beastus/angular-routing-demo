
(function () {
    "use strict";

    var app = angular.module("myApp", ["ngRoute", "route-segment", "view-segment"]);

    app.config(function ($routeSegmentProvider) {

        $routeSegmentProvider
            .when('/section1',          's1')
            .when('/section1/tiles',    's1.tiles')
            .when('/section1/:id',      's1.tile')
            .when('/section1/:id/X',    's1.tile.tab1')
            .when('/section1/:id/Y',    's1.tile.tab2');

        $routeSegmentProvider.segment('s1', {
            templateUrl: 'partials/section1.html',
            controller: "MainController"});

        $routeSegmentProvider.within('s1')
            .segment('tiles', {
                templateUrl: 'partials/tiles.html',
                controller: "TilesController"
            })
            .segment('tile', {
                templateUrl: 'partials/tile.html',
                dependencies: ['id']
            })
            .within().segment("tab1", {
                templateUrl: 'partials/tab1.html',
                dependencies: ['id']
            });
    });
}());
