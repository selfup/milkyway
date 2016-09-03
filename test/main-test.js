const chai     = require('chai')
const assert   = chai.assert
const mw = require('../lib/main')

describe('milkyway exists', function () {
  it('can append a component to the DOM and add event listeners', () => {
    // create component
    mw.createSystem(class IdeasComponent {
      constructor() {
        this.componentTag = 'ideas'
        this.star = {
          count: 0,
          ideas: []
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
      }

      handleButtonClick() {
        this.star.count += 1
        mw.appendEvent(event,
          `<h1>omg: ${this.star.count}</h1>`
        )
        const newIdea = {title: `WOW ${this.star.count}`}
        this.star.ideas.push(newIdea)
        mw.updateState(this)
      }

      template() {
        return (`
          <section>
            <button
              id="button"
              name="title"
              onclick="mw.s.ideas.handleButtonClick()"
            >
              CLICK ME
            </button>
          </section>
          <section id="ideas">
            ${console.log(this.star.ideas)}
            ${this.star.ideas.map(idea => {
              return `<article><h3><em>${idea.title}</em></h3></article>`
            }).join('')}
          </section>
        `)
      }
    })

    localStorage.clear()
    assert.equal(mw.solarSystems.ideas.componentTag, 'ideas')
    assert.deepEqual(mw.solarSystems.ideas.star, {count: 0, idea: {}, ideas: []})
  })
})
