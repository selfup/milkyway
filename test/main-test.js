const chai     = require('chai')
const assert   = chai.assert
const mw = require('../lib/main')

describe('milkyway exists', function () {
  it('can append a component to the DOM and add event listeners', () => {
    // create component
    mw.createSystem(class IdeasComponent {
      constructor() {
        this.componentTag = 'ideas'
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleClearIdeas = this.handleClearIdeas.bind(this)
        this.star = {
          count: 0,
          ideas: []
        }
      }

      // get init() {
      //   return {
      //     count: 0,
      //     ideas: []
      //   }
      // }

      handleButtonClick() {
        this.star.count += 1
        const newIdea = {title: `WOW ${this.star.count}`}
        this.star.ideas.push(newIdea)
        mw.updateState(this)
      }

      handleClearIdeas() {
        this.star.count = 0
        this.star.ideas = []
        mw.updateState(this)
      }

      get template() {
        return (`
          <section>
            <button
              id="button"
              name="title"
              onclick="mw.s.ideas.handleButtonClick()"
            >
              CLICK ME
            </button>
            <button
              id="clear-ideas"
              name="clear"
              onclick="mw.s.ideas.handleClearIdeas()"
            >
             CLEAR
            </button>
          </section>
          <section id="ideas">
            ${this.star.ideas.map(idea => {
              return `<article><h3><em>${idea.title}</em></h3></article>`
            }).join('')}
          </section>
        `)
      }
    })

    // localStorage.clear()
    assert.equal(mw.solarSystems.ideas.componentTag, 'ideas')
    assert.deepEqual(mw.solarSystems.ideas.star, {count: 0, ideas: []})
  })
})
