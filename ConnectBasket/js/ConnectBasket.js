var app = angular.module('ConnectBasketWebApp', ['ui.router']);

  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'modules/Login.html',
        controller : 'LoginController'
      })
	  .state('logout', {
        url : '/logout',
        templateUrl : 'modules/Logout.html',
        controller : 'LogoutController'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'modules/Home.html',
        controller : 'HomeController'
      })
	  .state('createpet', {
        url : '/createpet',
        templateUrl : 'modules/CreatePet.html',
        controller : 'CreatePetController'
      })
	  .state('createowner', {
        url : '/createowner',
        templateUrl : 'modules/CreateOwner.html',
        controller : 'CreateOwnerController'
      })
	  .state('createuser', {
        url : '/createuser',
        templateUrl : 'modules/CreateUser.html',
        controller : 'CreateUserController'
      })
	  .state('addmessage', {
        url : '/addmessage',
        templateUrl : 'modules/AddMessage.html',
        controller : 'AddMessageController'
      })
	  .state('viewmessages', {
        url : '/viewmessages',
        templateUrl : 'modules/ViewMessages.html',
        controller : 'ViewMessagesController'
      })	  
	  .state('viewmessagedetails', {
        url : '/viewmessagedetails',
        templateUrl : 'modules/ViewMessageDetails.html',
        controller : 'ViewMessageDetailsController'
      })
	  .state('addnote', {
        url : '/addnote',
        templateUrl : 'modules/AddNote.html',
        controller : 'AddNoteController'
      })
	  .state('check_session', {
        url : '/validate',
        templateUrl : 'modules/CheckSession.html',
        controller : 'CheckSessionController'
      })
	  .state('historyofmessages', {
        url : '/historyofmessages',
        templateUrl : 'modules/HistoryOfMessages.html',
        controller : 'HistoryOfMessagesController'
      })
	  .state('auditlog', {
        url : '/auditlog',
        templateUrl : 'modules/AuditLog.html',
        controller : 'AuditLogController'
      })
	  .state('editprofile', {
        url : '/editprofile',
        templateUrl : 'modules/EditProfile.html',
        controller : 'EditProfileController'
      });
  }]);

  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "LOGIN";
		
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    };
	    
  });
  
  app.controller('LogoutController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
    $rootScope.title = "LOGOUT";
		
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	$data = {
		'method' : 'logout',
	};
	$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data);
	
	$scope.isAuth = false;
	
	$rootScope.isAuth = false;
	
	LoginService.unauthenticate();
	    
  });
  
  app.controller('CreateUserController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {
    
      //Put this code at the top of every controller	
      if (LoginService.isAuthenticated()) {
          $rootScope.title = "CREATE USER";
          $rootScope.isAuth = true;
      }
		
	$scope.receive = {};
	$scope.receive.receiveArr = [

		{ value: "0", label: "Off" }
		,
		{ value: "1", label: "On" }
	];

	$scope.receive.selection = "0"; 	
		
	success = false;	
		
    $scope.formSubmit = function() {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'create_user',
			'username' : $scope.username,
			'password' : $scope.password,
			'firstname' : $scope.first,
			'lastname' : $scope.last,
			'email' : $scope.email
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			if (that.success)
			{
				$state.transitionTo('home');
			}
			else 
			{
				console.log('Failure ' + success);
			}
		});
		
		
    };
	    
  });
  
  app.controller('ViewMessagesController', function($scope, $rootScope, $stateParams, $state, $http, LoginService, $interval) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "VIEW MESSAGES";
          $rootScope.isAuth = true;
      }
	  
	  
	$scope.viewDetails = function(MessageID) {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'set_messageID',	
			'message' : MessageID,
			'page' : 'VIEW'
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			if (success)
			{
				$state.transitionTo('viewmessagedetails');
			}
			else 
			{
				console.log('Failure ' + success);
			}			
		});	
	};

    var updateFunc = function() {
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_messages'		
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.messages = response.data.messages; 
			
		});	
		
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_claimedMessages'		
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.claimedmessages = response.data.messages; 			
		});	
	}
	var update;
	update = $interval(updateFunc, 30000);
	
	
	$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $interval.cancel(update);
		  update = undefined;
        });
	
	updateFunc();
	
  });
  
  
  app.controller('ViewMessageDetailsController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "VIEW MESSAGE DETAILS";
          $rootScope.isAuth = true;
      }
	
	var success = false;
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_groups'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.groups = response.data.groups; 
		});
		
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_notes'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.notes = response.data.notes; 
		});
      
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_messageDetails'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.patientname = response.data.PatientName; 
			$scope.casenumber = response.data.CaseNumber;
			$scope.ownername = response.data.OwnerName;
			$scope.contactmethod = response.data.OwnerContactMethod;
			$scope.category = response.data.Category;
			$scope.urgency = response.data.UrgencyLevel;
			$scope.urgencyTop = response.data.UrgencyLevel;
			$scope.body = response.data.Body;
			$scope.recipient = response.data.Recipient;
						
			if (response.data.From == 'HISTORY')
			{
				$scope.TopContent = '3';
			}
			else if (response.data.LastClaimedBy == null)
			{
				$scope.TopContent = '0';
			}
			else if (response.data.LastClaimedBy == LoginService.username())
			{
				$scope.TopContent = '1';
			}
			else
			{
				$scope.TopContent = '2';
			}
		});
	
	$scope.claimMessage = function() {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'claim_message'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{			
			success = response.data.success; 
			if (success)
			{
				$scope.TopContent = '1';
			}
			else 
			{
				console.log('Failure ' + success);
			}
			
		});
		
	}
	
	$scope.addNoteAndRoute = function() {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'add_noteRoute',
			'note' : $scope.addnote,
			'urgency' : $scope.urgencyTop,
			'recipient' : $scope.routeto
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{			
			success = response.data.success; 
			if (success)
			{
				$state.transitionTo('viewmessages');
			}
			else 
			{
				console.log('Failure ' + success);
			}
			
		});		
	}
	
	$scope.addNoteAndComplete = function() {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'add_noteComplete',
			'note' : $scope.notecomplete
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{			
			success = response.data.success; 
			if (success)
			{
				$state.transitionTo('viewmessages');
			}
			else 
			{
				console.log('Failure ' + success);
			}
			
		});		
	}

		
		
    $scope.formSubmit = function() {

		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'change_status',
			'status' : $scope.changedstate//,
			// 'id' : $scope.messageid
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			console.log('Response: ' + response.data.success);
		});
		
		
    };
  });


  app.controller('EditProfileController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "EDIT PROFILE";
          $rootScope.isAuth = true;
      }
	
	var success = false;
	
	$scope.showEmail = false;
	
	
	$scope.email = LoginService.email();
	var notifications = LoginService.notifications();
	
	$scope.receive = {};
	$scope.receive.receiveArr = [

		{ value: "0", label: "Off" }
		,
		{ value: "1", label: "On" }
	];

	$scope.receive.selection = $scope.receive.receiveArr[notifications].value; 
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_groups'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.groups = response.data.groups; 
		});
	
	$scope.emailButton = function() {
		$scope.showEmail = true;
	}
		
    $scope.formSubmit = function() {
		var groups = '';
		var elem;
        for(x in $scope.groups)
        {
			elem = document.getElementById($scope.groups[x].Group);
			if (elem.checked)
			{
				if (groups == '')
				{
					groups = elem.value;
				}
				else
				{
					groups += '|' + elem.value;
				}
			}
        } 
		
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'edit_profile',
			'email' : $scope.email,
			'notifications' : $scope.receive.selection,
			'groups' : groups
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			if (success)
			{
				LoginService.setemail($scope.email);
				LoginService.setnotifications($scope.receive.selection);
				$state.transitionTo('home');
			}
			else 
			{
				console.log('Failure ' + success);
			}
		});
		
		
    };
	
  });
  
  app.controller('AddNoteController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "ADD NOTE";
          $rootScope.isAuth = true;
      }
	
  });
  
  app.controller('HistoryOfMessagesController', function($scope, $rootScope, $stateParams, $state, $http, LoginService, $interval) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "HISTORY OF MESSAGES";
          $rootScope.isAuth = true;
      }

    $scope.viewDetails = function(MessageID) {
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'set_messageID',	
			'message' : MessageID,
			'page' : 'HISTORY'
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			if (success)
			{
				$state.transitionTo('viewmessagedetails');
			}
			else 
			{
				console.log('Failure ' + success);
			}			
		});	
	};

    var updateFunc = function() {
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_allMessages'		
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.messages = response.data.messages; 
			
		});	
	}
	var update;
	update = $interval(updateFunc, 30000);
	
	
	$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $interval.cancel(update);
		  update = undefined;
        });
	
	updateFunc();
	
  }); 
	
  
  app.controller('AuditLogController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "AUDIT LOG";
          $rootScope.isAuth = true;
      }

      
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_logs'		
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.logs = response.data.logs; 
			
		});
	
  });
  
  app.controller('CreateOwnerController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "CREATE OWNER";
          $rootScope.isAuth = true;
      }

      
	
	var success = false;	
		
    $scope.formSubmit = function() {

		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'create_owner',
			'firstname' : $scope.first,
			'lastname' : $scope.last,
			'address' : $scope.address,
			'city' : $scope.city,
			'state' : $scope.state,
			'zipcode' : $scope.zipcode,
			'phone' : $scope.phone,
			'email' : $scope.email
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			console.log('Response: ' + response.data.success);
			if (success)
			{
				$state.transitionTo('home');
			}
			else 
			{
				console.log('Failure ' + success);
			}
		});
		
		
    };
	
  });
  
  app.controller('CreatePetController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "CREATE PET";
          $rootScope.isAuth = true;
      }

      
	
	var success = false;	
		
    $scope.formSubmit = function() {

		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'create_pet',
			'name' : $scope.name,
			'age' : $scope.age,
			'species' : $scope.species,
			'breed' : $scope.breed,
			'color' : $scope.color
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			console.log('Response: ' + response.data.success);
			if (success)
			{
				$state.transitionTo('home');
			}
			else 
			{
				console.log('Failure ' + success);
			}
		});
		
		
    };
	
  });
  
  app.controller('AddMessageController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "ADD MESSAGE";
          $rootScope.isAuth = true;
      }
	
	var questions = {};
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_categoryQuestions'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			console.log(response.data.categoryQuestions);
			for (var q in response.data.categoryQuestions)
			{
				console.log(response.data.categoryQuestions[q]);
				if (questions.hasOwnProperty(response.data.categoryQuestions[q].Category))
				{
					console.log('Question id: ' + response.data.categoryQuestions[q].QuestionID);
					questions[response.data.categoryQuestions[q].Category].push({'QuestionText' : response.data.categoryQuestions[q].QuestionText, 'QuestionID' : response.data.categoryQuestions[q].QuestionID});
				}
				else
				{
					console.log('Question id: ' + response.data.categoryQuestions[q].QuestionID);
					questions[response.data.categoryQuestions[q].Category] = new Array();
					questions[response.data.categoryQuestions[q].Category].push({'QuestionText' : response.data.categoryQuestions[q].QuestionText, 'QuestionID' : response.data.categoryQuestions[q].QuestionID});
				}
			}				
		});
	
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_categories'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.categories = response.data.categories; 
		});
	
	$scope.QuestionsToShow = new Array();
	
	$scope.category = '0';
	
	$scope.categoryChanged = function() {
		console.log('Changing category');
		$scope.QuestionsToShow = questions[$scope.category];
	};
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_groups'	
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.groups = response.data.groups; 
		});
	
	var success = false;	
		
    $scope.formSubmit = function() {

	
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'create_message',
			'caseNumber' : $scope.casenumber,
			'patientName' : $scope.patientname,
			'ownerName' : $scope.ownername,
			'category' : $scope.category,
			'recipient' : $scope.recipient,
			'contactMethod' : $scope.contactmethod,
			'urgency' : $scope.urgency,
			'body' : $scope.body
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			success = response.data.success; 
			if (success)
			{
				$state.transitionTo('home');
			}
			else 
			{
				console.log('Failure ' + success);
			}
		});
		
		
    };
	    
  });
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
	
	//Put this code at the top of every controller	
	if (LoginService.isAuthenticated())
	{
		$rootScope.title = "WELCOME TO CONNECTBASKET, " + LoginService.firstName();
		$rootScope.isAuth = true;
	}
	
    
  });
  
  app.controller('CheckSessionController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
	
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'check_auth',
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data) 
		.then(function (response) 
		{
			isAuthenticated = response.data.authenticated; 
			firstName = response.data.firstname;
			lastName = response.data.lastname;
			username = response.data.username;
			email = response.data.email;
			notifications = response.data.notifications;
			
			if (isAuthenticated)
			{
				LoginService.set(isAuthenticated, firstName, lastName, username, email, notifications);
				$state.transitionTo(LoginService.prevState());
			}
			else
			{
				$state.transitionTo('login');
			}
		});

    
  });
  
  app.factory('LoginService', function($http, $state) {

    var isAuthenticated = false;
	var firstName = '';
	var lastName = '';
	var username = '';
	var email = '';
	var prevState = 'home';
	var http = $http;
	var state = $state;
	var notifications = 0;
    
    return {
      login : function(username, password) {
        http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'check_login',
			'username' : username,
			'password' : password
		};
		return http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			isAuthenticated = response.data.success; 
			firstName = response.data.first;
			lastName = response.data.last;
			username = response.data.username;
			email = response.data.email;
			notifications = response.data.notifications;
			
			if (isAuthenticated)
			{
				state.transitionTo('home');
			}
			else 
			{
				console.log('Failure ' + isAuthenticated);
			}
			return isAuthenticated;
		});  
      },
	  isAuthenticated : function() {
		if (!isAuthenticated)
		{
			prevState = $state.current.name;
			$state.transitionTo('check_session');
		}
	
        return isAuthenticated;
      },
	  set : function(i, f, l, u, e, n) {
        isAuthenticated = i;
		firstName = f;
		lastName = l;
		username = u;
		email = e;
		notifications = n;
      },
	  firstName : function() {
        return firstName;
      },
	  lastName : function() {
        return lastName;
      },
	  setemail : function(e) {
        email = e;
      },
	  email : function() {
        return email;
      },
	  username : function() {
        return username;
      },
	  prevState : function() {
        return prevState;
      },
	  setnotifications : function(n) {
        notifications = n;
      },
	  notifications : function() {
        return notifications;
      },
	  unauthenticate : function() {
        isAuthenticated = false;
      }
    };
    
  });
  
  app.directive('passwordDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value.length >= 8) {
          mCtrl.$setValidity('length', true);
        } else {
          mCtrl.$setValidity('length', false);
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});


  
