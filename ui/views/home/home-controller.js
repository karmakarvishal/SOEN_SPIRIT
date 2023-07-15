angular.module("myApp")
  .controller("HomeController", function ($scope) {
    $scope.message = "This is the home page.";
    console.log("home page state");
    console.log($scope.rootData);
  });