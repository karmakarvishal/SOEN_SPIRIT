"use strict";

/* jshint ignore:start */

/* Survey Application Level Controller */
angular.module("myApp", [])
    .controller("careerPlatformController", ["$scope", "careerPlatformFactory", "$timeout", "jwtHelper", "$stateParams", "$state",
        function ($scope, careerPlatformFactory, $timeout, jwtHelper, $stateParams, $state) {
            $scope.isExtendedInfoSaved = false;
            $scope.setExtendedInfoSavedFlag = function (flag) {
                $scope.isExtendedInfoSaved = flag;
            };
            $scope.loggedInUserDetails = {};
            $scope.setCurrentlyLoggedInUserDetails = function (details) {
                $scope.loggedInUserDetails = details;
                console.log("$scope.loggedInUserDetails: ", $scope.loggedInUserDetails);
            };
            $scope.objValidation = {
                show: false,
                message: ""
            };
            $scope.showToaster = function (message, flag) {
                $scope.objValidation.message = message;
                $scope.objValidation.show = flag;
                $timeout(function () {
                    $scope.objValidation.show = false;
                    $scope.objValidation.message = "";
                }, 2000);
            };
            $scope.rootCareerPlatformObject = {
                topNavVisibility: {
                    logout: false,
                    home: false,
                    profile: false
                }
            };
            $scope.setTopNavVisibility = function (home, profile, logout) {
                $scope.rootCareerPlatformObject.home = home;
                $scope.rootCareerPlatformObject.profile = profile;
                $scope.rootCareerPlatformObject.logout = logout;
            };
            $scope.redirectToPagesAfterAuthentication = function (token) {
                var decodedToken = jwtHelper.decodeToken(token);
                $scope.setCurrentlyLoggedInUserDetails(decodedToken);
                if (decodedToken.role == "CANDIDATE") {
                    if (decodedToken.candidate_id == null) {
                        //go to extended info page
                        $state.go("career-platform.extended-info");
                    }
                    else {
                        //go to home screen
                        $state.go("career-platform.home");
                    }
                }
                else if (decodedToken.role == "EMPLOYER") {
                    if (decodedToken.employer_id == null) {
                        //go to extended info page
                        $state.go("career-platform.extended-info");
                    }
                    else {
                        //go to home screen
                        $state.go("career-platform.home");
                    }
                }
            };
            var storedjwtToken = localStorage.getItem('jwt_token');
            if (storedjwtToken) {
                //check validity
                //if valid go to extended info page
                //else go to login
                var isTokenExpired = jwtHelper.isTokenExpired(storedjwtToken);
                if (isTokenExpired) {
                    $state.go("career-platform.login");
                } else {
                    $scope.redirectToPagesAfterAuthentication(storedjwtToken);
                }
            } else {
                $state.go("career-platform.login");
            }
            $scope.logout = function () {
                $scope.setTopNavVisibility(false, false, false);
                $scope.loggedInUserDetails = {};
                localStorage.clear();
                $state.go("career-platform.login");
            };
        }
    ]);