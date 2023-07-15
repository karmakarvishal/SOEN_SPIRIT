angular.module("myApp")
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "ui/Home/home.html",
                controller: "HomeController",
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/Home/home-controller.js"]
                        });
                    }
                }
            })
            .state("login", {
                url: "/login",
                templateUrl: "ui/Login/login.html",
                controller: "LoginController",
                resolve: {
                    loadFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ["ui/Login/login-controller.js"]
                        });
                    }
                }
            })

        $urlRouterProvider.otherwise("/");
    });
