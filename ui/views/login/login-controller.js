angular.module("myApp")
  .controller("LoginController", function ($scope) {
    $scope.message = "This is the login page.";
    console.log("login page");
    console.log($scope.rootData);
  });