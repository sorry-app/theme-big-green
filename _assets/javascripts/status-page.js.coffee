# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
# Defined a controller for the page.
@PageCtrl = ["$scope", "$filter", ($scope, $filter) ->
  # Laod in the apologies to start with.
  $scope.page = JSON.parse($("#apologies-data").text())
  
  # This method tells us whether the page is in appology state or not.
  $scope.current_apologies = ->
    # Get a filered array of open apologies.
    $filter("filter") $scope.page.apologies,
      state: "open"

  # This method tells us whether the page is in appology state or not.
  $scope.previous_apologies = ->
    # Get a filered array of open apologies.
    $filter("filter") $scope.page.apologies,
      state: "closed"

  # This method tells us whether the page is in appology state or not.
  $scope.sorry = ->
    # Cbeck the number of open apologies.
    if $scope.current_apologies().length is 0
      # We have none, so return success state.
      return false
    else
      # We have some open apologies, so return error state.
      return true
]

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

  # Kick-off a carousel for the apologies.
  $("#carousel").carousel
    interval: 5000
    pause: ""