	(function(){

		'use strict';

		angular.module('dw.navigation')
		.config(['$stateProvider','$urlRouterProvider', 'NAVIGATION_SEED',function($stateProvider,$urlRouterProvider,NAVIGATION_SEED) {
			
			$urlRouterProvider.otherwise("/section/"+NAVIGATION_SEED.initial);
			$urlRouterProvider.when("", "/section/"+NAVIGATION_SEED.initial);
			$urlRouterProvider.when("/", "/section/"+NAVIGATION_SEED.initial);

			$stateProvider
		    .state('section', {
		    	url: "/section",
		    	abstract: true,
		    	template: "<div ui-view='' class='page-loader'></div>"
			})

			for(var sec in NAVIGATION_SEED.states){
				var name = NAVIGATION_SEED.states[sec].name || '',
					url  = NAVIGATION_SEED.states[sec].url || name;
				$stateProvider
				.state('section.'+name, {
			        url: "/"+name,
			        template: "<page-section-"+name+"></page-section-"+name+">"
    			});
			}
		}]);
		

	})();