(function() {
  this.PageCtrl = [
    "$scope", "$filter", function($scope, $filter) {
      $scope.page = JSON.parse($("#apologies-data").text());
      $scope.pusher = new Pusher("8d89d29aaf9f27452fc5");
      $scope.channel = $scope.pusher.subscribe("status-page.sorryapp.com");
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
        if ($scope.current_apologies().length === 0) {
          return false;
        } else {
          return true;
        }
      };
      $scope.channel.bind("apology-updated", function(data) {
        return $scope.$apply(function() {
          var found;

          found = $filter("filter")($scope.page.apologies, {
            id: data.id
          });
          return $.extend(true, found[0], data);
        });
      });
      return $scope.channel.bind("apology-created", function(data) {
        return $scope.$apply(function() {
          return $scope.page.apologies.push(data);
        });
      });
    }
  ];

}).call(this);
