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
    
	//Put this code at the top of every controller
	if (!LoginService.isAuthenticated())
	{
		$state.transitionTo('login');
	}
	else
	{
		$rootScope.isAuth = true;
	}
	
	$rootScope.title = "CREATE USER";
		
	var success = false;	
		
    $scope.formSubmit = function() {
		/*$http.post("http://web.engr.oregonstate.edu/~fowlerh/Capstone-2017-2018-Group-39/ConnectBasket/wsdl.php?method=create_user,username=" + $scope.username + ",password=" + $scope.password + ",email=" + $scope.email + ",firstname=" + $scope.first + ",lastname=" + $scope.last)
		.then(function (response) {success = response.data.success; console.log('Response: ' + response.data.success);});*/
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
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "WELCOME TO CONNECTBASKET, " + LoginService.firstName();
	
	//Put this code at the top of every controller
	if (!LoginService.isAuthenticated())
	{
		console.log("Not Authenticated");
		$state.transitionTo('login');
	}
	else
	{
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
		http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data)
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
		});
        return isAuthenticated;
      },
      isAuthenticated : function() {
		if (!isAuthenticated)
		{
			console.log("Not currently authenticated. Check PHP Session");
			http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			$data = {
				'method' : 'check_auth',
			};
			http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", $data) 
			.then(function (response) 
			{
				isAuthenticated = response.data.authenticated; 
				firstName = response.data.firstname;
				lastName = response.data.lastname;
				username = response.data.username;
				email = response.data.email;
				console.log('Response: ' + response.data.authenticated);
				console.log('Name: ' + response.data.firstname + ' ' + response.data.lastname);
				console.log('email: ' + response.data.email);
				console.log('username: ' + response.data.username);
				getAuthenticated();
			});
		}
      },
	  firstName : function() {
        return firstName;
      },
	  getAuthenticated : function() {
        return isAuthenticated;
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


  
