/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/passwordmeter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/passwordmeter.js":
/*!******************************!*\
  !*** ./src/passwordmeter.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval(";(function(window, document) {\r\n  \r\n  Element.prototype.remove = function() {\r\n    this.parentElement.removeChild(this);\r\n  }\r\n\r\n  function passwordmeter(selector, options) {\r\n    this.elements = document.querySelectorAll(selector);\r\n    \r\n    this.options = {\r\n      weakString: 'Weak',\r\n      weakColor: 'red',\r\n      goodString: 'Good',\r\n      goodColor: 'yellow',\r\n      strongString: 'Strong',\r\n      strongColor: 'green'\r\n    };\r\n    \r\n    this.buildHTML();\r\n    this.addEvents();\r\n  };\r\n  \r\n  passwordmeter.prototype.buildHTML = function() {\r\n    if( this.elements.length ) {\r\n      for( var i = 0; i < this.elements.length; i++ ) {\r\n        var item = this.elements[i];\r\n        \r\n        var container = document.createElement('div');\r\n        container.classList.add( 'strength-container' );\r\n        \r\n        var progressbar = document.createElement( 'progress' );\r\n        \r\n        progressbar.max = 100;\r\n        progressbar.value = 0;\r\n        progressbar.innerHTML = \"0\";\r\n        progressbar.style.width = \"100%\";\r\n        \r\n        container.appendChild( progressbar );\r\n        \r\n        item.parentNode.insertBefore( container, item.nextSibling );\r\n      }\r\n    }\r\n  };\r\n\r\n  passwordmeter.prototype.addEvents = function() {\r\n    if( this.elements.length ) {\r\n      for( var i = 0; i < this.elements.length; i++ ) {\r\n        var item = this.elements[i];\r\n        item.addEventListener( 'input', this.testPassword.bind(item, this.options ), false );\r\n        \r\n      }\r\n    }\r\n  }\r\n  \r\n  passwordmeter.prototype.testPassword = function( options ) {\r\n    var regexTests = [\r\n      /[a-z]+/,\r\n      /[A-Z]+/,\r\n      /[0-9]+/,\r\n      /[$@#&!]+/\r\n    ];\r\n    var passes = 0;\r\n  \r\n    for( var i = 0; i < regexTests.length; i++ ) {\r\n      if( regexTests[i].test( this.value ) ) {\r\n        passes++;\r\n      }\r\n    }\r\n    \r\n    var string = options.weakString;\r\n    var percent = 0;\r\n    var color = options.weakColor;\r\n    \r\n    if( passes >= 2 && passes < 4 ) {\r\n      string = options.goodString;\r\n      color = options.goodColor;\r\n      percent = 50;\r\n    }\r\n    else if( passes === 4 ) {\r\n      string = options.strongString;\r\n      color = options.strongColor;\r\n      percent = 100;\r\n    }\r\n    \r\n    var progressbar = this.parentNode.querySelector('progress');\r\n    \r\n    console.log( progressbar.parentNode );\r\n    \r\n    var status = progressbar.parentNode.querySelector('p');\r\n    \r\n    if( status ) {\r\n      status.remove();  \r\n    }\r\n    \r\n    \r\n    var status = document.createElement( 'p' );\r\n    status.innerHTML = \"Strength: \" + string;\r\n    \r\n    progressbar.parentNode.insertBefore( status, progressbar );\r\n    \r\n    progressbar.value = percent;\r\n    progressbar.style.backgroundColor = color;\r\n  };\r\n  \r\n  window.passwordMeter = passwordmeter;\r\n\r\n})(window, document);\r\n\n\n//# sourceURL=webpack:///./src/passwordmeter.js?");

/***/ })

/******/ });