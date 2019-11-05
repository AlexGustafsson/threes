# Threes - Avatar as a Service
### Easily create avatars from a username - Avatar as a Service
***
![npm badge](https://img.shields.io/npm/v/threes.svg)

> Note: this is currently alpha level software. Stay tuned for updates!

<p align="center">
  <img src=".github/screenshot.png">
</p>

### Setting up

##### Quickstart

###### Using Docker
```
# Clone the repository
git clone https://github.com/AlexGustafsson/threes.git && cd threes
# Build the Docker image
npm run build
# Run the image
docker run -p 3000:3000 threes:latest
```

##### Running from source
```
# Clone the repository
git clone https://github.com/AlexGustafsson/threes.git && cd threes
# Install dependencies
npm install
# Start the server
npm start
```

### Documentation

The documentation is currently a bit sparse. Refer to the source code or feel free to open an issue.

Start Threes with `npm start`. You can specify a port using the environment variable `PORT`. The default is 3000.

The service is now accessible via `localhost:3000`. To test all available styles and formats, visit `http://localhost:3000/suite/any-username`.

To reference a specific style and format, use `http://localhost:3000/avatar/helsinki/foo.png` where `helsinki` is an available style.

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

###### Development

Clone the repository:
```
git clone https://github.com/AlexGustafsson/threes.git && cd threes
```

Set up for development:
```
npm install
```

Follow the conventions enforced:
```
npm run lint
npm run test
npm run coverage
npm run check-duplicate-code
```

### Disclaimer

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the service for large-scale projects meant for the public. The API was created to easily create avatars for usernames and as such it might not promote best practices nor be performant._
