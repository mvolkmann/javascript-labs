JavaScript Package Manager (jspm)

- see http://jspm.io/
- works on top of System.js
  * see https://github.com/systemjs/systemjs

- steps to use
  * npm install -g jspm
  * jspm init
    - can accept all the defaults
  * create index.html
  * setup a local file server
    - a good option is live-server
      * npm install -g live-server
      * live-server
      * this opens browser tab to localhost:8080
  * automatically transpiles using Traceur or Babel
  * automatically generates sourcemaps

- to install a module from npm and register it in config.js
  which is referenced from index.html
  * for packages in npm,
    jspm install npm:{module-name}
    - ex. jsonp
    - will install in jspm_packages/npm
    - may require configuration
  * for packages in GitHub,
    jspm install github:{module-name}
    - may require configuration
  * for well-known packages,
    jspm install {module-name}
    - ex. jquery
  * will add dependency to package.json
  * will add to System.config call in config.js
    which is included via a script tag in index.html

- to reinstall dependencies
  * jspm install
  * recreates and populates the jspm_packages directory
  * recreates the config.js file if it is missing
  * add the jspm_packages directory to .gitignore

- to bundle for production
  * jspm bundle-sfx --minify main
    - sfx is short for "self executing"
      which removes all dynamic loading and transpiling
    - generates build.js and build.js.map
      * add these files to .gitignore
    - replace all the script tags in index.html
      with one for this file
    - also add a script tag for the Traceur runtime
      <script src="jspm_packages/traceur-runtime.js"></script>
    - see example prod-index.html file
  * there are other bundling options,
    but this seems like the best

- to make your own packages compatible with jspm
  * see https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm
  * can publish in npm or GitHub
  * allows others to install them using jspm

- to run this demo
  * npm install -g jspm
  * jspm init
  * jspm install jquery
  * jspm install bootstrap
  * live-server
