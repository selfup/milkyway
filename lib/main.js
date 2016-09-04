const LspiFlux = require("lspi-flux")

class Milkyway {
  constructor() {
    this.solarSystems = JSON.parse(localStorage.getItem('lspi-flux')) || {}
    this.lf           = new LspiFlux(this.solarSystems)
    this.s            = this.solarSystems
    window.mw         = this
  }

  createSystem(klass) {
    const newSystem = new klass()
    const currentSystem = this.solarSystems[newSystem.componentTag]
    // needed check to maintain state from local or init
    if (newSystem.init) {
      newSystem.star = newSystem.init()
    } else if (currentSystem) {
      newSystem.star = currentSystem.star
    }
    // once check is done, star for system will be set from local or constructor
    this.solarSystems[newSystem.componentTag] = newSystem
    this.setComponentStates
    this.addTemplateToDOM(newSystem.componentTag, newSystem.template)
  }

  get setComponentStates() {
    this.lf.setState(this.solarSystems)
  }

  updateState(that) {
    this.solarSystems[that.componentTag].star = that.star
    this.lf.setState(this.solarSystems)
    this.render(that)
  }

  addTemplateToDOM(componentName, componentTemplate) {
    const compTag = document.getElementsByTagName(componentName)[0]
    compTag.innerHTML = componentTemplate
  }

  addClick(id, fn) {
    document.getElementById(id).addEventListener("click", () => {
      fn()
    })
  }

  render(that) {
    this.addTemplateToDOM(that.componentTag, that.template)
  }

  appendEvent(target, html) {
    var newDiv = document.createElement("article");
    newDiv.innerHTML = html
    target.target.parentElement.appendChild(newDiv);
  }
}

module.exports = new Milkyway()
