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

		
	var success = false;	
		
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
  
  app.controller('ViewMessagesController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "VIEW MESSAGES";
          $rootScope.isAuth = true;
      }

      
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_messages'		
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.messages = response.data.messages; 
			
		});	
  });
  
  
  app.controller('ViewMessageDetailsController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "VIEW MESSAGE DETAILS";
          $rootScope.isAuth = true;
      }

      

	var success = false;	
		
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

	$scope.receive.selection = notifications; 

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
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'edit_profile',
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
  
  app.controller('AddNoteController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "ADD NOTE";
          $rootScope.isAuth = true;
      }
	
  });
  
  app.controller('HistoryOfMessagesController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {

      if (LoginService.isAuthenticated()) {
          $rootScope.title = "HISTORY OF MESSAGES";
          $rootScope.isAuth = true;
      }

      
	
	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'get_messages'		
		};
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			$scope.messages = response.data.messages; 
			
		});
	
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

      
	
		
	var success = false;	
		
    $scope.formSubmit = function() {

		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'create_message',
			'username' : $scope.username,
			'body' : $scope.body
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
	  email : function() {
        return email;
      },
	  username : function() {
        return username;
      },
	  prevState : function() {
        return prevState;
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


  
