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
		it('Username and password should be empty after success', function() {
    		$scope.username = 'test';
			$scope.password = '12345678';
			
			$scope.formSubmit();
			
			expect($scope.username).toEqual('');
			expect($scope.password).toEqual('');
		
		});
	  
	});
	
	describe('CreateUserController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('CreateUserController', {$scope : $scope});
        }));
		it('Username and password should be empty after success', function() {
    		$scope.username = 'testing';
			$scope.password = '11111111';
			$scope.first = 'T';
			$scope.last = 'U';
			$scope.email = 'T@T.net';
			
			$scope.formSubmit();
			
			expect(controller.success).toEqual(true);
		
		});
	  
	});
		
		
	  
	  
});