'use strict';

angular.module('Malandro.controllers')
	.controller('LanguageCtrl', function($scope,$translate, $state,
		cordovaVibrationService ) {
		$scope.enClass = 'selected';
		$scope.esClass = '';
		
		$scope.setEnglish = function(){
			cordovaVibrationService.vibrate(20);
			$translate.use('en');
			$scope.enClass = 'selected';
			$scope.esClass = '';
		};
		$scope.setSpanish = function(){
			cordovaVibrationService.vibrate(20);
			$translate.use('es');
			$scope.enClass = '';
			$scope.esClass = 'selected';
		};
		$scope.saveLanguage = function(){

			cordovaVibrationService.vibrate(20);
			$state.go('main.instructions');
		};
	});