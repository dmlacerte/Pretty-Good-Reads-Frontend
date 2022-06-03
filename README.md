# Pretty-Good-Reads-Frontend

**Project Description**<br />
The frontend of a semi-clone of Good Reads, where you can search for books and record books you're currently reading, want to read, or have read. You can also rate books you've already read, and view ratings from other users. 

**Link to Deployed Application**<br />
Live version deployed to Netlify at:<br /> https://pretty-good-reads.netlify.app

**List of Technologies Used**<br />
React, HTML5, CSS3, Javascript, Google oAuth 2.0

**Application Functionality**<br />
Note, some differences in coloring from deployed application may be noticed in gifs below due to screen recording limitations. 
- Ability to authenticate and set up user accounts using Google oAuth 2.0. <br />
![login](https://user-images.githubusercontent.com/97196460/171936206-6c4ec611-0508-4485-9564-7f871fa411af.gif) <br />
- Ability to search for and view results from backend 3rd party Google Books API. <br />
![search](https://user-images.githubusercontent.com/97196460/171936589-40506ec7-8d9c-42d8-b312-2158da5beb6c.gif) <br />
- Ability to categorize books in user list categories (reading, want to read, have read). <br />
![userList](https://user-images.githubusercontent.com/97196460/171936859-51d14c84-4081-43c8-91b0-9ee92834d752.gif) <br />
- Ability to create, read, update, and delete user book reviews, as well as view reviews from other users. <br />  
![userRatings](https://user-images.githubusercontent.com/97196460/171937135-9bb9a374-1e0e-47d7-a536-1a2ab1f88188.gif) <br />
- Responsive design across a variety of devices, including mobile and tablet. <br />
![mobile-view](https://user-images.githubusercontent.com/97196460/171935031-f4714a4a-3ded-4b08-a97c-a662cfbbe7f0.gif) <br />
![tablet-view](https://user-images.githubusercontent.com/97196460/171935770-5b9b2c01-0aac-44d2-bd72-0438b985252f.gif) <br />

**Unsolved Problems**<br />
Due to cross-domain restrictions and chosen deployment applications (Netlify and Heroku) being on the public-suffix list, we were unable to deploy our original authentication method. We originally set HTTP cookies to maintain user authentication sessions, but due to domain restrictions were unable to set cookies and switched to local storage user session validation. Please see commented code within the frontend and backend files for evidence of HTTP cookie authorization method, which can be tested using localhost.

**Link to Backend API**<br />
Backend Live API:<br /> https://pretty-good-reads-dlacerte-pz.herokuapp.com<br />
Backend GitHub:<br /> https://github.com/dmlacerte/pretty-good-reads-backend

**Installation Instructions**<br />
1. Fork and clone down this repository.
2. Install required packages using `npm i`.
3. If using Google oAuth 2.0 authentication, create a Google Cloud Project on the Google Cloud Platform site. 
4. Assign the following env variables in an .env file at your root:
    - REACT_APP_GOOGLE_CLIENT_ID: Your Google oAuth 2.0 client ID 
    - REACT_APP_API_KEY: Your Google Books API Key
    - REACT_APP_BACK_END_DEV: Your backend dev URL (localhost)
    - REACT_APP_BACK_END_PROD: Your backend prod URL (if deploying)
    - REACT_APP_FRONT_END_DEV: Your frontend dev URL (localhost)
    - REACT_APP_FRONT_END_PROD: Your frontend prod URL (if deploying)
5. Run the backend API by following the instructions in the repo linked above. 
6. Test the app functionality by running `npm start` to start the application. 

**Authors / Contributors**<br />
Deanna Lacerte & Phil Zeise

**Source Citations**<br />
- https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
- https://medium.com/@ni3t/reacts-usestate-and-context-for-auth-routing-78347da1d6f
- https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
- https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
