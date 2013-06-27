# I'm the angular controller for the page.
angular.module "myModule", ["ui.bootstrap"]

# Defined a controller for the page.
@PageCtrl = ["$scope", "$filter", ($scope, $filter) ->
  # Set the interval for the scroller.
  $scope.interval = 5000;

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

  # Bind for the apology updated event.
  $scope.channel.bind "apology-updated", (data) ->
    # An apology has been updated, we must update the model.
    $scope.$apply ->
      # Get a filered array of open apologies.
      found = $filter("filter") $scope.page.apologies,
        id: data.id

      # Extend the element that we found.
      $.extend true, found[0], data

  # Bind for the apology created event.
  $scope.channel.bind "apology-created", (data) ->
    # A new apology has been created.
    $scope.$apply ->
      # Append it to the scope collection.
      $scope.page.apologies.push data

]