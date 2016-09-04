# WIP (Work in Progress)

## Milkyway

A Galaxy (the DOM) has many solar systems (components), and each solar system has a a star (their own state).

Kinda of a joke but serious at the same time.

This framework is very similar to React at first glance.

This is more of a deep dive/learning experience, but feel free to make a Pull Request/Merge Request!

### How to write a basic component

```javascript
const mw = require('milkyway')

mw.createSystem(class IdeasComponent {
  constructor() {
    this.componentTag = 'ideas'
    // define this.star to have new default values for the component state
    // this.star = {
    //   title: '',
    //   body: '',
    //   ideas: []
    // }
    this.handleSubmit     = this.handleSubmit.bind(this)
    this.handleTitleInput = this.handleTitleInput.bind(this)
    this.handleBodyInput  = this.handleBodyInput.bind(this)
    this.handleClearIdeas = this.handleClearIdeas.bind(this)
    this.loadIdeas        = this.loadIdeas.bind(this)
  }

  // define init to pull localStorage from 'mw.s.componentTag' (s = solarSystems)
  // define init to have mw define the component state from an ajax call
  init() {
    const local = mw.s.ideas
    if (local) return local.star
    return {title: '', body: '', ideas: []}
  }

  loadIdeas() {
    return this.star.ideas.map(idea => {
      return (`
        <article>
          <h3>${idea.title}</h3>
          <h2>${idea.body}</h2>
        </article>
      `)
    }).join('')
  }

  handleTitleInput(value) {
    this.star.title = value
  }

  handleBodyInput(value) {
    this.star.body = value
  }

  handleSubmit() {
    const newIdea = {title: this.star.title, body: this.star.body}
    this.star.ideas.push(newIdea)
    mw.updateState(this)
  }

  handleClearIdeas() {
    this.star.ideas = []
    mw.updateState(this)
  }

  get template() {
    return (`
      <section>
        <br><br>
        <input
          name="title"
          onchange="mw.s.ideas.handleTitleInput(this.value)"
        >
        <br><br>
        <input
          name="body"
          onchange="mw.s.ideas.handleBodyInput(this.value)"
        >
        <br><br>
        <button
          onclick="mw.s.ideas.handleSubmit()"
        >
          Submit
        </button>
        <button
          onclick="mw.s.ideas.handleClearIdeas()"
        >
         Clear Ideas
        </button>
      </section>
      <section id="ideas">
        ${mw.s.ideas.loadIdeas()}
      </section>
    `)
  }
})
```