# Pusher Socket Service.
# Replacable with other pub/sub services.
app.factory "socket", ["$rootScope", ($rootScope) ->

  # Connect to pusher, using the pusher lib.
  # Create a new connection to pusher using the key.
  pusher = new Pusher($("body").data("pusher-key"))
  # Subscribe to this pages channel for invoice events.
  channel = pusher.subscribe($("body").data("pusher-channel"))

  # Define a bind event, to create subscriptions to events.
  bind: (eventName, callback) ->
    # Bind the event to the underlying pusher channel.
    channel.bind eventName, ->
      # Copy the arguments.
      args = arguments

      # Use the root scope apply method to ensure the view is updated.
      # This is instead of calling $apply in each of the listened.
      $rootScope.$apply ->
        # Invoke the callback method which was passed in.
        callback.apply channel, args

]