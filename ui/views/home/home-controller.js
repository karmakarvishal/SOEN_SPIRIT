angular.module("myApp")
  .controller("HomeController", ["$scope", "$stateParams", "$state", "careerPlatformFactory", "$timeout", function ($scope, $stateParams, $state, careerPlatformFactory, $timeout) {
    $scope.editJob = false;
    if ($scope.loggedInUserDetails) {
      var usersNav = false;
      var profileNav = true;
      if ($scope.loggedInUserDetails.role == "ADMIN") {
        usersNav = true;
        profileNav = false;
      }
      $scope.setTopNavVisibility(true, profileNav, true, usersNav);
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
      ],
      applicationStatus: [
        { key: "Interview", value: "INTERVIEW" },
        { key: "Offer", value: "OFFER" },
        { key: "Hired", value: "HIRED" },
        { key: "Rejected", value: "REJECTED" }
      ],
      currentStatus: "",
      createJobApplicationObject: {
        job_id: 0,
        candidate_education: [
          {
            school_or_university: "",
            degree: "",
            field_of_study: "",
            GPA: "",
            from_date: "",
            to_date: ""
          }
        ],
        candidate_experience: [
          {
            job_title: "",
            company: "",
            location: "",
            from_date: "",
            to_date: "",
            role_description: ""
          }
        ]
      }
    };
    $scope.jobApplicationsDetails = {};
    $scope.currentCandidateDetails = {};
    $scope.isStatusChanged = false;
    $scope.statusChanged = function (currentStatus, prevStatus) {
      console.log(currentStatus, prevStatus);
      if (currentStatus == null || currentStatus == prevStatus) {
        $scope.isStatusChanged = false;
      }
      else {
        $scope.isStatusChanged = true;
      }
    };
    $scope.addNewEducation = function () {
      $scope.homeEditObject.createJobApplicationObject.candidate_education.push({
        school_or_university: "",
        degree: "",
        field_of_study: "",
        GPA: "",
        from_date: "",
        to_date: ""
      });
    };

    $scope.removeEducation = function () {
      var lastItem = $scope.homeEditObject.createJobApplicationObject.candidate_education.length - 1;
      $scope.homeEditObject.createJobApplicationObject.candidate_education.splice(lastItem);
    };

    $scope.addNewExperience = function () {
      $scope.homeEditObject.createJobApplicationObject.candidate_experience.push({
        job_title: "",
        company: "",
        location: "",
        from_date: "",
        to_date: "",
        role_description: ""
      });
    };

    $scope.removeExperience = function () {
      var lastItem = $scope.homeEditObject.createJobApplicationObject.candidate_experience.length - 1;
      $scope.homeEditObject.createJobApplicationObject.candidate_experience.splice(lastItem);
    };
    $scope.openJobListingModal = function () {
      $scope.homeEditObject.createListingObject.job_id = 0;
      $scope.homeEditObject.createListingObject.type = "";
      $scope.homeEditObject.createListingObject.title = "";
      $scope.homeEditObject.createListingObject.description = "";
      $scope.homeEditObject.createListingObject.location = "";
      $scope.editJob = false;
      $('#myModal').modal('show');
    };
    
    function checkPreviousEducationAndExperienceDetails() {
      careerPlatformFactory.getPreviousInfo()
        .then(function (result) {
          if (result.education.length > 0) {
            result.education.forEach(element => {
              element.from_date = new Date(element.from_date);
              element.to_date = new Date(element.from_date);
            });
            $scope.homeEditObject.createJobApplicationObject.candidate_education = result.education;
          }
          if (result.experience.length > 0) {
            result.experience.forEach(element => {
              element.from_date = new Date(element.from_date);
              element.to_date = new Date(element.from_date);
            });
            $scope.homeEditObject.createJobApplicationObject.candidate_experience = result.experience;
          }
        })
        .catch(function (ex) {
          console.log(ex);
        });
    }
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
    $scope.candidateCountPopUp = function (jobApplication) {
      $('#inviteCandidate').modal('show');
      $scope.jobApplicationsDetails = jobApplication.job_applications; // stores multiple candidates displayed in a table
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
    $scope.showTab = function (tab) {
      $scope.currentTab = tab;
    };
    $scope.applyForJobPosting = function (listing) {
      $scope.homeEditObject.createJobApplicationObject.job_id = listing.id;
      $scope.currentTab = "upload";
      checkPreviousEducationAndExperienceDetails();
      $('#applyToListingsModal').modal('show');
    };
    $scope.showApplicationTab = function (tab) {
      $scope.currentApplicationTab = tab;
    };
    $scope.viewCandidateDetails = function (candidate) {
      $scope.currentCandidateDetails = candidate;
      $scope.currentApplicationTab = "upload";
      $('#viewCandidateApplicationModal').modal('show');
      console.log($scope.currentCandidateDetails);
    };
    $scope.uploadResume = function () {
      // var file = $scope.file;
      // var formData = new FormData();
      // formData.append('file', file);
      // careerPlatformFactory.uploadResume(formData)
      //   .then(function (result) {
      //     console.log(result);
      //     $('#inviteCandidate').modal('hide');
      //   })
      //   .catch(function (ex) {
      //     console.log(ex);
      //   });

      // Get the selected file from the file input element
      var file = document.getElementById('fileInput').files[0];
      // Create a new FormData object and append the file to it
      var formData = new FormData();
      formData.append("file", file, file.name);
      var token = localStorage.getItem('jwt_token');
      var settings = {
        "url": "http://localhost:3000/api/attachment",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Authorization": token
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formData
      };

      $.ajax(settings).done(function (response) {
        if (response) {
          var res = JSON.parse(response);
          $scope.homeEditObject.createJobApplicationObject.attachment_id = res.attachment_id;
          $scope.showTab("education");
        }
      });
      $timeout(function () {
        $scope.showToaster("Resume uploaded successfully.", true, 1);
      }, 1200);
    };
    $scope.submitApplication = function () {
      console.log($scope.homeEditObject.createJobApplicationObject);
      careerPlatformFactory.submitApplication($scope.homeEditObject.createJobApplicationObject)
        .then(function (result) {
          if (result) {
            getJobListings();
          }
        })
        .catch(function (ex) {
          console.log(ex);
          $scope.showToaster("Please upload resume and Fill atleast one Education and Experience details", true, 2);
        });
    };
    $scope.updateStatus = function (jobApplication) {
      var updateObj = {
        status: jobApplication.currentStatus,
        job_application_id: jobApplication.id
      };
      careerPlatformFactory.updateStatus(updateObj)
        .then(function (result) {
          if (result) {
            $('#inviteCandidate').modal('hide');
            getJobListings();
          }
        })
        .catch(function (ex) {
          console.log(ex);
        });
    };
    $scope.getResume = function (attachment_id) {
      careerPlatformFactory.getResume(attachment_id)
        .then(function (result) {
          console.log("download resume :", result);
          if (result) {
            console.log("resume: ", result);
          }
        })
        .catch(function (ex) {
          console.log(ex);
        });
    };
  }]);
