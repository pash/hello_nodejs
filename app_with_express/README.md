# CLI Commands Used
- npm init (to setup project for npm)
- npm install express --save
- npm install bower -g
- bower init
- bower install --save bootstrap
- bower install --save font-awesome
- npm install --save-dev gulp
- npm install --save-dev gulp-jshint gulp-jscs jshint-stylish
- npm install --save-dev wiredep
- npm install --save-dev gulp-inject
- npm install --save-dev gulp-nodemon
- npm install --save-dev ejs
- npm install --save-dev mongodb
- npm install --save-dev body-parser
- npm install --save-dev cookie-parser passport express-session
- npm install --save-dev passport-local
- npm install --save-dev xml2js

# NPM Versioning (Most Common)
- ^4.15.5 will install all 4.x.x
- ~4.15.5 will install all 4.15.x
- 4.15.5 will be stuck at that version (more control)

# Management Systems
- NPM for backend
- Bower for frontend

# MongoDB
- mongod (to run)
- mongo (console)
- mongo libraryApp (specific table)

# MongoDB Console
- show dbs
- show collections
- db.books.find()
- db.books.find().pretty()
- db.books.remove({})
- db.books.findOne

# Session
- defaults to memory (not suited for production, check https://www.npmjs.com/package/connect-mongo)

# EJS
- use <%- to NOT escape html
- use <%= to escape html
