// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils/getElement/getElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElement = getElement;
//A function for searching an element in the DOM, the selector of the element
//being searched is taken as a parameter, a pointer to this element is returned
function getElement(selector) {
  return document.querySelector(selector);
}
},{}],"js/const/exampleGallery/exampleGallery.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Creating a collection of videos, since according to the instructions the
//collection should consist of eight identical videos, I use a loop to fill it.
var exampleGallery = [];
for (var i = 0; i < 8; i++) {
  exampleGallery[i] = "https://player.vimeo.com/video/824804225";
}
var _default = exports.default = exampleGallery;
},{}],"js/const/sliderDirectionMove/sliderDirectionMove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//Identifiers to indicate the direction of slider movement
var SLIDER_DIRECTION_MOVE = {
  LEFT: "left",
  RIGHT: "right"
};
var _default = exports.default = SLIDER_DIRECTION_MOVE;
},{}],"js/const/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SLIDER_DIRECTION_MOVE", {
  enumerable: true,
  get: function () {
    return _sliderDirectionMove.default;
  }
});
Object.defineProperty(exports, "exampleGallery", {
  enumerable: true,
  get: function () {
    return _exampleGallery.default;
  }
});
var _exampleGallery = _interopRequireDefault(require("./exampleGallery/exampleGallery"));
var _sliderDirectionMove = _interopRequireDefault(require("./sliderDirectionMove/sliderDirectionMove"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./exampleGallery/exampleGallery":"js/const/exampleGallery/exampleGallery.js","./sliderDirectionMove/sliderDirectionMove":"js/const/sliderDirectionMove/sliderDirectionMove.js"}],"js/utils/moveSlider/moveSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveSlider = moveSlider;
var _getElement = require("../getElement/getElement");
var _const = require("../../const");
//Slider flipping function, takes rotation direction as a parameter

//Number of elements on screen
var itemsOnScreen = 4;
//Determining the index of the left element on the last pagination page
var firstItemOnLastScreen = _const.exampleGallery.length - itemsOnScreen;
//The width of one element, taking into account the width of the video and the gap between elements
var itemWidth = 250 + 8;
//Slider position when the latest items in the collection are shown on the screen
var maxPosition = -1 * itemWidth * firstItemOnLastScreen;
function moveSlider(direction) {
  var slider = (0, _getElement.getElement)(".slider");
  var left = slider.style.left;

  //Determining the current position of the slider,
  //if this is the first function call the value is set to 0
  var position = left === "" ? 0 : parseInt(left);

  //Determining the direction of rotation of the slider
  var moveDirection = direction === _const.SLIDER_DIRECTION_MOVE.LEFT ? 1 : -1;
  if (moveDirection === 1 && position === 0) {
    //Setting a new position to the extreme right position in case of left rotation overflow
    position = -1 * firstItemOnLastScreen * itemWidth;
  } else if (moveDirection === -1 && position === maxPosition) {
    //Setting a new position to the extreme left position in case of right rotation overflow
    position = 0;
  } else {
    //Calculation of a new position in the general case
    position += moveDirection * itemWidth;
  }

  //Setting the slider to a new position
  slider.style.left = "".concat(position, "px");
}
},{"../getElement/getElement":"js/utils/getElement/getElement.js","../../const":"js/const/index.js"}],"js/utils/handleKeydownModal/handleKeydownModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleKeydownModal = handleKeydownModal;
var _toggleModal = require("../toggleModal/toggleModal");
//'keydown' event handler for the 'Escape' key in a modal window,
//the modal window is closed, takes the event that occurred as a
//parameter

function handleKeydownModal(event) {
  if (event.code === "Escape") {
    (0, _toggleModal.toggleModal)(event);
  }
}
},{"../toggleModal/toggleModal":"js/utils/toggleModal/toggleModal.js"}],"js/partials/generateCard/generateCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCard = generateCard;
//Generating a card for a slider, taking the video source as a parameter 
function generateCard(src) {
  return "\n        <iframe\n            class=\"video video_preview\"\n            src=\"".concat(src, "?controls=0\"        \n        ></iframe>\n    ");
}
},{}],"js/partials/generateList/generateList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateList = generateList;
//Generating a list of cards for the slider, taking a video collection as a
//parameter
function generateList(elements) {
  return "\n        <ul class=\"slider\">\n            ".concat(elements.reduce(function (markup, element, index) {
    return markup + "\n                    <li class=\"list_item\">\n                        ".concat(element, "\n                        <div class=\"list_frame\" data-index=\"").concat(index, "\"></div>\n                    </li>\n                ");
  }, ""), "\n        </ul>\n    ");
}
},{}],"js/partials/generateSlider/generateSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSlider = generateSlider;
var _const = require("../../const");
//Generation of a slider, the element that will be placed in the slider is
//taken as a parameter. In my case this is a collection of videos

