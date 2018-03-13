describe('Controllers', function(){ //describe your object type

    beforeEach(module('ConnectBasketWebApp')); //load module<br />
    describe('LoginController',function(){ //describe your app name<br />
        
		
		it('Should return success is true', inject(function($http) {
    
		var $scope = {};

		/* Code Under Test */
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", {
			method : 'check_login',
			username : 'Test',
			password : '12345678'
		})
		.then(function (response) 
		{
			$scope.isAuthenticated = response.data; 
			
		});
		/* End Code */
		
		console.log("HELLO WORLD!!!!!!!");

		$httpBackend
		  .when('POST', 'http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php', { 
			method : 'check_login',
			username : 'Test',
			password : '12345678'
		  })
		  .respond({success : true});

		  
		console.log("HELLO AGAIN WORLD!!!!!!!");

		$httpBackend.flush();
		
		console.log($scope.isAuthenticated);
		
		expect($scope.isAuthenticated).toEqual({success : true});

	  }));
	  
	  
    });
});