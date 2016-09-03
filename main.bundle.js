/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LspiFlux = __webpack_require__(2);

	var Milkyway = function () {
	  function Milkyway() {
	    _classCallCheck(this, Milkyway);

	    this.lf = new LspiFlux();
	    this.solarSystems = this.loadSystems();
	    this.mainState = this.fetchComponentStates;
	    window.Milkyway = this;
	    console.log(window.Milkyway);
	  }

	  _createClass(Milkyway, [{
	    key: "createSystem",
	    value: function createSystem(klass) {
	      var newSystem = new klass();
	      this.solarSystems[newSystem.componentTag] = newSystem;
	      window.solarSystems = this.solarSystems;
	      this.fetchComponentStates;
	      this.addTemplateToDOM(newSystem.componentTag, newSystem.template());
	    }
	  }, {
	    key: "loadSystems",
	    value: function loadSystems() {
	      if (window.solarSystems) return window.solarSystems;
	      window.solarSystems = {};
	      return {};
	    }
	  }, {
	    key: "updateState",
	    value: function updateState(that) {
	      var compName = that.componentTag;
	      var compState = that.star;

	      this.mainState[compName].star = that.star;
	      that.star = this.mainState[compName].star;
	    }
	  }, {
	    key: "addTemplateToDOM",
	    value: function addTemplateToDOM(componentName, componentTemplate) {
	      var compTag = document.getElementsByTagName(componentName)[0];
	      compTag.innerHTML = componentTemplate;
	    }
	  }, {
	    key: "loadComponents",
	    get: function get() {}
	  }, {
	    key: "fetchComponentStates",
	    get: function get() {
	      var _this = this;

	      var mainState = Object.keys(this.solarSystems).map(function (solarSystem) {
	        var system = _this.solarSystems[solarSystem];
	        _this.lf.setState(system.star);
	        var cpStar = _this.lf.fetchState;

	        if (cpStar.status) return cpStar.state;
	        return system.star;
	      });

	      var mainSet = this.lf.setState(mainState, 'milkyway-main');

	      if (mainSet.status) return mainSet.state;
	      return {};
	    }
	  }]);

	  return Milkyway;
	}();

	module.exports = new Milkyway();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const ScopedLspi = __webpack_require__(3)

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

/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);