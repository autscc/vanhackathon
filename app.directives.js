

	'use strict';

	/*Directives of application*/
	angular.module('pokethon.directives',[])

	/*Criando diretiva padrão para exibição e ocultação de DIV com spinner*/
    .directive("loader", function ($rootScope) {
		console.log('Diretiva');
	    return function ($rootScope, element, attrs) {
	        $rootScope.$on("loader_show", function () {
	        	element.removeClass('ajax-t');
	            return element.addClass('loaderDiv');
	        });
	        return $rootScope.$on("loader_hide", function () {
	        	//return element.hide();
	            element.removeClass('loaderDiv');
	            return element.addClass('ajax-t');
	        });
	    };
	});

