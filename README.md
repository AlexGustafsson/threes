# Threes - Avatar as a Service
### Easily create avatars from a username - Avatar as a Service
***
![npm badge](https://img.shields.io/npm/v/threes.svg)

<p align="center">
  <img src=".github/screenshot.png">
</p>

### Quickstart

#### Using Docker

```
# Clone the repository
git clone https://github.com/AlexGustafsson/threes.git && cd threes
# Build the Docker image
docker build -t threes:latest .
# Run the image
docker run -p 3000:3000 threes
```

#### Running from source

```
# Clone the repository
git clone https://github.com/AlexGustafsson/threes.git && cd threes
# Install dependencies
npm install
# Build the project
npm run build
# Start the server
npm run start
```

### Documentation

The project is easily run by using Docker:

```
docker build -t threes:latest .
docker run -p 3000:3000 threes
```

#### API

Once started, the following API endpoints are available:

##### `GET /styles`

Get the available style names as JSON.

```json
[
  "scandinavian"
]
```

##### `GET /palettes`

Get the available palettes names as JSON.

```json
{
  "charm":["#3ABAAD","#D52B5F","#336091","#FBF3D7","#F69257","#4D235B"],
  "helsinki":["#50BD9D","#F37022","#2F3296","#C89A4E","#F6A4CA","#E73126","#0374BD","#9FCAEC"],
  "scandinavian":["#37313F","#A09EB1","#EAE0E1","#E0B4C1","#C13E68","#404B78","#0EB285"]
}
```

#### `GET /palette/:style`

Get a palette by its style.

```json
[
  "#3ABAAD",
  "#D52B5F",
  "#336091",
  "#FBF3D7",
  "#F69257",
  "#4D235B"
]
```

##### `GET /avatar/:style/:seed.:format`

Get a avatar for the given style and seed (such as a user's username or id). The format is expected to be one of:

* `png`
* `jpg`
* `jpeg`
* `svg`

Example:

```
/avatar/scandinavian/threes.png
```

##### `GET /demo`

When run in development mode, the demo page is available to show all available styles. The demo page is shown in the image at the top of this document.

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

#### Development

Clone the repository:
```
git clone https://github.com/AlexGustafsson/threes.git && cd threes
```

Set up for development:
```
npm install
```

Run the project in development mode with automatic compilation and server reload:
```
npm run dev
```

Follow the conventions enforced:
```
npm run lint
npm run test
npm run coverage
```

### Disclaimer

_The project is intended for production use but is not yet heavily battle-tested. As such there may be implications when running threes in larger environments._

_All styles and palettes implemented are heavily inspired by the creative work of others. Whenever possible the sources are referenced within the code. If you believe you are the creative owner of an implemented style and would like for it to be removed for any reason, please open an issue._
