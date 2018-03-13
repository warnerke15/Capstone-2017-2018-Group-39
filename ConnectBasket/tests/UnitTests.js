describe('LoginController', function(){ 

	console.log("HELLOOOOOOOOOOOOOOOO!!!!!!!");

    beforeEach(module('ConnectBasketWebApp')); 
	
	var $controller;
	
	beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
	}));
        
		console.log("HELLO!!!!!!!");
		
		
		it('Should return success is true', function() {
    
		console.log("HELLO WORLD000000!!!!!!!");
	
		var $scope = {};

		console.log("HELLO WORLD!!!!!!!");
		
		$httpBackend.expectPOST('http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php', {'method' : 'logout'},
		{	headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
                }
		});

		var controller = $controller('LogoutController', { $scope: $scope });
		  
		console.log("HELLO AGAIN WORLD!!!!!!!");

		$httpBackend.flush();
		
		console.log($scope.isAuthenticated);
		
		expect($scope.isAuthenticated).toEqual({success : true});

	  });
	  
	  
    });