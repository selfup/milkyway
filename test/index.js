const chai = require('chai')
const assert = chai.assert
const MW = require('../lib')

console.log(MilkyWay)

describe('milkyway exists', function () {
  it('can pass data from one component to another and only render a specific component', () => {
    // create component
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

    assert.equal(MW.state.Ideas.componentTag, 'Ideas')
    assert.deepEqual(MW.state.Ideas.star, { title: '', body: '' })
    assert.deepEqual(MW.state.Idealoader.star, { ideas: [] })
  })
})
