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
