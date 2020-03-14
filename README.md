# movie browser

Posted a challenge to build a _search_/browser for movie fan. Given a
static data set to display. So implemented a few other data sources,
eg. IMDB. 


## Data sources


1. [OMDB API][omdbapi]: When speaking of movies, one immediately thinks
   of [IMDB][imdb], Surprisingly IMDB doesn't have an official
   API. There is an third-party offering called [omdbapi][omdbapi],
   sounds pretty copycat. Data set is fairly simple once you get an
   [API key][omdbapi key] (free for 1000 calls per day) and examine
   the data comparing to what is displayed on a IMDB page.

        ```js
        api = http://www.omdbapi.com/?apikey=c6638eb9&t=Wall%20E
        ```

[imdb]: https://www.imdb.com/
[omdbapi]: http://www.omdbapi.com/
[omdbapi key]: http://www.omdbapi.com/apikey.aspx

## Toolset

* [Materialize][]: "A modern responsive front-end framework based on Material Design" by their words.
* [REACT][]: core
* [webpack][]: new module builder that is making lot of buzz these days.
* [fetch][]: a new way to talk to API endpoints instead of `jQuery AJAX`.

[materialize]: http://materializecss.com/
[react]: https://facebook.github.io/react/
[webpack]: https://webpack.github.io/
[fetch]: https://github.com/github/fetch

## Development

1. Install `nvm` and node (tested 9.4, 12.1).
1. `npm install`: to pull all dependencies
2. `npm run dev`
3. browse `localhost:8080`, browser will auto-refresh when webpack detects a change to source files.

## Deploy

1. `npm run build`
2. push `/dist` to your static file hosting service.
3. verify on a browser.

Static data JSONs can be hosted in other locations instead of packaged
in this. In that case, you need to modify the `json_data_server`
setting in `root.jsx`:

```js
this.state = {
  json_data_server: "data/", <-- to an absolute URL
  ...
};
```
