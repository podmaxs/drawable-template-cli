	(function(){

		'use strict';

		angular.module('app.pages')
		.directive('pageSectionHome', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				// scope: {}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<md-toolbar md-scroll-shrink>'+
    					'<div class="md-toolbar-tools">My home page</div>'+
  					'</md-toolbar>'+
  					'<md-content layout-padding >'+
  						'<p ng-repeat="i in [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,26,23,24,25,27,28,29]">{{i}} - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed debitis, sunt beatae, veniam nihil numquam quod, officia adipisci quisquam minima labore quaerat. Iusto maiores at illum amet consequatur mollitia itaque.</p>'+
  					'</md-content>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					
				}
			};
		}]);;
		

	})();