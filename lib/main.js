const LspiFlux = require("lspi-flux")

class Milkyway {
  constructor() {
    this.s = JSON.parse(localStorage.getItem('lspi-flux')) || {}
    this.lf = new LspiFlux(this.s)
    window.mw = this
  }

  createSystem(klass) {
    const newSystem = new klass()
    const currentSystem = this.s[newSystem.componentTag]
    if (newSystem.init) newSystem.star = newSystem.init()
    if (currentSystem) newSystem.star = currentSystem.star
    this.s[newSystem.componentTag] = newSystem
    this.setComponentStates
    this.render(newSystem)
  }

  get setComponentStates() {
    this.lf.setState(this.s)
  }

  updateState(that) {
    this.s[that.componentTag].star = that.star
    this.lf.setState(this.s)
    this.render(that)
  }

  render(that) {
    const compTag = document.getElementsByTagName(that.componentTag)[0]
    compTag.innerHTML = that.template
  }
}

module.exports = new Milkyway()
