const LspiFlux = require("lspi-flux")

class Milkyway {
  constructor() {
    this.lf           = new LspiFlux()
    this.solarSystems = this.loadSystems()
    this.setComponentStates
    window.mw         = this
    this.s            = this.solarSystems
  }

  createSystem(klass) {
    const newSystem = new klass()
    this.solarSystems[newSystem.componentTag] = newSystem
    window.solarSystems = this.solarSystems
    this.setComponentStates
    this.addTemplateToDOM(newSystem.componentTag, newSystem.template())
    newSystem.listeners()
  }

  loadSystems() {
    if (window.solarSystems) return window.solarSystems
    window.solarSystems = {}
    return {}
  }

  get loadComponents() {

  }

  get setComponentStates() {
    const self = this
    const mainState = Object.keys(this.solarSystems).map(solarSystem => {
      const system = this.solarSystems[solarSystem]
      self.lf.setState(system.star)
      const cpStar = self.lf.fetchState

      if (cpStar.status) return cpStar.state
                         return system.star
    })

    const mainSet = this.lf.setState(mainState)

    if (mainSet.status) {
      this.mainState = mainSet.state
      return mainSet.state
    } else {
      return {}
    }
  }

  updateState(that) {
    const compName  = that.componentTag
    const compState = that.star

    this.mainState[compName].star = that.star
    that.star = this.mainState[compName].star
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
