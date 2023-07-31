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
                message: "",
                type: 0 // 1 for success, 2 for danger
            };
            $scope.showToaster = function (message, flag, type) {
                $scope.objValidation.message = message;
                $scope.objValidation.show = flag;
                $scope.objValidation.type = type;
                $timeout(function () {
                    $scope.objValidation.show = false;
                    $scope.objValidation.message = "";
                }, 2000);
            };
            $scope.rootCareerPlatformObject = {
                topNavVisibility: {
                    logout: false,
                    home: false,
                    profile: false,
                    user: false
                }
            };
            $scope.setTopNavVisibility = function (home, profile, logout, user) {
                $scope.rootCareerPlatformObject.home = home;
                $scope.rootCareerPlatformObject.profile = profile;
                $scope.rootCareerPlatformObject.logout = logout;
                $scope.rootCareerPlatformObject.user = user;
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
                else { 
                    //go to home screen
                    $state.go("career-platform.home");
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
                $scope.setTopNavVisibility(false, false, false, false);
                $scope.loggedInUserDetails = {};
                localStorage.clear();
                $state.go("career-platform.login");
            };
        }
    ]);