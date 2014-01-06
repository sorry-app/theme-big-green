# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
jQuery ->
  # Define a method for updating timestamps on the page.
  updateTimes = ->
    # Loop over the collection of time elements.
    $("time.live").each (index) ->
      # Update the text based on their data stamp.
      $(this).text moment($(this).data("stamp")).fromNow()
  
  # Now update all the timestamps on a regular interval.
  nIntervId = setInterval(updateTimes, 1000)
  
  # Update the times for the first time.
  updateTimes()