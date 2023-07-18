angular.module("myApp")
  .controller("extendedInfoPageController", ["$scope", "$stateParams", "$state", "careerPlatformFactory", function ($scope, $stateParams, $state, careerPlatformFactory) {
    if ($scope.loggedInUserDetails) {
      $scope.setTopNavVisibility(false, false, true);
    }
    else {
      $state.go("career-platform.login");
    }
    $scope.extendedInfoObject = {
      candidate: {
        address_line1: "",
        city: "",
        province: "",
        postal_code: "",
        phone: ""
      },
      employer: {
        company_name: "",
        company_address_line1: "",
        company_city: "",
        company_province: "",
        company_postal_code: "",
        company_phone: ""
      }
    };
    $scope.saveExtendedDetails = function () {
      //call api to save extended details and go to home page
      if ($scope.loggedInUserDetails.role == "EMPLOYER") {
        //call api to create employer details
        careerPlatformFactory.createOrUpdateEmployer($scope.extendedInfoObject.employer)
          .then(function (result) {
            console.log("createOrUpdateEmployer : ", result);
            $state.go("career-platform.home");
          })
          .catch(function (ex) {
            console.log(ex);
          });
      }
      else if ($scope.loggedInUserDetails.role == "CANDIDATE") {
        //call api to create candidate details
        careerPlatformFactory.createOrUpdateCandidate($scope.extendedInfoObject.candidate)
          .then(function (result) {
            console.log("createOrUpdateCandidate : ", result);
            $state.go("career-platform.home");
          })
          .catch(function (ex) {
            console.log(ex);
          });
      }
    };
  }]);