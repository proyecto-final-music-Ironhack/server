# Beat the Beat

[Link to app](https://sprightly-vacherin-973f9f.netlify.app/)

[Client repository](https://github.com/proyecto-final-music-Ironhack/client)

### Authors

Javier Vivas (Web Dev.)

Raquel de Frutos (Web Dev.)

Nico Regue (UX/UI)

### How it looks

![Screens](https://github.com/proyecto-final-music-Ironhack/client/blob/master/src/images/how-it-looks.jpg)

### Description

Beat the beat connects clubs and djs for the purpose of allowing users to find out what parties are happening in their city.
The club creates the event that is going to happen, associates a dj, and the dj is in charge of selecting a playlist. The event will appear on the map a few days before it happens, and when it starts, the user will have access to vote the playlist order.

### MVP

The user checks in and has access to the list of songs the dj is going to play and can vote on the playback order.

### Built with:

- Node.js, Express.js, MongoDB
- React.js, Axios
- APIs: Spotify, Cloudinary, MapBox
- Chakra UI

### User Stories

- <b>On Boarding Page</b>: App introducction
- <b>Select type of user</b>: User selects if they are a conventional user, dj or club
- <b>Sign up as User</b>: Create an account as user
- <b>Sign up as Dj</b>: Create an account as dj
- <b>Sign up as Club</b>: Search for your club in our database of clubs in Spain and create an account
- <b>Log in</b>
- <b>Event locator</b>: As a user, locate nearby parties that are about to occur.
- <b>Event detail page</b>: Find out the details of the party and check in when it starts to have access to the vote
- <b>Tracks ranking</b>: Participates in the playback order of songs
- <b>Disco Profile</b>: Basic information, followers and hosted events
- <b>Create event form</b>: Form for creating a new event/party (only for club user)
- <b>Dj Profile</b>: Basic information, followers and attended events
- <b>Playlist selector</b>: Dj selects one of their playlists to play at the event
- <b>User Profile</b>: Basic information, attended events and edit profile possibility

### Data structure

| HTTP Method | URI path                               | Description              | Protectd |
| ----------- | -------------------------------------- | ------------------------ | -------- |
| POST        | /signup/:type                          | Render register form     | False    |
| POST        | /login                                 | Render login form        | False    |
| POST        | /disco/create-list                     | Create list discos       | False    |
| GET         | /disco/:id                             | Render a disco profile   | True     |
| PUT         | /disco/:id                             | Update disco             | True     |
| PUT         | /disco/:id/add-follower                | Add follower to disco    | True     |
| PUT         | /disco/:id/remove-follower             | Remove follower to disco | True     |
| GET         | /dj/                                   | Render all Djs           | True     |
| GET         | /dj/:id                                | Render a Dj profile      | True     |
| PUT         | /dj/:id                                | Update a Dj              | True     |
| PUT         | /dj/:id/add-follower                   | Add follower to Dj       | True     |
| PUT         | /dj/:id/remove-follower                | Remove follower to Dj    | True     |
| POST        | /event/create                          | Render create event form | True     |
| GET         | /event/:id                             | Render an event profile  | True     |
| PUT         | /event/:id                             | Update an event          | True     |
| GET         | /spotify/playlists                     | Render playlists of list | True     |
| POST        | /spotify/playlist/:playlistId/:eventId | Create playlist in event | True     |
| PUT         | /spotify/track-like/:trackId           | Add like to track        | True     |
| PUT         | /spotiify/track-dislike/:trackId       | Remove like to track     | True     |
| POST        | /upload/image                          | Add image to profile     | True     |
| GET         | /users/user-profile                    | Render user profile      | True     |
| PUT         | /users/:id                             | Update user profile      | True     |


### Links

[Trello](https://trello.com/b/DaoodUTx/proyecto-final)

[Figma](https://www.figma.com/file/RewPaOiHC1RRikiaTCXUh1/Beat-The-Beat?type=design&node-id=253%3A581&mode=design&t=oCBKG7397VfjnleO-1)
