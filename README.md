# Welcome to Acoustic Nimbus

Acoustic Nimbus is a SoundCloud-inspired web application that allows users to share, listen to music and follow their favorite artists.
[Visit Acoustic Nimbus Here!](http://acoustic-nimbus.herokuapp.com)

## The Front-End

On the front-end, React.js is implemented along with Redux.js to provide users an efficient and seamless experience throughout the site by updating and rendering the relevant components on the page only, while limiting expensive data retrieval from the back-end by storing data fetched at the Redux store. 

### Reusable Component

Since many components on different pages share some similarities in design and structure, common components are deconstructed in a way that they could be reusable in different circumstances and grouped together in the same directory. 

![Artist Page](app/assets/images/artist_page.png)

## The Back-End

With a Ruby on Rails back-end that communicates with a PostgreSQL database and utilizes assets hosted on Amazon Web Services S3, Acoustic Nimbus optimizes data fetching by querying relevant data with parameters from the front-end, which allows the back-end to handle data parsing and minimizes load times on the front-end.

## Features

### Search

Utilizing effective back-end routes and controllers, the search page of the app can quickly and dynamically filter down the entries in the database and provide the relevant results to the user on the front-end. Filters are available to the user on the front-end in case they want to filter by artists, albums, tracks, or playlists. Top result sections are also sorted based on whether or not they contain results that are related to your search query.

![Search Page](app/assets/images/search_page.png)

### Playlist CRUD

Both a front-end and back-end authentication system was set up to give the users a more tailored and personal experience on the site. This can be seen most notable with the playlist system. Playlists can be created and played by any user, but songs can only be added and removed from a playlist by the user who created it. Additionally, playlists can only be deleted by the user who created it.

![Playlist Modal](app/assets/images/create_modal.png)

### Audio that plays while navigating the site

A core feature for any music app, the audio player is a top-level component for this app. This allows the user to stream music, change the song being played, and save the song being played to their library while navigating around the site.

![Audio Player](app/assets/images/audio_player.png)

### Queueing, Shuffling, and Repeat Functionality

The front-end redux state of the app was managed in a way that allows the user to click on a song on the app, and a new queue list will be dynamically generated based on the list of songs currently being viewed. This queue can be viewed at any time, tracks can be added to the queue on the fly, and the queue list can be shuffled and repeated to give the user tons of listening options.

![Queue Page](app/assets/images/play_queue.png)

### Saves and Follows

Another essential feature that was added to the app was the ability to save tracks and albums and follows artists and playlists. This allows users to save the things that they like and have it appear in their own personal library any time that they log in.

## Future Plans

In the future, I would like to implement the social aspects of Spotify, like being able to friend other users and share playlists between each other. Also, I have plans to add more ways to categorize the artists, albums, and tracks, such as genre, to add more dimensions to the search and explore pages.

[Visit Spoodify Here!](https://spoodify.herokuapp.com/)
