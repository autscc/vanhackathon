

	'use strict';

	/**
	 * @author Alysson Tiago,

	 * @ngdoc overview
	 * @name Pokethon
	 * @description
	 * # Pokethon
	 *
	 * Module main application.
	 */
	angular.module('pokethon', [
	    'ui.router',
	    'ct.ui.router.extras',
	    'pokethon.filters',
	    'pokethon.services',
	    'pokethon.directives',
	    'pokethon.constants',
	    'pokethon.homeController'
	])

	.config(function($stateProvider,$urlRouterProvider) {  

	  $urlRouterProvider.otherwise("/");

	  $stateProvider
	    .state('index', {
	      url: "/",
	      views: {
	        "home": { templateUrl: "/views/home/home.html" }
	      }
	    })
	})

	.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	    $state.go('index');
	}]);
