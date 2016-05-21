

  'use strict';

  /**
   * @author Alysson Tiago
   *
   * Controller home application.
   */
   angular.module('pokethon.homeController', [])

   .controller('HomeController', HomeController);


   HomeController.$inject = ['PokethonService','$scope'];

   function HomeController(PokethonService) {

    var vm = this;

    /*Functions*/
    vm.init = init;
    
    /*List return all pokemons*/
    vm.listPokemon = {}
    
    function init() {

        console.log('Init Pokethon!');
      
        PokethonService.findAllPokemons().then(function(data){
          vm.listPokemon = data.results;
          console.log('All Pokemons: ',vm.listPokemon);
        });

        PokethonService.findPokemonSkill("http://pokeapi.co/api/v2/pokemon/1/").then(function(data){
          console.log('Skill Pokemon Bulbasaur: ', data);
        });
 
    }

  }


