'use strict';
authApp.controller('ForgotController', [ '$scope', '$http', '$cookies', '$state', '$timeout', '$filter', ForgotController]);

function ForgotController($scope, $http, $cookies, $state, $timeout, $filter) {
	if($cookies.get("user")){
		$state.go('dashboard.show');
	}
	$scope.forgotMy = function() {
		$scope.isRegistered = false;
		$scope.errorMessage = undefined;
		$scope.successMessage = undefined;
		var registeredUser;
		$http({
			url: 'registerUsers.json',
			method: 'GET',
			transformResponse: appendTransform($http.defaults.transformResponse, function(data) {
				$scope.listUsers = data;
			})
		});

		_.forEach($scope.listUsers, function(curUser) {
			if (curUser.login == $scope.user.login){
				$scope.isRegistered = true;
				registeredUser = curUser;
			}
		});
		$scope.loading = true;
		if ($scope.isRegistered) {
			$timeout(function(){
				$scope.loading = false;
				$scope.successMessage = true;
				$scope.password = registeredUser.password;
			}, 3000);
		} else {
			$timeout(function(){
				$scope.loading = false;
				$scope.errorMessage = true;
			}, 3000);
		}
	};
}