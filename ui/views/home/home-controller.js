angular.module("myApp")
  .controller("HomeController", ["$scope", "$stateParams", "$state", "careerPlatformFactory", function ($scope, $stateParams, $state, careerPlatformFactory) {
    $scope.editJob = false;
    if ($scope.loggedInUserDetails) {
      $scope.setTopNavVisibility(true, true, true);
    }
    else {
      $state.go("career-platform.login");
    }
    $scope.candidates = [
      { name: "Vinay", email: "vinaysahrawat183a@gmail.com" },
      { name: "Vishal", email: "karmakarvishal486@gmail.com" },
      { name: "Glenn", email: "glenn@gmail.com" },
      { name: "Carl", email: "carl@gmail.com" },
      { name: "Jimmy", email: "jimi.mehta@concordia.ca" },
    ];
    $scope.homeEditObject = {
      availableListings: [], //common for both employer and candidate, candidate gets all job listings in which he can apply, employer gets only those created by him.
      createListingObject: {
        job_id: 0,
        type: "",
        title: "",
        description: "",
        location: ""
      },
      updateLisitingObject: {
        job_id: 0,
        type: "",
        title: "",
        description: "",
        location: ""
      },
      jobTypes: [
        { key: "Full Time", value: "FULL-TIME" },
        { key: "Part Time", value: "PART-TIME" },
        { key: "Internship", value: "INTERNSHIP" },
        { key: "Contract", value: "CONTRACT" }
      ]
    };
    //get all job listings created by employer

    $scope.openJobListingModal = function () {
      $scope.homeEditObject.createListingObject.job_id = 0;
      $scope.homeEditObject.createListingObject.type = "";
      $scope.homeEditObject.createListingObject.title = "";
      $scope.homeEditObject.createListingObject.description = "";
      $scope.homeEditObject.createListingObject.location = "";
      $scope.editJob = false;
      $('#myModal').modal('show');
    };
    function getJobListings() {
      careerPlatformFactory.getJobListings()
        .then(function (result) {
          console.log("getJobListings : ", result);
          if (result) {
            $scope.homeEditObject.availableListings = result;
          }
        })
        .catch(function (ex) {
          console.log(ex);
        });
    }
    function createOrUpdateJob(lisitngObject) {
      console.log("lisitngObject: ", lisitngObject);
      careerPlatformFactory.createOrUpdateJob(lisitngObject)
        .then(function (result) {
          getJobListings();
        })
        .catch(function (ex) {
          console.log(ex);
        });
      $('#myModal').modal('hide');
      $scope.editJob = false;
    }
    $scope.saveJobListing = function () {
      if ($scope.editJob) {
        createOrUpdateJob($scope.homeEditObject.updateLisitingObject);
      }
      else {
        createOrUpdateJob($scope.homeEditObject.createListingObject);
      }
    };
    $scope.updatejobListingModal = function (listing) {
      $scope.homeEditObject.updateLisitingObject.job_id = listing.id;
      $scope.homeEditObject.updateLisitingObject.type = listing.type;
      $scope.homeEditObject.updateLisitingObject.title = listing.title;
      $scope.homeEditObject.updateLisitingObject.description = listing.description;
      $scope.homeEditObject.updateLisitingObject.location = listing.location;
      $('#myModal').modal('show');
      $scope.editJob = true;
    };
    $scope.deletejobListing = function (listing) {
      careerPlatformFactory.deleteListing(listing.id)
        .then(function (result) {
          getJobListings();
        })
        .catch(function (ex) {
          console.log(ex);
        });
    };
    getJobListings();
    $scope.candidateCountPopUp = function () {
      $('#inviteCandidate').modal('show');
    };
    $scope.sendInvite = function (candidate) {
      var sendInvObject = {
        to: candidate.email,
        subject: "Invitation",
        text: "You have been invited for an interview."
      }
      careerPlatformFactory.sendInvite(sendInvObject)
        .then(function (result) {
          console.log("sendInvite ", result);
          $('#inviteCandidate').modal('hide');
        })
        .catch(function (ex) {
          console.log(ex);
        });
    };
    $scope.applyForJobPosting = function () {
      $('#applyToListingsModal').modal('show');
    };
    $scope.uploadResume = function () {
      var file = $scope.file;
      var formData = new FormData();
      formData.append('file', file);
      careerPlatformFactory.uploadResume(formData)
        .then(function (result) {
          console.log(result);
          $('#inviteCandidate').modal('hide');
        })
        .catch(function (ex) {
          console.log(ex);
        });
    };
  }]);