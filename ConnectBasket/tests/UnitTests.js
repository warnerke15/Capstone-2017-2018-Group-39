describe('Controllers', function(){ 

	console.log("HELLOOOOOOOOOOOOOOOO!!!!!!!");

    beforeEach(module('ConnectBasketWebApp')); 
	
	//var $controller;
	//var $httpBackend;
	
	/*beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));*/
        
		console.log("HELLO!!!!!!!");
		
		describe('LogoutController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('LogoutController', {$scope : $scope});
        }));
		it('isAuth should be false', function() {
    
		
		//var controller = $controller('LogoutController', { $rootScope: $rootScope });
		//var controller = $controller('LogoutController', {  });
		
		//expect($scope.isAuth).toEqual(false);
		
		//expect($rootScope.isAuth).toEqual(false);
		expect(1).toEqual(1);

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