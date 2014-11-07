
(function () {
    "use strict";

    function TilesController () {
        this.list = [
            { id: 1, desc: 'testing my life' },
            { id: 2, desc: 'testing it' }
        ];
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
