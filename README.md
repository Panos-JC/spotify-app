# Spotify App

A web app for visualizing your personal Spotify data

## Built with

- [Create React App](https://create-react-app.dev/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

## Run Locally

1. [Create a Spotify app](https://developer.spotify.com/dashboard/login) and add http://localhost:8080/callback as a Redirect URI in the app settings

2. Clone the project

```bash
  git clone https://github.com/Panos-JC/spotify-app.git
```

3. Create an `.env` file in the root of the project based on `.env.example`. Add `CLIENT_ID` and `CLIENT_SECRET` from Spotify

4. Install dependencies for root folder and client app

```bash
  npm install
  cd client
  npm install
```

5. Start the server

```bash
  npm start
```

## Author

- [@Panos-JC](https://github.com/Panos-JC)
