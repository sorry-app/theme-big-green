(function() {
  jQuery(function() {
    return $("a[href^=\"#\"]").on("click", function(e) {
      var $target, target;

      e.preventDefault();
      target = this.hash;
      $target = $(target);
      return $("html, body").stop().animate({
        scrollTop: $target.offset().top
      }, 900, "swing", function() {
        return window.location.hash = target;
      });
    });
  });

}).call(this);
