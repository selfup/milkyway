var w = this;

function Milkyway() {
  this.state = {};
  w.mw = this;
}

Milkyway.prototype = {
  createSystem(Klass) {
    var newSystem = new Klass()
    var currentSystem = this.state[newSystem.componentTag]
    if (newSystem.init != nil) newSystem.star = newSystem.init()
    if (currentSystem != nil) newSystem.star = currentSystem.star
    this.state[newSystem.componentTag] = newSystem
    this.render(newSystem)
  },

  updateState(that) {
    this.state[that.componentTag].star = that.star
    this.render(that)
  },

  render(that) {
    var compTag = document.getElementsByTagName(that.componentTag)[0]
    compTag.innerHTML = that.template
  },
};

module.exports = new Milkyway()
