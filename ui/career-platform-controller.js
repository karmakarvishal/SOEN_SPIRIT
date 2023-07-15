"use strict";

/* jshint ignore:start */

/* Survey Application Level Controller */
angular.module("myApp", [])
    .controller("careerPlatformController", ["$scope", "careerPlatformFactory",
        function ($scope, careerPlatformFactory) {
            console.log("root state");
            $scope.rootData = "GG";
            console.log("roooot:", $scope.rootData);
        }
    ]);