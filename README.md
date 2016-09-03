# WIP (Work in Progress)

## Milkyway

A Galaxy (the DOM) has many solar systems (components), and each solar system has a a star (their own state).

Kinda of a joke but serious at the same time.

### How to write a basic component

```javascript
const mw = require('milkyway')

mw.createSystem(class IdeasComponent {
  constructor() {
    this.componentTag = 'ideas'
    this.star = {
      count: 0,
      idea: {},
      ideas: []
    }
    this.handleTitleInput = this.handleTitleInput.bind(this)
  }

  handleTitleInput() {
    this.star.count += 1
    mw.appendEvent(event,
      `<h1>omg: ${this.star.count}</h1>`
    )
    this.star.idea.title = `WOW ${this.star.count}`
    this.star.ideas.push(this.star.idea)
  }

  template() {
    return (`
      <section>
        <button
          id="button"
          name="title"
          onclick="mw.s.ideas.handleTitleInput()"
        >
          CLICK ME
        </button>
      </section>
    `)
  }
})
```