'use strict';

authApp.controller('LoginController', [ '$scope', '$http', '$cookies', '$state', '$timeout' , LoginController]);

function LoginController($scope, $http, $cookies, $state, $timeout) {
	$scope.signIn = function() {
		$scope.isRegistered = false;
		$scope.errorMessage = false;
		$scope.successMessage = false;
		var registeredUser;
		$http({
			url: 'registerUsers.json',
			method: 'GET',
			transformResponse: appendTransform($http.defaults.transformResponse, function(data) {
				$scope.listUsers = data;
			})
		});

		_.forEach($scope.listUsers, function(curUser) {
			if (curUser.login == $scope.user.login && curUser.password == $scope.user.password){
				$scope.isRegistered = true;
				registeredUser = curUser;
			}
		});
		$scope.loading = true;
		if ($scope.isRegistered) {
			$timeout(function(){
				$scope.loading = false;
				$cookies.put("user", JSON.stringify(registeredUser));
				$scope.successMessage = true;
				$timeout(function(){
					$state.go('dashboard.show');
				}, 3000);
			}, 3000);
		} else {
			$timeout(function(){
				$scope.loading = false;
				$scope.errorMessage = true;
			}, 3000);
		}
	};
	
	if($cookies.get("user")){
		$state.go('dashboard.show');
	}
	$scope.user = {};
}