//According to the project brief the only thing that needs to be handled by the backend is the api call.
//I have only defined a get request, which contacts the iStore search. The data collected by the front end is temporary and not stored permanently.
const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
//Get port from env, or assign 8080.
const PORT = process.env.PORT || 8080;

app.use(cors());

//Securing with helmet

app.use(helmet());

//This function fetches from the iStore search API. Currently in this app, a search term and media type will always be defined
const getResults = async (searchTerm, mediaType) => {
  let searchResults = {};
  if (searchTerm && mediaType) {
    try {
      let result = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`
      );
      searchResults = await result.json();
    } catch (err) {
      console.log(err);
    } finally {
      return searchResults;
    }
  }
  if (searchTerm) {
    try {
      let result = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}`
      );
      searchResults = await result.json();
    } catch (err) {
      console.log(err);
    } finally {
      return searchResults;
    }
  }
};

//This function handles the get requests. The search term and search type are always short, so we just use url queries.
app.get("/api", async (req, res) => {
  let searchResults = await getResults(req.query.term, req.query.type);
  res.send(JSON.stringify(searchResults));
});

//Listening on the default port, and logging the port to the console.
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
