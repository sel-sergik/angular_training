'use strict';

authApp.controller('LogoutController', [ '$scope', '$cookies', '$state', LogoutController]);
function LogoutController($scope, $cookies, $state) {
	$cookies.remove("user");
	$state.go('login');
}