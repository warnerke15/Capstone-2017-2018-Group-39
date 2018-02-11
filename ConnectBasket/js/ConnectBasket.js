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

app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'modules/Login.html',
        controller : 'LoginController'
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
	  .state('createuser', {
        url : '/createuser',
        templateUrl : 'modules/CreateUser.html',
        controller : 'CreateUserController'
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
  
  app.controller('CreateUserController', function($scope, $rootScope, $stateParams, $state, $http) {
    $rootScope.title = "CREATE USER";
		
	var success = false;	
		
    $scope.formSubmit = function() {
		$http.post("http://http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php?method=create_user,username=" + $scope.username + ",password=" + $scope.password + ",email=" + $scope.email + ",firstname=" + $scope.first + ",lastname=" + $scope.last)
		.then(function (response) {success = response.data.success;});
		if (success)
		{
			$state.transitionTo('home');
		}
		
    };
	    
  });
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "WELCOME TO CONNECTBASKET";
    
  });
  
  app.factory('LoginService', function() {

    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        $http.post("http://localhost/wsdl.php?method=check_login,username=" + username + ",password=" + password)
		.then(function (response) {isAuthenticated = response.data.success;});
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
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
  
