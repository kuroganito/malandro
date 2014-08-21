'use strict';

angular.module('Malandro.controllers')

	.controller('InstructionsCtrl', function($scope,$state) {
		$scope.goMap = function(){
			$state.go('main.map');
		};
	});