# Threes - Avatar as a Service
### Easily create avatars from a username - Avatar as a Service
***
![npm badge](https://img.shields.io/npm/v/threes.svg)

> Note: this is currentyl alpha level software. Stay tuned for updates!

### Setting up

##### Quickstart

###### Docker
```
# Clone the repository
git clone https://github.com/AlexGustafsson/threes.git && cd threes
# Build the Docker image
npm run build
# Run the image
docker run -p 3000:3000 threes:latest
```

##### Directly
```
# Clone the repository
git clone https://github.com/AlexGustafsson/threes.git && cd threes
# Install dependencies
npm install
# Start the server
npm start
```

### Documentation

TODO

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
