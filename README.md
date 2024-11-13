` devTinder`

- Create vite + react app using =>
  ` npm create vite@latest devTinder -- --template react`

- Remove unwanted code

- git setup
  `git init`

- Tailwind CSS setup
  `https://tailwindcss.com/docs/guides/vite`

- install daisyui library
  `https://daisyui.com/docs/install/`

- NavBar component where use navbar from daisyui is used
- Install react-router-dom and use it in App.jsx
- Create BrowserRouter -> Routes ->Route -> Body -> Multiple routes as children
- Create Outlet in Body Component

`Login page`

- create login page with ID and Password
- create hooks and onchange (Controlled components) for email and password to get the access of email and password.

- install axios to make the backend req and handle login
- `It will give CORS error`
  `Backend changes required`
- npm i cors
- const cors = require('cors') in app.js backend file

- In our backend file we have to use => app.user(cors())

- With this there will not be any CORS error but we can read the tokens from here(cookies)
- so we have to provide some extra params to read the cookies data, so we pass origin and credentials as extra param

- app.use(
  cors({
  origin: "http://localhost:5173/login",
  credentials: true,
  })
  );

` Front-end` we have to use { withCredentials: true } as extra params to axios call

` Router Structure`

- Body

  - NavBar
  - Route= / => /feed
  - Route= /login => /login
  - Route= /profile => /profile
  - Route= /connections => /connections

- `Installation of redux toolkit`

  - npm install @reduxjs/toolkit react-redux
  - create the store using configureStore
  - Provide the store to the app with <Provider store={appStore}>whole App.js</Provider>
  - Create userSlcie and add some actions to it
  - Dispatch an action => push the data to redux => useDispatch() => dispatch(addUser(res.data))
  - Now user data is stored in the redux store -> redux toolkit

  - We can use the user details when user loggedIn then change ths Nav bar profile
  - We can access user details anywhere with => const user = useSelector((store) => store.user);

- We are providing auth in Body.jsx , as this is the main page , and if user logs in then we will have token always so we are makeing call to /profile/view where we are validating the token in backend

- login and logout feature
- Get the feed and store it in the redux toolkit
- Single User Feed Card
- Edit Profile With Toast notification after successfull saving of profile
- Connections Page
