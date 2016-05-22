

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

	.factory('httpInterceptor', function($q,$rootScope) {
  
		  return {

		    'request': function(config) {
		    	$rootScope.$broadcast("loader_show");
		      // do something on success
		      return config || $q.when(config);
		    },

		    // optional method
		   'requestError': function(rejection) {
		      
		      $rootScope.$broadcast("loader_hide");
		      return $q.reject(rejection);
		      
		    },


		    //Disparado ao receber a resposta da requisição.
		    'response': function(response) {
		       console.log('Carregado');
		       $rootScope.$broadcast("loader_hide");
		      // do something on success
		      return response || $q.when(response);
		    },

		        // optional method
		   'responseError': function(rejection) {
		   		
		   	  $rootScope.$broadcast("loader_hide");      
		      return $q.reject(rejection);
		    
		    },

		  };

	})

	.config(function($stateProvider,$urlRouterProvider,$httpProvider) {  

	  $httpProvider.interceptors.push('httpInterceptor');

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
