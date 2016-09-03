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
    if (currentSystem) newSystem.star = currentSystem.star
    this.solarSystems[newSystem.componentTag] = newSystem
    window.solarSystems = this.solarSystems
    this.setComponentStates
    this.addTemplateToDOM(newSystem.componentTag, newSystem.template())
  }

  loadSystems() {
    if (window.solarSystems) return window.solarSystems
    window.solarSystems = {}
    return {}
  }

  get setComponentStates() {
    this.lf.setState(this.solarSystems)
  }

  updateState(that) {
    this.solarSystems[that.componentTag].star = that.star
    this.lf.setState(this.solarSystems)
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

  appendEvent(target, html) {
    var newDiv = document.createElement("article");
    newDiv.innerHTML = html
    target.target.parentElement.appendChild(newDiv);
  }
}

module.exports = new Milkyway()
