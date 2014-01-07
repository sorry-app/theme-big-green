# This script handles smooth scrolling to anchor points rather than
# the default quick jump down.

# Wait for jquery to load.
jQuery ->
  # Bind a click event on all links.
  $("a[href^=\"#\"]").on "click", (e) ->
    # Prevent the default anchor jump.
    e.preventDefault()
    # Get the target for the jump.
    target = @hash
    $target = $(target)

    # Animate the scroll to the target.
    $("html, body").stop().animate
      scrollTop: $target.offset().top
    , 900, "swing", ->
      window.location.hash = target