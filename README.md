# Stateful Store

### Developer Use

Currently the main API methods are:

```javascript
const LspiFlux = require('milkyway')
const lf       = new LspiFlux()

// this will make an LspiFlux object with the following defaults
// LspiFlux {storeName: "milkyway", mainStore: {}}

lf.fetchState 

// if all goes well this will return {status: true, state: {}} ->
lf.fetchState.state // {}
lf.fetchState.status // true

// if localStorage fails, this will return the state in memory before writing to localStorage
// it will also return a 'status' of false to help handle errors

const someObject = {wow: "wow"}
lf.setState(someObject) // this will return the same object as fetchState

// but the state here will be updated if nothing went wrong
// otherwise, handle the error by checking for a flase status


// if all goes well this will return {status: true, state: {wow: "wow"}} ->
lf.setState(someObject).state // {wow: "wow"}
lf.setState(someObject).status // true

// say you want to name the store and set a default value yourself ->
const ideas = new LspiFlux({}, 'ideas')

ideas.setState([{wow: "ok"}, {wow: "ok"}, {wow: "nope"}])

/***
whereState will return an object with two keys
  status:
  match:

this does not return the objects state
instead it returns the match of objects wrapped in an array if there are any
***/ // ->
const okResult = ideas.whereState('wow', 'ok')
const okMatch  = okResult.match

okResult.state // true
okResult.match // [{wow: "ok"}, {wow: "ok"}]
// okMatch -> [{wow: "ok"}, {wow: "ok"}]

const nopeResult = ideas.whereState('wow', 'nope')
const nopeMatch  = nopeResult.match

nopeResult.state // true
nopeResult.match // [{wow: "nope"}]
// nopeMatch -> [{wow: "nope"}]

// this is all that this library offers for the moment
// but a lot can be done to handle state with these three simple methods

// Enjoy!
```

### Current tests

![](http://i.imgur.com/CeCNnJK.png)

### Contributor Setup

Go to either: https://github.com/selfup/milkyway

Or:           https://gitlab.com/selfup/milkyway

*Clone one of them and:*

```
npm install
```

### To run the tests:

```
npm start
```

Then go to: http://localhost:8080/webpack-dev-server/test.html

### TODO

* Write more Documentation
* Ask for feedback about the API
