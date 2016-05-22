

'use strict';


angular.module('pokethon.services',[])

.service('PokethonService', PokethonService);


PokethonService.$inject = ['$http', '$q', 'PokethonConstants'];


function PokethonService($http, $q, PokethonConstants ) {

                // Return public API.
                return({
                    findAllPokemons : findAllPokemons,
                    findPokemonSkill: findPokemonSkill
                });


                                // ---
                // PUBLIC METHODS.
                // ---

                //Return all pokemons of Pokeapi.co
                function findAllPokemons() {
                    
                    var request = $http({
                        method: "GET",
                        url: PokethonConstants.hostRemote + "pokemon?limit=811",
                    });

                    return( request.then( handleSuccess, handleError ) );
                }

                //Return skill of pokemon URL
                function findPokemonSkill(url) {
                    
                    var request = $http({
                        method: "GET",
                        url: url,
                    });

                    return( request.then( handleSuccess, handleError ) );
                }


                // ---
                // PRIVATE METHODS.
                // ---

                function handleError( response ) {
                    if (
                        ! angular.isObject( response.data ) ||
                        ! response.data.message
                        ) {
                        return( $q.reject( "An unknown error occurred." ) );
                    }
                    // Otherwise, use expected error message.
                    return( $q.reject( response.data.message ) );
                }

                function handleSuccess( response ) {
                    return( response.data );
                }
};
