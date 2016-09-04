const chai   = require('chai')
const assert = chai.assert
const MW     = require('../lib/main')

describe('milkyway exists', function () {
  it('can pass data from one component to another and only render a specific component', () => {
    // create component
    MW.createSystem(class App {
      constructor() {
        this.componentTag     = 'ideas'
        this.handleSubmit     = this.handleSubmit.bind(this)
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.handleBodyInput  = this.handleBodyInput.bind(this)
        this.handleClearIdeas = this.handleClearIdeas.bind(this)
      }

      init() {
        return {title: '', body: ''}
      }

      handleTitleInput(value) {
        this.star.title = value
      }

      handleBodyInput(value) {
        this.star.body = value
      }

      handleSubmit() {
        const newIdea = {title: this.star.title, body: this.star.body}
        mw.s.idealoader.star.ideas.unshift(newIdea)
        this.clearInputs()
        mw.updateState(mw.s.idealoader)
      }

      clearInputs() {
        this.star.title = ''
        this.star.body = ''
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
            <idealoader></idealoader>
          </section>

        `)
      }
    })

    // create ideaLoader
    MW.createSystem(class Ideas {
      constructor() {
        this.componentTag = 'idealoader'
        this.loadIdeas = this.loadIdeas.bind(this)
      }

      init() {
        const local = mw.s.idealoader
        if (local) return local.star
        return {ideas: []}
      }

      loadIdeas() {
        return this.star.ideas.map(idea => {
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
        return (`
          <section>
            ${mw.s.idealoader.loadIdeas()}
          </section>
        `)
      }
    })

    localStorage.clear()
    assert.equal(MW.solarSystems.ideas.componentTag, 'ideas')
    assert.deepEqual(MW.solarSystems.ideas.star, { title: '', body: ''})
    assert.deepEqual(MW.solarSystems.idealoader.star, { ideas: []})
  })
})
