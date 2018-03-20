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
	
	describe('ViewMessagesController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('ViewMessagesController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.messages = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.messages.Body).toEqual('Hello');
		
		});
	  
	});
	
	describe('ViewMessageDetailsController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('ViewMessageDetailsController', {$scope : $scope});
        }));
		it('Top content should change on claim click', function() {
    		$scope.TopContent = 0;
			controller.success = true;
			
			$scope.claimMessage();
						
			expect($scope.TopContent).toEqual(1);
		
		});
	  
	});
	
	describe('ViewMessagesController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('ViewMessagesController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.messages = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.messages.Body).toEqual('Hello');
		
		});
	  
	});
	
	describe('ViewMessagesController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('ViewMessagesController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.messages = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.messages.Body).toEqual('Hello');
		
		});
	  
	});
	
	describe('ViewMessagesController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('ViewMessagesController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.messages = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.messages.Body).toEqual('Hello');
		
		});
	  
	});
	
	describe('ViewMessagesController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('ViewMessagesController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.messages = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.messages.Body).toEqual('Hello');
		
		});
	  
	});
		
		
	  
	  
});