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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleInput = this.handleTitleInput.bind(this)
    this.handleBodyInput = this.handleBodyInput.bind(this)
    this.handleClearIdeas = this.handleClearIdeas.bind(this)
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
    const { updateState } = mw
    const { Idealoader } = mw.state

    const newIdea = {
      title: this.star.title,
      body: this.star.body,
    }

    Idealoader.star.ideas.unshift(newIdea)
    this.clearInputs()
    updateState(Idealoader)
  }

  clearInputs() {
    this.star.title = ''
    this.star.body = ''
    mw.updateState(this)
  }

  handleClearIdeas() {
    this.star.Ideas = []
    mw.updateState(this)
  }

  get template() {
    const {
      handleBodyInput,
      handleClearIdeas,
      handleSubmit,
      handleTitleInput,
    } = mw.state.Ideas

    return (`
      <section>
        <br><br>
        <input
          name="title"
          onchange="handleTitleInput(this.value)"
        >
        <br><br>
        <input
          name="body"
          onchange="handleBodyInput(this.value)"
        >
        <br><br>
        <button
          onclick="handleSubmit()"
        >
          Submit
        </button>
        <button
          onclick="handleClearIdeas()"
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
    this.loadIdeas = this.loadIdeas.bind(this)
  }

  init() {
    const local = mw.state.Idealoader
    if (local) return local.star
    return { ideas: [] }
  }

  loadIdeas() {
    const { ideas } = this.star

    return ideas.map(idea => {
      return (`
        <article>
          <h3>Title:</h3>
          <h4>${idea.title}</h4>
          <h3>Body:</h3>
          <h4>${idea.body}</h4>
        </article>
      `)
    }).join('')
  }

  get template() {
    const { Idealoader } = mw.state

    return (`
      <section>
        ${Idealoader.loadIdeas()}
      </section>
    `)
  }
})
```