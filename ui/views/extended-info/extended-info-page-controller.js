angular.module("myApp")
  .controller("extendedInfoPageController", ["$scope", "$stateParams", "$state", "careerPlatformFactory", function ($scope, $stateParams, $state, careerPlatformFactory) {
    if ($scope.loggedInUserDetails) {
      $scope.setTopNavVisibility(false, false, true, false);
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
    function updateTokenAndLoggedInUserDetails() {
      var userCreds = JSON.parse(localStorage.getItem('creds'));
      careerPlatformFactory.logInUser(userCreds)
        .then(function (result) {
          if (result) {
            $scope.redirectToPagesAfterAuthentication(result.token);
          }
        })
        .catch(function (ex) {
          console.log(ex);
          $scope.showToaster(ex.statusText, true, 2);
        });
    }
    $scope.saveExtendedDetails = function () {
      //call api to save extended details and go to home page
      if ($scope.loggedInUserDetails.role == "EMPLOYER") {
        //call api to create employer details
        careerPlatformFactory.createOrUpdateEmployer($scope.extendedInfoObject.employer)
          .then(function (result) {
            console.log("createOrUpdateEmployer : ", result);
            //Api call to get token and update it in local storage, redirect from root controller
            updateTokenAndLoggedInUserDetails();
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
      }
      else if ($scope.loggedInUserDetails.role == "CANDIDATE") {
        //call api to create candidate details
        careerPlatformFactory.createOrUpdateCandidate($scope.extendedInfoObject.candidate)
          .then(function (result) {
            console.log("createOrUpdateCandidate : ", result);
            //Api call to get token and update it in local storage, redirect from root controller
            updateTokenAndLoggedInUserDetails();
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
      }
    };
  }]);