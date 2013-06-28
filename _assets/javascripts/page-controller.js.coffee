# I'm the angular controller for the page.
angular.module "myModule", ["ui.bootstrap", "interval"]

# Defined a controller for the page.
@PageCtrl = ["$scope", "$filter", "$interval", ($scope, $filter, $interval) ->
  # Set the interval for the scroller.
  $scope.interval = 5000;

  # Laod in the apologies to start with.
  $scope.page = JSON.parse($("#apologies-data").text())

  # Bind to push updates.
  # create a pusher instance within the controller.
  $scope.pusher = new Pusher($('body').data('pusher-key'))
  # Subscribe to this pages unique chanel.
  $scope.channel = $scope.pusher.subscribe($('body').data('pusher-channel'))

  # Method to expire old previous apologies.
  $scope.expire_previous_apologies = ->
    # We are going to loop over the collection of appologies
    # and look for those which have expired and remove them
    # from the collection.
    #
    # To do this we cannot do a standard for loop as removing
    # the element from the array causes it to reindex, so we
    # use a while loop instead.

    # Current Index.
    index = $scope.page.apologies.length - 1

    # Loop over the collection using the index.
    while index >= 0
        # Get the appology from the array.
        apology = $scope.page.apologies[index]

        # Check that this is closed date.
        if apology.closed_at
          # Get the date that this apology was created.
          date_closed = moment(apology.closed_at)

          # Now perform a diff against the current date, in days.
          difference = date_closed.diff(moment(), 'days')

          # Check to see if this is older than 7 days.
          if difference < -7
            # This apology has been closed for mroe than 7 days.
            # Remove the element from the collection.
            $scope.page.apologies.splice(index, 1)

        # Decrease the index.
        index--

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

  # Expiry any old apologies that need to go.
  # Do this on a 5 second interval.
  $interval($scope.expire_previous_apologies, 5000)
]