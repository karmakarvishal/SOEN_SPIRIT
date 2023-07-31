angular.module("myApp")
  .controller("editProfileController", ["$scope", "$stateParams", "$state", "careerPlatformFactory", function ($scope, $stateParams, $state, careerPlatformFactory) {
    if ($scope.loggedInUserDetails) {
      $scope.setTopNavVisibility(true, true, true, false);
    }
    else {
      $state.go("career-platform.login");
    }
    $scope.editProfileObject = {
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
    if ($scope.loggedInUserDetails.role == "EMPLOYER") {
      careerPlatformFactory.getEmployerDetails($scope.loggedInUserDetails.employer_id)
          .then(function (result) {
            $scope.editProfileObject.employer = result;
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
    }
    else {
      careerPlatformFactory.getCandidateDetails($scope.loggedInUserDetails.candidate_id)
          .then(function (result) {
            $scope.editProfileObject.candidate = result;
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
    }
    $scope.saveEditProfileDetails = function () {
      //call api to save extended details and go to home page
      if ($scope.loggedInUserDetails.role == "EMPLOYER") {
        //call api to create employer details
        console.log("employer: ", $scope.editProfileObject.employer);
        careerPlatformFactory.createOrUpdateEmployer($scope.editProfileObject.employer)
          .then(function (result) {
            console.log("createOrUpdateEmployer : ", result);
            $state.go("career-platform.home");
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
      }
      else if ($scope.loggedInUserDetails.role == "CANDIDATE") {
        //call api to create candidate details
        console.log("candidate: ", $scope.editProfileObject.candidate);
        careerPlatformFactory.createOrUpdateCandidate($scope.editProfileObject.candidate)
          .then(function (result) {
            console.log("createOrUpdateCandidate : ", result);
            $state.go("career-platform.home");
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
      }
    };
  }]);