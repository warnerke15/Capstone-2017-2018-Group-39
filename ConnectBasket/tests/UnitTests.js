describe('Controllers', function(){ //describe your object type

    beforeEach(module('ConnectBasketWebApp')); //load module<br />
    describe('LoginController',function(){ //describe your app name<br />
        var LoginController;
		var scope
        beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            scope = $rootScope.$new();
			LoginController = $controller('LoginController', {
				scope : scope
			});
        }));
        it('Mode should be fun', function(){  //write tests
			scope.username = 'Test';
			scope.password = '12345678';
			scope.formSubmit();
            expect(scope.error).toBe(''); //pass
        });
    });
});