"use strict";

/* Angular factory to interact with the CareerPlatform APIs */
angular.module("myApp").factory("careerPlatformFactory", ["$http", "$q", "jwtHelper", "$state", function ($http, $q, jwtHelper, $state) {
    var factory = {};
    // var apiAuthPath = "https://regular-dory-golden.ngrok-free.app/api/auth";
    var apiAuthPath = "http://localhost:3000/api/auth";
    // var apiPath = "https://regular-dory-golden.ngrok-free.app/api";
    var apiPath = "http://localhost:3000/api";
    function setTokenForRequest() {
        var token = localStorage.getItem('jwt_token');
        //check for expiry
        var isTokenExpired = jwtHelper.isTokenExpired(token);
        if (isTokenExpired) {
            $state.go("career-platform.login");
        } else {
            $http.defaults.headers.common['Authorization'] = token;
        }
    }

    factory.signUpUser = function (user) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiAuthPath + "/signup", user)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.logInUser = function (user) {
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            // Retrieve the JWT token from the response and store in local storage
            localStorage.setItem('jwt_token', result.data.token);
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiAuthPath + "/signin", user)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.createOrUpdateCandidate = function (candidateData) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.put(apiPath + "/candidate", candidateData)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.createOrUpdateEmployer = function (employerData) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.put(apiPath + "/employer", employerData)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.createOrUpdateJob = function (jobData) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/job", jobData)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getJobListings = function () {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/job")
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.deleteListing = function (id) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.delete(apiPath + "/job/" + id)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getCandidateDetails = function (id) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/candidate/" + id)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getEmployerDetails = function (id) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/employer/" + id)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.sendInvite = function (mailObject) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/sendMail", mailObject)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.uploadResume = function (formdata) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/attachment", formdata)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.submitApplication = function (applicationDetailsObject) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.post(apiPath + "/job/application", applicationDetailsObject)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.updateStatus = function (updateStatusObject) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.put(apiPath + "/job/application/status", updateStatusObject)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getResume = function (id) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/attachment/" + id)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getAllUsers = function () {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/user")
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.updateUser = function (updateUserObject) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.put(apiPath + "/user", updateUserObject)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.deleteUser = function (id) {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.delete(apiPath + "/user/" + id)
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    factory.getPreviousInfo = function () {
        setTokenForRequest();
        var deferred = $q.defer();
        /* Local callback for success */
        var createSuccess = function (result) {
            /* Resolve the promise */
            deferred.resolve(result.data);
        };
        /* Local callback for error */
        var createError = function (ex) {
            /* Reject the promise there was a problem */
            deferred.reject(ex.data);
        };
        $http.get(apiPath + "/job/last/info")
            .then(createSuccess, createError);
        /* Return the promise to the caller */
        return deferred.promise;
    };

    return factory;
}]);