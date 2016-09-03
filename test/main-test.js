const chai     = require('chai')
const assert   = chai.assert
const mw = require('../lib/main')

describe('milkyway exists', function () {
  it('does not shit the bed', () => {
    // create component
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

    assert.equal(mw.solarSystems.ideas.componentTag, 'ideas')
    assert.deepEqual(mw.solarSystems.ideas.star, {idea: {}, ideas: []})
  })
})
