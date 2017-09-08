const chai = require('chai')
const assert = chai.assert
const MW = require('../lib')

describe('milkyway exists', function () {
  it('can pass data from one component to another and only render a specific component', () => {
    // create component
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

    assert.equal(MW.state.Ideas.componentTag, 'Ideas')
    assert.deepEqual(MW.state.Ideas.star, { title: '', body: '' })
    assert.deepEqual(MW.state.Idealoader.star, { ideas: [] })
  })
})
