# Sorry Status Page

This is the front-end template for a [Sorry](http://www.sorryapp.com) Status Page. This project can be used to create a stand-alone self hosted status page, or dropped into the Sorry codebase and used as the default status page within the app.

It will in time be used as a foundation for custom brandable templates, probably released as Open Source for users to customize to their hearts content.

## Contributing To The Status Page

If you want to create your own custom build, or contribute to the project it’s important you know how our build and release process works.

This project uses Grunt with convenient methods for working with the project. It's how we compile our code, run tests, and more. To use it, install the required dependencies as directed and then run some Grunt commands.

### Install Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Navigate to the root `/sorry-announce` directory, then run `npm install`. npm will look at [package.json](package.json) and automatically install the necessary local dependencies listed there.

When completed, you'll be able to run the various Grunt commands provided from the command line.

**Unfamiliar with `npm`? Don't have node installed?** That's a-okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.

### Available Grunt commands

#### Build - `grunt`
Run `grunt` to run tests locally and compile the CSS and JavaScript into `/dist`.

#### Release a new version - `grunt release <:patch | :minor | :major>`
grunt release bumps the [version number](#versioning) and creates a new git tag. You’ll need write access to the repository for this to work.

You can append the release command with patch, minor or major depending on the version number increment you wish to make.

#### Watch - `grunt watch`
This is a convenience method for watching all the core HTML, CSS and JS assets in the project, rebuilding if they change.

#### Local Server - `grunt connect:server`
This is a convenience method for running a webserver to test the page localy. AJAX calls made within the page require you view the page using this server and not through the local file system.

### Troubleshooting dependencies

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, This project will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## Authors & Contributors

**Robert Rawlins**

+ <http://twitter.com/sirrawlins>
+ <https://github.com/SirRawlins>

**Robin Geall**

+ <http://twitter.com/robingeall>

## Copyright

Copyright 2014 Support Time Limited.
