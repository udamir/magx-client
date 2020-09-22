# Magx JS client

JavaScript/TypeScript Client for MagX multiplayer game server.

## Installation

### Installing the module
```
npm install --save magx-client
```

### CDN link

```html
<script src="https://cdn.jsdelivr.net/npm/magx-client@0.6.3/dist/magx.js"></script>
```

or you can include magx-client package to server dependencies and use it on client:

```html
<script src="/magx"></script>
```

## Usage

### Connecting to server:
```js
var client = new MagX.Client({ address: "localhost", port: 3001, secure: true })
```

### Authenticate
```js
await client.authenticate({ login, password })
```

or verify your session
```js
await client.verify(token)
```

### Get avaliable rooms
```js
const rooms = await client.getRooms("lobby")
```

### Create new room
```js
const room = await client.createRoom(name, params)
```

### Joining to a room
```js
const room = await client.joinRoom(roomId, params)
```

### Handle room events
```js
// new room state
room.onSnapshot((state) => {
  console.log("initial room state:", state)
})

// listen to patches coming from the server
room.onPatch((patch) => {
  // this signal is triggered on each patch
  console.log("room state patch:", patch)
})

// listen to messages coming from the server
room.onMessage("move", (data) => {
  // this signal is triggered on each "move" message
  console.log("new move message:", data)
})

// listen to specified state changes
room.onChange("replace", "object/:id/*", (patch, { id }) => updateObject(id, patch))

// short alias for onChange event
room.onAdd("players/:id", (patch, { id }) => addPlayer(id, patch.value)
room.onRemove("players/:id", (patch, { id }) => removePlayer(id))
room.onReplace("players/:id/:prop", (patch, { id, prop }) => updatePlayer(id, prop, patch.value))

// server error occurred
room.onError((code, message) => {
  console.log("error", code, message);
})

// client left the room
room.onLeave(() => {
  console.log(client.id, "left");
})
```

### Use methods
```js
// send message
send(type, data)

// leave room
room.leave()

// close room
room.close() {

// update room params
room.update(update)
```

# License
MIT
