'use strict';
angular.module('Malandro', ['ionic','ionic.utils','Malandro.controllers','pascalprecht.translate','ngCordova'])

.run(function($ionicPlatform,$cordovaSplashscreen,localstorage,$http) {
	$ionicPlatform.ready(function() {
		try{
				setTimeout(function() {
						$cordovaSplashscreen.hide();
					}, 1500);
				var media = new Media('/android_asset/www/audio/intro.mp3');
				media.play();
			}catch(e){
				alert(e);
			}
		
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})


.config(function($stateProvider, $urlRouterProvider,$translateProvider) {
	$translateProvider
		.translations('es', {
			'TITULO-IDIOMA' : 'Elige idioma',
			'IDIOMA-INGLES' : 'Inglés',
			'IDIOMA-ESPANOL': 'Español',
			'ELEGIR' : 'Elegir',
			'COMENZAR' : 'Comenzar',
			'TITLE-SLIDE-1' : 'Esta malandro',
			'SLIDE-1'       : ' Está malandro es una aplicación que te ayudará a localizar sitios peligrosos y estadísticas delictivas.',
			'TITLE-SLIDE-2' : 'Observa las zonas peligrosas',
			'SLIDE-2'       : 'En el mapa se muestran los lugares peligrosos cerca de tu posición. Puedes ver más infomación al presionar el malandro.',
			'SLIDE-2-B'     : '',
			'TITLE-SLIDE-3' : 'Reporta un delito',
			'SLIDE-3'       :'Identifica algún lugar peligroso y repórtalo presionando en el mapa.',
			'SLIDE-3-B'     : 'Describe lo que sucedió. Al finalizar aparecerá un malandro con tu reporte. No te preocupes, es anónimo.',
			'TITLE-SLIDE-4' : 'Consulta las estadísticas',
			'SLIDE-4'       : 'Accede a las estadísticas desde el menú lateral. Puede ver los delitos por estado, colonia y municipio.',
			'SLIDE-4-B'     : '',
			'TITLE-SLIDE-5' : 'Cada icono significa algo',
			'ROBO'          : 'Robo',
			'AGRESION'      : 'Agresión',
			'SEXUAL'        : 'Sexual',
			'PANDILLAS'     : 'Pandillas',
			'SIN-LUZ'       : 'Sin iluminación',
			'CALLE'			: 'Calle',
			'SERVICIO'		: 'Servicios',
			'PERTENECIAS'	: 'Posesiones',
			'DINERO'		: 'Dinero',
			'AUTOPARTES'	: 'Autopartes',
			'AUTO'			: 'Auto',
			'GRAFITI'		: 'Graffiti',
			'TITULO_REPORTE': 'Reporte',
			'PREGUNTA_REPORTE': 'Indica el tipo',
			'PREGUNTA_ROBO'	: '¿Que te quitaron?',
			'PREGUNTA_AGRESION': '¿Como fue la agresion?',
			'FISICA'		: 'Fisica',
			'SECUESTRO'		: 'Secuestro',
			'HOMICIDIO'		: 'Homicidio',
			'GRUPOS'		: 'Grupos sospechosos',
			'PREGUNTA_CALLE': '¿Que sucedio?',
			'ENFRENTAMIENTOS': 'Enfrentmientos armamados',
			'MANIFESTANTES'	: 'Manifestantes',
			'BACHES'		: 'Baches',
			'AGUA'			: 'Fugas de agua',
			'PREGUNTA_SERVICIO': '¿Que servicio quieres reportar?',
			'SELECCIONA_MAPA': 'Selecciona en el mapa que lugar esta malandro',
			'MEDIO_AMBIENTE': 'Medio ambiente',
			'LUZ_AGUA'		: 'Luz y agua',
			'VECINOS'		: 'Vecinos',
			'DETERIORO'		: 'Deterioro',
			'TOMAR_FOTO'	: 'Quieres complementar tu reporte con una foto.',
			'GRAFFITI'		: 'Grafiti',
			'ENFRENTAMIEMTOS': 'Enfrentmientos armados',
			'SIN_VIOLENCIA'	: 'Sin violencia',
			'GOLPES'		:'Golpes',
			'ARMA_BLANCA'	:'Arma blanca',
			'ARMA_FUEGO'	:'Arma de fuego',
			'FALTA_RIEGO'	: 'Falta de riego',
			'PARQUE_MAL_ESTADO':'Parque, areas verdes en mal estado',
			'BASURA'		:'Tiradero de basura',
			'LIMPIEZA'		:'Limpieza de calles',
			'FUGAS'			:'Fugas de agua',
			'COLADERAS'		:'Coladeras tapadas',
			'ROBO_LUZ'		:'Robo de luz',
			'FALTA_LUZ'		:'Falta de iluminacion',
			'AUTOS_ABANDONADOS':'Autos abandonados',
			'CASAS_MAL_ESTADO':'Casas en mal estado',
			'OFICINAS_MAL_ESTADO':'Oficinas de gobierno en mal estado',
			'CIERRE_CALLES':'Calle cerrada por fiesta',
			'RUIDO'			:'Ruido execivo',
			'TOQUINES'		:'Toquines',
			'ARMA'			:'Arma',
			'PPREGUNTA_ARMA':'¿Que arma usaron?',
			'LUGAR'			:'Lugar',
			'PREGUNTA_LUGAR':'¿Donde paso el incidente?',
			'ESPECIFICA'	:'Especifica',
			'HOGAR'			:'Hogar',
			'TRANSPORTE'	:'Transporte',
			'LOCAL'			:'Establecimiento'


		})
		.translations('en', {
			'TITULO-IDIOMA' : 'Select language',
			'IDIOMA-INGLES' : 'English',
			'IDIOMA-ESPANOL': 'Spanish',
			'ELEGIR' : 'Ok',
			'COMENZAR' : 'Start',
			'SLIDE-1'       : ' Está malandro es una aplicación que te ayudará a localizar sitios peligrosos y estadísticas delictivas.'

		});

	$stateProvider

		.state('main', {
			url: '/main',
			abstract: true,
			templateUrl: 'templates/main.html'
		})

		.state('main.instructions', {
			url: '/instructions',
			views: {
				'instructions': {
					templateUrl: 'templates/instructions.html',
					controller: 'InstructionsCtrl'
				}
			}
		})
		.state('main.language', {
			url: '/language',
			views: {
				'instructions': {
					templateUrl: 'templates/language.html',
					controller: 'LanguageCtrl'
				}
			}
		})
		 .state('main.map', {
			url: '/map',
			views: {
				'instructions': {
					templateUrl: 'templates/map.html',
					controller: 'MapCtrl'
				}
			}
		}).state('main.detail', {
			url: '/detail',
			views: {
				'instructions': {
					templateUrl: 'templates/detail.html',
					controller: 'DetailCtrl'
				}
			}
		});

	 
	$urlRouterProvider.otherwise('/main/map');
	$translateProvider.preferredLanguage('es');
});