function generateSlider(element) {
  return "\n        ".concat(element, "\n        <button\n            class=\"button slider_button slider_button__left\"\n            data-direction=\"").concat(_const.SLIDER_DIRECTION_MOVE.LEFT, "\"\n        ></button>\n        <button\n            class=\"button slider_button slider_button__right\"\n            data-direction=\"").concat(_const.SLIDER_DIRECTION_MOVE.RIGHT, "\"\n        ></button>\n    ");
}
},{"../../const":"js/const/index.js"}],"js/partials/generatePlayer/generatePlayer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePlayer = generatePlayer;
//Generating a player for a modal window, the index of the video that was
//selected in the slider is taken as a parameter
function generatePlayer(src) {
  return "<iframe\n        class=\"video video_player\"\n        src=\"".concat(src, "?autoplay=1\"        \n    ></iframe>");
}
},{}],"js/partials/generateModalPagination/generateModalPagination.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateModalPagination = generateModalPagination;
var _const = require("../../const");
//Generating a pagination bar for a modal window, the index of the video that
//is currently playing in the video collection is taken as a parameter

function generateModalPagination(currentIndex) {
  return "\n        <ul class=\"pagination\">\n            ".concat(_const.exampleGallery.reduce(function (markup, _, index) {
    return markup + "\n                <li\n                    class=\"pagination_item".concat(index == currentIndex ? " pagination_item__current" : "", "\"\n                    data-index=\"").concat(index, "\"\n                ></li>\n            ");
  }, ""), "\n        </ul>\n    ");
}
},{"../../const":"js/const/index.js"}],"js/partials/generateModal/generateModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateModal = generateModal;
var _generatePlayer = require("../generatePlayer/generatePlayer");
var _const = require("../../const");
var _generateModalPagination = require("../generateModalPagination/generateModalPagination");
//Generating content for a modal window, taking the video index in the video
//collection as a parameter

function generateModal(index) {
  return "\n        <button class=\"button modal_button\"></button>\n        ".concat((0, _generatePlayer.generatePlayer)(_const.exampleGallery[index]), "\n        ").concat((0, _generateModalPagination.generateModalPagination)(index), "\n    ");
}
},{"../generatePlayer/generatePlayer":"js/partials/generatePlayer/generatePlayer.js","../../const":"js/const/index.js","../generateModalPagination/generateModalPagination":"js/partials/generateModalPagination/generateModalPagination.js"}],"js/partials/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "generateCard", {
  enumerable: true,
  get: function () {
    return _generateCard.generateCard;
  }
});
Object.defineProperty(exports, "generateList", {
  enumerable: true,
  get: function () {
    return _generateList.generateList;
  }
});
Object.defineProperty(exports, "generateModal", {
  enumerable: true,
  get: function () {
    return _generateModal.generateModal;
  }
});
Object.defineProperty(exports, "generateModalPagination", {
  enumerable: true,
  get: function () {
    return _generateModalPagination.generateModalPagination;
  }
});
Object.defineProperty(exports, "generatePlayer", {
  enumerable: true,
  get: function () {
    return _generatePlayer.generatePlayer;
  }
});
Object.defineProperty(exports, "generateSlider", {
  enumerable: true,
  get: function () {
    return _generateSlider.generateSlider;
  }
});
var _generateCard = require("./generateCard/generateCard");
var _generateList = require("./generateList/generateList");
var _generateSlider = require("./generateSlider/generateSlider");
var _generateModal = require("./generateModal/generateModal");
var _generatePlayer = require("./generatePlayer/generatePlayer");
var _generateModalPagination = require("./generateModalPagination/generateModalPagination");
},{"./generateCard/generateCard":"js/partials/generateCard/generateCard.js","./generateList/generateList":"js/partials/generateList/generateList.js","./generateSlider/generateSlider":"js/partials/generateSlider/generateSlider.js","./generateModal/generateModal":"js/partials/generateModal/generateModal.js","./generatePlayer/generatePlayer":"js/partials/generatePlayer/generatePlayer.js","./generateModalPagination/generateModalPagination":"js/partials/generateModalPagination/generateModalPagination.js"}],"js/utils/handleClickModal/handleClickModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClickModal = handleClickModal;
var _toggleModal = require("../toggleModal/toggleModal");
var _getElement = require("../getElement/getElement");
var _partials = require("../../partials");
//'click' event handler function for a modal window, handles clicking on the
//close button and selecting a video using pagination, the event that occurred
//is accepted as a parameter

function handleClickModal(event) {
  //Gate for clicks on unnecessary elements
  if (!event.target.classList.contains("modal_button") && !event.target.classList.contains("pagination_item")) {
    return;
  }

  //Handling a click on the close button of a modal window the modal window closes
  if (event.target.classList.contains("modal_button")) {
    (0, _toggleModal.toggleModal)(event);
    return;
  }

  //Handling a click on the pagination page, the contents of the modal window are repaint
  (0, _getElement.getElement)(".modal").innerHTML = (0, _partials.generateModal)(event.target.dataset.index);
}
},{"../toggleModal/toggleModal":"js/utils/toggleModal/toggleModal.js","../getElement/getElement":"js/utils/getElement/getElement.js","../../partials":"js/partials/index.js"}],"js/utils/toggleModal/toggleModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleModal = toggleModal;
var _getElement = require("../getElement/getElement");
var _handleKeydownModal = require("../handleKeydownModal/handleKeydownModal");
var _handleClickModal = require("../handleClickModal/handleClickModal");
var _partials = require("../../partials");
//Function for opening/closing a modal window, as a parameter the event that
//caused the opening/closing of the modal window

