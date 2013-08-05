(function() {
  angular.module("myModule", ["ui.bootstrap", "interval"]);

  this.PageCtrl = [
    "$scope", "$filter", "$interval", function($scope, $filter, $interval) {
      $scope.interval = 5000;
      $scope.page = JSON.parse($("#apologies-data").text());
      $scope.pusher = new Pusher($('body').data('pusher-key'));
      $scope.channel = $scope.pusher.subscribe($('body').data('pusher-channel'));
      $scope.expire_previous_apologies = function() {
        var apology, date_closed, difference, index, _results;

        index = $scope.page.apologies.length - 1;
        _results = [];
        while (index >= 0) {
          apology = $scope.page.apologies[index];
          if (apology.closed_at) {
            date_closed = moment(apology.closed_at);
            difference = date_closed.diff(moment(), 'days');
            if (difference < -7) {
              $scope.page.apologies.splice(index, 1);
            }
          }
          _results.push(index--);
        }
        return _results;
      };
      $scope.current_apologies = function() {
        return $filter("filter")($scope.page.apologies, {
          state: "open"
        });
      };
      $scope.previous_apologies = function() {
        return $filter("filter")($scope.page.apologies, {
          state: "closed"
        });
      };
      $scope.sorry = function() {
        return !!$scope.current_apologies().length;
      };
      $scope.channel.bind("page-updated", function(data) {
        return $scope.$apply(function() {
          return $scope.page = data;
        });
      });
      return $interval($scope.expire_previous_apologies, 5000);
    }
  ];

}).call(this);
