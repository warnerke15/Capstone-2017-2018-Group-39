describe('Controllers', function(){ //describe your object type

    beforeEach(module('ConnectBasketWebApp')); //load module<br />
    describe('LoginController',function(){ //describe your app name<br />
        
        it('Should', function(){  //write tests
			scope.username = 'Test';
			scope.password = '12345678';
			scope.formSubmit();
            expect(scope.error).toBe(''); //pass
        });
		
		it('should post data (object)', inject(function($http) {
    
		var $scope = {};

		/* Code Under Test */
		$http.post("http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php", {
			'method' : 'check_login',
			'username' : 'Test',
			'password' : '12345678'
		})
		.then(function (response) 
		{
			$scope.isAuthenticated = response.data.success; 
			$scope.firstName = response.data.first;
			$scope.lastName = response.data.last;
			$scope.username = response.data.username;
			$scope.email = response.data.email;
		});
		/* End Code */


		$httpBackend
		  .when('POST', 'http://localhost/auth', { 
			'method' : 'check_login',
			'username' : 'Test',
			'password' : '12345678'
		  })
		  .respond({ 
			success : true,
			first : 'Test',
			last : 'User',
			username : 'Test',
			email : 'Test@t.com'
		  });


		$httpBackend.flush();

		expect($scope.isAuthenticated).toEqual(true);

	  }));
	  
	  
    });
});