function toggleModal(event) {
  var modal = (0, _getElement.getElement)(".modal");
  modal.classList.toggle("modal__shown");

  //Processing the closing of a modal window,
  //clearing the contents of the window and removing event handlers
  if (!modal.classList.contains("modal__shown")) {
    modal.innerHTML = "";
    modal.removeEventListener('click', _handleClickModal.handleClickModal);
    document.removeEventListener('keydown', _handleKeydownModal.handleKeydownModal);
    return;
  }

  //Filling the contents of the modal window
  modal.innerHTML = (0, _partials.generateModal)(event.target.dataset.index);

  //Adding event handlers
  modal.addEventListener('click', _handleClickModal.handleClickModal);
  document.addEventListener('keydown', _handleKeydownModal.handleKeydownModal);
}
},{"../getElement/getElement":"js/utils/getElement/getElement.js","../handleKeydownModal/handleKeydownModal":"js/utils/handleKeydownModal/handleKeydownModal.js","../handleClickModal/handleClickModal":"js/utils/handleClickModal/handleClickModal.js","../../partials":"js/partials/index.js"}],"js/utils/handleClickSlider/handleClickSlider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClickSlider = handleClickSlider;
var _moveSlider = require("../moveSlider/moveSlider");
var _toggleModal = require("../toggleModal/toggleModal");
//'click' event handler for the slider, handles the click event on the video
//card and on the slider flipping buttons, takes the event that occurred as a
//parameter

function handleClickSlider(event) {
  var _event$target = event.target,
    className = _event$target.className,
    dataset = _event$target.dataset;

  //Gate for clicks on unnecessary elements
  if (!className.includes("list_frame") && !className.includes("slider_button")) {
    return;
  }

  //Handling a click on the video card, opening a modal window with the selected video
  if (className.includes("list_frame")) {
    (0, _toggleModal.toggleModal)(event);
    return;
  }

  ////Handling a click on the slider flipping buttons, the slider is scrolling
  (0, _moveSlider.moveSlider)(dataset.direction);

  //Removing focus from a slider flipping button
  event.target.blur();
}
},{"../moveSlider/moveSlider":"js/utils/moveSlider/moveSlider.js","../toggleModal/toggleModal":"js/utils/toggleModal/toggleModal.js"}],"js/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getElement", {
  enumerable: true,
  get: function () {
    return _getElement.getElement;
  }
});
Object.defineProperty(exports, "handleClickModal", {
  enumerable: true,
  get: function () {
    return _handleClickModal.handleClickModal;
  }
});
Object.defineProperty(exports, "handleClickSlider", {
  enumerable: true,
  get: function () {
    return _handleClickSlider.handleClickSlider;
  }
});
Object.defineProperty(exports, "handleKeydownModal", {
  enumerable: true,
  get: function () {
    return _handleKeydownModal.handleKeydownModal;
  }
});
Object.defineProperty(exports, "moveSlider", {
  enumerable: true,
  get: function () {
    return _moveSlider.moveSlider;
  }
});
Object.defineProperty(exports, "toggleModal", {
  enumerable: true,
  get: function () {
    return _toggleModal.toggleModal;
  }
});
var _getElement = require("./getElement/getElement");
var _handleClickSlider = require("./handleClickSlider/handleClickSlider");
var _moveSlider = require("./moveSlider/moveSlider");
var _toggleModal = require("./toggleModal/toggleModal");
var _handleKeydownModal = require("./handleKeydownModal/handleKeydownModal");
var _handleClickModal = require("./handleClickModal/handleClickModal");
},{"./getElement/getElement":"js/utils/getElement/getElement.js","./handleClickSlider/handleClickSlider":"js/utils/handleClickSlider/handleClickSlider.js","./moveSlider/moveSlider":"js/utils/moveSlider/moveSlider.js","./toggleModal/toggleModal":"js/utils/toggleModal/toggleModal.js","./handleKeydownModal/handleKeydownModal":"js/utils/handleKeydownModal/handleKeydownModal.js","./handleClickModal/handleClickModal":"js/utils/handleClickModal/handleClickModal.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");
var _const = require("./const");
var _partials = require("./partials");
var container = (0, _utils.getElement)(".container");

//Adding a Slider
container.insertAdjacentHTML("beforeend", (0, _partials.generateSlider)((0, _partials.generateList)(_const.exampleGallery.map(function (video) {
  return (0, _partials.generateCard)(video);
}))));

//Adding an event handler
container.addEventListener('click', _utils.handleClickSlider);
},{"./utils":"js/utils/index.js","./const":"js/const/index.js","./partials":"js/partials/index.js"}],"C:/Users/user/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57051" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["C:/Users/user/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map