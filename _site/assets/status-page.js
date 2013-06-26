(function() {
  this.PageCtrl = [
    "$scope", "$filter", function($scope, $filter) {
      $scope.page = JSON.parse($("#apologies-data").text());
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
      return $scope.sorry = function() {
        if ($scope.current_apologies().length === 0) {
          return false;
        } else {
          return true;
        }
      };
    }
  ];

  jQuery(function() {
    var nIntervId, updateTimes;

    updateTimes = function() {
      return $("time.live").each(function(index) {
        return $(this).text(moment($(this).data("stamp")).fromNow());
      });
    };
    nIntervId = setInterval(updateTimes, 1000);
    updateTimes();
    return $("#carousel").carousel({
      interval: 5000,
      pause: ""
    });
  });

}).call(this);
