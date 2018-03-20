describe('Controllers', function(){ 

    beforeEach(module('ConnectBasketWebApp')); 
	
	//var $controller;
	//var $httpBackend;
	
	/*beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));*/
        		
	describe('LogoutController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('LogoutController', {$scope : $scope});
        }));
		it('isAuth should be false', function() {
    		
			expect($scope.isAuth).toEqual(false);
		
		});
	  
	});
	
	describe('LoginController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('LoginController', {$scope : $scope});
        }));
		it('isAuth should be false', function() {
    		$scope.username = 'test';
			$scope.password = '12345678';
			
			$scope.formSubmit();
			
			expect($scope.username).toEqual('');
		
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