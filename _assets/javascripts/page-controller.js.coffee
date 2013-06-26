# I'm the angular controller for the page.

# Defined a controller for the page.
@PageCtrl = ["$scope", "$filter", ($scope, $filter) ->
  # Laod in the apologies to start with.
  $scope.page = JSON.parse($("#apologies-data").text())

  # Bind to push updates.
  # create a pusher instance within the controller.
  $scope.pusher = new Pusher("8d89d29aaf9f27452fc5")
  # Subscribe to this pages unique chanel.
  $scope.channel = $scope.pusher.subscribe("status-page.sorryapp.com")

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

  # Kick-off a carousel for the apologies.
  # First check to see if the carousel is already defined.
  if $scope.current_apologies().length > 1
    # We have more than a single appology so we want to start the carousel.
    $("#carousel").carousel
      interval: 5000 # Rotate every 5 seconds.
      pause: "" # Don't pause on mouse hover.

  # Bind for the apology updated event.
  $scope.channel.bind "apology-updated", (data) ->
    # An apology has been updated, we must update the model.
    $scope.$apply ->
      # Get a filered array of open apologies.
      found = $filter("filter") $scope.page.apologies,
        id: data.id

      # Get the HTML element for this apology.
      element = $('#apology_' + data.id)

      # Check if this is the active element.
      if element.hasClass 'active' and found[0].state != data.state
        # Move on to the next before we remove or update.
        $("#carousel").carousel('next')

      # Extend the element that we found.
      $.extend true, found[0], data

  # Bind for the apology created event.
  $scope.channel.bind "apology-created", (data) ->
    # A new apology has been created.
    $scope.$apply ->
      # Append it to the scope collection.
      $scope.page.apologies.push data

  # Watch for changes to the number of open apologies.
  $scope.$watch 'current_apologies().length', (newval, oldval) ->
    # Watch for the switch to multiple current appologies.
    if oldval == 1 and newval == 2
      # We now have multiple current apologies, so start cycling.
      $("#carousel").carousel 'cycle'
    else if oldval == 2 and newval == 1
      # We have gone from multiple to single apologies, stop cycling.
      $("#carousel").carousel 'pause'

]