'use strict';

authApp.controller('DashboardController', [ '$scope', '$cookies', '$location', '$state', DashboardController]);
function DashboardController($scope, $cookies, $location, $state) {
	if(!$cookies.get("user")){
		$state.go('login');
		return;
	}
	var user = JSON.parse($cookies.get("user"));
	$scope.master = angular.copy(user);
	$scope.user = angular.copy(user);
	$scope.bClick="show";
	if ($state.is('dashboard.edit')) {
		$scope.bClick="edit";
	}

	$scope.apply = function(user) {
		$scope.master = angular.copy(user);
	};
}