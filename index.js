(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"lspi-flux":2}],2:[function(require,module,exports){
const ScopedLspi = require("./scoped-lspi")

class LspiFlux {
  constructor(initialState = {}, storeName = 'lspi-flux') {
    this.storeName = storeName
    this.lspi = new ScopedLspi()
    this.setState(initialState)
    this.mainStore = this.fetchState.state
  }

  get fetchState() {
    const state = this.lspi.getRecord(this.storeName)
    if (state) return { status: true, state: state }
    return { status: false, state: this.mainStore }
  }

  setState(state) {
    const init = this.lspi.setRecord(this.storeName, state)
    if (init === undefined) {
      this.mainStore = this.fetchState.state
      return { status: true, state: this.mainStore }
    }
    return { status: false, state: this.mainStore }
  }

  whereState(key, equals) {
    const whereMatch = this.lspi.where(this.storeName, key, equals)
    if (whereMatch) return { status: true, match: whereMatch }
    return { status: false, match: whereMatch }
  }
}

module.exports = LspiFlux
},{"./scoped-lspi":3}],3:[function(require,module,exports){
  class ScopedLspi {
    setRecord(recordName, data) {
      try {
        localStorage.setItem(recordName, JSON.stringify(data))
      } catch (error) {
        return false
      }
    }

    setRecords(args) {
      args.forEach(arg => this.setRecord(arg[0], arg[1]))
    }

    setJSONRecord(recordName, string) {
      try {
        localStorage.setItem(recordName, string)
      } catch (error) {
        return false
      }
    }

    getRecord(recordName) {
      try {
        const  obj = JSON.parse(localStorage.getItem(recordName))
        return obj
      } catch (error) {
        return false
      }
    }

    getRecords() {
      return Array.from(arguments).map(arg => this.getRecord(arg))
    }

    where(recordName, key, equals) {
      let   result = []
      const record = this.getRecord(recordName)

      if (!record) return record

      record.forEach(obj => { obj[key] === equals && result.push(obj) })

      if (!result[0]) return false
                      return result
    }

    getJSONRecord(recordName) {
      try {
        const  json = localStorage.getItem(recordName)
        return json
      } catch (error) {
        return false
      }
    }

    whereEitherOr(recordName, keys, value) {
      let   result = []
      const record = this.getRecord(recordName)

      if (!record) return false

      record.forEach(obj => {
        obj[key[0]] === equals || obj[key[1]] === equals && result.push(obj)
      })

      if (!result[0]) return false
                      return result
    }

    arrayWeakMatch(recordName, query) {
      let   result = []
      const record = this.getRecord(recordName)

      if (!record) return false

      record.forEach(el => { query.includes(el) && result.push(el) })

      if (!result[0]) return false
                      return result
    }

    arrayStrongMatch(recordName, query) {
      let   result = []
      const record = this.getRecord(recordName)

      record.forEach(el => { query === el && result.push(el) })

      if (!result[0]) return false
                      return result
    }

    deleteRecord(recordName) {
      localStorage.removeItem(recordName)
    }

    deleteRecords() {
      Array.from(arguments).forEach(arg => this.deleteRecord(arg))
    }

    dropAll() {
      localStorage.clear()
    }
  }

  module.exports = ScopedLspi

},{}]},{},[1]);
