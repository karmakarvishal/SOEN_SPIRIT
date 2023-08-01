angular.module("myApp")
    .controller("editUserController", ["$scope", "$stateParams", "$state", "careerPlatformFactory", function ($scope, $stateParams, $state, careerPlatformFactory) {
        $scope.userEditObject = {
            isSetNewPswd: false,
            availableUsers: [],
            userRoles: [
                { key: "Candidate", value: "CANDIDATE" },
                { key: "Employer", value: "EMPLOYER" }
            ],
            updateUserObject: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                role: ""
            }
        };
        if ($scope.loggedInUserDetails) {
            $scope.setTopNavVisibility(true, false, true, true);
        }
        else {
            $state.go("career-platform.login");
        }
        function getAllUsers() {
            careerPlatformFactory.getAllUsers()
                .then(function (result) {
                    $scope.userEditObject.availableUsers = result.userList;
                    console.log($scope.userEditObject.availableUsers);
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        }
        getAllUsers();
        $scope.updateUserModal = function (user) {
            $scope.userEditObject.updateUserObject.id = user.id;
            $scope.userEditObject.updateUserObject.first_name = user.first_name;
            $scope.userEditObject.updateUserObject.last_name = user.last_name;
            $scope.userEditObject.updateUserObject.email = user.email;
            $scope.userEditObject.updateUserObject.role = user.role;
            $('#updateUserModal').modal('show');
        };
        $scope.updateUser = function () {
            careerPlatformFactory.updateUser($scope.userEditObject.updateUserObject)
                .then(function (result) {
                    $('#updateUserModal').modal('hide');
                    getAllUsers();
                    console.log("update user:", result);
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        };
        $scope.deleteUser = function (user) {
            careerPlatformFactory.deleteUser(user.id)
                .then(function (result) {
                    console.log("delete user: ", result);
                    getAllUsers();
                })
                .catch(function (ex) {
                    console.log(ex);
                });
        };
    }]);