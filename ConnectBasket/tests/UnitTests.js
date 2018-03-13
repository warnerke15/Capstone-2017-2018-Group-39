describe('Controllers', function(){ 

	console.log("HELLOOOOOOOOOOOOOOOO!!!!!!!");

    beforeEach(module('ConnectBasketWebApp')); 
	
	var $controller;
	var $httpBackend;
	
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
    //$controller = $injector.get('$controller');
	//$httpBackend = $injector.get('$httpBackend');
	}));
        
		console.log("HELLO!!!!!!!");
		
		describe('LogoutController', function(){ 
		
		it('isAuth should be false', function() {
    
		
		var $rootScope = {};
		var controller = $controller('LogoutController', { $rootScope: $rootScope });
		  
		expect($rootScope.isAuth).toEqual(false);

	  });
	  
	});
		
		/*it('Should return success is true', function() {
    
		console.log("HELLO WORLD000000!!!!!!!");
	
		var $scope = {};

		console.log("HELLO WORLD!!!!!!!");
		
		$httpBackend.expect('POST','http://vm-cs462-g39.eecs.oregonstate.edu/wsdl.php', {'method' : 'logout'},
		{	headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
                }
		});

		var controller = $controller('LogoutController', { $scope: $scope });
		  
		console.log("HELLO AGAIN WORLD!!!!!!!");

		$httpBackend.flush();
		
		console.log($scope.isAuthenticated);
		
		expect($scope.isAuthenticated).toEqual({success : true});

	  });*/
	  
	  
});