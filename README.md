# minetics

Built in 2 weeks at European Innovation Academy 2015. Hosted on heroku [here](http://minetico.herokuapp.com/). More information available [here](http://mineti.co/). A Node.js app using [Express 4](http://expressjs.com/), Postgres db, Bootstrap front-end. Makes use of Emotiv SDK.

Full business info available under 'docs'.


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/bemotics.git # or clone your own fork
$ cd bemotics
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```