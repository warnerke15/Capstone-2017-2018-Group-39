/**
 * Main AngularJS Web Application
 */
/*var app = angular.module('ConnectBasketWebApp', [
  'ngRoute'
]);*/

/**
 * Configure the Routes
 */
 
 /**
* Configure the Routes
*/
/*app.config(function ($routeProvider) {
$routeProvider
// Home
.when("/Home", {templateUrl: "modules/Home.html", controller: "HomeController"})
// Pages
.when("/Login", {templateUrl: "modules/Login.html", controller: "LoginController"})

.when("/CreateUser", {templateUrl: "modules/CreateUser.html"})

.when("/CreatePet", {templateUrl: "modules/CreatePet.html"})

.when("/CreateOwner", {templateUrl: "modules/CreateOwner.html"})
// else 404
.otherwise("/Home", {templateUrl: "modules/Home.html"});
});*/

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
	  .state('addnote', {
        url : '/addnote',
        templateUrl : 'modules/AddNote.html',
        controller : 'AddNoteController'
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
	
	$rootScope.isAuth = false;
	
	LoginService.unauthenticate();
	    
  });
  
  app.controller('CreateUserController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {
    
	$rootScope.title = "CREATE USER";
	
		
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
    $rootScope.title = "VIEW MESSAGES";
	
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
  
  app.controller('EditProfileController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {
    $rootScope.title = "EDIT PROFILE";
	
  });
  
  app.controller('AddNoteController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {
    $rootScope.title = "ADD NOTE";
	
	
	
  });
  
  app.controller('CreateOwnerController', function($scope, $rootScope, $stateParams, $state, $http, LoginService) {
    $rootScope.title = "CREATE OWNER";
	
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
    $rootScope.title = "CREATE PET";
	
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
    $rootScope.title = "ADD MESSAGE";
	
		
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
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
	
	//Put this code at the top of every controller	
	if (!LoginService.isAuthenticated())
	{
		$state.transitionTo('login');
	}
	else
	{
		$rootScope.title = "WELCOME TO CONNECTBASKET, " + LoginService.firstName();
		$rootScope.isAuth = true;
	}
	
    
  });
  
  app.factory('LoginService', function($http, $state) {

    var isAuthenticated = false;
	var firstName = '';
	var lastName = '';
	var username = '';
	var email = '';
	var http = $http;
	var state = $state;
    
    return {
      login : function(username, password) {
        http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$data = {
			'method' : 'check_login',
			'username' : username,
			'password' : password,
		};
		return http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
		.then(function (response) 
		{
			isAuthenticated = response.data.success; 
			firstName = response.data.first;
			lastName = response.data.last;
			username = response.data.username;
			email = response.data.email;
			
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
      /*isAuthenticated : function() {
        if (!isAuthenticated)
		{
			console.log("Not currently authenticated. Check PHP Session");
			http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			$data = {
				'method' : 'check_auth',
			};
			return http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data) 
			.then(function (response) 
			{
				isAuthenticated = response.data.authenticated; 
				firstName = response.data.firstname;
				lastName = response.data.lastname;
				username = response.data.username;
				email = response.data.email;
				return isAuthenticated;
			});
		}
		else
		{
			return isAuthenticated;
		}
      },*/
	  isAuthenticated : function() {
        return isAuthenticated;
      },
	  firstName : function() {
        return firstName;
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


  
