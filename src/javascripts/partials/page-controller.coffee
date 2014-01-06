# Defined a controller for the page.
@PageCtrl = ["$scope", "$filter", "$interval", "$http", "socket", ($scope, $filter, $interval, $http, socket) ->

  # Set the interval for the scroller.
  $scope.interval = 5000;

  # Load the data in to the page from the service.
  # TODO: Could we abstract this in to a $resource request?
  # TODO: We need to deal with failure of this request.
  $http(
    method: "GET"
    url: "http://test-company-6182980.sorryapp.com/?format=json"
  ).success (data, status, headers, config) ->

    # Set the result in to the controller.
    $scope.page = data

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
      !!$scope.current_apologies().length

    # Expiry any old apologies that need to go.
    # Do this on a 5 second interval.
    $interval($scope.expire_previous_apologies, 5000)

    ########################
    # Websocket Listeners. #
    ########################

    # Bind for the apology created event.
    socket.bind "apology-created", (data) ->
      # Check to see if the apology is already on the page.
      # This is to protect against race conditions + duplicate entries etc.
      # Get a filered array of open apologies.
      found = $filter("filter") $scope.page.apologies,
        id: data.id

      # Check the length of the array found.
      if found.length == 0
        # No matches were found - add the incomming apology.
        # Append it to the scope collection.
        $scope.page.apologies.push data

    # Bind for the apology updated event.
    socket.bind "apology-updated", (data) ->
      # Get a filered array of open apologies.
      found = $filter("filter") $scope.page.apologies,
        id: data.id

      # Extend the element that we found.
      $.extend true, found[0], data

    # Bind for the apology deleted.
    socket.bind "apology-deleted", (data) ->
      ###
      # TODO: These nested loops are messy and we should refactor them.
      # - The loops are inefficient.
      # - The code is too verbose.
      # - The loops don't break so continue even after result is found.
      ###

      # First we need to find the apology we want to delete.
      # Loop over the scope of apologies, searching for the right one.
      angular.forEach $scope.page.apologies, (apology, index) ->
        # Splice the apology from the scope.
        # if the ID matches the one we want to delete.
        $scope.page.apologies.splice index, 1 if apology.id == data.id

    # Bind for the apology deleted.
    socket.bind "update-deleted", (data) ->
      ###
      # TODO: These nested loops are messy and we should refactor them.
      # - The loops are inefficient.
      # - The code is too verbose.
      # - The loops don't break so continue even after result is found.
      ###

      # First we need to find the update that we want to remove.
      # Loop over the collection of apologies.
      angular.forEach $scope.page.apologies, (apology, a_index) ->
        # Loop over the updates for the apology.
        angular.forEach apology.updates, (update, u_index) ->
          # Remove the update if the ID matches.
          apology.updates.splice u_index, 1 if update.id == data.id

]