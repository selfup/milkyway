# WIP (Work in Progress)

## Milkyway

A Galaxy (the DOM) has many solar systems (components), and each solar system has a a star (their own state).

Kinda of a joke but serious at the same time.

This framework is very similar to React at first glance.

This is more of a deep dive/learning experience, but feel free to make a Pull Request/Merge Request!

### How to write a two components and only have one re-render on state change

```javascript
const MW = require('milkyway')

MW.createSystem(class App {
  constructor() {
    this.componentTag = 'Ideas'

    // bind
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleInput = this.handleTitleInput.bind(this)
    this.handleBodyInput = this.handleBodyInput.bind(this)
    this.handleClearIdeas = this.handleClearIdeas.bind(this)
    this.clearInputs = this.clearInputs.bind(this)
  }

  init() {
    return {
      title: '',
      body: '',
    }
  }

  handleTitleInput(value) {
    this.star.title = value
  }

  handleBodyInput(value) {
    this.star.body = value
  }

  handleSubmit() {
    const newIdea = {
      title: this.star.title,
      body: this.star.body,
    }

    MW.state.Idealoader.star.ideas.unshift(newIdea)
    this.clearInputs()
    MW.updateState(MW.state.Idealoader)
  }

  clearInputs() {
    this.star.title = ''
    this.star.body = ''
    MW.updateState(this)
  }

  handleClearIdeas() {
    MW.state.Idealoader.star.ideas = []
    MW.updateState(MW.state.Idealoader)
  }

  get template() {
    return (`
      <section>
        <br><br>
        <input
          name="title"
          onchange="MW.state.Ideas.handleTitleInput(this.value)"
        >
        <br><br>
        <input
          name="body"
          onchange="MW.state.Ideas.handleBodyInput(this.value)"
        >
        <br><br>
        <button
          onclick="MW.state.Ideas.handleSubmit()"
        >
          Submit
        </button>
        <button
          onclick="MW.state.Ideas.handleClearIdeas()"
        >
          Clear Ideas
        </button>
        <Idealoader></Idealoader>
      </section>
    `)
  }
})

// create IdeaLoader
MW.createSystem(class Ideas {
  constructor() {
    this.componentTag = 'Idealoader'

    // bind
    this.loadIdeas = this.loadIdeas.bind(this)
  }

  init() {
    const local = MW.state.Idealoader
    if (local) return local.star
    return { ideas: [] }
  }

  loadIdeas() {
    return this.star.ideas.map(idea => `
  <article>
    <h3>Title:</h3>
    <h4>${idea.title}</h4>
    <h3>Body:</h3>
    <h4>${idea.body}</h4>
  </article>
`).join('')
  }

  get template() {
    const loadIdeas = MW.state.Idealoader.loadIdeas

    return (`
      <section>
        ${loadIdeas()}
      </section>
    `)
  }
})
```