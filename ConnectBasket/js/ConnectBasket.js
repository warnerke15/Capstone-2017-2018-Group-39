/**
* Main AngularJS Web Application
*/
var app = angular.module('ConnectBasketWebApp', [
'ngRoute'
]);

/**
* Configure the Routes
*/
app.config(function ($routeProvider) {
$routeProvider
// Home
.when("/Home", {templateUrl: "modules/Home/Home.html"})
// Pages
.when("/Login", {templateUrl: "modules/Login/Login.html", controller: "LoginController"})

.when("/CreateUser", {templateUrl: "modules/CreateUser/CreateUser.html"})

.when("/CreatePet", {templateUrl: "modules/CreatePet/CreatePet.html"})

.when("/CreateOwner", {templateUrl: "modules/CreateOwner/CreateOwner.html"})
// else 404
.otherwise("/Home", {templateUrl: "modules/Home/Home.html"});
});