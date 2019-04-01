[![Build Status](https://travis-ci.com/pachoclo/study-group-react-ui.svg?branch=master)](https://travis-ci.com/pachoclo/study-group-react-ui) [![Coverage Status](https://coveralls.io/repos/github/pachoclo/study-group-react-ui/badge.svg?branch=master)](https://coveralls.io/github/pachoclo/study-group-react-ui?branch=master)

# StudyGroups UI

> [Trello Board](https://trello.com/b/MTeujOJM/studygroup-kanban)

## Tech Stack

- [React](https://reactjs.org/docs/getting-started.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Redux](https://react-redux.js.org/)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [Jest](https://jestjs.io/)
- [Enzyme](https://github.com/airbnb/enzyme)
- [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
- [Auth0](https://github.com/auth0/auth0.js#readme)

---

## Scripts

```bash
> npm i
```

→ Installs project dependencies

```bash
> npm start
```

→ Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

```bash
> npm test
```

→ Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
> npm run build
```

→ Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

---

## Docker

### build

```bash
> docker build -t studygroups-ui .
```

### run

```bash
> docker run --rm -p 3000:80 studygroups-ui
```

→ Access the UI at [http://localhost:3000](http://localhost:3000) 🙌
