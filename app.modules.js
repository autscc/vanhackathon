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
var app = angular.module('pokethon', [
    'ui.router',
    'ct.ui.router.extras',
    'pokethon.filters',
    'pokethon.data',
    'pokethon.diretivas',
    'pokethon.constants',
]);

app.config(function($stateProvider,$urlRouterProvider) {  

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('index', {
      url: "/",
      views: {
        "home": { templateUrl: "/views/home.html" }
      }
    })
});

app.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $state.go('index');
}]);