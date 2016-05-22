'use strict';

/**
* @author Alysson Tiago
*
* Controller home application.
*/
angular.module('pokethon.homeController', [])

.controller('HomeController', HomeController);


HomeController.$inject = ['PokethonService','$scope'];

function HomeController(PokethonService, $scope) {

    var vm = this;

    vm.disableSearch = true;

    vm.listPokemons = [];
    vm.textFilter = '';
    vm.pokemon = {};

    vm.gameState = 'search';

    vm.playerPokemons = [];
    vm.enemyPokemons = [];

    /**
     * @ngdoc function
     * @name Trigueiro Neto
     * @description Method declarations
     *
     *
     */

    vm.init = init;
    vm.selectPokemon = selectPokemon;
    vm.startBattle = startBattle;


    function init() {
        getPokemons();
    }

    function getPokemons() {
        PokethonService.findAllPokemons().then(function(data) {
            vm.listPokemons = data.results;
            vm.disableSearch = false;

            generateEnemyPokemons();
        });
    }

    function selectPokemon(pokemon) {
        vm.disableSearch = true;
        vm.textFilter = '';

        vm.pokemon = pokemon;

        PokethonService.findPokemonSkill(pokemon.url).then(function(data) {

            if(vm.playerPokemons.length < 3 && isValid(data, vm.playerPokemons)) {
                vm.pokemon = angular.extend(data);

                vm.playerPokemons.push(vm.pokemon);
            } else {
                console.log('ja existe');
            };

            vm.disableSearch = false;
            vm.pokemon = {};
        });
    }

    function startBattle() {
        if(vm.playerPokemons.length === 3 && vm.enemyPokemons.length === 3) {
            vm.gameState = 'battle';
        }
    }

    function generateEnemyPokemons() {
        for(var i = 0; i < 3; i++) {
            var aux = {};
            var random = Math.floor((Math.random() * 811));

            if(isValid(vm.listPokemons[random].name, vm.enemyPokemons)) {
                aux = angular.copy(vm.listPokemons[random]);

                PokethonService.findPokemonSkill(aux.url).then(function(data) {
                    aux = angular.extend(data);
                    vm.enemyPokemons.push(aux);
                    console.log(vm.enemyPokemons);
                });
            }
        }
    }

    function isValid(pokemon, list) {
        for(var i = 0; i < list.length; i++) {
            if(list[i].name === pokemon.name) {
                return false;
            }
        }

        return true;
    }
}
