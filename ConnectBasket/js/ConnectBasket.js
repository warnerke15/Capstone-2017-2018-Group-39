/**
* Main AngularJS Web Application
*/
var app = angular.module('ConnectBasketWebApp', [
'ngRoute'
]);

/**
* Configure the Routes
*/
app.config(['$routeProvider', function ($routeProvider) {
$routeProvider
// Home
.when("/Home", {templateUrl: "modules/Home/Home.html"})
// Pages
.when("/Login", {templateUrl: "modules/Login/Login.html"})
// else 404
.otherwise("/404", {templateUrl: "partials/404.html"});
}]);