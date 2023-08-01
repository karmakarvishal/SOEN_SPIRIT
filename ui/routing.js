angular.module("myApp")
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("career-platform", {
                url: "/career-platform",
                templateUrl: "ui/career-platform-layout.html",
                params: {
                    currentState: "root"
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/career-platform-controller.js"]
                        });
                    }
                },
                controller: "careerPlatformController"
            })
            .state("career-platform.home", {
                url: "/home",
                params: {
                    currentState: "home"
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/views/home/home-controller.js"]
                        });
                    }
                },
                views: {
                    "PrimaryContent": {
                        templateUrl: "ui/views/home/home.html",
                        controller: "HomeController"
                    }
                }
            })
            .state("career-platform.login", {
                url: "/login",
                params: {
                    currentState: "login"
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/views/login/login-controller.js"]
                        });
                    }
                },
                views: {
                    "PrimaryContent": {
                        templateUrl: "ui/views/login/login.html",
                        controller: "LoginController"
                    }
                }
            })
            .state("career-platform.extended-info", {
                url: "/extended-info",
                params: {
                    currentState: "extended-info"
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/views/extended-info/extended-info-page-controller.js"]
                        });
                    }
                },
                views: {
                    "PrimaryContent": {
                        templateUrl: "ui/views/extended-info/externded-info-page.html",
                        controller: "extendedInfoPageController"
                    }
                }
            }).state("career-platform.edit-profile", {
                url: "/edit-profile",
                params: {
                    currentState: "edit-profile"
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/views/edit-profile/edit-profile-controller.js"]
                        });
                    }
                },
                views: {
                    "PrimaryContent": {
                        templateUrl: "ui/views/edit-profile/edit-profile.html",
                        controller: "editProfileController"
                    }
                }
            }).state("career-platform.edit-user", {
                url: "/edit-user",
                params: {
                    currentState: "edit-user"
                },
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/views/edit-user/edit-user-controller.js"]
                        });
                    }
                },
                views: {
                    "PrimaryContent": {
                        templateUrl: "ui/views/edit-user/edit-user.html",
                        controller: "editUserController"
                    }
                }
            })
        $urlRouterProvider.otherwise("/career-platform");
    });
