'use strict';

authApp.controller('TranslateController', [ '$scope', '$translate', TranslateController]);
function TranslateController($scope, $translate) {

	$scope.setRu =function () {
		$translate.use('ru');
	};

	$scope.setEn =function () {
	 $translate.use('en');
	};

}