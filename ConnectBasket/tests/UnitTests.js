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
		it('Top content should remain the same', function() {
    		$scope.TopContent = '0';
			
			$scope.claimMessage();
			
						
			expect($scope.TopContent).toEqual('0');
		
		});
	  
	});
	
	describe('EditProfileController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('EditProfileController', {$scope : $scope});
        }));
		it('showEmail should be true after function call', function() {
    		expect($scope.showEmail).toEqual(false);
			
			$scope.emailButton();
			
			expect($scope.showEmail).toEqual(true);
		
		});
	  
	});
	
	describe('HistoryOfMessagesController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('HistoryOfMessagesController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.messages = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.messages.Body).toEqual('Hello');
		
		});
	  
	});
	
	describe('AuditLogController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('AuditLogController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.logs = {Body : 'Hello', Recipient : 'BILLING'};
						
			expect($scope.logs.Body).toEqual('Hello');
		
		});
	  
	});
	
	describe('AddMessageController', function(){ 
		var controller;
		var $scope;
		beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            $scope = $rootScope.$new();
			controller = $controller('AddMessageController', {$scope : $scope});
        }));
		it('Messages should exist', function() {
    		$scope.categories = {Category : 'BILLING'};
			
			$scope.groups = {Group : 'SA IM TECH'};
						
			expect($scope.categories.Category).toEqual('BILLING');
			
			expect($scope.groups.Group).toEqual('SA IM TECH');
		
		});
	  
	});
		
		
	  
	  
});