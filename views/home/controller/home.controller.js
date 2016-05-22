'use strict';

/**
* @author Alysson Tiago
*
* Controller home application.
*/
angular.module('pokethon.homeController', [])

.controller('HomeController', HomeController);


HomeController.$inject = ['PokethonService','$scope', '$interval'];

function HomeController(PokethonService, $scope, $interval) {

    var vm = this;

    vm.disableSearch = true;

    vm.listPokemons = [];
    vm.textFilter = '';
    vm.pokemon = {};

    vm.gameState = 'search';
    vm.battleState = 'battle';

    vm.playerPokemons = [];
    vm.enemyPokemons = [];

    vm.battleButtonValue = 'Battle!';

    vm.score = {
        player : 0,
        enemy : 0
    }
    vm.message = {
        player : '',
        enemy : ''
    }


    vm.init = init;
    vm.selectPokemon = selectPokemon;
    vm.startBattle = startBattle;
    vm.battleButtonAction = battleButtonAction;



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

    function startBattle() {
        if(vm.playerPokemons.length === 3 && vm.enemyPokemons.length === 3) {
            vm.gameState = 'battle';
        }
    }

    function battleButtonAction() {
        if(vm.battleState === 'battle') {
            battle();
            vm.battleState = 'new';
        } else {
            restartGame();
        }
    }

    function battle() {
        for(var i = 0; i < 3; i++) {
            var playerPokemonScore = Math.floor((Math.random() * 100));
            var enemyPokemonScore = Math.floor((Math.random() * 100));

            isWinner(vm.playerPokemons[i], playerPokemonScore, vm.enemyPokemons[i], enemyPokemonScore);
        }

        if(vm.score.player > vm.score.enemy) {
            vm.message.player = 'Winner';
        } else if(vm.score.player < vm.score.enemy) {
            vm.message.enemy = 'Winner';
        } else {
            vm.message.player = 'Tie';
            vm.message.enemy = 'Tie';
        }

        vm.battleButtonValue = 'New Battle';
    }

    function isWinner(playerPokemon, playerPokemonScore, enemyPokemon, enemyPokemonScore) {
        if(playerPokemonScore === enemyPokemonScore) {
            vm.score.player++;
            vm.score.enemy++;
        } else if(playerPokemonScore > enemyPokemonScore) {
            vm.score.player++;
            playerPokemon.winner = true;
        } else {
            vm.score.enemy++;
            enemyPokemon.winner = true;
        }
    }

    function restartGame() {
        vm.disableSearch = true;

        vm.listPokemons = [];
        vm.textFilter = '';
        vm.pokemon = {};

        vm.gameState = 'search';
        vm.battleState = 'battle';

        vm.playerPokemons = [];
        vm.enemyPokemons = [];

        vm.battleButtonValue = 'Battle!';

        vm.score = {
            player : 0,
            enemy : 0
        }
        vm.message = {
            player : '',
            enemy : ''
        }

        getPokemons();
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
