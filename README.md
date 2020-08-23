# Yet Another Note App

Made by Matěj Šmíd

### Installation

```sh
yarn install
```

### Setting up the environment

Make sure you create a `.env` file in the root of the repository and provide the `NOTE_API_URL` environment variable. It should contain the desired apiary-mock url, note that you have to include the `/notes` path at the end of the url.  
Below you can see an example `.env` file.

```sh
NOTE_API_URL=http://private-9aad-note10.apiary-mock.com/notes
```

### How to run

```sh
yarn dev
```

Navigate to http://localhost:9000.

### How to run tests

```sh
yarn test
```
