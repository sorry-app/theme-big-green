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
      if ($scope.current_apologies().length > 1) {
        $("#carousel").carousel({
          interval: 5000,
          pause: ""
        });
      }
      $scope.channel.bind("apology-updated", function(data) {
        return $scope.$apply(function() {
          var found;

          found = $filter("filter")($scope.page.apologies, {
            id: data.id
          });
          return $.extend(true, found[0], data);
        });
      });
      $scope.channel.bind("apology-created", function(data) {
        return $scope.$apply(function() {
          return $scope.page.apologies.push(data);
        });
      });
      return $scope.$watch('current_apologies().length', function(newval, oldval) {
        if (oldval === 1 && newval === 2) {
          return $("#carousel").carousel('cycle');
        } else if (oldval === 2 && newval === 1) {
          return $("#carousel").carousel('pause');
        }
      });
    }
  ];

}).call(this);
