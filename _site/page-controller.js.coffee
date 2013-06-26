<!DOCTYPE html>
<!-- Define The Angular App -->
<html lang="en" ng-app>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- We don't want these pages indexed by Google until BETA. -->
        <meta name="robots" content="noindex, nofollow" />

        <!-- Dynamicly set the title using the helper methoe. -->
        <title>{{page.name}}</title>

        <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>
        <![endif]-->

        <!-- Include Local CSS Assets. -->
        <link href='/assets/bootstrap.css' rel='stylesheet' type='text/css' />
<link href='/assets/bootstrap-responsive.css' rel='stylesheet' type='text/css' />
<link href='/assets/opensans.css' rel='stylesheet' type='text/css' />
<link href='/assets/sorry.layout.css' rel='stylesheet' type='text/css' />
<link href='/assets/sorry.colour-and-texture.css' rel='stylesheet' type='text/css' />
<link href='/assets/sorry.typography.css' rel='stylesheet' type='text/css' />
<link href='/assets/sorry.interactions.css' rel='stylesheet' type='text/css' />

    </head>
    <body ng-controller="PageCtrl">
        <!-- Include Page Content. -->
        <script id="apologies-data" type="application/json">
            {
	"name": "Sofas And Stuff",
	"apologies": []
}
        </script>

        <!-- Have Jekyll Ignore All Liquid From Hereon In. -->
        
            <!-- Header Block For Large Status Message -->
            <!-- Use the 'sorry' method to set the green/orange state. -->
            <header class="sorry-{{sorry()}} carousel slide" id="carousel">
                <!-- Switch the status message based on the Sorry state. -->
                <!-- Must be first element inside header to ensure vertical align set propoperly. -->
                <div class="current-status" ng-switch="sorry()">
                    <!-- We have nothing to be sorry about, so all is well. -->
                    <div ng-switch-when="false">
                        <article>
                            <h2 id="status">All Is Well</h2>
                        </article>
                    </div>
                    <!-- We have some apologies. -->
                    <div ng-switch-when="true">
                        <div class="carousel-inner">
                            <!-- Loop over the collection of current apologies. -->
                            <article ng-repeat="apology in current_apologies() | orderBy:'created_at':true" class="apology item" ng-class="{active : $first, item : true}">
                                <!-- Output the title for the apology. -->
                                <h2>
                                    <!-- Output the date the apology was created, with live timer increment. -->
                                    <span>Started <time class="live" data-stamp="{{apology.created_at}}"></time></span>

                                    <!-- Output the apology description. -->
                                    {{apology.description}}
                                </h2>

                                <!-- Loop over any updates we have for the apology, only displaying the last. -->
                                <h3 ng-repeat="update in apology.updates | orderBy:'created_at':true | limitTo:1">
                                    <span>
                                        Last Updated 
                                        <!-- Output the datetime for the update, with live timer incrememnt. -->
                                        <time class="live dt" data-stamp="{{update.created_at}}"></time>
                                    </span>
                                    <!-- OUtput the text content for the update. -->
                                    {{update.content}}
                                </h3>

                                <!-- If we have no updates to display, show a message to this effect. -->
                                <h3 class="no-updates" ng-hide="apology.updates.length">We have no further updates on this yet.</h3>
                            </article>
                        </div>
                    </div>
                </div>

                <!-- Output the name of this status page. -->
                <!-- Has to be lower in DOM than carousel to avoid breaking verticle align. -->
                <h1>{{page.name}} Status Page</h1>

                <!-- We need carousel navigation bullets, so loop over the collection of apologies. -->
                <ol class="carousel-indicators" ng-show="current_apologies().length > 1">
                    <!-- Ouput a buller for each -->
                    <!-- Add nav data to the apologies array index. -->
                    <!-- Apply an active state to the first in the queue for page load. -->
                    <li ng-repeat="apology in current_apologies()" data-target="#carousel" data-slide-to="{{$index}}" ng-class="{active : $first, item : true}"></li>
                </ol>                

                <a href="#previous-apologies" ng-show="previous_apologies().length > 0" class="see-below">&#65088;</a>
            </header>

            <!-- Block For Previously Solved. -->
            <section id="previous-apologies" class="previous-apologies" ng-show="previous_apologies().length > 0">
                <!-- Loop over the collection of previous apologies, order date descending. -->
                <article ng-repeat="apology in previous_apologies() | orderBy:'created_at':true" class="apology" id="apology_{apology.id}">
                    <h4>
                        <!-- Output the date for the apology, with live timer increment. -->
                        <span>Started <time>{{apology.created_at | date:'short'}}</time></span>
                        <!-- Output the description of the apology. -->
                        {{apology.description}}
                    </h4>

                    <ul class="updates unstyled">
                        <!-- Loop over the updates, showing all, in date order. -->
                        <li ng-repeat="update in apology.updates | orderBy:'created_at'">
                            <!-- Output the date for the update. -->
                            <time class="dt">{{update.created_at | date:'short'}}</time>
                            <!-- Output the text content of the update. -->
                            <span class="dd">{{update.content}}</span>
                        </li>
                    </ul>
                </article>
            </section>

            <!-- Close Out With A 'Powered By' Statement. -->
            <footer>
                <p class="powered-by">Powered By <a href="http://www.sorry.io">Sorry</a></p>
            </footer>
        

        <!-- Asset Pipeline JS Files. -->
        <script src='/assets/jquery.js' type='text/javascript'></script>
<script src='/assets/bootstrap.js' type='text/javascript'></script>
<script src='/assets/pusher.js' type='text/javascript'></script>
<script src='/assets/moment.js' type='text/javascript'></script>
<script src='/assets/angular.min.js' type='text/javascript'></script>
<script src='/assets/smooth-anchor.js' type='text/javascript'></script>
<script src='/assets/page-controller.js' type='text/javascript'></script>
<script src='/assets/status-page.js' type='text/javascript'></script>

    </body>
</html>