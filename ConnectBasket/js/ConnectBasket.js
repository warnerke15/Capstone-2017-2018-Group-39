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
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "WELCOME TO CONNECTBASKET";
    
  });
  
  app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
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
		  console.log('hello');
        } else {
          mCtrl.$setValidity('length', false);
		  console.log('goodbye');
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});
  
