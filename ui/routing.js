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
                            files: ["ui/career-platform-controller.js",
                                "ui/career-platform-factory.js"]
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
                    currentState: "home"
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

        $urlRouterProvider.otherwise("/career-platform");
    });
