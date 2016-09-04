const chai     = require('chai')
const assert   = chai.assert
const mw = require('../lib/main')

describe('milkyway exists', function () {
  it('can append a component to the DOM and add event listeners', () => {
    // create component
    mw.createSystem(class IdeasComponent {
      constructor() {
        this.componentTag = 'ideas'
        // remove init function and define 'this.star' to dictate simple state

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

      // this could return an ajax call, but here we pull from local storage
      // this local storage gets stored in the window, so we pull it from 'mw.s.ideas'
      // this framework handles all the nasty work for you!
      init() {
        const local = mw.s.ideas
        if (local) return local.star
        return {ideas: []}
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
            ><br><br>
            <input
              name="body"
              onchange="mw.s.ideas.handleBodyInput(this.value)"
            >
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

    localStorage.clear()
    assert.equal(mw.solarSystems.ideas.componentTag, 'ideas')
    assert.deepEqual(mw.solarSystems.ideas.star, {count: 0, ideas: []})
  })
})
