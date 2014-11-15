
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
