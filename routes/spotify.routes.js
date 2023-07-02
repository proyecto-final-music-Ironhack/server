const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

router.get("/playlist", (req, res, next) => {
  spotifyApi.getUserPlaylists("rake_f").then(
    function (data) {
      console.log("Retrieved playlists", data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});
