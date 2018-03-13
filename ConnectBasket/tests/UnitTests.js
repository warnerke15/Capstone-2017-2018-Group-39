describe('LoginController', function(){ 

	console.log("HELLOOOOOOOOOOOOOOOO!!!!!!!");

    beforeEach(module('ConnectBasketWebApp')); 
	
	var $controller;
	
	beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
	}));
        
		console.log("HELLO!!!!!!!");
		
		
		it('Should return success is true', function($http) {
    
		console.log("HELLO WORLD000000!!!!!!!");
	
		var $scope = {};
		var controller = $controller('LoginController', { $scope: $scope });

		console.log("HELLO WORLD!!!!!!!");
		
		$scope.username = 'Test';
		$scope.password = '12345678';
		$scope.formSubmit();
		

		$httpBackend
		  .when('POST', 'http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php', { 
			'method' : 'check_login',
			'username' : 'Test',
			'password' : '12345678',
		  })
		  .respond({success : true});

		  
		console.log("HELLO AGAIN WORLD!!!!!!!");

		$httpBackend.flush();
		
		console.log($scope.isAuthenticated);
		
		expect($scope.isAuthenticated).toEqual({success : true});

	  });
	  
	  
    });
});