// Initilize the Angular App.
var myApp = angular.module('myApp', []);

// Defined a controller for the page.
var PageCtrl = ['$scope', '$filter', '$http', function($scope, $filter, $http) {
	// Laod in the apologies to start with.
	$scope.page = JSON.parse($('#apologies-data').text());

	// This method tells us whether the page is in appology state or not.
	$scope.sorry = function() {
		// Get a filered array of open apologies.
		var open_apologies = $filter('filter')($scope.page.apologies, {state:'open'});

		// Cbeck the number of open apologies.
		if(open_apologies.length == 0) {
			// We have none, so return success state.
			return false
		} else {
			// We have some open apologies, so return error state.
			return true
		};
	};
}];