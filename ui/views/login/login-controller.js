angular.module("myApp")
  .controller("LoginController", ["$scope", "careerPlatformFactory", function ($scope, careerPlatformFactory) {
    function showLoader() {
      $('#status').show();/* jshint ignore:line */
      $('#preloader').show();/* jshint ignore:line */
    }

    function hideLoader() {
      $('#status').hide();/* jshint ignore:line */
      $('#preloader').hide();/* jshint ignore:line */
    }
    hideLoader();
    const tableBody = document.getElementById('table-body');
    const signUpButton = document.getElementById('signUp');
    const logInButton = document.getElementById('logIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    logInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
    $scope.careerZoneEditObject = {
      signUpUser: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: ""
      },
      logInUser: {
        email: "",
        password: ""
      },
      userRoles: [
        { key: "Candidate", value: "CANDIDATE" },
        { key: "Employer", value: "EMPLOYER" }
      ]
    };

    // $scope.showToaster("gg wp toaster", true);
    $scope.signUp = function () {
      if ($scope.careerZoneEditObject.signUpUser) {
        careerPlatformFactory.signUpUser($scope.careerZoneEditObject.signUpUser)
          .then(function (result) {
            console.log("signUp : ", result);
            container.classList.remove('right-panel-active');
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
      }
    };
    $scope.logIn = function () {
      if ($scope.careerZoneEditObject.logInUser) {
        careerPlatformFactory.logInUser($scope.careerZoneEditObject.logInUser)
          .then(function (result) {
            if (result) {
              localStorage.setItem('creds', JSON.stringify($scope.careerZoneEditObject.logInUser));
              //redirect to different pages after login
              $scope.redirectToPagesAfterAuthentication(result.token);
            }
          })
          .catch(function (ex) {
            console.log(ex);
            $scope.showToaster(ex.statusText, true, 2);
          });
      }
    };
  }]);