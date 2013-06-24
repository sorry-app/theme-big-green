(function() {
  jQuery(function() {
    var nIntervId, updateTimes;

    updateTimes = function() {
      return $("time.live").each(function(index) {
        return $(this).text(moment($(this).data("stamp")).fromNow());
      });
    };
    nIntervId = setInterval(updateTimes, 1000);
    return updateTimes();
  });

}).call(this);
