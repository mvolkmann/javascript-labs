JavaScript Package Manager (jspm)

- works on top of System.js

- steps to use
  * npm install -g jspm
  * jspm init
    - can accept all the defaults
  * create index.html
  * npm install -g live-server
  * live-server
  * browse localhost:8080
  * automatically transpiles using Traceur or 6to5
  * automatically generates sourcemaps

- to install a module from npm and register it in config.js
  which is references from index.html
  * jspm install npm:{module-name}
  * ex. jsonp
  * will install in jspm_packages/npm
  * will add dependency to package.json
  * will add to System.config call in config.js
    which is included via a script tag in index.html

- to bundle for production
  * jspm bundle-sfx --minify main
    - sfx is short for "self executing"
      which removes all dynamic loading and transpiling
    - generates build.js and build.js.map
    - replace all the script tags in index.html
      with one for this file
    - also add a script tag for the Traceur runtime
      <script src="jspm_packages/traceur-runtime.js"></script>
    - see example prod-index.html file
