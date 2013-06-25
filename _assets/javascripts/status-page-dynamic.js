// Initilize the Angular App.
var myApp = angular.module('myApp', []);

// Create a filter for finding items by ID.
myApp.filter('find_by_id', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
});

// Defined a controller for the page.
var PageCtrl = ['$scope', '$filter', '$http', function($scope, $filter, $http) {
	// Define the connection to the pusher service.
	$scope.pusher = new Pusher($('body').data('key'));
	$scope.channel = $scope.pusher.subscribe($('body').data('channel'));

	// Laod in the apologies to start with.
	$scope.page = JSON.parse($('#apologies-data').text());

	// This method tells us whether the page is in appology state or not.
	$scope.open_apologies = function() {
		// Get a filered array of open apologies.
		return $filter('filter')($scope.page.apologies, {state:'open'});
	};

	// This method tells us whether the page is in appology state or not.
	$scope.closed_apologies = function() {
		// Get a filered array of open apologies.
		return $filter('filter')($scope.page.apologies, {state:'closed'});
	};		

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

	/* Bind for the apology updated event. */
	$scope.channel.bind('apology-updated', function(data) {
		// An apology has been updated, we must update the model.
		$scope.$apply(function(){
			// Update the appropriate record with new details.
			var found = $filter('find_by_id')($scope.page.apologies, data.id);

			// Extend the element that we found.
			$.extend(true, found, data);
		});
	});

	// Bind for the apology created event.
    $scope.channel.bind('apology-created', function(data) {
    	// A new apology has been created.
      	$scope.$apply(function(){
      		// Append it to the scope collection.
	      	$scope.page.apologies.push(data);
	    });
    });
}];