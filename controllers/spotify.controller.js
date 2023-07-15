const Track = require("../models/Track.model");
const Event = require("../models/Event.model");
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.error("Something went wrong when retrieving an access token", error)
  );

module.exports.playlists = async (req, res, next) => {
  try {
    const data = await spotifyApi.getUserPlaylists("rake_f");
    const playlists = data.body;
    return res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};

module.exports.playlist = async (req, res, next) => {
  try {
    const { playlistId, eventId } = req.params;
    const playlist = await spotifyApi.getPlaylist(playlistId);
    const rawTracks = playlist.body.tracks.items;

    const tracksInfo = rawTracks
      .map((elm) => {
        const { track } = elm;
        const artists = track.artists.map((artist) => artist.name);
        const image = track.album.images[2].url;
        const trackName = track.name;

        return {
          artists,
          image,
          trackName,
        };
      })
      .slice(0, 10);

    const tracks = await Track.create(tracksInfo)
      .then((tracksFromDB) => {
        return Promise.all(
          tracksFromDB.map((track) => {
            return Event.findByIdAndUpdate(
              eventId,
              {
                $push: { playlist: track._id },
              },
              { new: true }
            );
          })
        );
      })
      .catch((err) => console.error(err));

    return res.status(201).json({ tracks });
  } catch (error) {
    next(error);
  }
};

// module.exports.track = (req, res, next) => {
//   const { eventId, trackName, image, artist } = req.body;
//   Track.create({ trackName, image, artist })
//     .then((response) => {
//       return Event.findByIdAndUpdate(
//         eventId,
//         {
//           $push: { "playlist.tracks": response._id },
//         },
//         { new: true }
//       );
//     })
//     .then((response) => res.json({ response }))
//     .catch((err) => next(err));
// };

module.exports.trackLike = async (req, res, next) => {
  try {
    const { _id } = req.payload;
    const { trackId } = req.body;
    const addUser = await Track.findByIdAndUpdate(
      trackId,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.status(200).json(addUser);
  } catch (error) {
    next(error);
  }
};

module.exports.trackDislike = async (req, res, next) => {
  try {
    const { _id } = req.payload;
    const { trackId } = req.body;
    const removeUser = await Track.findByIdAndUpdate(
      trackId,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json(removeUser);
  } catch (error) {
    next(error);
  }
};
