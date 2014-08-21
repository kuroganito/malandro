'use strict';

angular.module('Malandro.controllers')


.controller('MapCtrl', function($scope,$ionicPopup,localstorage,
 $http,$filter,cordovaGeolocationService,$cordovaCamera,$state) {
 	
	var markersTemporal = [];
	var tipos = ['ROBO','AGRESION','CALLE','SERVICIO'];
	var subtipos = ['PERTENENCIAS','DINERO','AUTOPARTES','AUTO',
					'FISICA','SEXUAL','SECUESTRO','HOMICIDIO',
					'GRAFFITI','GRUPOS','PANDILLAS','ENFRENTAMIEMTOS'];
	var armas = ['SIN_VIOLENCIA','GOLPES','ARMA_BLANCA','ARMA_FUEGO'];
	var lugares = ['HOGAR','CALLE','TRASPORTE','LOCAL'];
	var sevicios = ['MEDIO_AMBIENTE','LUZ_AGUA','VECINOS','DETERIORO'];
	var subservicios = ['FALTA_RIEGO','PARQUE_MAL_ESTADO','BASURA','LIMPIEZA',
						'FUGAS','COLADERAS','ROBO_LUZ','FALTA_LUZ',
						'BACHES','AUTOS_ABANDONADOS','CASAS_MAL_ESTADO','OFICINAS_MAL_ESTADO',
						'CIERRE_CALLES','RUIDO','TOQUINES'];

	google.maps.visualRefresh = true;
	cordovaGeolocationService.getCurrentPosition(function(pos){
		$scope.map.center.latitude = pos.coords.latitude
		$scope.map.center.longitude = pos.coords.longitude;
	});
	
	var popArray = [];
	var popupType;
	var mapNewReport = false;        //Ayuda a indicar el evento clic
	$scope.markNewReportSet = false; //Ayuda a colocar el brillo al marcador 
	
	var reportObject;



///////////////////////////////////////////////////////////////////////////////////////////////7
	$scope.newReport = function() {
		if(!$scope.markNewReportSet){
			var confirmPopup = $ionicPopup.confirm({
				title: '<h4>'+$filter('translate')('SELECCIONA_MAPA')+ '</h4>',
			});
			confirmPopup.then(function(r) {
				if(r) {
					markersTemporal =$scope.map.markers;
					$scope.map.markers = [];
					//$scope.map.options.styles = [{'featureType':'water','elementType':'all','stylers':[{'hue':'#e9ebed'},{'saturation':-78},{'lightness':67},{'visibility':'simplified'}]},{'featureType':'landscape','elementType':'all','stylers':[{'hue':'#ffffff'},{'saturation':-100},{'lightness':100},{'visibility':'simplified'}]},{'featureType':'road','elementType':'geometry','stylers':[{'hue':'#bbc0c4'},{'saturation':-93},{'lightness':31},{'visibility':'simplified'}]},{'featureType':'poi','elementType':'all','stylers':[{'hue':'#ffffff'},{'saturation':-100},{'lightness':100},{'visibility':'off'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'hue':'#e9ebed'},{'saturation':-90},{'lightness':-8},{'visibility':'simplified'}]},{'featureType':'transit','elementType':'all','stylers':[{'hue':'#e9ebed'},{'saturation':10},{'lightness':69},{'visibility':'on'}]},{'featureType':'administrative.locality','elementType':'all','stylers':[{'hue':'#2c2e33'},{'saturation':7},{'lightness':19},{'visibility':'on'}]},{'featureType':'road','elementType':'labels','stylers':[{'hue':'#bbc0c4'},{'saturation':-93},{'lightness':31},{'visibility':'on'}]},{'featureType':'road.arterial','elementType':'labels','stylers':[{'hue':'#bbc0c4'},{'saturation':-93},{'lightness':-2},{'visibility':'simplified'}]}];
					reportObject = {};
					mapNewReport=true;
				}
			});
		}else{
			$scope.newCategoryReport();
		}
	};

	$scope.newCategoryReport= function() {
		popArray.push( $ionicPopup.show({
			templateUrl: 'templates/reports/categories.html' ,
			title: '<h3>'+ $filter('translate')('TITULO_REPORTE')+ '</h3>',
			subTitle: '<h4>'+$filter('translate')('PREGUNTA_REPORTE')+ '</h4>',
			scope: $scope
		}));
	};
	////////////////////////////////////////////// Son cuatro Categorias Principales
	$scope.newThefReport  = function() {
		reportObject.typeReport = 1;
		popArray.push($ionicPopup.show({  //Aqui se muestran los cuatros tipos de robos
			templateUrl: 'templates/reports/thef.html',		//
			title: '<h3>'+ $filter('translate')('ROBO')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('PREGUNTA_ROBO')+ '</h4>',
			scope: $scope
		}));
	};

	$scope.newAssaultReport  = function() {
		reportObject.typeReport = 2;
		popArray.push($ionicPopup.show({ //Aqui se muestran los cuatro tipo de agreciones
			templateUrl: 'templates/reports/assault.html',
			title: '<h3>'+ $filter('translate')('AGRESION')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('PREGUNTA_AGRESION')+ '</h4>',
			scope: $scope
		}));
	};

	$scope.newStreetReport  = function() {
		reportObject.typeReport = 3;
		popArray.push($ionicPopup.show({
			templateUrl: 'templates/reports/street.html',
			title: '<h3>'+ $filter('translate')('CALLE')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('PREGUNTA_CALLE')+ '</h4>',
			scope: $scope
		}));
	};

	$scope.newServiceReport = function() {
		reportObject.typeReport = 4;
		popArray.push($ionicPopup.show({
			templateUrl: 'templates/reports/service.html',
			title: '<h3>'+ $filter('translate')('SERVICIO')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('PREGUNTA_SERVICIO')+ '</h4>',
			scope: $scope
		}));
	};
	///////////////////////////////////////////////////////////////////////////////////
	// Dos de las categorias tiene armas y 
	$scope.newWeaponReport = function(i,j) {
		reportObject[i] = j;
		popArray.push( $ionicPopup.show({
			templateUrl: 'templates/reports/weapon.html',
			title: '<h3>'+ $filter('translate')('ARMA')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('PPREGUNTA_ARMA')+ '</h4>',
			scope: $scope
		}));
	};

	$scope.newPlaceReport = function(i,j) {
		reportObject[i] = j;
		popArray.push($ionicPopup.show({
			templateUrl: 'templates/reports/place.html',
			title: '<h3>'+ $filter('translate')('LUGAR')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('PREGUNTA_LUGAR')+ '</h4>',
			scope: $scope
		}));
	};
	////////////////////////////////////////////////////////////////////////////////
	$scope.newEnviromentReport = function(i,j){
		reportObject[i] = j;
		popArray.push($ionicPopup.show({
			templateUrl: 'templates/reports/enviroment.html',
			title: '<h3>'+ $filter('translate')('MEDIO_AMBIENTE')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('ESPECIFICA')+ '</h4>',
			scope: $scope
		}));
	};


	$scope.newWaterLigthReport = function(i,j) {
		reportObject[i] = j;
		popArray.push( $ionicPopup.show({
			templateUrl: 'templates/reports/waterLigth.html',
			title: '<h3>'+ $filter('translate')('LUZ_AGUA')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('ESPECIFICA')+ '</h4>',
			scope: $scope
		}));
	};

	$scope.newSpoilageReport = function(i,j){
		reportObject[i] = j;
		popArray.push($ionicPopup.show({
			templateUrl: 'templates/reports/spoilage.html',
			title: '<h3>'+ $filter('translate')('DETERIORO')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('ESPECIFICA')+ '</h4>',
			scope: $scope
		}));
	};


	$scope.newNeighborReport = function(i,j) {
		reportObject[i] = j;
		popArray.push( $ionicPopup.show({
			templateUrl: 'templates/reports/neighbor.html',
			title: '<h3>'+ $filter('translate')('SERVICIO')+ '</h3>',
			subTitle:  '<h4>'+ $filter('translate')('ESPECIFICA')+ '</h4>',
			scope: $scope
		}));
	};
	///////////////////////////////////////////////////////////////////////////////////////
	$scope.newReportSaveAndPhoto = function(i,j) {
		reportObject[i] = j;
		reportObject.likes = 0;
		var confirmPopup = $ionicPopup.confirm({
				title: '<h4>'+$filter('translate')('TOMAR_FOTO')+ '</h4>',
			});
		
		confirmPopup.then(function(r) {
				popArray.forEach(function(popoup){
					popoup.close();
				});
				console.log(r)

				$scope.markNewReportSet = false;
				mapNewReport = false;

				if(r) {
					console.log("Camara");
					$cordovaCamera.getPicture({
				        destinationType : 1
				    	}
					).then(function(imageData) {
						alert("Camara ok");
						alert(imageData);
						reportObject.photo = imageData;
					}, function(err) {
						alert("Camara error");
						alert(err);
					});
				}

				$http.put('http://mysterious-tundra-4206.herokuapp.com/reporte', reportObject).
				success(function(data, status) {
					console.log (data);
				})

				//Despues de finalizar alta de reporte
				markersTemporal.push(reportObject);
				
				localstorage.setObject('markers',markersTemporal);
				
				$scope.map.markers = markersTemporal;
			});
		};

////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////
	$scope.map = {
			center: {
				latitude: 19.4953057,
				longitude: -99.1350464
			},
			zoom: 14,
			options:{
				disableDefaultUI:true,
				//styles:[{'featureType':'water','elementType':'all','stylers':[{'hue':'#e9ebed'},{'saturation':-78},{'lightness':67},{'visibility':'simplified'}]},{'featureType':'landscape','elementType':'all','stylers':[{'hue':'#ffffff'},{'saturation':-100},{'lightness':100},{'visibility':'simplified'}]},{'featureType':'road','elementType':'geometry','stylers':[{'hue':'#bbc0c4'},{'saturation':-93},{'lightness':31},{'visibility':'simplified'}]},{'featureType':'poi','elementType':'all','stylers':[{'hue':'#ffffff'},{'saturation':-100},{'lightness':100},{'visibility':'off'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'hue':'#e9ebed'},{'saturation':-90},{'lightness':-8},{'visibility':'simplified'}]},{'featureType':'transit','elementType':'all','stylers':[{'hue':'#e9ebed'},{'saturation':10},{'lightness':69},{'visibility':'on'}]},{'featureType':'administrative.locality','elementType':'all','stylers':[{'hue':'#2c2e33'},{'saturation':7},{'lightness':19},{'visibility':'on'}]},{'featureType':'road','elementType':'labels','stylers':[{'hue':'#bbc0c4'},{'saturation':-93},{'lightness':31},{'visibility':'on'}]},{'featureType':'road.arterial','elementType':'labels','stylers':[{'hue':'#bbc0c4'},{'saturation':-93},{'lightness':-2},{'visibility':'simplified'}]}]
			},
			control:{},
			events:{
				'click': function (map,eventName,options){
					if (mapNewReport){
						console.log("click")
						$scope.markNewReportSet = true;
						$scope.map.markers = [];
						$scope.$apply();
						reportObject.latitude = options[0].latLng.k;
						reportObject.longitude = options[0].latLng.B;
						reportObject.id = markersTemporal.length+1;
						
						$scope.map.markers.push(reportObject);
						$scope.$apply();
					}
				}
			},markerEvents:{
				'click': function (marker,eventName,options){
					console.log(options);
					$state.go('main.detail',{options:options}, {location: false, inherit: false});
				}
			},
			markers : [

			],
			clusterOptions:{
				calculator:function (markers) {
					return {
						text: '<div class="textCluster"><span>' + markers.length+  '</span></div>',
						index:3
					};
				},
				gridSize:80,
				averageCenter:true,
				clusterClass: 'customCuster',
				imagePath: 'images/malandro',
				imageSizes:[48,48,48]
			}
		};
		//console.log(localstorage.getObject('markers'));
		$http.get('http://mysterious-tundra-4206.herokuapp.com/reporte').
				success(function(data, status) {
					localstorage.setObject('markers',data);
					if (localstorage.getObject('markers'))
						$scope.map.markers =  localstorage.getObject('markers') 
					else
						$scope.map.markers = [];
				}).error(function(error){
					if (localstorage.getObject('markers'))
						$scope.map.markers =  localstorage.getObject('markers') 
					else
						$scope.map.markers = [];
				})
		
		//randomMarkers(50);

});