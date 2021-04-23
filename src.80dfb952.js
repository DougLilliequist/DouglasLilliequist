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
})({"../../node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],"../../node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js":[function(require,module,exports) {
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js":[function(require,module,exports) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],"../../node_modules/@babel/runtime/helpers/superPropBase.js":[function(require,module,exports) {
var getPrototypeOf = require("./getPrototypeOf");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
},{"./getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js"}],"../../node_modules/@babel/runtime/helpers/get.js":[function(require,module,exports) {
var superPropBase = require("./superPropBase");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
},{"./superPropBase":"../../node_modules/@babel/runtime/helpers/superPropBase.js"}],"../../node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":[function(require,module,exports) {
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":"../../node_modules/@babel/runtime/helpers/typeof.js","./assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js"}],"../../node_modules/@babel/runtime/helpers/setPrototypeOf.js":[function(require,module,exports) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],"../../node_modules/@babel/runtime/helpers/inherits.js":[function(require,module,exports) {
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":"../../node_modules/@babel/runtime/helpers/setPrototypeOf.js"}],"../../node_modules/@babel/runtime/helpers/defineProperty.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],"../../node_modules/@dogstudio/highway/build/highway.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function t() {}

t.prototype = {
  on: function (t, e, r) {
    var i = this.e || (this.e = {});
    return (i[t] || (i[t] = [])).push({
      fn: e,
      ctx: r
    }), this;
  },
  once: function (t, e, r) {
    var i = this;

    function n() {
      i.off(t, n), e.apply(r, arguments);
    }

    return n._ = e, this.on(t, n, r);
  },
  emit: function (t) {
    for (var e = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, n = r.length; i < n; i++) r[i].fn.apply(r[i].ctx, e);

    return this;
  },
  off: function (t, e) {
    var r = this.e || (this.e = {}),
        i = r[t],
        n = [];
    if (i && e) for (var o = 0, s = i.length; o < s; o++) i[o].fn !== e && i[o].fn._ !== e && n.push(i[o]);
    return n.length ? r[t] = n : delete r[t], this;
  }
};
var e = t;
e.TinyEmitter = t;

var r = function (t) {
  this.wrap = document.querySelector("[data-router-wrapper]"), this.properties = t, this.Transition = t.transition ? new t.transition.class(this.wrap, t.transition.name) : null;
};

r.prototype.setup = function () {
  this.onEnter && this.onEnter(), this.onEnterCompleted && this.onEnterCompleted();
}, r.prototype.add = function () {
  this.wrap.insertAdjacentHTML("beforeend", this.properties.view.outerHTML);
}, r.prototype.update = function () {
  document.title = this.properties.page.title;
}, r.prototype.show = function (t) {
  var e = this;
  return new Promise(function (r) {
    try {
      function i(t) {
        e.onEnterCompleted && e.onEnterCompleted(), r();
      }

      return e.update(), e.onEnter && e.onEnter(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.show(t)).then(i) : i());
    } catch (t) {
      return Promise.reject(t);
    }
  });
}, r.prototype.hide = function (t) {
  var e = this;
  return new Promise(function (r) {
    try {
      function i(t) {
        e.onLeaveCompleted && e.onLeaveCompleted(), r();
      }

      return e.onLeave && e.onLeave(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.hide(t)).then(i) : i());
    } catch (t) {
      return Promise.reject(t);
    }
  });
};

var i = new window.DOMParser(),
    n = function (t, e) {
  this.renderers = t, this.transitions = e;
};

n.prototype.getOrigin = function (t) {
  var e = t.match(/(https?:\/\/[\w\-.]+)/);
  return e ? e[1].replace(/https?:\/\//, "") : null;
}, n.prototype.getPathname = function (t) {
  var e = t.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
  return e ? e[1] : "/";
}, n.prototype.getAnchor = function (t) {
  var e = t.match(/(#.*)$/);
  return e ? e[1] : null;
}, n.prototype.getParams = function (t) {
  var e = t.match(/\?([\w_\-.=&]+)/);
  if (!e) return null;

  for (var r = e[1].split("&"), i = {}, n = 0; n < r.length; n++) {
    var o = r[n].split("=");
    i[o[0]] = o[1];
  }

  return i;
}, n.prototype.getDOM = function (t) {
  return "string" == typeof t ? i.parseFromString(t, "text/html") : t;
}, n.prototype.getView = function (t) {
  return t.querySelector("[data-router-view]");
}, n.prototype.getSlug = function (t) {
  return t.getAttribute("data-router-view");
}, n.prototype.getRenderer = function (t) {
  if (!this.renderers) return Promise.resolve(r);

  if (t in this.renderers) {
    var e = this.renderers[t];
    return "function" != typeof e || r.isPrototypeOf(e) ? "function" == typeof e.then ? Promise.resolve(e).then(function (t) {
      return t.default;
    }) : Promise.resolve(e) : Promise.resolve(e()).then(function (t) {
      return t.default;
    });
  }

  return Promise.resolve(r);
}, n.prototype.getTransition = function (t) {
  return this.transitions ? t in this.transitions ? {
    class: this.transitions[t],
    name: t
  } : "default" in this.transitions ? {
    class: this.transitions.default,
    name: "default"
  } : null : null;
}, n.prototype.getProperties = function (t) {
  var e = this.getDOM(t),
      r = this.getView(e),
      i = this.getSlug(r);
  return {
    page: e,
    view: r,
    slug: i,
    renderer: this.getRenderer(i, this.renderers),
    transition: this.getTransition(i, this.transitions)
  };
}, n.prototype.getLocation = function (t) {
  return {
    href: t,
    anchor: this.getAnchor(t),
    origin: this.getOrigin(t),
    params: this.getParams(t),
    pathname: this.getPathname(t)
  };
};

var o = function (t) {
  function e(e) {
    var r = this;
    void 0 === e && (e = {});
    var i = e.renderers,
        o = e.transitions;
    t.call(this), this.Helpers = new n(i, o), this.Transitions = o, this.Contextual = !1, this.location = this.Helpers.getLocation(window.location.href), this.properties = this.Helpers.getProperties(document.cloneNode(!0)), this.popping = !1, this.running = !1, this.trigger = null, this.cache = new Map(), this.cache.set(this.location.href, this.properties), this.properties.renderer.then(function (t) {
      r.From = new t(r.properties), r.From.setup();
    }), this._navigate = this.navigate.bind(this), window.addEventListener("popstate", this.popState.bind(this)), this.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), this.attach(this.links);
  }

  return t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e, e.prototype.attach = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) r[e].addEventListener("click", this._navigate);
  }, e.prototype.detach = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) r[e].removeEventListener("click", this._navigate);
  }, e.prototype.navigate = function (t) {
    if (!t.metaKey && !t.ctrlKey) {
      t.preventDefault();
      var e = !!t.currentTarget.hasAttribute("data-transition") && t.currentTarget.dataset.transition;
      this.redirect(t.currentTarget.href, e, t.currentTarget);
    }
  }, e.prototype.redirect = function (t, e, r) {
    if (void 0 === e && (e = !1), void 0 === r && (r = "script"), this.trigger = r, !this.running && t !== this.location.href) {
      var i = this.Helpers.getLocation(t);
      this.Contextual = !1, e && (this.Contextual = this.Transitions.contextual[e].prototype, this.Contextual.name = e), i.origin !== this.location.origin || i.anchor && i.pathname === this.location.pathname ? window.location.href = t : (this.location = i, this.beforeFetch());
    }
  }, e.prototype.popState = function () {
    this.trigger = "popstate", this.Contextual = !1;
    var t = this.Helpers.getLocation(window.location.href);
    this.location.pathname !== t.pathname || !this.location.anchor && !t.anchor ? (this.popping = !0, this.location = t, this.beforeFetch()) : this.location = t;
  }, e.prototype.pushState = function () {
    this.popping || window.history.pushState(this.location, "", this.location.href);
  }, e.prototype.fetch = function () {
    try {
      var t = this;
      return Promise.resolve(fetch(t.location.href, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "X-Requested-With": "Highway"
        },
        credentials: "same-origin"
      })).then(function (e) {
        if (e.status >= 200 && e.status < 300) return e.text();
        window.location.href = t.location.href;
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }, e.prototype.beforeFetch = function () {
    try {
      var t = this;

      function e() {
        t.afterFetch();
      }

      t.pushState(), t.running = !0, t.emit("NAVIGATE_OUT", {
        from: {
          page: t.From.properties.page,
          view: t.From.properties.view
        },
        trigger: t.trigger,
        location: t.location
      });
      var r = {
        trigger: t.trigger,
        contextual: t.Contextual
      },
          i = t.cache.has(t.location.href) ? Promise.resolve(t.From.hide(r)).then(function () {
        t.properties = t.cache.get(t.location.href);
      }) : Promise.resolve(Promise.all([t.fetch(), t.From.hide(r)])).then(function (e) {
        t.properties = t.Helpers.getProperties(e[0]), t.cache.set(t.location.href, t.properties);
      });
      return Promise.resolve(i && i.then ? i.then(e) : e());
    } catch (t) {
      return Promise.reject(t);
    }
  }, e.prototype.afterFetch = function () {
    try {
      var t = this;
      return Promise.resolve(t.properties.renderer).then(function (e) {
        return t.To = new e(t.properties), t.To.add(), t.emit("NAVIGATE_IN", {
          to: {
            page: t.To.properties.page,
            view: t.To.wrap.lastElementChild
          },
          trigger: t.trigger,
          location: t.location
        }), Promise.resolve(t.To.show({
          trigger: t.trigger,
          contextual: t.Contextual
        })).then(function () {
          t.popping = !1, t.running = !1, t.detach(t.links), t.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), t.attach(t.links), t.emit("NAVIGATE_END", {
            to: {
              page: t.To.properties.page,
              view: t.To.wrap.lastElementChild
            },
            from: {
              page: t.From.properties.page,
              view: t.From.properties.view
            },
            trigger: t.trigger,
            location: t.location
          }), t.From = t.To, t.trigger = null;
        });
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }, e;
}(e),
    s = function (t, e) {
  this.wrap = t, this.name = e;
};

s.prototype.show = function (t) {
  var e = this,
      r = t.trigger,
      i = t.contextual,
      n = this.wrap.lastElementChild,
      o = this.wrap.firstElementChild;
  return new Promise(function (t) {
    i ? (n.setAttribute("data-transition-in", i.name), n.removeAttribute("data-transition-out", i.name), i.in && i.in({
      to: n,
      from: o,
      trigger: r,
      done: t
    })) : (n.setAttribute("data-transition-in", e.name), n.removeAttribute("data-transition-out", e.name), e.in && e.in({
      to: n,
      from: o,
      trigger: r,
      done: t
    }));
  });
}, s.prototype.hide = function (t) {
  var e = this,
      r = t.trigger,
      i = t.contextual,
      n = this.wrap.firstElementChild;
  return new Promise(function (t) {
    i ? (n.setAttribute("data-transition-out", i.name), n.removeAttribute("data-transition-in", i.name), i.out && i.out({
      from: n,
      trigger: r,
      done: t
    })) : (n.setAttribute("data-transition-out", e.name), n.removeAttribute("data-transition-in", e.name), e.out && e.out({
      from: n,
      trigger: r,
      done: t
    }));
  });
}, console.log("Highway v2.2.0");
var _default = {
  Core: o,
  Helpers: n,
  Renderer: r,
  Transition: s
};
exports.default = _default;
},{}],"../../node_modules/tiny-emitter/index.js":[function(require,module,exports) {
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;

},{}],"../../utils/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _events;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = (_events = {
  INIT_DOMGL: 'init_DomGL',
  QUADS_LOADED: 'quads_loaded',
  RESET_QUADS: 'reset_quad',
  REVEAL_QUADS: 'reveal_quads',
  PREPARE_UNMOUNT: 'prepare_unmount',
  TRANSITIONING: 'transitioning',
  REMOVE_DOMGL: 'remove_DOMGL',
  LOAD_PROJECT_CONTENT: 'load_Project_Content',
  CONTENT_LOADED: 'content_loaded',
  UPDATE_PROGRESS: 'update_progress',
  LOADING_ANIM_COMPLETED: 'loading_anim_completed',
  TEXTURE_LOADED: 'texture_loaded',
  UPDATE_CONTENT_COUNT: 'update_content_count',
  ENTER_SCROLL_MODE: 'enter_scroll_mode',
  EXIT_SCROLL_MODE: 'exit_scroll_mode',
  APPLY_SCROLL_MODE_ANIM: 'apply_scroll_mode_anim',
  REMOVE_SCROLL_MODE_ANIM: 'remove_scroll_mode_anim',
  UPDATE_VIEWMODE: 'update_view_mode',
  SHOW_PROJECT: 'show_project',
  CLOSE_PROJECT: 'close_project',
  MOUSE_DOWN: 'mouse_down',
  MOUSE_MOVE: 'mouse_move',
  MOUSE_UP: 'mouse_up',
  TOUCH_START: 'touch_start',
  TOUCH_MOVE: 'touch_move',
  TOUCH_END: 'touch_end',
  TOUCH_CANCEL: 'touch_cancel'
}, (0, _defineProperty2.default)(_events, "TOUCH_START", 'touch_start'), (0, _defineProperty2.default)(_events, "TOUCH_MOVE", 'touch_move'), (0, _defineProperty2.default)(_events, "TOUCH_END", 'touch_end'), (0, _defineProperty2.default)(_events, "UPDATE_CURRENT_VIEW", 'update_current_view'), (0, _defineProperty2.default)(_events, "UPDATE", 'update'), (0, _defineProperty2.default)(_events, "HOVERING_STICKY_COMPONENT", 'hovering_sticky_component'), (0, _defineProperty2.default)(_events, "LEAVING_STICKY_COMPONENT", 'leaving_sticky_component'), (0, _defineProperty2.default)(_events, "UPDATE_STICKY_TARGET", 'update_sticky_target'), (0, _defineProperty2.default)(_events, "HOVERING_NAV_LINK", 'hovering_nav_link'), (0, _defineProperty2.default)(_events, "HOVERING_LINK", 'hovering_link'), (0, _defineProperty2.default)(_events, "LEAVING_LINK", 'leaving_link'), (0, _defineProperty2.default)(_events, "LINK_SELECTED", 'link_selected'), (0, _defineProperty2.default)(_events, "PLAY_VIDEO", 'play_video'), (0, _defineProperty2.default)(_events, "PAUSE_VIDEO", 'pause_video'), (0, _defineProperty2.default)(_events, "SHOW_CLICKDRAG_CTA", 'show_click-drag_cta'), (0, _defineProperty2.default)(_events, "HIDE_CLICKDRAG_CTA", 'hide_click-drag_cta'), (0, _defineProperty2.default)(_events, "RESIZE", 'resize'), _events);
var _default = events;
exports.default = _default;
},{"@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js"}],"../../node_modules/gsap/gsap-core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getCache = exports._getSetter = exports._missingPlugin = exports._round = exports._roundModifier = exports._config = exports._ticker = exports._plugins = exports._checkPlugin = exports._replaceRandom = exports._colorStringFilter = exports._sortPropTweensByPriority = exports._forEachName = exports._removeLinkedListItem = exports._setDefaults = exports._relExp = exports._renderComplexString = exports._isUndefined = exports._isString = exports._numWithUnitExp = exports._numExp = exports._getProperty = exports.shuffle = exports.interpolate = exports.unitize = exports.pipe = exports.mapRange = exports.toArray = exports.splitColor = exports.clamp = exports.getUnit = exports.normalize = exports.snap = exports.random = exports.distribute = exports.wrapYoyo = exports.wrap = exports.Circ = exports.Expo = exports.Sine = exports.Bounce = exports.SteppedEase = exports.Back = exports.Elastic = exports.Strong = exports.Quint = exports.Quart = exports.Cubic = exports.Quad = exports.Linear = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.default = exports.gsap = exports.PropTween = exports.TweenLite = exports.TweenMax = exports.Tween = exports.TimelineLite = exports.TimelineMax = exports.Timeline = exports.Animation = exports.GSCache = void 0;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.3.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_parenthesesExp = /\(([^()]+)\)/i,
    //finds the string between parentheses.
_relExp = /[+-]=-?[\.\d]+/,
    _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;

  if (!_isObject(target) && !_isFunction(target)) {
    targets = [targets];
  }

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property) {
  var currentValue = target[property];
  return _isFunction(currentValue) ? target[property]() : _isUndefined(currentValue) && target.getAttribute(property) || currentValue;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _parseVars = function _parseVars(params, type, parent) {
  //reads the arguments passed to one of the key methods and figures out if the user is defining things with the OLD/legacy syntax where the duration is the 2nd parameter, and then it adjusts things accordingly and spits back the corrected vars object (with the duration added if necessary, as well as runBackwards or startAt or immediateRender). type 0 = to()/staggerTo(), 1 = from()/staggerFrom(), 2 = fromTo()/staggerFromTo()
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars;

  if (isLegacy) {
    vars.duration = params[1];
  }

  vars.parent = parent;

  if (type) {
    irVars = vars;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);

    if (type < 2) {
      vars.runBackwards = 1;
    } else {
      vars.startAt = params[varsIndex - 1]; // "from" vars
    }
  }

  return vars;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && _lazyRender();
  animation.render(time, suppressEvents, force);
  _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj)) {
      obj[p] = defaults[p];
    }
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj) && p !== "duration" && p !== "ease") {
      obj[p] = defaults[p];
    }
  }
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p];
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  if (child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren)) {
    child.parent.remove(child);
  }

  child._act = 0;
},
    _uncache = function _uncache(animation) {
  var a = animation;

  while (a) {
    a._dirty = 1;
    a = a.parent;
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  return (tTime /= cycleDuration) && ~~tTime === tTime ? ~~tTime - 1 : ~~tTime;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _round(position + child._delay);
  child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  timeline._recent = child;
  skipChecks || _postAddChecks(timeline, child);
  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
  _initTween(tween, totalTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [totalTime, suppressEvents];
    return 1;
  }
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || prevRatio && !totalTime && !tween._start && !tween._dp._lock ? 0 : 1,
      // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    prevIteration = _animationCycle(tween._tTime, repeatDelay);

    if (iteration !== prevIteration) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
    // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
    return;
  }

  if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    suppressEvents || _callback(tween, "onStart");
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    if (!ratio && tween._startAt && !tween._onUpdate && tween._start) {
      //if the tween is positioned at the VERY beginning (_start 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
      tween._startAt.render(totalTime, true, force);
    }

    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (!child._dur && child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (!child._dur && child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache) {
  var repeat = animation._repeat,
      dur = _round(duration) || 0;
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);

  if (animation._time > dur) {
    animation._time = dur;
    animation._tTime = Math.min(animation._tTime, animation._tDur);
  }

  !skipUncache && _uncache(animation.parent);
  animation.parent && _setEnd(animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    i = position.charAt(0);

    if (i === "<" || i === ">") {
      return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
    }

    i = position.indexOf("=");

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = +(position.charAt(i - 1) + position.substr(i + 1));
    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value) {
  return (value + "").substr((parseFloat(value) + "").length);
},
    clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, leaveStrings) {
  return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (raw) {
    return Math.floor(Math.round(parseFloat(raw) / v) * v * p) / p + (_isNumber(raw) ? 0 : getUnit(raw));
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min + Math.random() * (max - min)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      params,
      scope;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  return params ? callback.apply(scope, params) : callback.call(scope);
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  if (animation.progress() < 1) {
    _callback(animation, "onInterrupt");
  }

  return animation;
},
    _quickTween,
    _createPlugin = function _createPlugin(config) {
  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  if (config.register) {
    config.register(gsap, Plugin, PropTween);
  }
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    _hue = function _hue(h, m1, m2) {
  h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length === 4) {
        //for shorthand like #9F0
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b;
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;

        if (a.length > 3) {
          a[3] *= 1; //cast as number
        }

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch;

    if (elapsed > _lagThreshold) {
      _startTime += elapsed - _adjustedLag;
    }

    _lastUpdate += elapsed;
    _self.time = (_lastUpdate - _startTime) / 1000;
    overlap = _self.time - _nextTime;

    if (overlap > 0 || manual) {
      _self.frame++;
      _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    dispatch && _listeners.forEach(function (l) {
      return l(_self.time, elapsed, _self.frame, v);
    });
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    },
    fps: function fps(_fps) {
      _gap = 1 / (_fps || 240);
      _nextTime = _self.time + _gap;
    },
    add: function add(callback) {
      _listeners.indexOf(callback) < 0 && _listeners.push(callback);

      _wake();
    },
    remove: function remove(callback) {
      var i;
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1);
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _parenthesesExp.exec(name)[1].split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


exports._ticker = _ticker;
exports._colorStringFilter = _colorStringFilter;
exports.splitColor = splitColor;
exports.interpolate = interpolate;
exports.mapRange = mapRange;
exports._replaceRandom = _replaceRandom;
exports.wrapYoyo = wrapYoyo;
exports.wrap = wrap;
exports.normalize = normalize;
exports.unitize = unitize;
exports.pipe = pipe;
exports.random = random;
exports.snap = snap;
exports._roundModifier = _roundModifier;
exports.distribute = distribute;
exports.shuffle = shuffle;
exports.toArray = toArray;
exports.clamp = clamp;
exports.getUnit = getUnit;
exports._removeLinkedListItem = _removeLinkedListItem;
exports._setDefaults = _setDefaults;
exports._round = _round;
exports._forEachName = _forEachName;
exports._getProperty = _getProperty;
exports._getCache = _getCache;
exports._plugins = _plugins;
exports._missingPlugin = _missingPlugin;
exports._relExp = _relExp;
exports._numWithUnitExp = _numWithUnitExp;
exports._numExp = _numExp;
exports._isUndefined = _isUndefined;
exports._isString = _isString;
exports._config = _config;

_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */


exports.GSCache = GSCache;

var Animation = /*#__PURE__*/function () {
  function Animation(vars, time) {
    var parent = vars.parent || _globalTimeline;
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1);

    this.data = vars.data;
    _tickerActive || _ticker.wake();
    parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
    vars.reversed && this.reverse();
    vars.paused && this.paused(true);
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this.parent || this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      // if (!parent._dp && parent._time === parent._dur) { // if a root timeline completes...and then a while later one of its children resumes, we must shoot the playhead forward to where it should be raw-wise, otherwise the child will jump to the end. Down side: this assumes it's using the _ticker.time as a reference.
      // 	parent._time = _ticker.time - parent._start;
      // }
      this._start = _round(parent._time - (this._ts > 0 ? _totalTime / this._ts : ((this._dirty ? this.totalDuration() : this._tDur) - _totalTime) / -this._ts));

      _setEnd(this);

      if (!parent._dirty) {
        //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
        _uncache(parent);
      } //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.


      while (parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted) {
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause

      _lazySafeRender(this, _totalTime, suppressEvents);
    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    return _recacheAncestors(this.totalTime(_clamp(0, this._tDur, tTime), true));
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detatched parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  } // globalTime(rawTime) {
  // 	let animation = this,
  // 		time = arguments.length ? rawTime : animation.rawTime();
  // 	while (animation) {
  // 		time = animation._start + time / (animation._ts || 1);
  // 		animation = animation.parent;
  // 	}
  // 	return time;
  // }
  ;

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      this._rDelay = value;
      return _onUpdateTotalDuration(this);
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }

    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }

    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      if (!!value !== this.reversed()) {
        this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.
      }

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive(hasStarted) {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && (this._initted || !hasStarted) && parent.isActive(hasStarted) && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;

        if (params) {
          vars[type + "Params"] = params;
        }

        if (type === "onUpdate") {
          this._onUpdate = callback;
        }
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

exports.Animation = Animation;

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, time) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars, time) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (time > dur || tDur === tTime) {
          time = dur;
        }

        iteration = ~~(tTime / cycleDuration);

        if (iteration && iteration === tTime / cycleDuration) {
          time = dur;
          iteration--;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);

          if (iteration < prevIteration) {
            rewinding = !rewinding;
          }

          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;

          if (!suppressEvents && this.parent) {
            _callback(this, "onRepeat");
          }

          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime !== this._time || prevPaused !== !this._ts) {
            return this;
          }

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur + 0.0001 : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
      }

      if (!prevTime && time && !suppressEvents) {
        _callback(this, "onStart");
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        //if ((tTime === tDur && tDur >= this.totalDuration()) || (!tTime && this._ts < 0)) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        //(totalTime || !dur) && ((totalTime && this._ts > 0) || (!tTime && this._ts < 0)) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    if (!_isNumber(position)) {
      position = _parsePosition(this, position);
    }

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return _uncache(this);
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this.parent && !this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (!onlyActive || child.isActive(onlyActive === "started"))) {
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  };

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        tween = Tween.to(tl, _setDefaults(vars, {
      ease: "none",
      lazy: false,
      time: endTime,
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
        tween._dur !== duration && _setDuration(tween, duration).render(tween._time, true, true);
        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }));

    return tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate() {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate();
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._time = this._tTime = this._pTime = 0;

    if (includeLabels) {
      this.labels = {};
    }

    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        end,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        end = _setEnd(child);

        if (end > max && child._ts) {
          max = end;
        }

        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

exports.TimelineLite = exports.TimelineMax = exports.Timeline = Timeline;

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
    }
  }

  if (parsedStart !== end) {
    if (!isNaN(parsedStart + end)) {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  if (_isFunction(vars)) {
    vars = _parseFuncOrString(vars, tween, index, target, targets);
  }

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_initTween = function _initTween(tween, time) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
      autoOverwrite = tween._overwrite === "auto",
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  if (!tl) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);
    prevStartAt && prevStartAt.render(-1, true).kill();

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      if (immediateRender) {
        if (time > 0) {
          !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
        } else if (dur) {
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (prevStartAt) {
        !autoRevert && (tween._startAt = 0);
      } else {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _merge(cleanVars, {
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        });
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, "started"); //Also make sure the overwriting doesn't overwrite THIS tween!!!


        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  tween._onUpdate = onUpdate;
  tween._initted = 1;
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


exports._checkPlugin = _checkPlugin;

var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, time, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      time.duration = vars;
      vars = time;
      time = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = _this3.parent,
        parsedTargets = (_isArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {}
      });
      tl.kill();
      tl.parent = _assertThisInitialized(_this3);

      if (keyframes) {
        _setDefaults(tl.vars.defaults, {
          ease: "none"
        });

        keyframes.forEach(function (frame) {
          return tl.to(parsedTargets, frame, ">");
        });
      } else {
        l = parsedTargets.length;
        staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = {};

          for (p in vars) {
            if (_staggerPropsToSkip.indexOf(p) < 0) {
              copy[p] = vars[p];
            }
          }

          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    parent && _postAddChecks(parent, _assertThisInitialized(_this3));

    if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay)); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || this._startAt && this._zTime < 0 !== totalTime < 0) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;
        time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (time > dur || tDur === tTime) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          time = dur;
        }

        iteration = ~~(tTime / cycleDuration);

        if (iteration && iteration === tTime / cycleDuration) {
          time = dur;
          iteration--;
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, time, force, suppressEvents)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      time && !prevTime && !suppressEvents && _callback(this, "onStart");
      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        if (totalTime < 0 && this._startAt) {
          this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        }

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        if (totalTime < 0 && this._startAt && !this._onUpdate) {
          this._startAt.render(totalTime, true, force);
        }

        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate() {
    this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate();
    return _Animation2.prototype.invalidate.call(this);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = 0;

      if (this.parent) {
        return _interrupt(this);
      }
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweenng, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    if (this._initted && !this._pt && firstPT) {
      //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
      _interrupt(this);
    }

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return new Tween(targets, _parseVars(arguments, 1));
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return new Tween(targets, _parseVars(arguments, 2));
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

exports.TweenLite = exports.TweenMax = exports.Tween = Tween;

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property) {
      pt.modifier(modifier, tween, target);
    }

    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


exports._sortPropTweensByPriority = _sortPropTweensByPriority;
exports._renderComplexString = _renderComplexString;
exports._getSetter = _getSetter;

var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks


exports.PropTween = PropTween;

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */

var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    if (_isString(target)) {
      //in case selector text or an array is passed in
      target = toArray(target)[0];
    }

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    if (unit === "native") {
      unit = "";
    }

    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    if (value && value.ease) {
      value.ease = _parseEase(value.ease, _defaults.ease);
    }

    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref) {
    var name = _ref.name,
        effect = _ref.effect,
        plugins = _ref.plugins,
        defaults = _ref.defaults,
        extendTimeline = _ref.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt;

    for (p in vars) {
      pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
      pt && (pt.op = p); //this.add(target, "setAttribute", (target.getAttribute((p in target.dataset ? (p = "data-" + p) : p)) || 0) + "", vars[p], index, targets, 0, 0, p);

      this._props.push(p);
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i]);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.


exports.default = exports.gsap = gsap;
Tween.version = Timeline.version = gsap.version = "3.3.1";
_coreReady = 1;

if (_windowExists()) {
  _wake();
}

var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;
exports.Circ = Circ;
exports.Expo = Expo;
exports.Sine = Sine;
exports.Bounce = Bounce;
exports.SteppedEase = SteppedEase;
exports.Back = Back;
exports.Elastic = Elastic;
exports.Strong = Strong;
exports.Quint = Quint;
exports.Quart = Quart;
exports.Cubic = Cubic;
exports.Quad = Quad;
exports.Linear = Linear;
exports.Power4 = Power4;
exports.Power3 = Power3;
exports.Power2 = Power2;
exports.Power1 = Power1;
exports.Power0 = Power0;
},{}],"../../node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPrefix = exports._createElement = exports._getBBox = exports.default = exports.CSSPlugin = void 0;

var _gsapCore = require("./gsap-core.js");

/*!
 * CSSPlugin 3.3.1
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _checkPropPrefix(_transformOriginProp);
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if (toPercent && (_transformProps[property] || ~property.indexOf("adius"))) {
    //transforms and borderRadius are relative to the size of the element itself!
    return (0, _gsapCore._round)(curValue / (isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty]) * amount);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsapCore._ticker.time) {
    return (0, _gsapCore._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0, _gsapCore._getCache)(parent);
      cache.time = _gsapCore._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0, _gsapCore._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;

  if (!_pluginInitted) {
    _initCore();
  }

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0, _gsapCore._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    }
  }

  var pt = new _gsapCore.PropTween(this._pt, target.style, prop, 0, 1, _gsapCore._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      relative,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];
  (0, _gsapCore._colorStringFilter)(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

  start = a[0];
  end = a[1];
  startValues = start.match(_gsapCore._numWithUnitExp) || [];
  endValues = end.match(_gsapCore._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsapCore._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsapCore._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsapCore._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: relative ? relative * endNum : endNum - startNum,
          m: color && color < 4 ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  if (_gsapCore._relExp.test(end)) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsapCore.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsapCore._numExp).map(_gsapCore._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0, _gsapCore._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !_doc.body.contains(target)) {
      addedToDOM = 1; //flag

      nextSibling = target.nextSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);

    if (temp) {
      style.display = temp;
    } else {
      _removeProperty(target, "display");
    }

    if (addedToDOM) {
      if (nextSibling) {
        parent.insertBefore(target, nextSibling);
      } else if (parent) {
        parent.appendChild(target);
      } else {
        _docElement.removeChild(target);
      }
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsapCore.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    t1 = !cache.uncache && target.getAttribute("data-svg-origin");

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.cos(skewX * _DEG2RAD));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0, _gsapCore._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0, _gsapCore._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  cache.x = ((cache.xPercent = x && Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0) ? 0 : x) + px;
  cache.y = ((cache.yPercent = y && Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0) ? 0 : y) + px;
  cache.z = z + px;
  cache.scaleX = (0, _gsapCore._round)(scaleX);
  cache.scaleY = (0, _gsapCore._round)(scaleY);
  cache.rotation = (0, _gsapCore._round)(rotation) + deg;
  cache.rotationX = (0, _gsapCore._round)(rotationX) + deg;
  cache.rotationY = (0, _gsapCore._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsapCore._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0, _gsapCore.getUnit)(start);
  return (0, _gsapCore._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0, _gsapCore._round)(a11);
    a21 = (0, _gsapCore._round)(a21);
    a12 = (0, _gsapCore._round)(a12);
    a22 = (0, _gsapCore._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0, _gsapCore._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0, _gsapCore._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0, _gsapCore._round)(tx + xPercent / 100 * temp.width);
    ty = (0, _gsapCore._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);

  if (forceCSS) {
    //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
    target.style[_transformProp] = temp;
  }
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
  var cap = 360,
      isString = (0, _gsapCore._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsapCore.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var style = _tempDivStyler.style,
      startCache = target._gsap,
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;
  style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;"; //%-based translations will fail unless we set the width/height to match the original target (and padding/borders can affect it)

  style[_transformProp] = transforms;

  _doc.body.appendChild(_tempDivStyler);

  endCache = _parseTransform(_tempDivStyler, 1);

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0, _gsapCore.getUnit)(startValue);
      endUnit = (0, _gsapCore.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsapCore.PropTween(plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _doc.body.removeChild(_tempDivStyler);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


exports._getBBox = _getBBox;
exports.checkPrefix = _checkPropPrefix;
exports._createElement = _createElement;
(0, _gsapCore._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority;

    if (!_pluginInitted) {
      _initCore();
    }

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsapCore._plugins[p] && (0, _gsapCore._checkPlugin)(p, vars, tween, index, target, targets)) {
        //plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0, _gsapCore._replaceRandom)(endValue);
      }

      if (specialProp) {
        if (specialProp(this, target, p, endValue, tween)) {
          hasPriority = 1;
        }
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        this.add(style, "setProperty", getComputedStyle(target).getPropertyValue(p) + "", endValue + "", index, targets, 0, 0, p);
      } else {
        startValue = _get(target, p);
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

        if (relative) {
          endValue = endValue.substr(2);
        }

        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];

            if (~p.indexOf(",")) {
              p = p.split(",")[0];
            }
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform || _parseTransform(target); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsapCore.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsapCore.PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              if (endUnit !== cache.zOrigin) {
                _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              }

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (endValue + "").substr((endNum + "").length) || (p in _gsapCore._config.units ? _gsapCore._config.units[p] : startUnit);

          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, p, startValue, endUnit);
          }

          this._pt = new _gsapCore.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, endUnit === "px" && vars.autoRound !== false && !isTransformRelated ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit) {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, target[p], endValue, index, targets);
          } else {
            (0, _gsapCore._missingPlugin)(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, endValue);
        }

        props.push(p);
      }
    }

    if (hasPriority) {
      (0, _gsapCore._sortPropTweensByPriority)(this);
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0, _gsapCore._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0, _gsapCore._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
exports.default = exports.CSSPlugin = CSSPlugin;
_gsapCore.gsap.utils.checkPrefix = _checkPropPrefix;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0, _gsapCore._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });
  (0, _gsapCore._forEachName)(rotation, function (name) {
    _gsapCore._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  (0, _gsapCore._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0, _gsapCore._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsapCore._config.units[name] = "px";
});

_gsapCore.gsap.registerPlugin(CSSPlugin);
},{"./gsap-core.js":"../../node_modules/gsap/gsap-core.js"}],"../../node_modules/gsap/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _gsapCore.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _gsapCore.Linear;
  }
});
Object.defineProperty(exports, "Quad", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quad;
  }
});
Object.defineProperty(exports, "Cubic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Cubic;
  }
});
Object.defineProperty(exports, "Quart", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quart;
  }
});
Object.defineProperty(exports, "Quint", {
  enumerable: true,
  get: function () {
    return _gsapCore.Quint;
  }
});
Object.defineProperty(exports, "Strong", {
  enumerable: true,
  get: function () {
    return _gsapCore.Strong;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _gsapCore.Elastic;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _gsapCore.Back;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _gsapCore.SteppedEase;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _gsapCore.Bounce;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _gsapCore.Sine;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _gsapCore.Expo;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _gsapCore.Circ;
  }
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TweenLite;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineLite;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _gsapCore.TimelineMax;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.CSSPlugin;
  }
});
exports.TweenMax = exports.default = exports.gsap = void 0;

var _gsapCore = require("./gsap-core.js");

var _CSSPlugin = require("./CSSPlugin.js");

var gsapWithCSS = _gsapCore.gsap.registerPlugin(_CSSPlugin.CSSPlugin) || _gsapCore.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;

exports.TweenMax = TweenMaxWithCSS;
exports.default = exports.gsap = gsapWithCSS;
},{"./gsap-core.js":"../../node_modules/gsap/gsap-core.js","./CSSPlugin.js":"../../node_modules/gsap/CSSPlugin.js"}],"../EventEmitter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _events = _interopRequireDefault(require("../utils/events"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emitter = require("tiny-emitter");

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    var _this = this;

    (0, _classCallCheck2.default)(this, EventEmitter);
    (0, _defineProperty2.default)(this, "onMouseDown", function (e) {
      _this.emitter.emit(_events.default.MOUSE_DOWN, e);
    });
    (0, _defineProperty2.default)(this, "onMouseMove", function (e) {
      _this.emitter.emit(_events.default.MOUSE_MOVE, e);
    });
    (0, _defineProperty2.default)(this, "onMouseUp", function () {
      _this.emitter.emit(_events.default.MOUSE_UP);
    });
    (0, _defineProperty2.default)(this, "onTouchStart", function (e) {
      _this.emitter.emit(_events.default.TOUCH_START, e);
    });
    (0, _defineProperty2.default)(this, "onTouchMove", function (e) {
      _this.emitter.emit(_events.default.TOUCH_MOVE, e);
    });
    (0, _defineProperty2.default)(this, "onTouchEnd", function () {
      _this.emitter.emit(_events.default.TOUCH_END);
    });
    (0, _defineProperty2.default)(this, "onTouchCancel", function () {
      _this.emitter.emit(_events.default.TOUCH_CANCEL);
    });
    (0, _defineProperty2.default)(this, "tick", function (time, deltaTime, frame) {
      _this.emitter.emit(_events.default.UPDATE, {
        deltaTime: deltaTime
      });
    });
    (0, _defineProperty2.default)(this, "onResize", function () {
      _this.emitter.emit(_events.default.RESIZE, {
        passive: true
      }, false);
    });
    this.emitter = new Emitter();
    this.initEvents();
  }

  (0, _createClass2.default)(EventEmitter, [{
    key: "initEvents",
    value: function initEvents() {
      window.addEventListener("mousedown", this.onMouseDown, {
        passive: true
      });
      window.addEventListener("mousemove", this.onMouseMove, {
        passive: true
      });
      window.addEventListener("mouseup", this.onMouseUp, {
        passive: true
      });
      window.addEventListener("touchstart", this.onTouchStart, false);
      window.addEventListener("touchmove", this.onTouchMove, false);
      window.addEventListener("touchend", this.onTouchEnd, false);
      window.addEventListener("touchcancel", this.onTouchCancel, false);
      window.addEventListener("resize", this.onResize);
      window.addEventListener("orientationchange", this.onResize);

      _gsap.gsap.config({// force3D: false
      }); // gsap.ticker.fps(60);


      _gsap.gsap.ticker.add(this.tick); //gsap.ticker.fps(60);
      // this.tick();

    }
  }]);
  return EventEmitter;
}();

var eventEmitter = new EventEmitter();
var _default = eventEmitter;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","tiny-emitter":"../../node_modules/tiny-emitter/index.js","../utils/events":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js"}],"View.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

var _EventEmitter = _interopRequireDefault(require("../EventEmitter"));

var _events = _interopRequireDefault(require("../../utils/events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

var View = /*#__PURE__*/function (_Highway$Renderer) {
  (0, _inherits2.default)(View, _Highway$Renderer);

  var _super = _createSuper(View);

  function View() {
    (0, _classCallCheck2.default)(this, View);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(View, [{
    key: "onEnter",
    value: function onEnter() {
      this.el = this.wrap.lastElementChild;
    }
  }, {
    key: "onLeave",
    value: function onLeave() {}
  }, {
    key: "onEnterCompleted",
    value: function onEnterCompleted() {// document.readyState === 'complete'
      // ? this.initOnComplete()
      // : listener(window, 'a', 'load', () =>  {
      //     console.log('loaded');
      //     this.initOnComplete()
      // })
    }
  }, {
    key: "onLeaveCompleted",
    value: function onLeaveCompleted() {}
  }, {
    key: "initDomGL",
    value: function initDomGL(_ref) {
      var view = _ref.view,
          params = _ref.params;
      emitter.emit(_events.default.INIT_DOMGL, {
        view: view,
        params: params
      });
    }
  }]);
  return View;
}(_highway.default.Renderer);

exports.default = View;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@dogstudio/highway":"../../node_modules/@dogstudio/highway/build/highway.module.js","../EventEmitter":"../EventEmitter.js","../../utils/events":"../../utils/events.js"}],"../../static/video/crashingdawn256256.mp4":[function(require,module,exports) {
module.exports = "/crashingdawn256256.bf5d7055.mp4";
},{}],"../../static/video/fabric256256.mp4":[function(require,module,exports) {
module.exports = "/fabric256256.fe460a48.mp4";
},{}],"../../static/video/gnsw256256.mp4":[function(require,module,exports) {
module.exports = "/gnsw256256.50975337.mp4";
},{}],"../../static/video/memoryPhase512512.mp4":[function(require,module,exports) {
module.exports = "/memoryPhase512512.92f60ccf.mp4";
},{}],"../../static/video/letsgetphysical256256.mp4":[function(require,module,exports) {
module.exports = "/letsgetphysical256256.61e86d78.mp4";
},{}],"../../static/video/sken256256.mp4":[function(require,module,exports) {
module.exports = "/sken256256.ce8d552d.mp4";
},{}],"../../static/video/spiritualbeings256256.mp4":[function(require,module,exports) {
module.exports = "/spiritualbeings256256.617399d3.mp4";
},{}],"../../static/video/loreal256256.mp4":[function(require,module,exports) {
module.exports = "/loreal256256.5f06399d.mp4";
},{}],"../../static/video/needahand256256.mp4":[function(require,module,exports) {
module.exports = "/needahand256256.caab5bb0.mp4";
},{}],"../../static/video/*.mp4":[function(require,module,exports) {
module.exports = {
  "crashingdawn256256": require("./crashingdawn256256.mp4"),
  "fabric256256": require("./fabric256256.mp4"),
  "gnsw256256": require("./gnsw256256.mp4"),
  "memoryPhase512512": require("./memoryPhase512512.mp4"),
  "letsgetphysical256256": require("./letsgetphysical256256.mp4"),
  "sken256256": require("./sken256256.mp4"),
  "spiritualbeings256256": require("./spiritualbeings256256.mp4"),
  "loreal256256": require("./loreal256256.mp4"),
  "needahand256256": require("./needahand256256.mp4")
};
},{"./crashingdawn256256.mp4":"../../static/video/crashingdawn256256.mp4","./fabric256256.mp4":"../../static/video/fabric256256.mp4","./gnsw256256.mp4":"../../static/video/gnsw256256.mp4","./memoryPhase512512.mp4":"../../static/video/memoryPhase512512.mp4","./letsgetphysical256256.mp4":"../../static/video/letsgetphysical256256.mp4","./sken256256.mp4":"../../static/video/sken256256.mp4","./spiritualbeings256256.mp4":"../../static/video/spiritualbeings256256.mp4","./loreal256256.mp4":"../../static/video/loreal256256.mp4","./needahand256256.mp4":"../../static/video/needahand256256.mp4"}],"../../static/img/douglas10241024.png":[function(require,module,exports) {
module.exports = "/douglas10241024.195c11a0.png";
},{}],"../../static/img/*.png":[function(require,module,exports) {
module.exports = {
  "douglas10241024": require("./douglas10241024.png")
};
},{"./douglas10241024.png":"../../static/img/douglas10241024.png"}],"../../static/ProjectContent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectContent = void 0;

var _ = _interopRequireDefault(require("./video/*.mp4"));

var _2 = _interopRequireDefault(require("./img/*.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectContent = [{
  title: 'Signature Faces',
  type: 'Client project',
  description: 'Virtual makeup line for LOreal Paris in collboration with Virtue Worldwide',
  tech: 'Lens Studio / Spark AR',
  year: 2020,
  role: 'Creative Technologist / Filter Dev / Shader Dev',
  link: 'https://www.loreal-paris.co.uk/signature-faces',
  media: {
    videoSrc: _.default.loreal256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 0.0
  }
}, {
  title: 'Fabric',
  type: 'Experiment',
  description: 'Interactive cloth simulation',
  tech: 'WebGL(OGL) / GPGPU',
  year: 2020,
  role: null,
  link: 'https://douglilliequist.github.io/Fabric/',
  media: {
    videoSrc: _.default.fabric256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 1.0
  }
}, {
  title: 'Memory Phase',
  type: 'Experiment',
  description: 'Optical flow velocity applied to particles',
  tech: 'WebGL(OGL) / Optical Flow / GPGPU',
  year: 2020,
  role: null,
  link: 'https://douglilliequist.github.io/MemoryPhase/',
  media: {
    videoSrc: _.default.memoryPhase512512,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 0.0
  }
}, {
  title: 'Crashing Dawn',
  type: 'Experiment',
  description: 'Shaded particles',
  tech: 'WebGL(THREE.js) / GPGPU',
  year: 2020,
  role: null,
  link: 'https://douglilliequist.github.io/CrashingDawn/',
  media: {
    videoSrc: _.default.crashingdawn256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 1.0
  }
}, {
  title: 'Spiritual Beings',
  type: 'Experiment',
  description: 'Beings flocking in a peaceful purgatory',
  tech: 'WebGL(THREE.js) / GLSL / GPGPU',
  year: 2019,
  role: null,
  link: 'https://douglilliequist.github.io/SpiritualBeings/',
  media: {
    videoSrc: _.default.spiritualbeings256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 1.0
  }
}, {
  title: 'Let\'s Get Physical',
  type: 'Client Project',
  description: 'Installation project for Frame awards Amsterdam',
  tech: 'Unity3D / Custom GPGPU ribbons / In-house Blob Detection by Yipp Interactive',
  year: 2019,
  role: 'Developer',
  link: 'https://yipp.nl/projects/61-lets_get_physical/',
  media: {
    videoSrc: _.default.letsgetphysical256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 0.0
  }
}, {
  title: 'SKEN',
  type: 'Experiment',
  description: 'Flocking Ribbons',
  tech: 'WebGL(THREE.js) / GLSL / GPGPU',
  year: 2018,
  role: null,
  link: 'https://douglilliequist.github.io/SKEN/',
  media: {
    videoSrc: _.default.sken256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 0.0
  }
}, {
  title: 'Need a hand?',
  type: 'Experiment',
  description: 'Interactive, displacing mesh',
  tech: 'WebGL(THREE.js) / GLSL / Computed triangles from mesh data',
  year: 2018,
  role: null,
  link: 'https://douglilliequist.github.io/needAHand/',
  media: {
    videoSrc: _.default.needahand256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 1.0
  }
}, {
  title: 'Good Night Sweet Heart',
  type: 'Hyper Island Project',
  description: 'Art Puzzle Installation',
  tech: 'Arduino / Processing / Resolume',
  year: 2015,
  role: 'Developer, Designer',
  link: '',
  media: {
    videoSrc: _.default.gnsw256256,
    imageSrc: _2.default.selfportrait512512,
    brightVal: 0.0
  }
}];
exports.ProjectContent = ProjectContent;
},{"./video/*.mp4":"../../static/video/*.mp4","./img/*.png":"../../static/img/*.png"}],"../../utils/globals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var globals = {
  CURRENT_VIEW: "work",
  HOVERING_LINK: false,
  CONTENT_LOADED: false,
  HOVERING_NAVLINK: false,
  VIEWING_PROJECT: false,
  CURRENT_PROJECT_INDEX: 0,
  PREV_PROJECT_INDEX: 0
};
var _default = globals;
exports.default = _default;
},{}],"../StickyComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter.js"));

var _events = _interopRequireDefault(require("../utils/events.js"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var emitter = _EventEmitter.default.emitter;

/**
 * 
 * Accepts a dom element which will have easing / elasticity applied to it when hovering
 * and emits an event that tells when it's currently hovered and supplies it's current position
 * which can be used for custom cursor animations
 * 
 */
var StickyComponent = /*#__PURE__*/function () {
  function StickyComponent(_ref) {
    var _this = this;

    var domElement = _ref.domElement,
        _ref$enable = _ref.enable,
        enable = _ref$enable === void 0 ? false : _ref$enable,
        _ref$event = _ref.event,
        _event = _ref$event === void 0 ? null : _ref$event,
        _ref$includeHoverAnim = _ref.includeHoverAnim,
        includeHoverAnim = _ref$includeHoverAnim === void 0 ? false : _ref$includeHoverAnim,
        _ref$defaultColor = _ref.defaultColor,
        defaultColor = _ref$defaultColor === void 0 ? "#000000" : _ref$defaultColor;

    (0, _classCallCheck2.default)(this, StickyComponent);
    (0, _defineProperty2.default)(this, "onMouseMove", function (event) {
      _this.inputPos.x = event.clientX;
      _this.inputPos.y = event.clientY;
    });
    (0, _defineProperty2.default)(this, "update", function () {
      if (_this.onMobile) return;

      _this.updateForce();

      if (_this.enable === false) return;
      if (_this.hovered) emitter.emit(_events.default.UPDATE_STICKY_TARGET, {
        target: _this.offsetPos,
        rect: _this.rect
      });
    });
    (0, _defineProperty2.default)(this, "applyHoverState", function () {
      if (_this.enable === false) return;
      globals.HOVERING_LINK = _this.hovered = true; // document.body.classList.add('pointer');

      emitter.emit(_events.default.HOVERING_STICKY_COMPONENT, {
        rect: _this.rect
      });

      _this.el.classList.add('sticky-hovered');
    });
    (0, _defineProperty2.default)(this, "removeHoverState", function () {
      if (_this.enable === false) return; // document.body.classList.remove('pointer');

      globals.HOVERING_LINK = _this.hovered = false;
      emitter.emit(_events.default.LEAVING_STICKY_COMPONENT);

      _this.el.classList.remove('sticky-hovered');
    });
    (0, _defineProperty2.default)(this, "onClick", function () {
      // emitter.emit(events.LINK_SELECTED);
      // if (this.hovered) this.removeHoverState();
      if (_this.event !== null) _this.event();
    });
    (0, _defineProperty2.default)(this, "activate", function () {
      _this.enable = true;

      _this.el.classList.remove('deactivated');

      _this.el.getBoundingClientRect();

      _this.initForceParams();

      _this.getInitPos();

      _this.initEvents();
    });
    (0, _defineProperty2.default)(this, "deActivate", function () {
      if (_this.hovered) _this.removeHoverState();
      _this.enable = false;
      _this.hovered = false;

      _this.el.classList.add('deactivated');

      _this.removeEvents();
    });
    (0, _defineProperty2.default)(this, "onResize", function () {
      _this.w = window.innerWidth;
      _this.h = window.innerHeight; // this.rect = this.el.getBoundingClientRect();

      _this.getInitPos();
    });
    this.el = domElement;
    this.event = _event;
    this.hovered = false;
    this.inBounds = false;
    this.onMobile = window.isMobile;
    this.includeHoverAnim = includeHoverAnim;
    this.defaultColor = defaultColor; // if (enable) {
    //     this.activate();
    // }
  }

  (0, _createClass2.default)(StickyComponent, [{
    key: "initForceParams",
    value: function initForceParams() {
      this.initPos = {
        x: 0,
        y: 0
      };
      this.currentPos = {
        x: 0,
        y: 0
      };
      this.targetPos = {
        x: 0,
        y: 0
      };
      this.offsetPos = {
        x: 0,
        y: 0
      };
      this.inputPos = {
        x: 0,
        y: 0
      };
      this.ease = 0.125;
    }
  }, {
    key: "getInitPos",
    value: function getInitPos() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.wK = 1.0 / this.w;
      this.hK = 1.0 / this.h;
      console.log(this.w);
      console.log(this.h);
      this.rect = this.el.getBoundingClientRect();
      var _this$rect = this.rect,
          top = _this$rect.top,
          left = _this$rect.left,
          width = _this$rect.width,
          height = _this$rect.height;
      this.initPos = {
        x: left + width * 0.5,
        y: top + height * 0.5
      };
      this.currentPos = _objectSpread({}, this.initPos);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      emitter.on(_events.default.MOUSE_MOVE, this.onMouseMove);
      emitter.on(_events.default.UPDATE, this.update);
      emitter.on(_events.default.RESIZE, this.onResize);
      this.el.addEventListener('mousedown', this.onClick);
      this.el.addEventListener('mouseenter', this.applyHoverState);
      this.el.addEventListener('mouseleave', this.removeHoverState);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      emitter.off(_events.default.MOUSE_MOVE, this.onMouseMove);
      emitter.off(_events.default.UPDATE, this.update);
      emitter.off(_events.default.RESIZE, this.onResize);
      this.el.removeEventListener('mousedown', this.onClick);
      this.el.removeEventListener('mouseenter', this.applyHoverState);
      this.el.removeEventListener('mouseleave', this.removeHoverState);
    }
  }, {
    key: "updateForce",
    //standard ease
    value: function updateForce() {
      var targetPos = this.targetPos,
          hovered = this.hovered,
          inputPos = this.inputPos,
          initPos = this.initPos;
      targetPos.x = hovered ? inputPos.x : initPos.x;
      targetPos.y = hovered ? inputPos.y : initPos.y;
      this.currentPos.x += (targetPos.x - this.currentPos.x) * 0.125;
      this.currentPos.y += (targetPos.y - this.currentPos.y) * 0.125; //counter-intuitive, but working approach:
      //Given that the origin is at the top-left corner (0, 0),
      //when using say, a mouse's position: the pixel position can be assigned to translate3d as a direct position of a given dom element.
      //With this knowledge in mind, by subtracting with the dom elements initial position
      //we move the element to the origin, thus any additional offsets we apply will be a vector in which we use
      //for the translation

      var translateX = (this.currentPos.x - initPos.x) * 0.25;
      var translateY = (this.currentPos.y - initPos.y) * 0.25;
      this.el.style.transform = "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0px)"); //final offseted position for component, used as target for i.e cursors

      this.offsetPos.x = initPos.x + translateX;
      this.offsetPos.y = initPos.y + translateY;
    }
  }]);
  return StickyComponent;
}();

exports.default = StickyComponent;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","./EventEmitter.js":"../EventEmitter.js","../utils/events.js":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js"}],"../../vendors/gsap/utils/strings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getText = getText;
exports.splitInnerHTML = splitInnerHTML;
exports.emojiSafeSplit = emojiSafeSplit;
exports.emojiExp = void 0;

/*!
 * strings: 3.5.1
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _trimExp = /(^\s+|\s+$)/g;
var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
exports.emojiExp = emojiExp;

function getText(e) {
  var type = e.nodeType,
      result = "";

  if (type === 1 || type === 9 || type === 11) {
    if (typeof e.textContent === "string") {
      return e.textContent;
    } else {
      for (e = e.firstChild; e; e = e.nextSibling) {
        result += getText(e);
      }
    }
  } else if (type === 3 || type === 4) {
    return e.nodeValue;
  }

  return result;
}

function splitInnerHTML(element, delimiter, trim) {
  var node = element.firstChild,
      result = [];

  while (node) {
    if (node.nodeType === 3) {
      result.push.apply(result, emojiSafeSplit((node.nodeValue + "").replace(/^\n+/g, "").replace(/\s+/g, " "), delimiter, trim));
    } else if ((node.nodeName + "").toLowerCase() === "br") {
      result[result.length - 1] += "<br>";
    } else {
      result.push(node.outerHTML);
    }

    node = node.nextSibling;
  }

  return result;
}
/*
//smaller kb version that only handles the simpler emoji's, which is often perfectly adequate.

let _emoji = "[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
	_emojiExp = new RegExp(_emoji),
	_emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
	_emojiSafeSplit = (text, delimiter, trim) => {
		if (trim) {
			text = text.replace(_trimExp, "");
		}
		return ((delimiter === "" || !delimiter) && _emojiExp.test(text)) ? text.match(_emojiAndCharsExp) : text.split(delimiter || "");
	};
 */


function emojiSafeSplit(text, delimiter, trim) {
  text += ""; // make sure it's cast as a string. Someone may pass in a number.

  if (trim) {
    text = text.replace(_trimExp, "");
  }

  if (delimiter && delimiter !== "") {
    return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").split(delimiter);
  }

  var result = [],
      l = text.length,
      i = 0,
      j,
      character;

  for (; i < l; i++) {
    character = text.charAt(i);

    if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
      //special emoji characters use 2 or 4 unicode characters that we must keep together.
      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
      character = text.substr(i, j);
      result.emoji = 1;
      i += j - 1;
    }

    result.push(character === ">" ? "&gt;" : character === "<" ? "&lt;" : character);
  }

  return result;
}
},{}],"../../vendors/gsap/SplitText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SplitText = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _strings = require("./utils/strings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * SplitText: 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _doc,
    _win,
    _coreInitted,
    _stripExp = /(?:\r|\n|\t\t)/g,
    //find carriage returns, new line feeds and double-tabs.
_multipleSpacesExp = /(?:\s\s+)/g,
    _initCore = function _initCore() {
  _doc = document;
  _win = window;
  _coreInitted = 1;
},
    _bonusValidated = 1,
    //<name>SplitText</name>
_getComputedStyle = function _getComputedStyle(element) {
  return _win.getComputedStyle(element);
},
    _isArray = Array.isArray,
    _slice = [].slice,
    _toArray = function _toArray(value, leaveStrings) {
  //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  var type;
  return _isArray(value) ? value : (type = (0, _typeof2.default)(value)) === "string" && !leaveStrings && value ? _slice.call(_doc.querySelectorAll(value), 0) : value && type === "object" && "length" in value ? _slice.call(value, 0) : value ? [value] : [];
},
    _isAbsolute = function _isAbsolute(vars) {
  return vars.position === "absolute" || vars.absolute === true;
},
    //some characters are combining marks (think diacritics/accents in European languages) which involve 2 or 4 characters that combine in the browser to form a single character. Pass in the remaining text and an array of the special characters to search for and if the text starts with one of those special characters, it'll spit back the number of characters to retain (often 2 or 4). Used in the specialChars features that was introduced in 0.6.0.
_findSpecialChars = function _findSpecialChars(text, chars) {
  var i = chars.length,
      s;

  while (--i > -1) {
    s = chars[i];

    if (text.substr(0, s.length) === s) {
      return s.length;
    }
  }
},
    _divStart = " style='position:relative;display:inline-block;'",
    _cssClassFunc = function _cssClassFunc(cssClass, tag) {
  if (cssClass === void 0) {
    cssClass = "";
  }

  var iterate = ~cssClass.indexOf("++"),
      num = 1;

  if (iterate) {
    cssClass = cssClass.split("++").join("");
  }

  return function () {
    return "<" + tag + _divStart + (cssClass ? " class='" + cssClass + (iterate ? num++ : "") + "'>" : ">");
  };
},
    _swapText = function _swapText(element, oldText, newText) {
  var type = element.nodeType;

  if (type === 1 || type === 9 || type === 11) {
    for (element = element.firstChild; element; element = element.nextSibling) {
      _swapText(element, oldText, newText);
    }
  } else if (type === 3 || type === 4) {
    element.nodeValue = element.nodeValue.split(oldText).join(newText);
  }
},
    _pushReversed = function _pushReversed(a, merge) {
  var i = merge.length;

  while (--i > -1) {
    a.push(merge[i]);
  }
},
    _isBeforeWordDelimiter = function _isBeforeWordDelimiter(e, root, wordDelimiter) {
  var next;

  while (e && e !== root) {
    next = e._next || e.nextSibling;

    if (next) {
      return next.textContent.charAt(0) === wordDelimiter;
    }

    e = e.parentNode || e._parent;
  }
},
    _deWordify = function _deWordify(e) {
  var children = _toArray(e.childNodes),
      l = children.length,
      i,
      child;

  for (i = 0; i < l; i++) {
    child = children[i];

    if (child._isSplit) {
      _deWordify(child);
    } else {
      if (i && child.previousSibling.nodeType === 3) {
        child.previousSibling.nodeValue += child.nodeType === 3 ? child.nodeValue : child.firstChild.nodeValue;
      } else if (child.nodeType !== 3) {
        e.insertBefore(child.firstChild, child);
      }

      e.removeChild(child);
    }
  }
},
    _getStyleAsNumber = function _getStyleAsNumber(name, computedStyle) {
  return parseFloat(computedStyle[name]) || 0;
},
    _setPositionsAfterSplit = function _setPositionsAfterSplit(element, vars, allChars, allWords, allLines, origWidth, origHeight) {
  var cs = _getComputedStyle(element),
      paddingLeft = _getStyleAsNumber("paddingLeft", cs),
      lineOffsetY = -999,
      borderTopAndBottom = _getStyleAsNumber("borderBottomWidth", cs) + _getStyleAsNumber("borderTopWidth", cs),
      borderLeftAndRight = _getStyleAsNumber("borderLeftWidth", cs) + _getStyleAsNumber("borderRightWidth", cs),
      padTopAndBottom = _getStyleAsNumber("paddingTop", cs) + _getStyleAsNumber("paddingBottom", cs),
      padLeftAndRight = _getStyleAsNumber("paddingLeft", cs) + _getStyleAsNumber("paddingRight", cs),
      lineThreshold = _getStyleAsNumber("fontSize", cs) * (vars.lineThreshold || 0.2),
      textAlign = cs.textAlign,
      charArray = [],
      wordArray = [],
      lineArray = [],
      wordDelimiter = vars.wordDelimiter || " ",
      tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
      types = vars.type || vars.split || "chars,words,lines",
      lines = allLines && ~types.indexOf("lines") ? [] : null,
      words = ~types.indexOf("words"),
      chars = ~types.indexOf("chars"),
      absolute = _isAbsolute(vars),
      linesClass = vars.linesClass,
      iterateLine = ~(linesClass || "").indexOf("++"),
      spaceNodesToRemove = [],
      i,
      j,
      l,
      node,
      nodes,
      isChild,
      curLine,
      addWordSpaces,
      style,
      lineNode,
      lineWidth,
      offset;

  if (iterateLine) {
    linesClass = linesClass.split("++").join("");
  } //copy all the descendant nodes into an array (we can't use a regular nodeList because it's live and we may need to renest things)


  j = element.getElementsByTagName("*");
  l = j.length;
  nodes = [];

  for (i = 0; i < l; i++) {
    nodes[i] = j[i];
  } //for absolute positioning, we need to record the x/y offsets and width/height for every <div>. And even if we're not positioning things absolutely, in order to accommodate lines, we must figure out where the y offset changes so that we can sense where the lines break, and we populate the lines array.


  if (lines || absolute) {
    for (i = 0; i < l; i++) {
      node = nodes[i];
      isChild = node.parentNode === element;

      if (isChild || absolute || chars && !words) {
        offset = node.offsetTop;

        if (lines && isChild && Math.abs(offset - lineOffsetY) > lineThreshold && (node.nodeName !== "BR" || i === 0)) {
          //we found some rare occasions where a certain character like &#8209; could cause the offsetTop to be off by 1 pixel, so we build in a threshold.
          curLine = [];
          lines.push(curLine);
          lineOffsetY = offset;
        }

        if (absolute) {
          //record offset x and y, as well as width and height so that we can access them later for positioning. Grabbing them at once ensures we don't trigger a browser paint & we maximize performance.
          node._x = node.offsetLeft;
          node._y = offset;
          node._w = node.offsetWidth;
          node._h = node.offsetHeight;
        }

        if (lines) {
          if (node._isSplit && isChild || !chars && isChild || words && isChild || !words && node.parentNode.parentNode === element && !node.parentNode._isSplit) {
            curLine.push(node);
            node._x -= paddingLeft;

            if (_isBeforeWordDelimiter(node, element, wordDelimiter)) {
              node._wordEnd = true;
            }
          }

          if (node.nodeName === "BR" && (node.nextSibling && node.nextSibling.nodeName === "BR" || i === 0)) {
            //two consecutive <br> tags signify a new [empty] line. Also, if the entire block of content STARTS with a <br>, add a line.
            lines.push([]);
          }
        }
      }
    }
  }

  for (i = 0; i < l; i++) {
    node = nodes[i];
    isChild = node.parentNode === element;

    if (node.nodeName === "BR") {
      if (lines || absolute) {
        node.parentNode && node.parentNode.removeChild(node);
        nodes.splice(i--, 1);
        l--;
      } else if (!words) {
        element.appendChild(node);
      }

      continue;
    }

    if (absolute) {
      style = node.style;

      if (!words && !isChild) {
        node._x += node.parentNode._x;
        node._y += node.parentNode._y;
      }

      style.left = node._x + "px";
      style.top = node._y + "px";
      style.position = "absolute";
      style.display = "block"; //if we don't set the width/height, things collapse in older versions of IE and the origin for transforms is thrown off in all browsers.

      style.width = node._w + 1 + "px"; //IE is 1px short sometimes. Avoid wrapping

      style.height = node._h + "px";
    }

    if (!words && chars) {
      //we always start out wrapping words in their own <div> so that line breaks happen correctly, but here we'll remove those <div> tags if necessary and renest the characters directly into the element rather than inside the word <div>
      if (node._isSplit) {
        node._next = node.nextSibling;
        node.parentNode.appendChild(node); //put it at the end to keep the order correct.
      } else if (node.parentNode._isSplit) {
        node._parent = node.parentNode;

        if (!node.previousSibling && node.firstChild) {
          node.firstChild._isFirst = true;
        }

        if (node.nextSibling && node.nextSibling.textContent === " " && !node.nextSibling.nextSibling) {
          //if the last node inside a nested element is just a space (like T<span>nested </span>), remove it otherwise it'll get placed in the wrong order. Don't remove it right away, though, because we need to sense when words/characters are before a space like _isBeforeWordDelimiter(). Removing it now would make that a false negative.
          spaceNodesToRemove.push(node.nextSibling);
        }

        node._next = node.nextSibling && node.nextSibling._isFirst ? null : node.nextSibling;
        node.parentNode.removeChild(node);
        nodes.splice(i--, 1);
        l--;
      } else if (!isChild) {
        offset = !node.nextSibling && _isBeforeWordDelimiter(node.parentNode, element, wordDelimiter); //if this is the last letter in the word (and we're not breaking by lines and not positioning things absolutely), we need to add a space afterwards so that the characters don't just mash together

        if (node.parentNode._parent) {
          node.parentNode._parent.appendChild(node);
        }

        offset && node.parentNode.appendChild(_doc.createTextNode(" "));

        if (tag === "span") {
          node.style.display = "inline"; //so that word breaks are honored properly.
        }

        charArray.push(node);
      }
    } else if (node.parentNode._isSplit && !node._isSplit && node.innerHTML !== "") {
      wordArray.push(node);
    } else if (chars && !node._isSplit) {
      if (tag === "span") {
        node.style.display = "inline";
      }

      charArray.push(node);
    }
  }

  i = spaceNodesToRemove.length;

  while (--i > -1) {
    spaceNodesToRemove[i].parentNode.removeChild(spaceNodesToRemove[i]);
  }

  if (lines) {
    //the next 7 lines just give us the line width in the most reliable way and figure out the left offset (if position isn't relative or absolute). We must set the width along with text-align to ensure everything works properly for various alignments.
    if (absolute) {
      lineNode = _doc.createElement(tag);
      element.appendChild(lineNode);
      lineWidth = lineNode.offsetWidth + "px";
      offset = lineNode.offsetParent === element ? 0 : element.offsetLeft;
      element.removeChild(lineNode);
    }

    style = element.style.cssText;
    element.style.cssText = "display:none;"; //to improve performance, set display:none on the element so that the browser doesn't have to worry about reflowing or rendering while we're renesting things. We'll revert the cssText later.
    //we can't use element.innerHTML = "" because that causes IE to literally delete all the nodes and their content even though we've stored them in an array! So we must loop through the children and remove them.

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    addWordSpaces = wordDelimiter === " " && (!absolute || !words && !chars);

    for (i = 0; i < lines.length; i++) {
      curLine = lines[i];
      lineNode = _doc.createElement(tag);
      lineNode.style.cssText = "display:block;text-align:" + textAlign + ";position:" + (absolute ? "absolute;" : "relative;");

      if (linesClass) {
        lineNode.className = linesClass + (iterateLine ? i + 1 : "");
      }

      lineArray.push(lineNode);
      l = curLine.length;

      for (j = 0; j < l; j++) {
        if (curLine[j].nodeName !== "BR") {
          node = curLine[j];
          lineNode.appendChild(node);
          addWordSpaces && node._wordEnd && lineNode.appendChild(_doc.createTextNode(" "));

          if (absolute) {
            if (j === 0) {
              lineNode.style.top = node._y + "px";
              lineNode.style.left = paddingLeft + offset + "px";
            }

            node.style.top = "0px";

            if (offset) {
              node.style.left = node._x - offset + "px";
            }
          }
        }
      }

      if (l === 0) {
        //if there are no nodes in the line (typically meaning there were two consecutive <br> tags, just add a non-breaking space so that things display properly.
        lineNode.innerHTML = "&nbsp;";
      } else if (!words && !chars) {
        _deWordify(lineNode);

        _swapText(lineNode, String.fromCharCode(160), " ");
      }

      if (absolute) {
        lineNode.style.width = lineWidth;
        lineNode.style.height = node._h + "px";
      }

      element.appendChild(lineNode);
    }

    element.style.cssText = style;
  } //if everything shifts to being position:absolute, the container can collapse in terms of height or width, so fix that here.


  if (absolute) {
    if (origHeight > element.clientHeight) {
      element.style.height = origHeight - padTopAndBottom + "px";

      if (element.clientHeight < origHeight) {
        //IE8 and earlier use a different box model - we must include padding and borders
        element.style.height = origHeight + borderTopAndBottom + "px";
      }
    }

    if (origWidth > element.clientWidth) {
      element.style.width = origWidth - padLeftAndRight + "px";

      if (element.clientWidth < origWidth) {
        //IE8 and earlier use a different box model - we must include padding and borders
        element.style.width = origWidth + borderLeftAndRight + "px";
      }
    }
  }

  _pushReversed(allChars, charArray);

  if (words) {
    _pushReversed(allWords, wordArray);
  }

  _pushReversed(allLines, lineArray);
},
    _splitRawText = function _splitRawText(element, vars, wordStart, charStart) {
  var tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
      types = vars.type || vars.split || "chars,words,lines",
      //words = (types.indexOf("words") !== -1),
  chars = ~types.indexOf("chars"),
      absolute = _isAbsolute(vars),
      wordDelimiter = vars.wordDelimiter || " ",
      space = wordDelimiter !== " " ? "" : absolute ? "&#173; " : " ",
      wordEnd = "</" + tag + ">",
      wordIsOpen = 1,
      specialChars = vars.specialChars ? typeof vars.specialChars === "function" ? vars.specialChars : _findSpecialChars : null,
      //specialChars can be an array or a function. For performance reasons, we always set this local "specialChars" to a function to which we pass the remaining text and whatever the original vars.specialChars was so that if it's an array, it works with the _findSpecialChars() function.
  text,
      splitText,
      i,
      j,
      l,
      character,
      hasTagStart,
      testResult,
      container = _doc.createElement("div"),
      parent = element.parentNode;

  parent.insertBefore(container, element);
  container.textContent = element.nodeValue;
  parent.removeChild(element);
  element = container;
  text = (0, _strings.getText)(element);
  hasTagStart = text.indexOf("<") !== -1;

  if (vars.reduceWhiteSpace !== false) {
    text = text.replace(_multipleSpacesExp, " ").replace(_stripExp, "");
  }

  if (hasTagStart) {
    text = text.split("<").join("{{LT}}"); //we can't leave "<" in the string, or when we set the innerHTML, it can be interpreted as a node
  }

  l = text.length;
  splitText = (text.charAt(0) === " " ? space : "") + wordStart();

  for (i = 0; i < l; i++) {
    character = text.charAt(i);

    if (specialChars && (testResult = specialChars(text.substr(i), vars.specialChars))) {
      // look for any specialChars that were declared. Remember, they can be passed in like {specialChars:["मी", "पा", "है"]} or a function could be defined instead. Either way, the function should return the number of characters that should be grouped together for this "character".
      character = text.substr(i, testResult || 1);
      splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
      i += testResult - 1;
    } else if (character === wordDelimiter && text.charAt(i - 1) !== wordDelimiter && i) {
      splitText += wordIsOpen ? wordEnd : "";
      wordIsOpen = 0;

      while (text.charAt(i + 1) === wordDelimiter) {
        //skip over empty spaces (to avoid making them words)
        splitText += space;
        i++;
      }

      if (i === l - 1) {
        splitText += space;
      } else if (text.charAt(i + 1) !== ")") {
        splitText += space + wordStart();
        wordIsOpen = 1;
      }
    } else if (character === "{" && text.substr(i, 6) === "{{LT}}") {
      splitText += chars ? charStart() + "{{LT}}" + "</" + tag + ">" : "{{LT}}";
      i += 5;
    } else if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
      //special emoji characters use 2 or 4 unicode characters that we must keep together.
      j = ((text.substr(i, 12).split(_strings.emojiExp) || [])[1] || "").length || 2;
      splitText += chars && character !== " " ? charStart() + text.substr(i, j) + "</" + tag + ">" : text.substr(i, j);
      i += j - 1;
    } else {
      splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
    }
  }

  element.outerHTML = splitText + (wordIsOpen ? wordEnd : "");

  if (hasTagStart) {
    _swapText(parent, "{{LT}}", "<"); //note: don't perform this on "element" because that gets replaced with all new elements when we set element.outerHTML.

  }
},
    _split = function _split(element, vars, wordStart, charStart) {
  var children = _toArray(element.childNodes),
      l = children.length,
      absolute = _isAbsolute(vars),
      i,
      child;

  if (element.nodeType !== 3 || l > 1) {
    vars.absolute = false;

    for (i = 0; i < l; i++) {
      child = children[i];

      if (child.nodeType !== 3 || /\S+/.test(child.nodeValue)) {
        if (absolute && child.nodeType !== 3 && _getComputedStyle(child).display === "inline") {
          //if there's a child node that's display:inline, switch it to inline-block so that absolute positioning works properly (most browsers don't report offsetTop/offsetLeft properly inside a <span> for example)
          child.style.display = "inline-block";
          child.style.position = "relative";
        }

        child._isSplit = true;

        _split(child, vars, wordStart, charStart); //don't split lines on child elements

      }
    }

    vars.absolute = absolute;
    element._isSplit = true;
    return;
  }

  _splitRawText(element, vars, wordStart, charStart);
};

var SplitText = /*#__PURE__*/function () {
  function SplitText(element, vars) {
    _coreInitted || _initCore();
    this.elements = _toArray(element);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this._originals = [];
    this.vars = vars || {};
    _bonusValidated && this.split(vars);
  }

  var _proto = SplitText.prototype;

  _proto.split = function split(vars) {
    this.isSplit && this.revert();
    this.vars = vars = vars || this.vars;
    this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;

    var i = this.elements.length,
        tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
        wordStart = _cssClassFunc(vars.wordsClass, tag),
        charStart = _cssClassFunc(vars.charsClass, tag),
        origHeight,
        origWidth,
        e; //we split in reversed order so that if/when we position:absolute elements, they don't affect the position of the ones after them in the document flow (shifting them up as they're taken out of the document flow).


    while (--i > -1) {
      e = this.elements[i];
      this._originals[i] = e.innerHTML;
      origHeight = e.clientHeight;
      origWidth = e.clientWidth;

      _split(e, vars, wordStart, charStart);

      _setPositionsAfterSplit(e, vars, this.chars, this.words, this.lines, origWidth, origHeight);
    }

    this.chars.reverse();
    this.words.reverse();
    this.lines.reverse();
    this.isSplit = true;
    return this;
  };

  _proto.revert = function revert() {
    var originals = this._originals;

    if (!originals) {
      throw "revert() call wasn't scoped properly.";
    }

    this.elements.forEach(function (e, i) {
      return e.innerHTML = originals[i];
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
    return this;
  };

  SplitText.create = function create(element, vars) {
    return new SplitText(element, vars);
  };

  return SplitText;
}();

exports.default = exports.SplitText = SplitText;
SplitText.version = "3.5.1";
},{"@babel/runtime/helpers/typeof":"../../node_modules/@babel/runtime/helpers/typeof.js","./utils/strings.js":"../../vendors/gsap/utils/strings.js"}],"Work/Project.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _events = _interopRequireDefault(require("../../../utils/events.js"));

var _globals = _interopRequireDefault(require("../../../utils/globals.js"));

var _EventEmitter = _interopRequireDefault(require("../../EventEmitter.js"));

var _StickyComponent = _interopRequireDefault(require("../../StickyComponent.js"));

var _gsap = require("gsap");

var _SplitText = require("../../../vendors/gsap/SplitText.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

_gsap.gsap.registerPlugin(_SplitText.SplitText);
/**
 * 
 * TODO:
 * 
 * Import split text
 * import exit button SVG
 * 
 * build animation functions
 * 
 */


var Project = /*#__PURE__*/function () {
  function Project(projectID, _ref) {
    var _this = this;

    var _ref$viewing = _ref.viewing,
        viewing = _ref$viewing === void 0 ? false : _ref$viewing,
        _ref$title = _ref.title,
        title = _ref$title === void 0 ? '' : _ref$title,
        _ref$year = _ref.year,
        year = _ref$year === void 0 ? '' : _ref$year,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? '' : _ref$type,
        _ref$role = _ref.role,
        role = _ref$role === void 0 ? '' : _ref$role,
        _ref$description = _ref.description,
        description = _ref$description === void 0 ? '' : _ref$description,
        _ref$tech = _ref.tech,
        tech = _ref$tech === void 0 ? '' : _ref$tech,
        _ref$link = _ref.link,
        link = _ref$link === void 0 ? '' : _ref$link;
    (0, _classCallCheck2.default)(this, Project);
    (0, _defineProperty2.default)(this, "onClick", function () {
      emitter.emit(_events.default.SHOW_PROJECT);
    });
    (0, _defineProperty2.default)(this, "onExitClicked", function () {
      emitter.emit(_events.default.CLOSE_PROJECT);
    });
    (0, _defineProperty2.default)(this, "onHover", function () {
      _globals.default.HOVERING_LINK = true;
      emitter.emit(_events.default.HOVERING_NAV_LINK, true);
    });
    (0, _defineProperty2.default)(this, "onLeave", function () {
      _globals.default.HOVERING_LINK = false;
      emitter.emit(_events.default.HOVERING_NAV_LINK, false);
    });
    (0, _defineProperty2.default)(this, "onViewButtonHover", function (_ref2) {
      var state = _ref2.state;

      if (state) {
        _this.onHover();
      } else {
        _this.onLeave();
      }

      _gsap.gsap.to(_this.viewButton, {
        duration: 0.3,
        opacity: state ? _this.viewButton.activeAlpha : _this.viewButton.idleAlpha
      });
    });
    (0, _defineProperty2.default)(this, "onExitButtonHover", function (_ref3) {
      var state = _ref3.state;

      if (state) {
        _this.onHover();
      } else {
        _this.onLeave();
      }

      _gsap.gsap.to(_this.exitButton.el, {
        duration: 0.3,
        opacity: state ? _this.exitButton.activeAlpha : _this.exitButton.idleAlpha
      });
    });
    (0, _defineProperty2.default)(this, "showTitle", function () {
      _gsap.gsap.to(_this.projectTitle, {
        ease: "power2.inOut",
        duration: 0.75,
        yPercent: 0
      });

      _gsap.gsap.to(_this.projectNumber, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 0
      });

      _gsap.gsap.to(_this.viewButton, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: 0
      });
    });
    (0, _defineProperty2.default)(this, "hideTitle", function () {
      _gsap.gsap.to(_this.projectTitle, {
        ease: "power2.inOut",
        duration: 0.5,
        yPercent: 100,
        onComplete: function onComplete() {
          _gsap.gsap.set(_this.projectTitle, {
            yPercent: 100
          });
        }
      });

      _gsap.gsap.to(_this.projectNumber, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: -100,
        onComplete: function onComplete() {
          _gsap.gsap.set(_this.projectNumber, {
            yPercent: -100
          });
        }
      });

      _gsap.gsap.to(_this.viewButton, {
        ease: "power2.out",
        duration: 0.5,
        yPercent: -100,
        onComplete: function onComplete() {
          _gsap.gsap.set(_this.viewButton, {
            yPercent: -100
          });
        }
      });
    });
    (0, _defineProperty2.default)(this, "revealContent", function () {
      _this.projectInfoElements.map(function (el) {
        _gsap.gsap.fromTo(el.text, {
          yPercent: 100
        }, {
          yPercent: 0,
          duration: 0.5,
          stagger: 0.05
        });
      });

      _gsap.gsap.to(_this.exitButton.el, {
        opacity: _this.exitButton.idleAlpha,
        duration: 0.5,
        onComplete: function onComplete() {
          _this.exitButton.el.classList.add('exit-button__active');

          _this.exitButton.el.addEventListener('click', _this.onExitClicked);

          _this.exitButton.el.addEventListener('mouseenter', function () {
            return _this.onExitButtonHover({
              state: true
            });
          });

          _this.exitButton.el.addEventListener('mouseleave', function () {
            return _this.onExitButtonHover({
              state: false
            });
          });
        }
      });

      _gsap.gsap.to(_this.projectLinkContainer.el, {
        opacity: 1,
        duration: 0.5,
        onComplete: function onComplete() {
          if (_this.projectLink) _this.projectLink.classList.add('project-link__link__active');
        }
      });
    });

    /**
     * @param projectID : string
     * @param title : string
     * @param year : string
     * @param type : string
     * @param role : string
     * @param description : string
     * @param tech : string
     * @param link : url if available
     */
    this.projectID = projectID + 1;
    this.title = title;
    this.year = year;
    this.type = type;
    this.role = role;
    this.description = description;
    this.tech = tech;
    this.link = link;
    this.el = document.createElement('div');
    this.el.classList.add('project-content');
    this.projectInfo = document.createElement('div');
    this.projectInfo.classList.add('project-info');
    this.el.appendChild(this.projectInfo);
    this.projectInfoElements = [];
    this.initProjectTitle();
    this.initViewbutton();
    this.initProjectNumber();
    this.initMiscInfoElements();
    this.initProjectDescription();
    this.initProjectTech();
    this.initProjectLink();
    this.initExitButton();
    this.projectInfoElements.map(function (container) {
      _this.splitTextElements(container);

      _this.projectInfo.appendChild(container.el);
    });
    this.initEvents();
    this.applyInitStyles();
  }

  (0, _createClass2.default)(Project, [{
    key: "initProjectTitle",
    value: function initProjectTitle() {
      this.projectTitleContainer = this.createContainerElement({
        className: 'project-title'
      });
      this.projectTitle = document.createElement('h1');
      this.projectTitle.classList.add('project-title__title');
      this.projectTitle.innerText = this.title;
      this.projectTitleContainer.el.appendChild(this.projectTitle);
      this.el.appendChild(this.projectTitleContainer.el);
    }
  }, {
    key: "initViewbutton",
    value: function initViewbutton() {
      this.viewButtonContainer = this.createContainerElement({
        className: 'view-button'
      });
      this.viewButton = document.createElement('p');
      this.viewButton.classList.add('view-button__button');
      this.viewButton.innerText = "view";
      this.viewButtonContainer.el.appendChild(this.viewButton);
      this.viewButton.idleAlpha = 0.4;
      this.viewButton.activeAlpha = 1.0;
      this.el.appendChild(this.viewButtonContainer.el);
    }
  }, {
    key: "initProjectNumber",
    value: function initProjectNumber() {
      this.projectNumberContainer = this.createContainerElement({
        className: 'project-number'
      });
      this.projectNumber = document.createElement('h1');
      this.projectNumber.classList.add('project-number__number');
      this.projectNumber.innerText = this.projectID < 10 ? "0" + this.projectID : this.projectID;
      this.projectNumberContainer.el.appendChild(this.projectNumber);
      this.el.appendChild(this.projectNumberContainer.el);
    }
  }, {
    key: "initMiscInfoElements",
    value: function initMiscInfoElements() {
      this.miscInfoContainer = this.createContainerElement({
        className: 'project-misc'
      });
      this.projectYearContainer = this.createContainerElement({
        className: 'project-misc__item'
      });
      this.projectYear = document.createElement('p');
      this.projectYear.innerText = this.year;
      this.projectYear.classList.add('project-misc__item__copy');
      this.projectYear.id = "project-year";
      this.projectYearContainer.el.appendChild(this.projectYear); // this.splitTextElements(this.projectYearContainer);

      this.projectTypeContainer = this.createContainerElement({
        className: 'project-misc__item'
      });
      this.projectType = document.createElement('p');
      this.projectType.innerText = this.type;
      this.projectType.classList.add('project-misc__item__copy');
      this.projectType.id = "project-type";
      this.projectTypeContainer.el.appendChild(this.projectType); // this.splitTextElements(this.projectTypeContainer);

      this.projectRoleContainer = this.createContainerElement({
        className: 'project-misc__item'
      });
      this.projectRole = document.createElement('p');
      this.projectRole.innerText = this.role;
      this.projectRole.classList.add('project-misc__item__copy');
      this.projectRole.id = "project-role";
      this.projectRoleContainer.el.appendChild(this.projectRole); // this.splitTextElements(this.projectRoleContainer);

      this.miscInfoContainer.el.appendChild(this.projectYearContainer.el);
      this.miscInfoContainer.el.appendChild(this.projectTypeContainer.el);
      this.miscInfoContainer.el.appendChild(this.projectRoleContainer.el);
      this.projectInfoElements.push(this.miscInfoContainer);
    }
  }, {
    key: "initProjectDescription",
    value: function initProjectDescription() {
      this.projecDescriptionContainer = this.createContainerElement({
        className: 'project-description'
      });
      this.projectDescription = document.createElement('h3');
      this.projectDescription.classList.add('project-description__copy');
      this.projectDescription.innerHTML = this.description;
      this.projecDescriptionContainer.el.appendChild(this.projectDescription); // this.splitTextElements(this.projecDescriptionContainer);

      this.projectInfoElements.push(this.projecDescriptionContainer);
    }
  }, {
    key: "initProjectTech",
    value: function initProjectTech() {
      this.projectTechContainer = this.createContainerElement({
        className: 'project-tech'
      });
      this.projectTech = document.createElement('p');
      this.projectTech.classList.add('project-tech__copy');
      this.projectTech.innerText = this.tech;
      this.projectTechContainer.el.appendChild(this.projectTech); // this.splitTextElements(this.projectTechContainer);

      this.projectInfoElements.push(this.projectTechContainer);
    }
  }, {
    key: "initProjectLink",
    value: function initProjectLink() {
      this.projectLinkContainer = this.createContainerElement({
        className: 'project-link'
      });
      if (this.link === '') return;
      this.projectLink = document.createElement('a');
      this.projectLink.classList.add('project-link__link');
      this.projectLink.href = this.link;
      this.projectLink.target = "_blank";
      this.projectLink.innerText = "visit project";
      this.projectLinkContainer.el.appendChild(this.projectLink);
      this.el.appendChild(this.projectLinkContainer.el);
    }
  }, {
    key: "initExitButton",
    value: function initExitButton() {
      this.exitButton = this.createContainerElement({
        className: 'exit-button'
      });
      this.exitButton.el.classList.add('exit-button');
      this.exitButton.el.innerHTML = '<svg class = "exit-button__icon" width="12" height="12" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M0.292893 1.70711L24.2929 25.7071L25.7071 24.2929L1.70711 0.292893L0.292893 1.70711ZM24.2929 0.292893L0.292893 24.2929L1.70711 25.7071L25.7071 1.70711L24.2929 0.292893Z" fill="black"/></svg>';
      this.exitButton.idleAlpha = 0.7;
      this.exitButton.activeAlpha = 1.0;
      this.el.appendChild(this.exitButton.el);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      this.viewButton.addEventListener('click', this.onClick);
      this.viewButton.addEventListener('mouseenter', function () {
        return _this2.onViewButtonHover({
          state: true
        });
      });
      this.viewButton.addEventListener('mouseleave', function () {
        return _this2.onViewButtonHover({
          state: false
        });
      });

      if (this.projectLink) {
        this.projectLink.addEventListener('mouseenter', this.onHover);
        this.projectLink.addEventListener('mouseleave', this.onLeave);
      }
    }
  }, {
    key: "applyInitStyles",
    value: function applyInitStyles() {
      _gsap.gsap.set(this.projectTitle, {
        yPercent: 100
      });

      _gsap.gsap.set(this.viewButton, {
        yPercent: -100,
        opacity: this.viewButton.idleAlpha
      });

      _gsap.gsap.set(this.projectNumber, {
        yPercent: -100
      });

      _gsap.gsap.set(this.projectLinkContainer.el, {
        opacity: 0
      });

      _gsap.gsap.set(this.exitButton.el, {
        opacity: 0
      });
    }
  }, {
    key: "hideContent",
    value: function hideContent() {
      var _this3 = this;

      this.projectInfoElements.map(function (el) {
        _gsap.gsap.to(el.text, {
          yPercent: -100,
          duration: 0.5,
          stagger: 0.05,
          onComplete: function onComplete() {
            _gsap.gsap.set(el.text, {
              yPercent: 100
            });
          }
        });
      });

      _gsap.gsap.to(this.exitButton.el, {
        opacity: 0,
        duration: 0.5,
        onStart: function onStart() {
          _this3.exitButton.el.classList.remove('exit-button__active');

          _this3.exitButton.el.removeEventListener('click', _this3.onExitClicked);

          _this3.exitButton.el.removeEventListener('mouseenter', function () {
            return _this3.onExitButtonHover({
              state: true
            });
          });

          _this3.exitButton.el.removeEventListener('mouseleave', function () {
            return _this3.onExitButtonHover({
              state: false
            });
          });
        }
      });

      _gsap.gsap.to(this.projectLinkContainer.el, {
        opacity: 0,
        duration: 0.5,
        onStart: function onStart() {
          if (_this3.projectLink) _this3.projectLink.classList.remove('project-link__link__active');
        }
      });
    }
  }, {
    key: "splitTextElements",
    value: function splitTextElements(container) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "words";
      container.textClip = new _SplitText.SplitText(container.el, {
        type: type
      }).words, container.text = new _SplitText.SplitText(container.el, {
        type: type
      }).words;
      container.textClip.forEach(function (word, i) {
        word.innerText = "";
        word.style.overflow = "hidden";
        word.appendChild(container.text[i]);
      });
      container.text.forEach(function (word) {
        _gsap.gsap.set(word, {
          yPercent: 100
        });
      });
    }
  }, {
    key: "updateLinkState",
    value: function updateLinkState(state) {
      if (state) {
        this.projectTitleContainer.classList.add('active');
      } else {
        this.projectTitleContainer.classList.remove('active');
      }
    }
    /**
     * Will be used to define bounds that will be needed for clip reveal animations
     * @param className : string
     */

  }, {
    key: "createContainerElement",
    value: function createContainerElement(_ref4) {
      var className = _ref4.className;
      var el = document.createElement('div');
      el.classList.add(className);
      return {
        el: el,
        bounds: {},
        textClip: [],
        text: []
      };
    }
  }, {
    key: "updateViewModeStyles",
    value: function updateViewModeStyles(_ref5) {
      var state = _ref5.state;

      if (state) {
        this.el.classList.add('project-content__in-view');
      } else {
        this.el.classList.remove('project-content__in-view');
      }
    }
  }]);
  return Project;
}();

exports.Project = Project;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../../../utils/events.js":"../../utils/events.js","../../../utils/globals.js":"../../utils/globals.js","../../EventEmitter.js":"../EventEmitter.js","../../StickyComponent.js":"../StickyComponent.js","gsap":"../../node_modules/gsap/index.js","../../../vendors/gsap/SplitText.js":"../../vendors/gsap/SplitText.js"}],"Work/ProjectLink.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectLink = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _EventEmitter = _interopRequireDefault(require("../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../utils/events.js"));

var _ProjectContent = require("../../../static/ProjectContent.js");

var _gsap = require("gsap");

var _SplitText = require("../../../vendors/gsap/SplitText.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

_gsap.gsap.registerPlugin(_SplitText.SplitText);

var ProjectLink = /*#__PURE__*/function () {
  function ProjectLink(project) {
    (0, _classCallCheck2.default)(this, ProjectLink);
    this.project = project;
    this.el = document.createElement('div');
    this.el.classList.add('project-title'); // this.initLinks();
    // this.initEvents();
  }

  (0, _createClass2.default)(ProjectLink, [{
    key: "initLinks",
    value: function initLinks() {
      var _this = this;

      this.link = [];

      _ProjectContent.ProjectContent.map(function (content) {
        var title = content.title;
        var projectLink = document.createElement('h1');
        projectLink.classList.add('project-title__title');
        projectLink.innerText = title;
        projectLink.addEventListener('click', function () {
          emitter.emit(_events.default.SHOW_PROJECT, {
            desiredProject: title
          });
        });
        projectLink.addEventListener('mouseenter', function () {
          globals.HOVERING_LINK = true;
          emitter.emit(_events.default.HOVERING_LINK);
        });
        projectLink.addEventListener('mouseleave', function () {
          globals.HOVERING_LINK = false;
          emitter.emit(_events.default.LEAVING_LINK);
        });

        _gsap.gsap.set(projectLink, {
          yPercent: 100
        });

        _this.link.push(projectLink);

        _this.el.appendChild(projectLink);
      });
    }
  }, {
    key: "showLink",
    value: function showLink(projectIndex) {
      _gsap.gsap.to(this.link[projectLink], {
        duration: 0.5,
        yPercent: 0
      });
    }
  }, {
    key: "hideLink",
    value: function hideLink(projectIndex) {} // initEvents() {
    //     this.el.addEventListener('mouseenter', this.onHover);
    //     this.el.addEventListener('mouseleave', this.onLeave);
    // }
    // onClick = () => {
    //     emitter.emit(events.SHOW_PROJECT, this.project);
    // }
    // onHover = () => {
    //     globals.HOVERING_LINK = true;
    //     emitter.emit(events.HOVERING_LINK);
    //   }
    //   onLeave = () => {
    //     globals.HOVERING_LINK = false;
    //     emitter.emit(events.LEAVING_LINK);
    //   }

  }]);
  return ProjectLink;
}();

exports.ProjectLink = ProjectLink;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../../EventEmitter.js":"../EventEmitter.js","../../../utils/events.js":"../../utils/events.js","../../../static/ProjectContent.js":"../../static/ProjectContent.js","gsap":"../../node_modules/gsap/index.js","../../../vendors/gsap/SplitText.js":"../../vendors/gsap/SplitText.js"}],"Work/Projects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ProjectContent = require("../../../static/ProjectContent.js");

var _Project = require("./Project.js");

var _ProjectLink = require("./ProjectLink.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Projects = /*#__PURE__*/function () {
  function Projects() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Projects);
    this.el = document.createElement('div');
    this.el.classList.add('projects');
    this.project = []; // this.link = [];

    this.initProjects();
    this.project.map(function (project) {
      _this.el.appendChild(project.el);
    });
  }

  (0, _createClass2.default)(Projects, [{
    key: "initProjects",
    value: function initProjects() {
      var _this2 = this;

      _ProjectContent.ProjectContent.map(function (content, i) {
        var title = content.title,
            type = content.type,
            description = content.description,
            tech = content.tech,
            year = content.year,
            role = content.role,
            link = content.link;
        var initState = i > 0 ? false : true;
        var project = new _Project.Project(i, {
          viewing: initState,
          title: title,
          type: type,
          year: year,
          role: role,
          description: description,
          tech: tech,
          link: link
        });

        _this2.project.push(project);
      });
    }
  }]);
  return Projects;
}();

var projects = new Projects();
var _default = projects;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../../../static/ProjectContent.js":"../../static/ProjectContent.js","./Project.js":"Work/Project.js","./ProjectLink.js":"Work/ProjectLink.js"}],"Work/Work.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _View2 = _interopRequireDefault(require("../View.js"));

var _EventEmitter = _interopRequireDefault(require("../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../utils/events.js"));

var _Projects = _interopRequireDefault(require("./Projects.js"));

var _globals = _interopRequireDefault(require("../../../utils/globals.js"));

var _gsapCore = _interopRequireDefault(require("gsap/gsap-core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

var Work = /*#__PURE__*/function (_View) {
  (0, _inherits2.default)(Work, _View);

  var _super = _createSuper(Work);

  function Work() {
    var _this;

    (0, _classCallCheck2.default)(this, Work);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateContentSelection", function (contentIndex) {
      _globals.default.PREV_PROJECT_INDEX = _globals.default.CURRENT_PROJECT_INDEX;
      _globals.default.CURRENT_PROJECT_INDEX = contentIndex;

      if (_globals.default.CURRENT_PROJECT_INDEX !== _globals.default.PREV_PROJECT_INDEX) {
        _Projects.default.project[_globals.default.PREV_PROJECT_INDEX].updateViewModeStyles({
          state: false
        });

        _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].updateViewModeStyles({
          state: true
        });
      }

      _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].showTitle();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "enableScrollMode", function () {
      if (_globals.default.HOVERING_LINK && !window.isMobile) return;
      if (_globals.default.VIEWING_PROJECT && !window.isMobile) return;
      if (_this.enableUserInteraction === false) return;
      _this.inScrollMode = true; // document.body.classList.add('scrolling');

      _this.el.style.cursor = "grabbing";

      _Projects.default.el.classList.add('scrolling');

      _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].hideTitle();

      emitter.emit(_events.default.ENTER_SCROLL_MODE);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "disableScrollMode", function () {
      if (_globals.default.HOVERING_LINK && !window.isMobile) return;
      if (_globals.default.VIEWING_PROJECT && !window.isMobile) return;
      if (_this.enableUserInteraction === false) return;
      _this.inScrollMode = false;
      _this.el.style.cursor = "grab";

      _Projects.default.el.classList.remove('scrolling');

      emitter.emit(_events.default.EXIT_SCROLL_MODE);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "playEnterAnim", function () {
      emitter.emit(_events.default.REVEAL_QUADS);

      _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].updateViewModeStyles({
        state: true
      });

      _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].showTitle();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "playLeaveAnim", function () {
      if (_globals.default.VIEWING_PROJECT) {
        _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].hideContent();
      } else {
        _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].hideTitle();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "showProject", function () {
      if (_globals.default.VIEWING_PROJECT) return;
      _globals.default.VIEWING_PROJECT = true;

      _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].hideTitle();

      emitter.emit(_events.default.UPDATE_VIEWMODE, {
        mode: true
      });

      _gsapCore.default.delayedCall(1.0, function () {
        _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].revealContent();
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "closeProject", function () {
      if (!_globals.default.VIEWING_PROJECT) return;
      _globals.default.VIEWING_PROJECT = false;
      emitter.emit(_events.default.UPDATE_VIEWMODE, {
        mode: false
      });

      _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].hideContent();

      _gsapCore.default.delayedCall(1.0, function () {
        _Projects.default.project[_globals.default.CURRENT_PROJECT_INDEX].showTitle();
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Work, [{
    key: "onEnter",
    value: function onEnter() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Work.prototype), "onEnter", this).call(this);
      _globals.default.CURRENT_VIEW = "work";
      emitter.emit(_events.default.UPDATE_CURRENT_VIEW);
      this.firstReveal = false;
      this.el.appendChild(_Projects.default.el);
      this.initDomGL();
      this.initEvents();
    }
  }, {
    key: "onEnterCompleted",
    value: function onEnterCompleted() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Work.prototype), "onEnterCompleted", this).call(this);

      if (_globals.default.CONTENT_LOADED) {
        this.enableUserInteraction = true;
        emitter.emit(_events.default.SHOW_CLICKDRAG_CTA);
        this.playEnterAnim();
      }
    }
  }, {
    key: "onLeave",
    value: function onLeave() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Work.prototype), "onLeave", this).call(this);
      emitter.emit(_events.default.HIDE_CLICKDRAG_CTA);
      this.playLeaveAnim();
    }
  }, {
    key: "onLeaveCompleted",
    value: function onLeaveCompleted() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Work.prototype), "onLeaveCompleted", this).call(this);
      this.firstReveal = false;
      this.removeEvents();
      if (_globals.default.VIEWING_PROJECT) emitter.emit(_events.default.RESET_QUADS);
      emitter.emit(_events.default.REMOVE_DOMGL);
      this.el.removeChild(_Projects.default.el);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      this.el.style.cursor = "grab";
      this.enableUserInteraction = false;
      this.showScrollInterface = true;
      this.inScrollMode = false;
      _globals.default.VIEWING_PROJECT = false;
      emitter.on(_events.default.LOADING_ANIM_COMPLETED, function () {
        _this2.playEnterAnim();

        emitter.emit(_events.default.SHOW_CLICKDRAG_CTA);
        _this2.enableUserInteraction = true;
      });
      emitter.on(_events.default.LOAD_PROJECT_CONTENT, this.updateContentSelection);
      emitter.on(_events.default.SHOW_PROJECT, this.showProject);
      emitter.on(_events.default.CLOSE_PROJECT, this.closeProject);

      if (!window.isMobile) {
        emitter.on(_events.default.MOUSE_DOWN, this.enableScrollMode);
        emitter.on(_events.default.MOUSE_UP, this.disableScrollMode);
      } else {
        emitter.on(_events.default.TOUCH_START, this.enableScrollMode);
        emitter.on(_events.default.TOUCH_END, this.disableScrollMode);
        emitter.on(_events.default.TOUCH_CANCEL, this.disableScrollMode);
      }
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      var _this3 = this;

      this.enableUserInteraction = false;
      emitter.off(_events.default.LOADING_ANIM_COMPLETED, this.playEnterAnim);
      emitter.off(_events.default.LOAD_PROJECT_CONTENT, function () {
        _this3.playEnterAnim();

        emitter.emit(_events.default.SHOW_CLICKDRAG_CTA);
      });
      emitter.off(_events.default.SHOW_PROJECT, this.showProject);
      emitter.off(_events.default.CLOSE_PROJECT, this.closeProject);

      if (!window.isMobile) {
        emitter.off(_events.default.MOUSE_DOWN, this.enableScrollMode);
        emitter.off(_events.default.MOUSE_UP, this.disableScrollMode);
      } else {
        emitter.off(_events.default.TOUCH_START, this.enableScrollMode);
        emitter.off(_events.default.TOUCH_END, this.disableScrollMode);
        emitter.off(_events.default.TOUCH_CANCEL, this.disableScrollMode);
      }
    }
  }, {
    key: "removeStickyTransforms",
    value: function removeStickyTransforms() {}
  }, {
    key: "initDomGL",
    value: function initDomGL() {
      this.domGLReferenceElement = this.el.querySelector('.project-video');
      var params = {
        referenceElement: this.domGLReferenceElement,
        getFirstQuad: true
      };
      (0, _get2.default)((0, _getPrototypeOf2.default)(Work.prototype), "initDomGL", this).call(this, {
        view: "PROJECTS",
        params: params
      });
    }
  }, {
    key: "updateViewModeStyles",
    value: function updateViewModeStyles(_ref) {
      var viewing = _ref.viewing;

      if (!viewing) {
        document.querySelector('.project-container').classList.add('not-viewing');
        this.exitButton.classList.add('not-viewing');
      } else {
        document.querySelector('.project-container').classList.remove('not-viewing');
        this.exitButton.classList.remove('not-viewing');
      }
    }
  }]);
  return Work;
}(_View2.default);

exports.default = Work;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"../../node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../View.js":"View.js","../../EventEmitter.js":"../EventEmitter.js","../../../utils/events.js":"../../utils/events.js","./Projects.js":"Work/Projects.js","../../../utils/globals.js":"../../utils/globals.js","gsap/gsap-core":"../../node_modules/gsap/gsap-core.js"}],"../../static/AboutContent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AboutContent = void 0;

var _ = _interopRequireDefault(require("./img/*.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AboutContent = [{
  title: "Hej!",
  introText: 'I\'m a Swedish Creative Technologist at Adventure Club who is passionate about interactivity and making visually interesting experiences - that in some way makes one dream or feel inspired!<br><br>This portfolio is a showcase of my recent client work and sketches - through which I\'m (still) finding "my own voice" by exploring visual approaches and experimenting with concepts that piques my curiosity!',
  contactHeader: "Feel free to reach me on...",
  contactMethods: [{
    type: "mail",
    url: "mailto:douglas@adventureclub.io"
  }, {
    type: "twitter",
    url: "https://twitter.com/DougLilliequist"
  }, {
    type: "instagram",
    url: "https://www.instagram.com/dlilliequist/"
  }, {
    type: "linkedIn",
    url: "https://www.linkedin.com/in/douglas-lilliequist-a2798b110/"
  }],
  media: {
    videoSrc: null,
    imageSrc: _.default.douglas10241024,
    brightVal: 0.0
  }
}];
exports.AboutContent = AboutContent;
},{"./img/*.png":"../../static/img/*.png"}],"About/About.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _View2 = _interopRequireDefault(require("../View.js"));

var _EventEmitter = _interopRequireDefault(require("../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../utils/events.js"));

var _AboutContent = require("../../../static/AboutContent.js");

var _StickyComponent = _interopRequireDefault(require("../../StickyComponent.js"));

var _gsap = require("gsap");

var _SplitText = require("../../../vendors/gsap/SplitText.js");

var _globals = _interopRequireDefault(require("../../../utils/globals.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

_gsap.gsap.registerPlugin(_SplitText.SplitText);

var About = /*#__PURE__*/function (_View) {
  (0, _inherits2.default)(About, _View);

  var _super = _createSuper(About);

  function About() {
    var _this;

    (0, _classCallCheck2.default)(this, About);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLinkHover", function () {
      _globals.default.HOVERING_LINK = true;
      emitter.emit(_events.default.HOVERING_NAV_LINK, true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLinkLeave", function () {
      _globals.default.HOVERING_LINK = false;
      emitter.emit(_events.default.HOVERING_NAV_LINK, false);
    });
    return _this;
  }

  (0, _createClass2.default)(About, [{
    key: "onEnter",
    value: function onEnter() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(About.prototype), "onEnter", this).call(this);
      _globals.default.CURRENT_VIEW = "about";
      emitter.emit(_events.default.UPDATE_CURRENT_VIEW);
      this.initReferences();
      this.populateContent();
      this.initEvents();
      this.initDomGL();
    }
  }, {
    key: "onEnterCompleted",
    value: function onEnterCompleted() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(About.prototype), "onEnterCompleted", this).call(this);

      if (_globals.default.CONTENT_LOADED) {
        this.playEnterAnim();
      }
    }
  }, {
    key: "onLeave",
    value: function onLeave() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(About.prototype), "onLeave", this).call(this);
      this.playLeaveAnim();
    }
  }, {
    key: "onLeaveCompleted",
    value: function onLeaveCompleted() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(About.prototype), "onLeaveCompleted", this).call(this);
      this.removeEvents();
      emitter.emit(_events.default.REMOVE_DOMGL);
      this.resetTextSplit(this.header);
      this.resetTextSplit(this.introText);
      this.resetTextSplit(this.contactHeader);
    }
  }, {
    key: "initOnComplete",
    value: function initOnComplete() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(About.prototype), "initOnComplete", this).call(this);
    }
  }, {
    key: "initReferences",
    value: function initReferences() {
      this.domGLReferenceElement = this.el.querySelector('.portrait-container__portrait');
      this.header = document.querySelector('.about-copy__header');
      this.introText = document.querySelector('.about-copy__body-text');
      this.contactHeader = document.querySelector('.contact-container__header');
      this.links = document.querySelectorAll('.contact-container__methods__link');
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      emitter.on(_events.default.LOADING_ANIM_COMPLETED, function () {
        _this2.playEnterAnim();
      });
      this.links.forEach(function (link) {
        link.addEventListener('mouseenter', _this2.onLinkHover);
        link.addEventListener('mouseleave', _this2.onLinkLeave);
      });
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      var _this3 = this;

      this.links.forEach(function (link) {
        link.removeEventListener('mouseenter', _this3.onLinkHover);
        link.removeEventListener('mouseleave', _this3.onLinkLeave);
      });
      emitter.off(_events.default.LOADING_ANIM_COMPLETED, function () {
        _this3.playEnterAnim();
      });
    }
  }, {
    key: "initDomGL",
    value: function initDomGL() {
      var params = {
        referenceElement: this.domGLReferenceElement
      };
      (0, _get2.default)((0, _getPrototypeOf2.default)(About.prototype), "initDomGL", this).call(this, {
        view: "ABOUT",
        params: params
      });
    }
  }, {
    key: "populateContent",
    value: function populateContent() {
      var aboutContent = _AboutContent.AboutContent[0];
      this.header.innerHTML = aboutContent.title;
      this.introText.innerHTML = aboutContent.introText;
      this.contactHeader.innerHTML = aboutContent.contactHeader;
      this.links.forEach(function (link, i) {
        link.innerHTML = aboutContent.contactMethods[i].type;
        link.href = aboutContent.contactMethods[i].url;
      });
    }
  }, {
    key: "playEnterAnim",
    value: function playEnterAnim() {
      var dur = 0.85;
      var ease = "power1.out";
      emitter.emit(_events.default.REVEAL_QUADS);
      this.splitTextElements(this.header);
      this.splitTextElements(this.introText);
      this.splitTextElements(this.contactHeader); // gsap.to(this.introText.text.words, {
      //   duration: 0.5,
      //   yPercent: 0,
      //   stagger: 0.015,
      // });
      // gsap.to(this.introText.text.words, {
      //   duration: 0.5,
      //   yPercent: 0,
      //   stagger: 0.015,
      // });
      // gsap.to(this.introText.text.words, {
      //   duration: 0.5,
      //   yPercent: 0,
      //   stagger: 0.015,
      // });

      var enterAnim = _gsap.gsap.timeline({
        onStart: function onStart() {// emitter.emit(events.REVEAL_QUADS);
        }
      });

      enterAnim.to(this.header.text.words, {
        duration: dur,
        yPercent: 0,
        ease: ease
      });
      enterAnim.to(this.introText.text.words, {
        duration: dur,
        yPercent: 0,
        stagger: 0.005,
        ease: ease
      }, "<0.5");
      enterAnim.to(this.contactHeader.text.words, {
        duration: dur,
        yPercent: 0,
        ease: ease,
        stagger: 0.005
      }, "<0.5");
      enterAnim.fromTo(this.links, {
        opacity: 0,
        yPercent: 100
      }, {
        duration: dur,
        opacity: 1.0,
        stagger: 0.1,
        yPercent: 0,
        ease: ease
      }, "<0.5");
    }
  }, {
    key: "playLeaveAnim",
    value: function playLeaveAnim() {
      var _this4 = this;

      var dur = 0.5;
      var ease = "sine.in";

      var leaveAnim = _gsap.gsap.timeline({
        onComplete: function onComplete() {
          _this4.links.forEach(function (link) {
            link.classList.remove('link--enabled');
          });
        }
      });

      leaveAnim.to(this.links, {
        duration: dur,
        opacity: 0,
        stagger: -0.05,
        ease: "linear"
      }, "<");
      leaveAnim.to(this.contactHeader, {
        duration: dur,
        opacity: 0,
        ease: ease
      }, "<0.05");
      leaveAnim.to(this.introText, {
        duration: dur,
        opacity: 0,
        ease: ease
      }, "<0.05");
      leaveAnim.to(this.header, {
        duration: dur,
        opacity: 0,
        ease: ease
      }, "<0.05");
    }
  }, {
    key: "splitTextElements",
    value: function splitTextElements(el) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "words";
      el.textClip = new _SplitText.SplitText(el, {
        type: type
      }), el.text = new _SplitText.SplitText(el, {
        type: type
      });
      el.textClip.words.forEach(function (word, i) {
        word.innerText = "";
        word.style.overflow = "hidden";
        word.appendChild(el.text.words[i]);
      });
      el.text.words.forEach(function (word) {
        _gsap.gsap.set(word, {
          yPercent: 100
        });
      });
    }
  }, {
    key: "resetTextSplit",
    value: function resetTextSplit(el) {
      el.textClip.revert();
      el.text.revert();
    }
  }]);
  return About;
}(_View2.default);

exports.default = About;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"../../node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../View.js":"View.js","../../EventEmitter.js":"../EventEmitter.js","../../../utils/events.js":"../../utils/events.js","../../../static/AboutContent.js":"../../static/AboutContent.js","../../StickyComponent.js":"../StickyComponent.js","gsap":"../../node_modules/gsap/index.js","../../../vendors/gsap/SplitText.js":"../../vendors/gsap/SplitText.js","../../../utils/globals.js":"../../utils/globals.js"}],"../../node_modules/@babel/runtime/helpers/isNativeFunction.js":[function(require,module,exports) {
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;
},{}],"../../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":[function(require,module,exports) {
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
},{}],"../../node_modules/@babel/runtime/helpers/construct.js":[function(require,module,exports) {
var setPrototypeOf = require("./setPrototypeOf");

var isNativeReflectConstruct = require("./isNativeReflectConstruct");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
},{"./setPrototypeOf":"../../node_modules/@babel/runtime/helpers/setPrototypeOf.js","./isNativeReflectConstruct":"../../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js"}],"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js":[function(require,module,exports) {
var getPrototypeOf = require("./getPrototypeOf");

var setPrototypeOf = require("./setPrototypeOf");

var isNativeFunction = require("./isNativeFunction");

var construct = require("./construct");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
},{"./getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","./setPrototypeOf":"../../node_modules/@babel/runtime/helpers/setPrototypeOf.js","./isNativeFunction":"../../node_modules/@babel/runtime/helpers/isNativeFunction.js","./construct":"../../node_modules/@babel/runtime/helpers/construct.js"}],"../../vendors/ogl/src/math/functions/Vec3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.length = length;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat4 = transformMat4;
exports.scaleRotateMat4 = scaleRotateMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.exactEquals = exactEquals;
exports.angle = void 0;
var EPSILON = 0.000001;
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */


function scaleRotateMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var uvx = qy * z - qz * y;
  var uvy = qz * x - qx * z;
  var uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy;
  var uuvy = qz * uvx - qx * uvz;
  var uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


var angle = function () {
  var tempA = [0, 0, 0];
  var tempB = [0, 0, 0];
  return function (a, b) {
    copy(tempA, a);
    copy(tempB, b);
    normalize(tempA, tempA);
    normalize(tempB, tempB);
    var cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  };
}();
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


exports.angle = angle;

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
},{}],"../../vendors/ogl/src/math/Vec3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec3 = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var Vec3Func = _interopRequireWildcard(require("./functions/Vec3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Vec3 = /*#__PURE__*/function (_Array) {
  (0, _inherits2.default)(Vec3, _Array);

  var _super = _createSuper(Vec3);

  function Vec3() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
    (0, _classCallCheck2.default)(this, Vec3);
    _this = _super.call(this, x, y, z);
    return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
  }

  (0, _createClass2.default)(Vec3, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      Vec3Func.set(this, x, y, z);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec3Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec3Func.add(this, va, vb);else Vec3Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec3Func.subtract(this, va, vb);else Vec3Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec3Func.multiply(this, this, v);else Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec3Func.divide(this, this, v);else Vec3Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec3Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec3Func.distance(this, v);else return Vec3Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return Vec3Func.squaredLength(this);
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec3Func.squaredDistance(this, v);else return Vec3Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec3Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) Vec3Func.cross(this, va, vb);else Vec3Func.cross(this, this, va);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec3Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec3Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec3Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec3Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec3Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "scaleRotateMatrix4",
    value: function scaleRotateMatrix4(mat4) {
      Vec3Func.scaleRotateMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      Vec3Func.transformQuat(this, this, q);
      return this;
    }
  }, {
    key: "angle",
    value: function angle(v) {
      return Vec3Func.angle(this, v);
    }
  }, {
    key: "lerp",
    value: function lerp(v, t) {
      Vec3Func.lerp(this, this, v, t);
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      return a;
    }
  }, {
    key: "transformDirection",
    value: function transformDirection(mat4) {
      var x = this[0];
      var y = this[1];
      var z = this[2];
      this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
      this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
      this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
      return this.normalize();
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
    }
  }]);
  return Vec3;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Array));

exports.Vec3 = Vec3;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/wrapNativeSuper":"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js","./functions/Vec3Func.js":"../../vendors/ogl/src/math/functions/Vec3Func.js"}],"../../vendors/ogl/src/math/functions/Vec4Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.scale = scale;
exports.length = length;
exports.normalize = normalize;
exports.dot = dot;
exports.lerp = lerp;
var EPSILON = 0.000001;
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */


function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
},{}],"../../vendors/ogl/src/math/functions/QuatFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = identity;
exports.setAxisAngle = setAxisAngle;
exports.multiply = multiply;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.slerp = slerp;
exports.invert = invert;
exports.conjugate = conjugate;
exports.fromMat3 = fromMat3;
exports.fromEuler = fromEuler;
exports.normalize = exports.length = exports.lerp = exports.dot = exports.scale = exports.add = exports.set = exports.copy = void 0;

var vec4 = _interopRequireWildcard(require("./Vec4Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/


function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Multiplies two quats
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */


function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */


function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > 0.000001) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */


function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */


function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */


function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} euler Angles to rotate around each axis in degrees.
 * @param {String} order detailing order of operations. Default 'XYZ'.
 * @returns {quat} out
 * @function
 */


function fromEuler(out, euler) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YXZ';
  var sx = Math.sin(euler[0] * 0.5);
  var cx = Math.cos(euler[0] * 0.5);
  var sy = Math.sin(euler[1] * 0.5);
  var cy = Math.cos(euler[1] * 0.5);
  var sz = Math.sin(euler[2] * 0.5);
  var cz = Math.cos(euler[2] * 0.5);

  if (order === 'XYZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'YXZ') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'ZXY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'ZYX') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  } else if (order === 'YZX') {
    out[0] = sx * cy * cz + cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz - sx * sy * sz;
  } else if (order === 'XZY') {
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz - sx * cy * sz;
    out[2] = cx * cy * sz + sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
  }

  return out;
}
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */


var copy = vec4.copy;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

exports.copy = copy;
var set = vec4.set;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */

exports.set = set;
var add = vec4.add;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

exports.add = add;
var scale = vec4.scale;
/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

exports.scale = scale;
var dot = vec4.dot;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */

exports.dot = dot;
var lerp = vec4.lerp;
/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */

exports.lerp = lerp;
var length = vec4.length;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

exports.length = length;
var normalize = vec4.normalize;
exports.normalize = normalize;
},{"./Vec4Func.js":"../../vendors/ogl/src/math/functions/Vec4Func.js"}],"../../vendors/ogl/src/math/Quat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quat = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var QuatFunc = _interopRequireWildcard(require("./functions/QuatFunc.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Quat = /*#__PURE__*/function (_Array) {
  (0, _inherits2.default)(Quat, _Array);

  var _super = _createSuper(Quat);

  function Quat() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    (0, _classCallCheck2.default)(this, Quat);
    _this = _super.call(this, x, y, z, w);

    _this.onChange = function () {};

    return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
  }

  (0, _createClass2.default)(Quat, [{
    key: "identity",
    value: function identity() {
      QuatFunc.identity(this);
      this.onChange();
      return this;
    }
  }, {
    key: "set",
    value: function set(x, y, z, w) {
      if (x.length) return this.copy(x);
      QuatFunc.set(this, x, y, z, w);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateX",
    value: function rotateX(a) {
      QuatFunc.rotateX(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateY",
    value: function rotateY(a) {
      QuatFunc.rotateY(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "rotateZ",
    value: function rotateZ(a) {
      QuatFunc.rotateZ(this, this, a);
      this.onChange();
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.invert(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.conjugate(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "copy",
    value: function copy(q) {
      QuatFunc.copy(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      QuatFunc.normalize(this, q);
      this.onChange();
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(qA, qB) {
      if (qB) {
        QuatFunc.multiply(this, qA, qB);
      } else {
        QuatFunc.multiply(this, this, qA);
      }

      this.onChange();
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return QuatFunc.dot(this, v);
    }
  }, {
    key: "fromMatrix3",
    value: function fromMatrix3(matrix3) {
      QuatFunc.fromMat3(this, matrix3);
      this.onChange();
      return this;
    }
  }, {
    key: "fromEuler",
    value: function fromEuler(euler) {
      QuatFunc.fromEuler(this, euler, euler.order);
      return this;
    }
  }, {
    key: "fromAxisAngle",
    value: function fromAxisAngle(axis, a) {
      QuatFunc.setAxisAngle(this, axis, a);
      return this;
    }
  }, {
    key: "slerp",
    value: function slerp(q, t) {
      QuatFunc.slerp(this, this, q, t);
      return this;
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
      this.onChange();
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
      this.onChange();
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
      this.onChange();
    }
  }, {
    key: "w",
    get: function get() {
      return this[3];
    },
    set: function set(v) {
      this[3] = v;
      this.onChange();
    }
  }]);
  return Quat;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Array));

exports.Quat = Quat;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/wrapNativeSuper":"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js","./functions/QuatFunc.js":"../../vendors/ogl/src/math/functions/QuatFunc.js"}],"../../vendors/ogl/src/math/functions/Mat4Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getMaxScaleOnAxis = getMaxScaleOnAxis;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromQuat = fromQuat;
exports.perspective = perspective;
exports.ortho = ortho;
exports.targetTo = targetTo;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.getRotation = void 0;
var EPSILON = 0.000001;
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */


function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (Math.abs(len) < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}

function getMaxScaleOnAxis(mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  var x = m11 * m11 + m12 * m12 + m13 * m13;
  var y = m21 * m21 + m22 * m22 + m23 * m23;
  var z = m31 * m31 + m32 * m32 + m33 * m33;
  return Math.sqrt(Math.max(x, y, z));
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


var getRotation = function () {
  var temp = [0, 0, 0];
  return function (out, mat) {
    var scaling = temp;
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  };
}();
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */


exports.getRotation = getRotation;

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  var nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len === 0) {
    // eye and target are in the same position
    z2 = 1;
  } else {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len === 0) {
    // up and z are parallel
    if (upz) {
      upx += 1e-6;
    } else if (upy) {
      upz += 1e-6;
    } else {
      upy += 1e-6;
    }

    x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
  }

  len = 1 / Math.sqrt(len);
  x0 *= len;
  x1 *= len;
  x2 *= len;
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
},{}],"../../vendors/ogl/src/math/Mat4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat4 = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var Mat4Func = _interopRequireWildcard(require("./functions/Mat4Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Mat4 = /*#__PURE__*/function (_Array) {
  (0, _inherits2.default)(Mat4, _Array);

  var _super = _createSuper(Mat4);

  function Mat4() {
    var _this;

    var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var m03 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m10 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var m11 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var m12 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var m13 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var m20 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var m21 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var m22 = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
    var m23 = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var m30 = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 0;
    var m31 = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
    var m32 = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
    var m33 = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 1;
    (0, _classCallCheck2.default)(this, Mat4);
    _this = _super.call(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
  }

  (0, _createClass2.default)(Mat4, [{
    key: "set",
    value: function set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      if (m00.length) return this.copy(m00);
      Mat4Func.set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat4Func.translate(this, m, v);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(v, axis) {
      var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      Mat4Func.rotate(this, m, v, axis);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat4Func.scale(this, m, typeof v === 'number' ? [v, v, v] : v);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(ma, mb) {
      if (mb) {
        Mat4Func.multiply(this, ma, mb);
      } else {
        Mat4Func.multiply(this, this, ma);
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      Mat4Func.identity(this);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      Mat4Func.copy(this, m);
      return this;
    }
  }, {
    key: "fromPerspective",
    value: function fromPerspective() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          fov = _ref.fov,
          aspect = _ref.aspect,
          near = _ref.near,
          far = _ref.far;

      Mat4Func.perspective(this, fov, aspect, near, far);
      return this;
    }
  }, {
    key: "fromOrthogonal",
    value: function fromOrthogonal(_ref2) {
      var left = _ref2.left,
          right = _ref2.right,
          bottom = _ref2.bottom,
          top = _ref2.top,
          near = _ref2.near,
          far = _ref2.far;
      Mat4Func.ortho(this, left, right, bottom, top, near, far);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      Mat4Func.fromQuat(this, q);
      return this;
    }
  }, {
    key: "setPosition",
    value: function setPosition(v) {
      this.x = v[0];
      this.y = v[1];
      this.z = v[2];
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Mat4Func.invert(this, m);
      return this;
    }
  }, {
    key: "compose",
    value: function compose(q, pos, scale) {
      Mat4Func.fromRotationTranslationScale(this, q, pos, scale);
      return this;
    }
  }, {
    key: "getRotation",
    value: function getRotation(q) {
      Mat4Func.getRotation(q, this);
      return this;
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(pos) {
      Mat4Func.getTranslation(pos, this);
      return this;
    }
  }, {
    key: "getScaling",
    value: function getScaling(scale) {
      Mat4Func.getScaling(scale, this);
      return this;
    }
  }, {
    key: "getMaxScaleOnAxis",
    value: function getMaxScaleOnAxis() {
      return Mat4Func.getMaxScaleOnAxis(this);
    }
  }, {
    key: "lookAt",
    value: function lookAt(eye, target, up) {
      Mat4Func.targetTo(this, eye, target, up);
      return this;
    }
  }, {
    key: "determinant",
    value: function determinant() {
      return Mat4Func.determinant(this);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      this[2] = a[o + 2];
      this[3] = a[o + 3];
      this[4] = a[o + 4];
      this[5] = a[o + 5];
      this[6] = a[o + 6];
      this[7] = a[o + 7];
      this[8] = a[o + 8];
      this[9] = a[o + 9];
      this[10] = a[o + 10];
      this[11] = a[o + 11];
      this[12] = a[o + 12];
      this[13] = a[o + 13];
      this[14] = a[o + 14];
      this[15] = a[o + 15];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      a[o + 2] = this[2];
      a[o + 3] = this[3];
      a[o + 4] = this[4];
      a[o + 5] = this[5];
      a[o + 6] = this[6];
      a[o + 7] = this[7];
      a[o + 8] = this[8];
      a[o + 9] = this[9];
      a[o + 10] = this[10];
      a[o + 11] = this[11];
      a[o + 12] = this[12];
      a[o + 13] = this[13];
      a[o + 14] = this[14];
      a[o + 15] = this[15];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[12];
    },
    set: function set(v) {
      this[12] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[13];
    },
    set: function set(v) {
      this[13] = v;
    }
  }, {
    key: "z",
    get: function get() {
      return this[14];
    },
    set: function set(v) {
      this[14] = v;
    }
  }, {
    key: "w",
    get: function get() {
      return this[15];
    },
    set: function set(v) {
      this[15] = v;
    }
  }]);
  return Mat4;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Array));

exports.Mat4 = Mat4;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/wrapNativeSuper":"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js","./functions/Mat4Func.js":"../../vendors/ogl/src/math/functions/Mat4Func.js"}],"../../vendors/ogl/src/math/functions/EulerFunc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRotationMatrix = fromRotationMatrix;

// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
function fromRotationMatrix(out, m) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YXZ';

  if (order === 'XYZ') {
    out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));

    if (Math.abs(m[8]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[10]);
      out[2] = Math.atan2(-m[4], m[0]);
    } else {
      out[0] = Math.atan2(m[6], m[5]);
      out[2] = 0;
    }
  } else if (order === 'YXZ') {
    out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));

    if (Math.abs(m[9]) < 0.99999) {
      out[1] = Math.atan2(m[8], m[10]);
      out[2] = Math.atan2(m[1], m[5]);
    } else {
      out[1] = Math.atan2(-m[2], m[0]);
      out[2] = 0;
    }
  } else if (order === 'ZXY') {
    out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));

    if (Math.abs(m[6]) < 0.99999) {
      out[1] = Math.atan2(-m[2], m[10]);
      out[2] = Math.atan2(-m[4], m[5]);
    } else {
      out[1] = 0;
      out[2] = Math.atan2(m[1], m[0]);
    }
  } else if (order === 'ZYX') {
    out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));

    if (Math.abs(m[2]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[10]);
      out[2] = Math.atan2(m[1], m[0]);
    } else {
      out[0] = 0;
      out[2] = Math.atan2(-m[4], m[5]);
    }
  } else if (order === 'YZX') {
    out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));

    if (Math.abs(m[1]) < 0.99999) {
      out[0] = Math.atan2(-m[9], m[5]);
      out[1] = Math.atan2(-m[2], m[0]);
    } else {
      out[0] = 0;
      out[1] = Math.atan2(m[8], m[10]);
    }
  } else if (order === 'XZY') {
    out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));

    if (Math.abs(m[4]) < 0.99999) {
      out[0] = Math.atan2(m[6], m[5]);
      out[1] = Math.atan2(m[8], m[0]);
    } else {
      out[0] = Math.atan2(-m[9], m[10]);
      out[1] = 0;
    }
  }

  return out;
}
},{}],"../../vendors/ogl/src/math/Euler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Euler = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var EulerFunc = _interopRequireWildcard(require("./functions/EulerFunc.js"));

var _Mat = require("./Mat4.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var tmpMat4 = new _Mat.Mat4();

var Euler = /*#__PURE__*/function (_Array) {
  (0, _inherits2.default)(Euler, _Array);

  var _super = _createSuper(Euler);

  function Euler() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
    var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'YXZ';
    (0, _classCallCheck2.default)(this, Euler);
    _this = _super.call(this, x, y, z);
    _this.order = order;

    _this.onChange = function () {};

    return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
  }

  (0, _createClass2.default)(Euler, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x;
      if (x.length) return this.copy(x);
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this.onChange();
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this[0] = v[0];
      this[1] = v[1];
      this[2] = v[2];
      this.onChange();
      return this;
    }
  }, {
    key: "reorder",
    value: function reorder(order) {
      this.order = order;
      this.onChange();
      return this;
    }
  }, {
    key: "fromRotationMatrix",
    value: function fromRotationMatrix(m) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.order;
      EulerFunc.fromRotationMatrix(this, m, order);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.order;
      tmpMat4.fromQuaternion(q);
      return this.fromRotationMatrix(tmpMat4, order);
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
      this.onChange();
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
      this.onChange();
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(v) {
      this[2] = v;
      this.onChange();
    }
  }]);
  return Euler;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Array));

exports.Euler = Euler;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/wrapNativeSuper":"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js","./functions/EulerFunc.js":"../../vendors/ogl/src/math/functions/EulerFunc.js","./Mat4.js":"../../vendors/ogl/src/math/Mat4.js"}],"../../vendors/ogl/src/core/Transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Vec = require("../math/Vec3.js");

var _Quat = require("../math/Quat.js");

var _Mat = require("../math/Mat4.js");

var _Euler = require("../math/Euler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transform = /*#__PURE__*/function () {
  function Transform() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Transform);
    this.parent = null;
    this.children = [];
    this.visible = true;
    this.matrix = new _Mat.Mat4();
    this.worldMatrix = new _Mat.Mat4();
    this.matrixAutoUpdate = true;
    this.position = new _Vec.Vec3();
    this.quaternion = new _Quat.Quat();
    this.scale = new _Vec.Vec3(1);
    this.rotation = new _Euler.Euler();
    this.up = new _Vec.Vec3(0, 1, 0);

    this.rotation.onChange = function () {
      return _this.quaternion.fromEuler(_this.rotation);
    };

    this.quaternion.onChange = function () {
      return _this.rotation.fromQuaternion(_this.quaternion);
    };
  }

  (0, _createClass2.default)(Transform, [{
    key: "setParent",
    value: function setParent(parent) {
      var notifyParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (notifyParent && this.parent && parent !== this.parent) this.parent.removeChild(this, false);
      this.parent = parent;
      if (notifyParent && parent) parent.addChild(this, false);
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      var notifyChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!~this.children.indexOf(child)) this.children.push(child);
      if (notifyChild) child.setParent(this, false);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var notifyChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
      if (notifyChild) child.setParent(null, false);
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld(force) {
      if (this.matrixAutoUpdate) this.updateMatrix();

      if (this.worldMatrixNeedsUpdate || force) {
        if (this.parent === null) this.worldMatrix.copy(this.matrix);else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
        this.worldMatrixNeedsUpdate = false;
        force = true;
      }

      for (var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].updateMatrixWorld(force);
      }
    }
  }, {
    key: "updateMatrix",
    value: function updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale);
      this.worldMatrixNeedsUpdate = true;
    }
  }, {
    key: "traverse",
    value: function traverse(callback) {
      // Return true in callback to stop traversing children
      if (callback(this)) return;

      for (var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].traverse(callback);
      }
    }
  }, {
    key: "decompose",
    value: function decompose() {
      this.matrix.getTranslation(this.position);
      this.matrix.getRotation(this.quaternion);
      this.matrix.getScaling(this.scale);
      this.rotation.fromQuaternion(this.quaternion);
    }
  }, {
    key: "lookAt",
    value: function lookAt(target) {
      var invert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (invert) this.matrix.lookAt(this.position, target, this.up);else this.matrix.lookAt(target, this.position, this.up);
      this.matrix.getRotation(this.quaternion);
      this.rotation.fromQuaternion(this.quaternion);
    }
  }]);
  return Transform;
}();

exports.Transform = Transform;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../math/Vec3.js":"../../vendors/ogl/src/math/Vec3.js","../math/Quat.js":"../../vendors/ogl/src/math/Quat.js","../math/Mat4.js":"../../vendors/ogl/src/math/Mat4.js","../math/Euler.js":"../../vendors/ogl/src/math/Euler.js"}],"../../vendors/ogl/src/core/Renderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderer = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Vec = require("../math/Vec3.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost
// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );
var tempVec3 = new _Vec.Vec3();
var ID = 1;

var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$canvas = _ref.canvas,
        canvas = _ref$canvas === void 0 ? document.createElement('canvas') : _ref$canvas,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 300 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 150 : _ref$height,
        _ref$dpr = _ref.dpr,
        dpr = _ref$dpr === void 0 ? 1 : _ref$dpr,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === void 0 ? false : _ref$alpha,
        _ref$depth = _ref.depth,
        depth = _ref$depth === void 0 ? true : _ref$depth,
        _ref$stencil = _ref.stencil,
        stencil = _ref$stencil === void 0 ? false : _ref$stencil,
        _ref$antialias = _ref.antialias,
        antialias = _ref$antialias === void 0 ? false : _ref$antialias,
        _ref$premultipliedAlp = _ref.premultipliedAlpha,
        premultipliedAlpha = _ref$premultipliedAlp === void 0 ? false : _ref$premultipliedAlp,
        _ref$preserveDrawingB = _ref.preserveDrawingBuffer,
        preserveDrawingBuffer = _ref$preserveDrawingB === void 0 ? false : _ref$preserveDrawingB,
        _ref$powerPreference = _ref.powerPreference,
        powerPreference = _ref$powerPreference === void 0 ? 'default' : _ref$powerPreference,
        _ref$autoClear = _ref.autoClear,
        autoClear = _ref$autoClear === void 0 ? true : _ref$autoClear,
        _ref$webgl = _ref.webgl,
        webgl = _ref$webgl === void 0 ? 2 : _ref$webgl;

    (0, _classCallCheck2.default)(this, Renderer);
    var attributes = {
      alpha: alpha,
      depth: depth,
      stencil: stencil,
      antialias: antialias,
      premultipliedAlpha: premultipliedAlpha,
      preserveDrawingBuffer: preserveDrawingBuffer,
      powerPreference: powerPreference
    };
    this.dpr = dpr;
    this.alpha = alpha;
    this.color = true;
    this.depth = depth;
    this.stencil = stencil;
    this.premultipliedAlpha = premultipliedAlpha;
    this.autoClear = autoClear;
    this.id = ID++; // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1

    if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
    this.isWebgl2 = !!this.gl;

    if (!this.gl) {
      this.gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    } // Attach renderer to gl so that all classes have access to internal state functions


    this.gl.renderer = this; // initialise size values

    this.setSize(width, height); // gl state stores to avoid redundant calls on methods used internally

    this.state = {};
    this.state.blendFunc = {
      src: this.gl.ONE,
      dst: this.gl.ZERO
    };
    this.state.blendEquation = {
      modeRGB: this.gl.FUNC_ADD
    };
    this.state.cullFace = null;
    this.state.frontFace = this.gl.CCW;
    this.state.depthMask = true;
    this.state.depthFunc = this.gl.LESS;
    this.state.premultiplyAlpha = false;
    this.state.flipY = false;
    this.state.unpackAlignment = 4;
    this.state.framebuffer = null;
    this.state.viewport = {
      width: null,
      height: null
    };
    this.state.textureUnits = [];
    this.state.activeTextureUnit = 0;
    this.state.boundBuffer = null;
    this.state.uniformLocations = new Map(); // store requested extensions

    this.extensions = {}; // Initialise extra format types

    if (this.isWebgl2) {
      this.getExtension('EXT_color_buffer_float');
      this.getExtension('OES_texture_float_linear');
    } else {
      this.getExtension('OES_texture_float');
      this.getExtension('OES_texture_float_linear');
      this.getExtension('OES_texture_half_float');
      this.getExtension('OES_texture_half_float_linear');
      this.getExtension('OES_element_index_uint');
      this.getExtension('OES_standard_derivatives');
      this.getExtension('EXT_sRGB');
      this.getExtension('WEBGL_depth_texture');
      this.getExtension('WEBGL_draw_buffers');
    } // Create method aliases using extension (WebGL1) or native if available (WebGL2)


    this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
    this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
    this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
    this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
    this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
    this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
    this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL'); // Store device parameters

    this.parameters = {};
    this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic') ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
  }

  (0, _createClass2.default)(Renderer, [{
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
      this.gl.canvas.width = width * this.dpr;
      this.gl.canvas.height = height * this.dpr;
      Object.assign(this.gl.canvas.style, {
        width: width + 'px',
        height: height + 'px'
      });
    }
  }, {
    key: "setViewport",
    value: function setViewport(width, height) {
      if (this.state.viewport.width === width && this.state.viewport.height === height) return;
      this.state.viewport.width = width;
      this.state.viewport.height = height;
      this.gl.viewport(0, 0, width, height);
    }
  }, {
    key: "enable",
    value: function enable(id) {
      if (this.state[id] === true) return;
      this.gl.enable(id);
      this.state[id] = true;
    }
  }, {
    key: "disable",
    value: function disable(id) {
      if (this.state[id] === false) return;
      this.gl.disable(id);
      this.state[id] = false;
    }
  }, {
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      if (this.state.blendFunc.src === src && this.state.blendFunc.dst === dst && this.state.blendFunc.srcAlpha === srcAlpha && this.state.blendFunc.dstAlpha === dstAlpha) return;
      this.state.blendFunc.src = src;
      this.state.blendFunc.dst = dst;
      this.state.blendFunc.srcAlpha = srcAlpha;
      this.state.blendFunc.dstAlpha = dstAlpha;
      if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);else this.gl.blendFunc(src, dst);
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
      this.state.blendEquation.modeRGB = modeRGB;
      this.state.blendEquation.modeAlpha = modeAlpha;
      if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);else this.gl.blendEquation(modeRGB);
    }
  }, {
    key: "setCullFace",
    value: function setCullFace(value) {
      if (this.state.cullFace === value) return;
      this.state.cullFace = value;
      this.gl.cullFace(value);
    }
  }, {
    key: "setFrontFace",
    value: function setFrontFace(value) {
      if (this.state.frontFace === value) return;
      this.state.frontFace = value;
      this.gl.frontFace(value);
    }
  }, {
    key: "setDepthMask",
    value: function setDepthMask(value) {
      if (this.state.depthMask === value) return;
      this.state.depthMask = value;
      this.gl.depthMask(value);
    }
  }, {
    key: "setDepthFunc",
    value: function setDepthFunc(value) {
      if (this.state.depthFunc === value) return;
      this.state.depthFunc = value;
      this.gl.depthFunc(value);
    }
  }, {
    key: "activeTexture",
    value: function activeTexture(value) {
      if (this.state.activeTextureUnit === value) return;
      this.state.activeTextureUnit = value;
      this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }
  }, {
    key: "bindFramebuffer",
    value: function bindFramebuffer() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$target = _ref2.target,
          target = _ref2$target === void 0 ? this.gl.FRAMEBUFFER : _ref2$target,
          _ref2$buffer = _ref2.buffer,
          buffer = _ref2$buffer === void 0 ? null : _ref2$buffer;

      if (this.state.framebuffer === buffer) return;
      this.state.framebuffer = buffer;
      this.gl.bindFramebuffer(target, buffer);
    }
  }, {
    key: "getExtension",
    value: function getExtension(extension, webgl2Func, extFunc) {
      // if webgl2 function supported, return func bound to gl context
      if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl); // fetch extension once only

      if (!this.extensions[extension]) {
        this.extensions[extension] = this.gl.getExtension(extension);
      } // return extension if no function requested


      if (!webgl2Func) return this.extensions[extension]; // Return null if extension not supported

      if (!this.extensions[extension]) return null; // return extension function, bound to extension

      return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }
  }, {
    key: "sortOpaque",
    value: function sortOpaque(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else if (a.zDepth !== b.zDepth) {
        return a.zDepth - b.zDepth;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "sortTransparent",
    value: function sortTransparent(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      }

      if (a.zDepth !== b.zDepth) {
        return b.zDepth - a.zDepth;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "sortUI",
    value: function sortUI(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else {
        return b.id - a.id;
      }
    }
  }, {
    key: "getRenderList",
    value: function getRenderList(_ref3) {
      var scene = _ref3.scene,
          camera = _ref3.camera,
          frustumCull = _ref3.frustumCull,
          sort = _ref3.sort;
      var renderList = [];
      if (camera && frustumCull) camera.updateFrustum(); // Get visible

      scene.traverse(function (node) {
        if (!node.visible) return true;
        if (!node.draw) return;

        if (frustumCull && node.frustumCulled && camera) {
          if (!camera.frustumIntersectsMesh(node)) return;
        }

        renderList.push(node);
      });

      if (sort) {
        var opaque = [];
        var transparent = []; // depthTest true

        var ui = []; // depthTest false

        renderList.forEach(function (node) {
          // Split into the 3 render groups
          if (!node.program.transparent) {
            opaque.push(node);
          } else if (node.program.depthTest) {
            transparent.push(node);
          } else {
            ui.push(node);
          }

          node.zDepth = 0; // Only calculate z-depth if renderOrder unset and depthTest is true

          if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return; // update z-depth

          node.worldMatrix.getTranslation(tempVec3);
          tempVec3.applyMatrix4(camera.projectionViewMatrix);
          node.zDepth = tempVec3.z;
        });
        opaque.sort(this.sortOpaque);
        transparent.sort(this.sortTransparent);
        ui.sort(this.sortUI);
        renderList = opaque.concat(transparent, ui);
      }

      return renderList;
    }
  }, {
    key: "render",
    value: function render(_ref4) {
      var scene = _ref4.scene,
          camera = _ref4.camera,
          _ref4$target = _ref4.target,
          target = _ref4$target === void 0 ? null : _ref4$target,
          _ref4$update = _ref4.update,
          update = _ref4$update === void 0 ? true : _ref4$update,
          _ref4$sort = _ref4.sort,
          sort = _ref4$sort === void 0 ? true : _ref4$sort,
          _ref4$frustumCull = _ref4.frustumCull,
          frustumCull = _ref4$frustumCull === void 0 ? true : _ref4$frustumCull,
          clear = _ref4.clear;

      if (target === null) {
        // make sure no render target bound so draws to canvas
        this.bindFramebuffer();
        this.setViewport(this.width * this.dpr, this.height * this.dpr);
      } else {
        // bind supplied render target and update viewport
        this.bindFramebuffer(target);
        this.setViewport(target.width, target.height);
      }

      if (clear || this.autoClear && clear !== false) {
        // Ensure depth buffer writing is enabled so it can be cleared
        if (this.depth && (!target || target.depth)) {
          this.enable(this.gl.DEPTH_TEST);
          this.setDepthMask(true);
        }

        this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0));
      } // updates all scene graph matrices


      if (update) scene.updateMatrixWorld(); // Update camera separately, in case not in scene graph

      if (camera) camera.updateMatrixWorld(); // Get render list - entails culling and sorting

      var renderList = this.getRenderList({
        scene: scene,
        camera: camera,
        frustumCull: frustumCull,
        sort: sort
      });
      renderList.forEach(function (node) {
        node.draw({
          camera: camera
        });
      });
    }
  }]);
  return Renderer;
}();

exports.Renderer = Renderer;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../math/Vec3.js":"../../vendors/ogl/src/math/Vec3.js"}],"../../vendors/ogl/src/core/Camera.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Transform2 = require("./Transform.js");

var _Mat = require("../math/Mat4.js");

var _Vec = require("../math/Vec3.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var tempMat4 = new _Mat.Mat4();
var tempVec3a = new _Vec.Vec3();
var tempVec3b = new _Vec.Vec3();

var Camera = /*#__PURE__*/function (_Transform) {
  (0, _inherits2.default)(Camera, _Transform);

  var _super = _createSuper(Camera);

  function Camera(gl) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$near = _ref.near,
        near = _ref$near === void 0 ? 0.1 : _ref$near,
        _ref$far = _ref.far,
        far = _ref$far === void 0 ? 100 : _ref$far,
        _ref$fov = _ref.fov,
        fov = _ref$fov === void 0 ? 45 : _ref$fov,
        _ref$aspect = _ref.aspect,
        aspect = _ref$aspect === void 0 ? 1 : _ref$aspect,
        left = _ref.left,
        right = _ref.right,
        bottom = _ref.bottom,
        top = _ref.top,
        _ref$zoom = _ref.zoom,
        zoom = _ref$zoom === void 0 ? 1 : _ref$zoom;

    (0, _classCallCheck2.default)(this, Camera);
    _this = _super.call(this);
    Object.assign((0, _assertThisInitialized2.default)(_this), {
      near: near,
      far: far,
      fov: fov,
      aspect: aspect,
      left: left,
      right: right,
      bottom: bottom,
      top: top,
      zoom: zoom
    });
    _this.projectionMatrix = new _Mat.Mat4();
    _this.viewMatrix = new _Mat.Mat4();
    _this.projectionViewMatrix = new _Mat.Mat4();
    _this.worldPosition = new _Vec.Vec3(); // Use orthographic if left/right set, else default to perspective camera

    _this.type = left || right ? 'orthographic' : 'perspective';
    if (_this.type === 'orthographic') _this.orthographic();else _this.perspective();
    return _this;
  }

  (0, _createClass2.default)(Camera, [{
    key: "perspective",
    value: function perspective() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$near = _ref2.near,
          near = _ref2$near === void 0 ? this.near : _ref2$near,
          _ref2$far = _ref2.far,
          far = _ref2$far === void 0 ? this.far : _ref2$far,
          _ref2$fov = _ref2.fov,
          fov = _ref2$fov === void 0 ? this.fov : _ref2$fov,
          _ref2$aspect = _ref2.aspect,
          aspect = _ref2$aspect === void 0 ? this.aspect : _ref2$aspect;

      Object.assign(this, {
        near: near,
        far: far,
        fov: fov,
        aspect: aspect
      });
      this.projectionMatrix.fromPerspective({
        fov: fov * (Math.PI / 180),
        aspect: aspect,
        near: near,
        far: far
      });
      this.type = 'perspective';
      return this;
    }
  }, {
    key: "orthographic",
    value: function orthographic() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$near = _ref3.near,
          near = _ref3$near === void 0 ? this.near : _ref3$near,
          _ref3$far = _ref3.far,
          far = _ref3$far === void 0 ? this.far : _ref3$far,
          _ref3$left = _ref3.left,
          left = _ref3$left === void 0 ? this.left : _ref3$left,
          _ref3$right = _ref3.right,
          right = _ref3$right === void 0 ? this.right : _ref3$right,
          _ref3$bottom = _ref3.bottom,
          bottom = _ref3$bottom === void 0 ? this.bottom : _ref3$bottom,
          _ref3$top = _ref3.top,
          top = _ref3$top === void 0 ? this.top : _ref3$top,
          _ref3$zoom = _ref3.zoom,
          zoom = _ref3$zoom === void 0 ? this.zoom : _ref3$zoom;

      Object.assign(this, {
        near: near,
        far: far,
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        zoom: zoom
      });
      left /= zoom;
      right /= zoom;
      bottom /= zoom;
      top /= zoom;
      this.projectionMatrix.fromOrthogonal({
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        near: near,
        far: far
      });
      this.type = 'orthographic';
      return this;
    }
  }, {
    key: "updateMatrixWorld",
    value: function updateMatrixWorld() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Camera.prototype), "updateMatrixWorld", this).call(this);
      this.viewMatrix.inverse(this.worldMatrix);
      this.worldMatrix.getTranslation(this.worldPosition); // used for sorting

      this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
      return this;
    }
  }, {
    key: "lookAt",
    value: function lookAt(target) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Camera.prototype), "lookAt", this).call(this, target, true);
      return this;
    } // Project 3D coordinate to 2D point

  }, {
    key: "project",
    value: function project(v) {
      v.applyMatrix4(this.viewMatrix);
      v.applyMatrix4(this.projectionMatrix);
      return this;
    } // Unproject 2D point to 3D coordinate

  }, {
    key: "unproject",
    value: function unproject(v) {
      v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
      v.applyMatrix4(this.worldMatrix);
      return this;
    }
  }, {
    key: "updateFrustum",
    value: function updateFrustum() {
      if (!this.frustum) {
        this.frustum = [new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3(), new _Vec.Vec3()];
      }

      var m = this.projectionViewMatrix;
      this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x

      this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x

      this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y

      this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y

      this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)

      this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

      for (var i = 0; i < 6; i++) {
        var invLen = 1.0 / this.frustum[i].distance();
        this.frustum[i].multiply(invLen);
        this.frustum[i].constant *= invLen;
      }
    }
  }, {
    key: "frustumIntersectsMesh",
    value: function frustumIntersectsMesh(node) {
      // If no position attribute, treat as frustumCulled false
      if (!node.geometry.attributes.position) return true;
      if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();
      if (!node.geometry.bounds) return true;
      var center = tempVec3a;
      center.copy(node.geometry.bounds.center);
      center.applyMatrix4(node.worldMatrix);
      var radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(center, radius);
    }
  }, {
    key: "frustumIntersectsSphere",
    value: function frustumIntersectsSphere(center, radius) {
      var normal = tempVec3b;

      for (var i = 0; i < 6; i++) {
        var plane = this.frustum[i];
        var distance = normal.copy(plane).dot(center) + plane.constant;
        if (distance < -radius) return false;
      }

      return true;
    }
  }]);
  return Camera;
}(_Transform2.Transform);

exports.Camera = Camera;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/get":"../../node_modules/@babel/runtime/helpers/get.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","./Transform.js":"../../vendors/ogl/src/core/Transform.js","../math/Mat4.js":"../../vendors/ogl/src/math/Mat4.js","../math/Vec3.js":"../../vendors/ogl/src/math/Vec3.js"}],"../../vendors/ogl/src/math/functions/Vec2Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.scale = scale;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.exactEquals = exactEquals;
var EPSILON = 0.000001;
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */


function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product returns a scalar
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} cross product of a and b
 */


function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */


function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
},{}],"../../vendors/ogl/src/math/Vec2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec2 = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var Vec2Func = _interopRequireWildcard(require("./functions/Vec2Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Vec2 = /*#__PURE__*/function (_Array) {
  (0, _inherits2.default)(Vec2, _Array);

  var _super = _createSuper(Vec2);

  function Vec2() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    (0, _classCallCheck2.default)(this, Vec2);
    _this = _super.call(this, x, y);
    return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
  }

  (0, _createClass2.default)(Vec2, [{
    key: "set",
    value: function set(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      if (x.length) return this.copy(x);
      Vec2Func.set(this, x, y);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(v) {
      Vec2Func.copy(this, v);
      return this;
    }
  }, {
    key: "add",
    value: function add(va, vb) {
      if (vb) Vec2Func.add(this, va, vb);else Vec2Func.add(this, this, va);
      return this;
    }
  }, {
    key: "sub",
    value: function sub(va, vb) {
      if (vb) Vec2Func.subtract(this, va, vb);else Vec2Func.subtract(this, this, va);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      if (v.length) Vec2Func.multiply(this, this, v);else Vec2Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      if (v.length) Vec2Func.divide(this, this, v);else Vec2Func.scale(this, this, 1 / v);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec2Func.inverse(this, v);
      return this;
    } // Can't use 'length' as Array.prototype uses it

  }, {
    key: "len",
    value: function len() {
      return Vec2Func.length(this);
    }
  }, {
    key: "distance",
    value: function distance(v) {
      if (v) return Vec2Func.distance(this, v);else return Vec2Func.length(this);
    }
  }, {
    key: "squaredLen",
    value: function squaredLen() {
      return this.squaredDistance();
    }
  }, {
    key: "squaredDistance",
    value: function squaredDistance(v) {
      if (v) return Vec2Func.squaredDistance(this, v);else return Vec2Func.squaredLength(this);
    }
  }, {
    key: "negate",
    value: function negate() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Vec2Func.negate(this, v);
      return this;
    }
  }, {
    key: "cross",
    value: function cross(va, vb) {
      if (vb) return Vec2Func.cross(va, vb);
      return Vec2Func.cross(this, va);
    }
  }, {
    key: "scale",
    value: function scale(v) {
      Vec2Func.scale(this, this, v);
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      Vec2Func.normalize(this, this);
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return Vec2Func.dot(this, v);
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return Vec2Func.exactEquals(this, v);
    }
  }, {
    key: "applyMatrix3",
    value: function applyMatrix3(mat3) {
      Vec2Func.transformMat3(this, this, mat3);
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(mat4) {
      Vec2Func.transformMat4(this, this, mat4);
      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(v, a) {
      Vec2Func.lerp(this, this, v, a);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec2(this[0], this[1]);
    }
  }, {
    key: "fromArray",
    value: function fromArray(a) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this[0] = a[o];
      this[1] = a[o + 1];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      a[o] = this[0];
      a[o + 1] = this[1];
      return a;
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(v) {
      this[0] = v;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(v) {
      this[1] = v;
    }
  }]);
  return Vec2;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Array));

exports.Vec2 = Vec2;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/wrapNativeSuper":"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js","./functions/Vec2Func.js":"../../vendors/ogl/src/math/functions/Vec2Func.js"}],"../../vendors/ogl/src/core/Program.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube
var ID = 1; // cache of typed arrays used to flatten uniform arrays

var arrayCacheF32 = {};

var Program = /*#__PURE__*/function () {
  function Program(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        vertex = _ref.vertex,
        fragment = _ref.fragment,
        _ref$uniforms = _ref.uniforms,
        uniforms = _ref$uniforms === void 0 ? {} : _ref$uniforms,
        _ref$transparent = _ref.transparent,
        transparent = _ref$transparent === void 0 ? false : _ref$transparent,
        _ref$cullFace = _ref.cullFace,
        cullFace = _ref$cullFace === void 0 ? gl.BACK : _ref$cullFace,
        _ref$frontFace = _ref.frontFace,
        frontFace = _ref$frontFace === void 0 ? gl.CCW : _ref$frontFace,
        _ref$depthTest = _ref.depthTest,
        depthTest = _ref$depthTest === void 0 ? true : _ref$depthTest,
        _ref$depthWrite = _ref.depthWrite,
        depthWrite = _ref$depthWrite === void 0 ? true : _ref$depthWrite,
        _ref$depthFunc = _ref.depthFunc,
        depthFunc = _ref$depthFunc === void 0 ? gl.LESS : _ref$depthFunc;

    (0, _classCallCheck2.default)(this, Program);
    if (!gl.canvas) console.error('gl not passed as fist argument to Program');
    this.gl = gl;
    this.uniforms = uniforms;
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied'); // Store program state

    this.transparent = transparent;
    this.cullFace = cullFace;
    this.frontFace = frontFace;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.blendFunc = {};
    this.blendEquation = {}; // set default blendFunc if transparent flagged

    if (this.transparent && !this.blendFunc.src) {
      if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } // compile vertex shader and log errors


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    if (gl.getShaderInfoLog(vertexShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(vertexShader), "\nVertex Shader\n").concat(addLineNumbers(vertex)));
    } // compile fragment shader and log errors


    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    if (gl.getShaderInfoLog(fragmentShader) !== '') {
      console.warn("".concat(gl.getShaderInfoLog(fragmentShader), "\nFragment Shader\n").concat(addLineNumbers(fragment)));
    } // compile program and log errors


    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      return console.warn(gl.getProgramInfoLog(this.program));
    } // Remove shader once linked


    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader); // Get active uniform locations

    this.uniformLocations = new Map();
    var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (var uIndex = 0; uIndex < numUniforms; uIndex++) {
      var uniform = gl.getActiveUniform(this.program, uIndex);
      this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name)); // split uniforms' names to separate array and struct declarations

      var split = uniform.name.match(/(\w+)/g);
      uniform.uniformName = split[0];

      if (split.length === 3) {
        uniform.isStructArray = true;
        uniform.structIndex = Number(split[1]);
        uniform.structProperty = split[2];
      } else if (split.length === 2 && isNaN(Number(split[1]))) {
        uniform.isStruct = true;
        uniform.structProperty = split[1];
      }
    } // Get active attribute locations


    this.attributeLocations = new Map();
    var locations = [];
    var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

    for (var aIndex = 0; aIndex < numAttribs; aIndex++) {
      var attribute = gl.getActiveAttrib(this.program, aIndex);
      var location = gl.getAttribLocation(this.program, attribute.name);
      locations[location] = attribute.name;
      this.attributeLocations.set(attribute, location);
    }

    this.attributeOrder = locations.join('');
  }

  (0, _createClass2.default)(Program, [{
    key: "setBlendFunc",
    value: function setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      this.blendFunc.src = src;
      this.blendFunc.dst = dst;
      this.blendFunc.srcAlpha = srcAlpha;
      this.blendFunc.dstAlpha = dstAlpha;
      if (src) this.transparent = true;
    }
  }, {
    key: "setBlendEquation",
    value: function setBlendEquation(modeRGB, modeAlpha) {
      this.blendEquation.modeRGB = modeRGB;
      this.blendEquation.modeAlpha = modeAlpha;
    }
  }, {
    key: "applyState",
    value: function applyState() {
      if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);else this.gl.renderer.disable(this.gl.DEPTH_TEST);
      if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);else this.gl.renderer.disable(this.gl.CULL_FACE);
      if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);else this.gl.renderer.disable(this.gl.BLEND);
      if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
      this.gl.renderer.setFrontFace(this.frontFace);
      this.gl.renderer.setDepthMask(this.depthWrite);
      this.gl.renderer.setDepthFunc(this.depthFunc);
      if (this.blendFunc.src) this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
      if (this.blendEquation.modeRGB) this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }
  }, {
    key: "use",
    value: function use() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$flipFaces = _ref2.flipFaces,
          flipFaces = _ref2$flipFaces === void 0 ? false : _ref2$flipFaces;

      var textureUnit = -1;
      var programActive = this.gl.renderer.currentProgram === this.id; // Avoid gl call if program already in use

      if (!programActive) {
        this.gl.useProgram(this.program);
        this.gl.renderer.currentProgram = this.id;
      } // Set only the active uniforms found in the shader


      this.uniformLocations.forEach(function (location, activeUniform) {
        var name = activeUniform.uniformName; // get supplied uniform

        var uniform = _this.uniforms[name]; // For structs, get the specific property instead of the entire object

        if (activeUniform.isStruct) {
          uniform = uniform[activeUniform.structProperty];
          name += ".".concat(activeUniform.structProperty);
        }

        if (activeUniform.isStructArray) {
          uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
          name += "[".concat(activeUniform.structIndex, "].").concat(activeUniform.structProperty);
        }

        if (!uniform) {
          return warn("Active uniform ".concat(name, " has not been supplied"));
        }

        if (uniform && uniform.value === undefined) {
          return warn("".concat(name, " uniform is missing a value parameter"));
        }

        if (uniform.value.texture) {
          textureUnit = textureUnit + 1; // Check if texture needs to be updated

          uniform.value.update(textureUnit);
          return setUniform(_this.gl, activeUniform.type, location, textureUnit);
        } // For texture arrays, set uniform as an array of texture units instead of just one


        if (uniform.value.length && uniform.value[0].texture) {
          var textureUnits = [];
          uniform.value.forEach(function (value) {
            textureUnit = textureUnit + 1;
            value.update(textureUnit);
            textureUnits.push(textureUnit);
          });
          return setUniform(_this.gl, activeUniform.type, location, textureUnits);
        }

        setUniform(_this.gl, activeUniform.type, location, uniform.value);
      });
      this.applyState();
      if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.gl.deleteProgram(this.program);
    }
  }]);
  return Program;
}();

exports.Program = Program;

function setUniform(gl, type, location, value) {
  value = value.length ? flatten(value) : value;
  var setValue = gl.renderer.state.uniformLocations.get(location); // Avoid redundant uniform commands

  if (value.length) {
    if (setValue === undefined || setValue.length !== value.length) {
      // clone array to store as cache
      gl.renderer.state.uniformLocations.set(location, value.slice(0));
    } else {
      if (arraysEqual(setValue, value)) return; // Update cached array values

      setValue.set ? setValue.set(value) : setArray(setValue, value);
      gl.renderer.state.uniformLocations.set(location, setValue);
    }
  } else {
    if (setValue === value) return;
    gl.renderer.state.uniformLocations.set(location, value);
  }

  switch (type) {
    case 5126:
      return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
    // FLOAT

    case 35664:
      return gl.uniform2fv(location, value);
    // FLOAT_VEC2

    case 35665:
      return gl.uniform3fv(location, value);
    // FLOAT_VEC3

    case 35666:
      return gl.uniform4fv(location, value);
    // FLOAT_VEC4

    case 35670: // BOOL

    case 5124: // INT

    case 35678: // SAMPLER_2D

    case 35680:
      return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
    // SAMPLER_CUBE

    case 35671: // BOOL_VEC2

    case 35667:
      return gl.uniform2iv(location, value);
    // INT_VEC2

    case 35672: // BOOL_VEC3

    case 35668:
      return gl.uniform3iv(location, value);
    // INT_VEC3

    case 35673: // BOOL_VEC4

    case 35669:
      return gl.uniform4iv(location, value);
    // INT_VEC4

    case 35674:
      return gl.uniformMatrix2fv(location, false, value);
    // FLOAT_MAT2

    case 35675:
      return gl.uniformMatrix3fv(location, false, value);
    // FLOAT_MAT3

    case 35676:
      return gl.uniformMatrix4fv(location, false, value);
    // FLOAT_MAT4
  }
}

function addLineNumbers(string) {
  var lines = string.split('\n');

  for (var i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }

  return lines.join('\n');
}

function flatten(a) {
  var arrayLen = a.length;
  var valueLen = a[0].length;
  if (valueLen === undefined) return a;
  var length = arrayLen * valueLen;
  var value = arrayCacheF32[length];
  if (!value) arrayCacheF32[length] = value = new Float32Array(length);

  for (var i = 0; i < arrayLen; i++) {
    value.set(a[i], i * valueLen);
  }

  return value;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (var i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function setArray(a, b) {
  for (var i = 0, l = a.length; i < l; i++) {
    a[i] = b[i];
  }
}

var warnCount = 0;

function warn(message) {
  if (warnCount > 100) return;
  console.warn(message);
  warnCount++;
  if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js"}],"../../vendors/ogl/src/math/functions/Mat3Func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromMat4 = fromMat4;
exports.fromQuat = fromQuat;
exports.copy = copy;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.normalFromMat4 = normalFromMat4;
exports.projection = projection;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
var EPSILON = 0.000001;
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */


function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */


function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */


function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
},{}],"../../vendors/ogl/src/math/Mat3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mat3 = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var Mat3Func = _interopRequireWildcard(require("./functions/Mat3Func.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Mat3 = /*#__PURE__*/function (_Array) {
  (0, _inherits2.default)(Mat3, _Array);

  var _super = _createSuper(Mat3);

  function Mat3() {
    var _this;

    var m00 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var m01 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var m02 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var m10 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var m11 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var m12 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var m20 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var m21 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    var m22 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
    (0, _classCallCheck2.default)(this, Mat3);
    _this = _super.call(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return (0, _possibleConstructorReturn2.default)(_this, (0, _assertThisInitialized2.default)(_this));
  }

  (0, _createClass2.default)(Mat3, [{
    key: "set",
    value: function set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      if (m00.length) return this.copy(m00);
      Mat3Func.set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.translate(this, m, v);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.rotate(this, m, v);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      Mat3Func.scale(this, m, v);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(ma, mb) {
      if (mb) {
        Mat3Func.multiply(this, ma, mb);
      } else {
        Mat3Func.multiply(this, this, ma);
      }

      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      Mat3Func.identity(this);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      Mat3Func.copy(this, m);
      return this;
    }
  }, {
    key: "fromMatrix4",
    value: function fromMatrix4(m) {
      Mat3Func.fromMat4(this, m);
      return this;
    }
  }, {
    key: "fromQuaternion",
    value: function fromQuaternion(q) {
      Mat3Func.fromQuat(this, q);
      return this;
    }
  }, {
    key: "fromBasis",
    value: function fromBasis(vec3a, vec3b, vec3c) {
      this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
      Mat3Func.invert(this, m);
      return this;
    }
  }, {
    key: "getNormalMatrix",
    value: function getNormalMatrix(m) {
      Mat3Func.normalFromMat4(this, m);
      return this;
    }
  }]);
  return Mat3;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Array));

exports.Mat3 = Mat3;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/wrapNativeSuper":"../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js","./functions/Mat3Func.js":"../../vendors/ogl/src/math/functions/Mat3Func.js"}],"../../vendors/ogl/src/core/Mesh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Transform2 = require("./Transform.js");

var _Mat = require("../math/Mat3.js");

var _Mat2 = require("../math/Mat4.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ID = 0;

var Mesh = /*#__PURE__*/function (_Transform) {
  (0, _inherits2.default)(Mesh, _Transform);

  var _super = _createSuper(Mesh);

  function Mesh(gl) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        geometry = _ref.geometry,
        program = _ref.program,
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? gl.TRIANGLES : _ref$mode,
        _ref$frustumCulled = _ref.frustumCulled,
        frustumCulled = _ref$frustumCulled === void 0 ? true : _ref$frustumCulled,
        _ref$renderOrder = _ref.renderOrder,
        renderOrder = _ref$renderOrder === void 0 ? 0 : _ref$renderOrder;

    (0, _classCallCheck2.default)(this, Mesh);
    _this = _super.call(this);
    if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
    _this.gl = gl;
    _this.id = ID++;
    _this.geometry = geometry;
    _this.program = program;
    _this.mode = mode; // Used to skip frustum culling

    _this.frustumCulled = frustumCulled; // Override sorting to force an order

    _this.renderOrder = renderOrder;
    _this.modelViewMatrix = new _Mat2.Mat4();
    _this.normalMatrix = new _Mat.Mat3();
    _this.beforeRenderCallbacks = [];
    _this.afterRenderCallbacks = [];
    return _this;
  }

  (0, _createClass2.default)(Mesh, [{
    key: "onBeforeRender",
    value: function onBeforeRender(f) {
      this.beforeRenderCallbacks.push(f);
      return this;
    }
  }, {
    key: "onAfterRender",
    value: function onAfterRender(f) {
      this.afterRenderCallbacks.push(f);
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          camera = _ref2.camera;

      this.beforeRenderCallbacks.forEach(function (f) {
        return f && f({
          mesh: _this2,
          camera: camera
        });
      });

      if (camera) {
        // Add empty matrix uniforms to program if unset
        if (!this.program.uniforms.modelMatrix) {
          Object.assign(this.program.uniforms, {
            modelMatrix: {
              value: null
            },
            viewMatrix: {
              value: null
            },
            modelViewMatrix: {
              value: null
            },
            normalMatrix: {
              value: null
            },
            projectionMatrix: {
              value: null
            },
            cameraPosition: {
              value: null
            }
          });
        } // Set the matrix uniforms


        this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
        this.program.uniforms.cameraPosition.value = camera.worldPosition;
        this.program.uniforms.viewMatrix.value = camera.viewMatrix;
        this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
        this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
        this.program.uniforms.modelMatrix.value = this.worldMatrix;
        this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
        this.program.uniforms.normalMatrix.value = this.normalMatrix;
      } // determine if faces need to be flipped - when mesh scaled negatively


      var flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
      this.program.use({
        flipFaces: flipFaces
      });
      this.geometry.draw({
        mode: this.mode,
        program: this.program
      });
      this.afterRenderCallbacks.forEach(function (f) {
        return f && f({
          mesh: _this2,
          camera: camera
        });
      });
    }
  }]);
  return Mesh;
}(_Transform2.Transform);

exports.Mesh = Mesh;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","./Transform.js":"../../vendors/ogl/src/core/Transform.js","../math/Mat3.js":"../../vendors/ogl/src/math/Mat3.js","../math/Mat4.js":"../../vendors/ogl/src/math/Mat4.js"}],"../../vendors/ogl/src/core/Texture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: delete texture
// TODO: use texSubImage2D for updates (video or when loaded)
// TODO: need? encoding = linearEncoding
// TODO: support non-compressed mipmaps uploads
var emptyPixel = new Uint8Array(4);

function isPowerOf2(value) {
  return (value & value - 1) === 0;
}

var ID = 1;

var Texture = /*#__PURE__*/function () {
  function Texture(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        image = _ref.image,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? gl.TEXTURE_2D : _ref$target,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? gl.UNSIGNED_BYTE : _ref$type,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? gl.RGBA : _ref$format,
        _ref$internalFormat = _ref.internalFormat,
        internalFormat = _ref$internalFormat === void 0 ? format : _ref$internalFormat,
        _ref$wrapS = _ref.wrapS,
        wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
        _ref$wrapT = _ref.wrapT,
        wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
        _ref$generateMipmaps = _ref.generateMipmaps,
        generateMipmaps = _ref$generateMipmaps === void 0 ? true : _ref$generateMipmaps,
        _ref$minFilter = _ref.minFilter,
        minFilter = _ref$minFilter === void 0 ? generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR : _ref$minFilter,
        _ref$magFilter = _ref.magFilter,
        magFilter = _ref$magFilter === void 0 ? gl.LINEAR : _ref$magFilter,
        _ref$premultiplyAlpha = _ref.premultiplyAlpha,
        premultiplyAlpha = _ref$premultiplyAlpha === void 0 ? false : _ref$premultiplyAlpha,
        _ref$unpackAlignment = _ref.unpackAlignment,
        unpackAlignment = _ref$unpackAlignment === void 0 ? 4 : _ref$unpackAlignment,
        _ref$flipY = _ref.flipY,
        flipY = _ref$flipY === void 0 ? target == gl.TEXTURE_2D ? true : false : _ref$flipY,
        _ref$anisotropy = _ref.anisotropy,
        anisotropy = _ref$anisotropy === void 0 ? 0 : _ref$anisotropy,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? 0 : _ref$level,
        width = _ref.width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? width : _ref$height;

    (0, _classCallCheck2.default)(this, Texture);
    this.gl = gl;
    this.id = ID++;
    this.image = image;
    this.target = target;
    this.type = type;
    this.format = format;
    this.internalFormat = internalFormat;
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.generateMipmaps = generateMipmaps;
    this.premultiplyAlpha = premultiplyAlpha;
    this.unpackAlignment = unpackAlignment;
    this.flipY = flipY;
    this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
    this.level = level;
    this.width = width;
    this.height = height;
    this.texture = this.gl.createTexture();
    this.store = {
      image: null
    }; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // State store to avoid redundant calls for per-texture state

    this.state = {};
    this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
    this.state.magFilter = this.gl.LINEAR;
    this.state.wrapS = this.gl.REPEAT;
    this.state.wrapT = this.gl.REPEAT;
    this.state.anisotropy = 0;
  }

  (0, _createClass2.default)(Texture, [{
    key: "bind",
    value: function bind() {
      // Already bound to active texture unit
      if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
      this.gl.bindTexture(this.target, this.texture);
      this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }
  }, {
    key: "update",
    value: function update() {
      var textureUnit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var needsUpdate = !(this.image === this.store.image && !this.needsUpdate); // Make sure that texture is bound to its texture unit

      if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
        // set active texture unit to perform texture functions
        this.gl.renderer.activeTexture(textureUnit);
        this.bind();
      }

      if (!needsUpdate) return;
      this.needsUpdate = false;

      if (this.flipY !== this.glState.flipY) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.glState.flipY = this.flipY;
      }

      if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        this.glState.premultiplyAlpha = this.premultiplyAlpha;
      }

      if (this.unpackAlignment !== this.glState.unpackAlignment) {
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        this.glState.unpackAlignment = this.unpackAlignment;
      }

      if (this.minFilter !== this.state.minFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.state.minFilter = this.minFilter;
      }

      if (this.magFilter !== this.state.magFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
        this.state.magFilter = this.magFilter;
      }

      if (this.wrapS !== this.state.wrapS) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.state.wrapS = this.wrapS;
      }

      if (this.wrapT !== this.state.wrapT) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.state.wrapT = this.wrapT;
      }

      if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
        this.gl.texParameterf(this.target, this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy);
        this.state.anisotropy = this.anisotropy;
      }

      if (this.image) {
        if (this.image.width) {
          this.width = this.image.width;
          this.height = this.image.height;
        }

        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          // For cube maps
          for (var i = 0; i < 6; i++) {
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, this.level, this.internalFormat, this.format, this.type, this.image[i]);
          }
        } else if (ArrayBuffer.isView(this.image)) {
          // Data texture
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
        } else if (this.image.isCompressedTexture) {
          // Compressed texture
          for (var level = 0; level < this.image.length; level++) {
            this.gl.compressedTexImage2D(this.target, level, this.internalFormat, this.image[level].width, this.image[level].height, 0, this.image[level].data);
          }
        } else {
          // Regular texture
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
        }

        if (this.generateMipmaps) {
          // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
          if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
            this.generateMipmaps = false;
            this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
            this.minFilter = this.gl.LINEAR;
          } else {
            this.gl.generateMipmap(this.target);
          }
        } // Callback for when data is pushed to GPU


        this.onUpdate && this.onUpdate();
      } else {
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          // Upload empty pixel for each side while no image to avoid errors while image or video loading
          for (var _i = 0; _i < 6; _i++) {
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + _i, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
          }
        } else if (this.width) {
          // image intentionally left null for RenderTarget
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
        } else {
          // Upload empty pixel if no image to avoid errors while image or video loading
          this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
        }
      }

      this.store.image = this.image;
    }
  }]);
  return Texture;
}();

exports.Texture = Texture;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js"}],"../../vendors/ogl/src/core/RenderTarget.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderTarget = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _Texture = require("./Texture.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: multi target rendering
// TODO: test stencil and depth
// TODO: destroy
// TODO: blit on resize?
var RenderTarget = function RenderTarget(gl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? gl.canvas.width : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? gl.canvas.height : _ref$height,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? gl.FRAMEBUFFER : _ref$target,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 1 : _ref$color,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? true : _ref$depth,
      _ref$stencil = _ref.stencil,
      stencil = _ref$stencil === void 0 ? false : _ref$stencil,
      _ref$depthTexture = _ref.depthTexture,
      depthTexture = _ref$depthTexture === void 0 ? false : _ref$depthTexture,
      _ref$wrapS = _ref.wrapS,
      wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
      _ref$wrapT = _ref.wrapT,
      wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
      _ref$minFilter = _ref.minFilter,
      minFilter = _ref$minFilter === void 0 ? gl.LINEAR : _ref$minFilter,
      _ref$magFilter = _ref.magFilter,
      magFilter = _ref$magFilter === void 0 ? minFilter : _ref$magFilter,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? gl.UNSIGNED_BYTE : _ref$type,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? gl.RGBA : _ref$format,
      _ref$internalFormat = _ref.internalFormat,
      internalFormat = _ref$internalFormat === void 0 ? format : _ref$internalFormat,
      unpackAlignment = _ref.unpackAlignment,
      premultiplyAlpha = _ref.premultiplyAlpha;

  (0, _classCallCheck2.default)(this, RenderTarget);
  this.gl = gl;
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.buffer = this.gl.createFramebuffer();
  this.target = target;
  this.gl.bindFramebuffer(this.target, this.buffer);
  this.textures = [];
  var drawBuffers = []; // create and attach required num of color textures

  for (var i = 0; i < color; i++) {
    this.textures.push(new _Texture.Texture(gl, {
      width: width,
      height: height,
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      type: type,
      format: format,
      internalFormat: internalFormat,
      unpackAlignment: unpackAlignment,
      premultiplyAlpha: premultiplyAlpha,
      flipY: false,
      generateMipmaps: false
    }));
    this.textures[i].update();
    this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0
    /* level */
    );
    drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
  } // For multi-render targets shader access


  if (drawBuffers.length > 1) this.gl.renderer.drawBuffers(drawBuffers); // alias for majority of use cases

  this.texture = this.textures[0]; // note depth textures break stencil - so can't use together

  if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension('WEBGL_depth_texture'))) {
    this.depthTexture = new _Texture.Texture(gl, {
      width: width,
      height: height,
      minFilter: this.gl.NEAREST,
      magFilter: this.gl.NEAREST,
      format: this.gl.DEPTH_COMPONENT,
      internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
      type: this.gl.UNSIGNED_INT
    });
    this.depthTexture.update();
    this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0
    /* level */
    );
  } else {
    // Render buffers
    if (depth && !stencil) {
      this.depthBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
    }

    if (stencil && !depth) {
      this.stencilBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
    }

    if (depth && stencil) {
      this.depthStencilBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
      this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
    }
  }

  this.gl.bindFramebuffer(this.target, null);
};

exports.RenderTarget = RenderTarget;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","./Texture.js":"../../vendors/ogl/src/core/Texture.js"}],"../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":[function(require,module,exports) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],"../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
},{"./arrayLikeToArray":"../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"../../node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"./arrayLikeToArray":"../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"../../node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
},{}],"../../node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray":"../../node_modules/@babel/runtime/helpers/iterableToArray.js","./unsupportedIterableToArray":"../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js","./nonIterableSpread":"../../node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"../../vendors/ogl/src/core/Geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Geometry = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Vec = require("../math/Vec3.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// attribute params
// {
//     data - typed array eg UInt16Array for indices, Float32Array
//     size - int default 1
//     instanced - default null. Pass divisor amount
//     type - gl enum default gl.UNSIGNED_SHORT for 'index', gl.FLOAT for others
//     normalized - boolean default false
//     buffer - gl buffer, if buffer exists, don't need to provide data
//     stride - default 0 - for when passing in buffer
//     offset - default 0 - for when passing in buffer
//     count - default null - for when passing in buffer
//     min - array - for when passing in buffer
//     max - array - for when passing in buffer
// }
// TODO: fit in transform feedback
// TODO: when would I disableVertexAttribArray ?
// TODO: use offset/stride if exists
var tempVec3 = new _Vec.Vec3();
var ID = 1;
var ATTR_ID = 1; // To stop inifinite warnings

var isBoundsWarned = false;

var Geometry = /*#__PURE__*/function () {
  function Geometry(gl) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Geometry);
    if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
    this.gl = gl;
    this.attributes = attributes;
    this.id = ID++; // Store one VAO per program attribute locations order

    this.VAOs = {};
    this.drawRange = {
      start: 0,
      count: 0
    };
    this.instancedCount = 0; // Unbind current VAO so that new buffers don't get added to active mesh

    this.gl.renderer.bindVertexArray(null);
    this.gl.renderer.currentGeometry = null; // Alias for state store to avoid redundant calls for global state

    this.glState = this.gl.renderer.state; // create the buffers

    for (var key in attributes) {
      this.addAttribute(key, attributes[key]);
    }
  }

  (0, _createClass2.default)(Geometry, [{
    key: "addAttribute",
    value: function addAttribute(key, attr) {
      this.attributes[key] = attr; // Set options

      attr.id = ATTR_ID++; // TODO: currently unused, remove?

      attr.size = attr.size || 1;
      attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT); // Uint32Array

      attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
      attr.normalized = attr.normalized || false;
      attr.stride = attr.stride || 0;
      attr.offset = attr.offset || 0;
      attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
      attr.divisor = attr.instanced || 0;
      attr.needsUpdate = false;

      if (!attr.buffer) {
        attr.buffer = this.gl.createBuffer(); // Push data to buffer

        this.updateAttribute(attr);
      } // Update geometry counts. If indexed, ignore regular attributes


      if (attr.divisor) {
        this.isInstanced = true;

        if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
          console.warn('geometry has multiple instanced buffers of different length');
          return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
        }

        this.instancedCount = attr.count * attr.divisor;
      } else if (key === 'index') {
        this.drawRange.count = attr.count;
      } else if (!this.attributes.index) {
        this.drawRange.count = Math.max(this.drawRange.count, attr.count);
      }
    }
  }, {
    key: "updateAttribute",
    value: function updateAttribute(attr) {
      if (this.glState.boundBuffer !== attr.buffer) {
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
      }

      this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
      attr.needsUpdate = false;
    }
  }, {
    key: "setIndex",
    value: function setIndex(value) {
      this.addAttribute('index', value);
    }
  }, {
    key: "setDrawRange",
    value: function setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
  }, {
    key: "setInstancedCount",
    value: function setInstancedCount(value) {
      this.instancedCount = value;
    }
  }, {
    key: "createVAO",
    value: function createVAO(program) {
      this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.bindAttributes(program);
    }
  }, {
    key: "bindAttributes",
    value: function bindAttributes(program) {
      var _this = this;

      // Link all attributes to program using gl.vertexAttribPointer
      program.attributeLocations.forEach(function (location, _ref) {
        var name = _ref.name,
            type = _ref.type;

        // If geometry missing a required shader attribute
        if (!_this.attributes[name]) {
          console.warn("active attribute ".concat(name, " not being supplied"));
          return;
        }

        var attr = _this.attributes[name];

        _this.gl.bindBuffer(attr.target, attr.buffer);

        _this.glState.boundBuffer = attr.buffer; // For matrix attributes, buffer needs to be defined per column

        var numLoc = 1;
        if (type === 35674) numLoc = 2; // mat2

        if (type === 35675) numLoc = 3; // mat3

        if (type === 35676) numLoc = 4; // mat4

        var size = attr.size / numLoc;
        var stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
        var offset = numLoc === 1 ? 0 : numLoc * numLoc;

        for (var i = 0; i < numLoc; i++) {
          _this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);

          _this.gl.enableVertexAttribArray(location + i); // For instanced attributes, divisor needs to be set.
          // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render


          _this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
        }
      }); // Bind indices if geometry indexed

      if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }
  }, {
    key: "draw",
    value: function draw(_ref2) {
      var _this2 = this;

      var program = _ref2.program,
          _ref2$mode = _ref2.mode,
          mode = _ref2$mode === void 0 ? this.gl.TRIANGLES : _ref2$mode;

      if (this.gl.renderer.currentGeometry !== "".concat(this.id, "_").concat(program.attributeOrder)) {
        if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.gl.renderer.currentGeometry = "".concat(this.id, "_").concat(program.attributeOrder);
      } // Check if any attributes need updating


      program.attributeLocations.forEach(function (location, _ref3) {
        var name = _ref3.name;
        var attr = _this2.attributes[name];
        if (attr.needsUpdate) _this2.updateAttribute(attr);
      });

      if (this.isInstanced) {
        if (this.attributes.index) {
          this.gl.renderer.drawElementsInstanced(mode, this.drawRange.count, this.attributes.index.type, this.drawRange.start, this.instancedCount);
        } else {
          this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
        }
      } else {
        if (this.attributes.index) {
          this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
        } else {
          this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
        }
      }
    }
  }, {
    key: "getPositionArray",
    value: function getPositionArray() {
      // Use position buffer, or min/max if available
      var attr = this.attributes.position;
      if (attr.min) return [].concat((0, _toConsumableArray2.default)(attr.min), (0, _toConsumableArray2.default)(attr.max));
      if (attr.data) return attr.data;
      if (isBoundsWarned) return;
      console.warn('No position buffer data found to compute bounds');
      return isBoundsWarned = true;
    }
  }, {
    key: "computeBoundingBox",
    value: function computeBoundingBox(array) {
      if (!array) array = this.getPositionArray();

      if (!this.bounds) {
        this.bounds = {
          min: new _Vec.Vec3(),
          max: new _Vec.Vec3(),
          center: new _Vec.Vec3(),
          scale: new _Vec.Vec3(),
          radius: Infinity
        };
      }

      var min = this.bounds.min;
      var max = this.bounds.max;
      var center = this.bounds.center;
      var scale = this.bounds.scale;
      min.set(+Infinity);
      max.set(-Infinity); // TODO: use offset/stride if exists
      // TODO: check size of position (eg triangle with Vec2)

      for (var i = 0, l = array.length; i < l; i += 3) {
        var x = array[i];
        var y = array[i + 1];
        var z = array[i + 2];
        min.x = Math.min(x, min.x);
        min.y = Math.min(y, min.y);
        min.z = Math.min(z, min.z);
        max.x = Math.max(x, max.x);
        max.y = Math.max(y, max.y);
        max.z = Math.max(z, max.z);
      }

      scale.sub(max, min);
      center.add(min, max).divide(2);
    }
  }, {
    key: "computeBoundingSphere",
    value: function computeBoundingSphere(array) {
      if (!array) array = this.getPositionArray();
      if (!this.bounds) this.computeBoundingBox(array);
      var maxRadiusSq = 0;

      for (var i = 0, l = array.length; i < l; i += 3) {
        tempVec3.fromArray(array, i);
        maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
      }

      this.bounds.radius = Math.sqrt(maxRadiusSq);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);

      for (var key in this.attributes) {
        this.gl.deleteBuffer(this.attributes[key].buffer);
        delete this.attributes[key];
      }
    }
  }]);
  return Geometry;
}();

exports.Geometry = Geometry;
},{"@babel/runtime/helpers/toConsumableArray":"../../node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../math/Vec3.js":"../../vendors/ogl/src/math/Vec3.js"}],"../../vendors/ogl/src/extras/Triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triangle = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Geometry2 = require("../core/Geometry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Triangle = /*#__PURE__*/function (_Geometry) {
  (0, _inherits2.default)(Triangle, _Geometry);

  var _super = _createSuper(Triangle);

  function Triangle(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    (0, _classCallCheck2.default)(this, Triangle);
    Object.assign(attributes, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 2, 0, 0, 2])
      }
    });
    return _super.call(this, gl, attributes);
  }

  return Triangle;
}(_Geometry2.Geometry);

exports.Triangle = Triangle;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","../core/Geometry.js":"../../vendors/ogl/src/core/Geometry.js"}],"../../vendors/ogl/src/extras/Post.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Program = require("../core/Program.js");

var _Mesh = require("../core/Mesh.js");

var _RenderTarget = require("../core/RenderTarget.js");

var _Triangle = require("./Triangle.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Destroy render targets if size changed and exists
var Post = /*#__PURE__*/function () {
  function Post(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        width = _ref.width,
        height = _ref.height,
        dpr = _ref.dpr,
        _ref$wrapS = _ref.wrapS,
        wrapS = _ref$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapS,
        _ref$wrapT = _ref.wrapT,
        wrapT = _ref$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _ref$wrapT,
        _ref$minFilter = _ref.minFilter,
        minFilter = _ref$minFilter === void 0 ? gl.LINEAR : _ref$minFilter,
        _ref$magFilter = _ref.magFilter,
        magFilter = _ref$magFilter === void 0 ? gl.LINEAR : _ref$magFilter,
        _ref$geometry = _ref.geometry,
        geometry = _ref$geometry === void 0 ? new _Triangle.Triangle(gl) : _ref$geometry,
        _ref$targetOnly = _ref.targetOnly,
        targetOnly = _ref$targetOnly === void 0 ? null : _ref$targetOnly;

    (0, _classCallCheck2.default)(this, Post);
    this.gl = gl;
    this.options = {
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter
    };
    this.passes = [];
    this.geometry = geometry;
    this.uniform = {
      value: null
    };
    this.targetOnly = targetOnly;
    var fbo = this.fbo = {
      read: null,
      write: null,
      swap: function swap() {
        var temp = fbo.read;
        fbo.read = fbo.write;
        fbo.write = temp;
      }
    };
    this.resize({
      width: width,
      height: height,
      dpr: dpr
    });
  }

  (0, _createClass2.default)(Post, [{
    key: "addPass",
    value: function addPass() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$vertex = _ref2.vertex,
          vertex = _ref2$vertex === void 0 ? defaultVertex : _ref2$vertex,
          _ref2$fragment = _ref2.fragment,
          fragment = _ref2$fragment === void 0 ? defaultFragment : _ref2$fragment,
          _ref2$uniforms = _ref2.uniforms,
          uniforms = _ref2$uniforms === void 0 ? {} : _ref2$uniforms,
          _ref2$textureUniform = _ref2.textureUniform,
          textureUniform = _ref2$textureUniform === void 0 ? 'tMap' : _ref2$textureUniform,
          _ref2$enabled = _ref2.enabled,
          enabled = _ref2$enabled === void 0 ? true : _ref2$enabled;

      uniforms[textureUniform] = {
        value: this.fbo.read.texture
      };
      var program = new _Program.Program(this.gl, {
        vertex: vertex,
        fragment: fragment,
        uniforms: uniforms
      });
      var mesh = new _Mesh.Mesh(this.gl, {
        geometry: this.geometry,
        program: program
      });
      var pass = {
        mesh: mesh,
        program: program,
        uniforms: uniforms,
        enabled: enabled,
        textureUniform: textureUniform
      };
      this.passes.push(pass);
      return pass;
    }
  }, {
    key: "resize",
    value: function resize() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          width = _ref3.width,
          height = _ref3.height,
          dpr = _ref3.dpr;

      if (dpr) this.dpr = dpr;

      if (width) {
        this.width = width;
        this.height = height || width;
      }

      dpr = this.dpr || this.gl.renderer.dpr;
      width = (this.width || this.gl.renderer.width) * dpr;
      height = (this.height || this.gl.renderer.height) * dpr;
      this.options.width = width;
      this.options.height = height;
      this.fbo.read = new _RenderTarget.RenderTarget(this.gl, this.options);
      this.fbo.write = new _RenderTarget.RenderTarget(this.gl, this.options);
    } // Uses same arguments as renderer.render

  }, {
    key: "render",
    value: function render(_ref4) {
      var _this = this;

      var scene = _ref4.scene,
          camera = _ref4.camera,
          _ref4$target = _ref4.target,
          target = _ref4$target === void 0 ? null : _ref4$target,
          _ref4$update = _ref4.update,
          update = _ref4$update === void 0 ? true : _ref4$update,
          _ref4$sort = _ref4.sort,
          sort = _ref4$sort === void 0 ? true : _ref4$sort,
          _ref4$frustumCull = _ref4.frustumCull,
          frustumCull = _ref4$frustumCull === void 0 ? true : _ref4$frustumCull;
      var enabledPasses = this.passes.filter(function (pass) {
        return pass.enabled;
      });
      this.gl.renderer.render({
        scene: scene,
        camera: camera,
        target: enabledPasses.length || !target && this.targetOnly ? this.fbo.write : target,
        update: update,
        sort: sort,
        frustumCull: frustumCull
      });
      this.fbo.swap();
      enabledPasses.forEach(function (pass, i) {
        pass.mesh.program.uniforms[pass.textureUniform].value = _this.fbo.read.texture;

        _this.gl.renderer.render({
          scene: pass.mesh,
          target: i === enabledPasses.length - 1 && (target || !_this.targetOnly) ? target : _this.fbo.write,
          clear: true
        });

        _this.fbo.swap();
      });
      this.uniform.value = this.fbo.read.texture;
    }
  }]);
  return Post;
}();

exports.Post = Post;
var defaultVertex =
/* glsl */
"\n    attribute vec2 uv;\n    attribute vec2 position;\n\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }\n";
var defaultFragment =
/* glsl */
"\n    precision highp float;\n\n    uniform sampler2D tMap;\n    varying vec2 vUv;\n\n    void main() {\n        gl_FragColor = texture2D(tMap, vUv);\n    }\n";
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../core/Program.js":"../../vendors/ogl/src/core/Program.js","../core/Mesh.js":"../../vendors/ogl/src/core/Mesh.js","../core/RenderTarget.js":"../../vendors/ogl/src/core/RenderTarget.js","./Triangle.js":"../../vendors/ogl/src/extras/Triangle.js"}],"../WebGL/post/fxaa.frag":[function(require,module,exports) {
module.exports = "            precision highp float;\n#define GLSLIFY 1\n\n            // Default uniform for previous pass is 'tMap'.\n            // Can change this using the 'textureUniform' property\n            // when adding a pass.\n            uniform sampler2D tMap;\n            uniform vec2 uResolution;\n            varying vec2 vUv;\n            vec4 fxaa(sampler2D tex, vec2 uv, vec2 resolution) {\n                vec2 pixel = vec2(1) / resolution;\n                vec3 l = vec3(0.299, 0.587, 0.114);\n                float lNW = dot(texture2D(tex, uv + vec2(-1, -1) * pixel).rgb, l);\n                float lNE = dot(texture2D(tex, uv + vec2( 1, -1) * pixel).rgb, l);\n                float lSW = dot(texture2D(tex, uv + vec2(-1,  1) * pixel).rgb, l);\n                float lSE = dot(texture2D(tex, uv + vec2( 1,  1) * pixel).rgb, l);\n                float lM  = dot(texture2D(tex, uv).rgb, l);\n                float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE)));\n                float lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));\n                \n                vec2 dir = vec2(\n                    -((lNW + lNE) - (lSW + lSE)),\n                     ((lNW + lSW) - (lNE + lSE))\n                );\n                \n                float dirReduce = max((lNW + lNE + lSW + lSE) * 0.03125, 0.0078125);\n                float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n                dir = min(vec2(8, 8), max(vec2(-8, -8), dir * rcpDirMin)) * pixel;\n                \n                vec3 rgbA = 0.5 * (\n                    texture2D(tex, uv + dir * (1.0 / 3.0 - 0.5)).rgb +\n                    texture2D(tex, uv + dir * (2.0 / 3.0 - 0.5)).rgb);\n                vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                    texture2D(tex, uv + dir * -0.5).rgb +\n                    texture2D(tex, uv + dir * 0.5).rgb);\n                float lB = dot(rgbB, l);\n                return mix(\n                    vec4(rgbB, 1),\n                    vec4(rgbA, 1),\n                    max(sign(lB - lMin), 0.0) * max(sign(lB - lMax), 0.0)\n                );\n            }\n            void main() {\n                vec4 aa = fxaa(tMap, vUv, uResolution);\n                gl_FragColor = aa;\n            }";
},{}],"../WebGL/post/ripple.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D tMap;\nvarying vec2 vUv;\nuniform float _Aspect;\nuniform vec2 _Target;\nuniform float _TransitionPhase;\n\n#define PI 3.14159\n\nvoid main() {\n    // Normalized pixel coordinates (from 0 to 1)\n    vec2 uv = vUv;\n\n    vec2 toTarget = _Target - uv;\n    toTarget.x *= _Aspect;    \n    float dist = dot(toTarget, toTarget) * 1.0;\n    // float dist = length(toTarget);\n    float radius = (dist - _TransitionPhase) / 0.15;\n    float radPow = abs(radius);\n    radPow = radPow * radPow;\n\n    float p = 1.0 - radPow;\n\n    float ripple = sin(PI * radius) * p;\n\n    // float scalePhase = (dist + _TransitionPhase) * 0.1);\n    ripple *= _TransitionPhase * 8.0 * (1.0 - _TransitionPhase);\n    vec2 distort = normalize(toTarget) * ripple;\n\n    float r = texture2D(tMap, uv + distort * 0.001).x;\n    float g = texture2D(tMap, uv + distort * 0.0005).y;\n    float b = texture2D(tMap, uv - distort * 0.001).z;\n    vec3 col = vec3(r,g,b);\n    gl_FragColor = vec4(col,1.0);\n}";
},{}],"../WebGL/utils/getCameraViewplaneSize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCameraViewplaneSize = void 0;

var _Vec = require("../../../vendors/ogl/src/math/Vec2.js");

//use trig to get viewPort dimensions
var getCameraViewplaneSize = function getCameraViewplaneSize(camera) {
  // rendering full screen quad as if the far plane is at distance 1
  var cameraFov = camera.fov;
  var cameraAspect = camera.aspect;
  var dist = Math.max(1.0, camera.position.z); //assuming the plane will always be one unit away from camera
  // let viewportHeight = 2.0 * Math.tan((cameraFov * (Math.PI / 180.0)) * 0.5) * dist;

  var viewportHeight = Math.tan(cameraFov * (Math.PI / 180.0) * 0.5) * dist;
  var viewportWidth = viewportHeight * cameraAspect;
  return new _Vec.Vec2(viewportWidth, viewportHeight);
};

exports.getCameraViewplaneSize = getCameraViewplaneSize;
},{"../../../vendors/ogl/src/math/Vec2.js":"../../vendors/ogl/src/math/Vec2.js"}],"../WebGL/extras/DomQuad/DomQuad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _getCameraViewplaneSize = require("../../utils/getCameraViewplaneSize");

var _Mesh2 = require("../../../../vendors/ogl/src/core/Mesh.js");

var _Vec = require("../../../../vendors/ogl/src/math/Vec2.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var DomQuad = /*#__PURE__*/function (_Mesh) {
  (0, _inherits2.default)(DomQuad, _Mesh);

  var _super = _createSuper(DomQuad);

  function DomQuad(gl) {
    var _this;

    (0, _classCallCheck2.default)(this, DomQuad);
    _this = _super.call(this, gl);
    _this.viewPlaneSize = new _Vec.Vec2(1.0, 1.0);
    _this.scaleOffset = new _Vec.Vec2(1.0, 1.0);
    _this.domElement = null;
    return _this;
  } //updates necessary paramters required for translating a dom elements position + scale
  //relative to the viewport to be relative to the perspective camera's near plane dimensions (which covers the viewport as well)


  (0, _createClass2.default)(DomQuad, [{
    key: "updateRelations",
    value: function updateRelations(_ref) {
      var camera = _ref.camera;
      if (this.domElement === null) return;
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.wK = 1.0 / this.w;
      this.hK = 1.0 / this.h;
      this.rect = this.domElement.getBoundingClientRect();
      this.cameraViewplaneSize = (0, _getCameraViewplaneSize.getCameraViewplaneSize)(camera); //make this globally available
    } //sets scale relative to the width + height of the near plane's size

  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      if (this.domElement === null) return;
      var _this$rect = this.rect,
          width = _this$rect.width,
          height = _this$rect.height; // let viewportScaleX = width * this.scaleOffset.x * this.wK;
      // let viewportScaleY = height * this.scaleOffset.y * this.hK;

      var viewportScaleX = width * this.wK;
      var viewportScaleY = height * this.hK;
      this.viewPlaneSize.x = this.cameraViewplaneSize.x * viewportScaleX;
      this.viewPlaneSize.y = this.cameraViewplaneSize.y * viewportScaleY;
    } //tranlate the dom elements position in "dom space" to a position relative
    //to the calculted view plane's dimensions

  }, {
    key: "calcDomToWebGLPos",
    value: function calcDomToWebGLPos() {
      if (this.domElement === null) return;
      var _this$rect2 = this.rect,
          width = _this$rect2.width,
          height = _this$rect2.height,
          top = _this$rect2.top,
          left = _this$rect2.left;
      var posPhaseX = 2.0 * ((left + width * 0.5) * this.wK) - 1.0;
      var posPhaseY = 2.0 * ((top + height * 0.5) * this.hK) - 1.0; //a bit isoteric (maybe), but a normalized coordinate plane goes between -1 and 1
      //in my case, I have a normalized position in the domain -1 and 1, which I multiply
      //with the widht and height equal to "half" the near plane's width and height,
      //which gives me a coordinate plane where the domain is [-viewplane size, viewplane size]
      //which will result in the "correct" position on the coordinate plane based on the calculated near plane

      this.position.x = posPhaseX * this.cameraViewplaneSize.x;
      this.position.y = posPhaseY * this.cameraViewplaneSize.y * -1.0;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.visible = false;
    }
  }]);
  return DomQuad;
}(_Mesh2.Mesh);

exports.default = DomQuad;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","../../utils/getCameraViewplaneSize":"../WebGL/utils/getCameraViewplaneSize.js","../../../../vendors/ogl/src/core/Mesh.js":"../../vendors/ogl/src/core/Mesh.js","../../../../vendors/ogl/src/math/Vec2.js":"../../vendors/ogl/src/math/Vec2.js"}],"../../vendors/ogl/src/extras/Plane.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Geometry2 = require("../core/Geometry.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Plane = /*#__PURE__*/function (_Geometry) {
  (0, _inherits2.default)(Plane, _Geometry);

  var _super = _createSuper(Plane);

  function Plane(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 1 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 1 : _ref$height,
        _ref$widthSegments = _ref.widthSegments,
        widthSegments = _ref$widthSegments === void 0 ? 1 : _ref$widthSegments,
        _ref$heightSegments = _ref.heightSegments,
        heightSegments = _ref$heightSegments === void 0 ? 1 : _ref$heightSegments,
        _ref$attributes = _ref.attributes,
        attributes = _ref$attributes === void 0 ? {} : _ref$attributes;

    (0, _classCallCheck2.default)(this, Plane);
    var wSegs = widthSegments;
    var hSegs = heightSegments; // Determine length of arrays

    var num = (wSegs + 1) * (hSegs + 1);
    var numIndices = wSegs * hSegs * 6; // Generate empty arrays once

    var position = new Float32Array(num * 3);
    var normal = new Float32Array(num * 3);
    var uv = new Float32Array(num * 2);
    var index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    return _super.call(this, gl, attributes);
  }

  (0, _createClass2.default)(Plane, null, [{
    key: "buildPlane",
    value: function buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs) {
      var u = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
      var v = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      var w = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 2;
      var uDir = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 1;
      var vDir = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : -1;
      var i = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 0;
      var ii = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : 0;
      var io = i;
      var segW = width / wSegs;
      var segH = height / hSegs;

      for (var iy = 0; iy <= hSegs; iy++) {
        var y = iy * segH - height / 2;

        for (var ix = 0; ix <= wSegs; ix++, i++) {
          var x = ix * segW - width / 2;
          position[i * 3 + u] = x * uDir;
          position[i * 3 + v] = y * vDir;
          position[i * 3 + w] = depth / 2;
          normal[i * 3 + u] = 0;
          normal[i * 3 + v] = 0;
          normal[i * 3 + w] = depth >= 0 ? 1 : -1;
          uv[i * 2] = ix / wSegs;
          uv[i * 2 + 1] = 1 - iy / hSegs;
          if (iy === hSegs || ix === wSegs) continue;
          var a = io + ix + iy * (wSegs + 1);
          var b = io + ix + (iy + 1) * (wSegs + 1);
          var c = io + ix + (iy + 1) * (wSegs + 1) + 1;
          var d = io + ix + iy * (wSegs + 1) + 1;
          index[ii * 6] = a;
          index[ii * 6 + 1] = b;
          index[ii * 6 + 2] = d;
          index[ii * 6 + 3] = b;
          index[ii * 6 + 4] = c;
          index[ii * 6 + 5] = d;
          ii++;
        }
      }
    }
  }]);
  return Plane;
}(_Geometry2.Geometry);

exports.Plane = Plane;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","../core/Geometry.js":"../../vendors/ogl/src/core/Geometry.js"}],"../WebGL/DomQuads/Projects/ProjectQuad/shaders/projectQuad.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 normal;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\n\nuniform sampler2D _FlowMap;\nuniform float _FlowMapPhase;\nuniform float _FlipFlowMapForce;\nuniform float _RestorePhase;\nuniform float _ScrollPhase;\nuniform float _RevealPhase;\n\nuniform float _ViewModePhase;\nuniform float _RipplePhase;\nuniform float _Entering;\n\nuniform sampler2D _Image;\nuniform float _Scale;\nuniform float _InView;\n\nuniform float _Time;\n\nuniform vec2 _ViewplaneSize;\nvarying vec3 vMvPos;\n\nvarying vec2 vUv;\n// varying vec2 vClipPos;\nvarying vec3 vDistort;\nvarying float vPhase;\n\nuniform float _SpatialF;\nuniform float _TemporalF;\nuniform float _Amp;\nuniform float _HeightAmp;\n\nvarying float vDamp;\n\n#define DISTORTSTR 1.2\n#define SCROLLDISTORTSTR 0.6\n#define DISPLACEMENTSTR 0.4\n#define HEIGHTMAPSTR 0.5\n#define lumaK 0.33333333333333333\n#define PI 3.14159265359\n#define HALFPI 3.14159265359 * 0.5\n\n#define RIPPLE_SPATIALF 3.0\n#define RIPPLE_TEMPORALF 8.2\n\n// #define RIPPLE_SPATIALF 7.0 \n// #define RIPPLE_TEMPORALF 8.0\n\n// #define RIPPLE_AMP 0.25\n#define RIPPLE_AMP 0.15\n// #define RIPPLE_AMP 0.1\n\n// #define HEIGHTMAP_AMP 0.53\n// #define HEIGHTMAP_AMP 0.33\n// #define HEIGHTMAP_AMP 1.5\n#define HEIGHTMAP_AMP 1.9\n\nvoid main() {\n\n    vec3 pos = position;\n\n    vec2 texCoord = uv;\n    texCoord -= 0.5;\n    // texCoord *= mix(0.5, 1.0, _RevealPhase);\n    texCoord *= mix(0.85, 1.0, _RevealPhase);\n    texCoord += 0.5;\n\n    vec3 col = texture2D(_Image, texCoord).xyz;\n    float heightMapDistort = dot(col, vec3(0.299, 0.587, 0.114));\n    heightMapDistort = mix(heightMapDistort, 1.0 - heightMapDistort, _FlipFlowMapForce);\n    float dampen = (smoothstep(0.8, 1.0, heightMapDistort));\n    vDamp = dampen;\n\n    //PROJECT VIEW MODE SCALE\n    pos.xy *= _ViewplaneSize * mix(0.85, 1.0, 1.0) * mix(1.0, 1.525, _ViewModePhase);\n\n    //SCROLL FORCE\n    vec2 phasePos = position.xy;\n    vec2 scrollPhasePos = phasePos;\n    float dist = length(phasePos);\n    pos.z += (1.0 - dist) * DISPLACEMENTSTR * _ScrollPhase * SCROLLDISTORTSTR;\n    pos.z += heightMapDistort * dampen * 0.2 * _ScrollPhase;\n\n    //PROJECT VIEW MODE RIPPLE\n    vec2 viewModePhasePos = phasePos;\n    float viewmodePhase = _RipplePhase * 4.0 * (1.0 - _RipplePhase);    \n    float phaseDist = 1.0 - abs((_RipplePhase * 3.0) - dist);\n    // phaseDist = smoothstep(0.0, 1.0, phaseDist);\n    // float ripplePhase = cos(phaseDist * PI) * RIPPLE_AMP * viewmodePhase;\n    float ripplePhase = cos(phaseDist * PI) * RIPPLE_AMP * viewmodePhase;\n    // float ripplePhase = phaseDist * RIPPLE_AMP * viewmodePhase;\n    vPhase = phaseDist * viewmodePhase;\n\n    pos.z += ripplePhase;\n    pos.z += heightMapDistort * HEIGHTMAP_AMP * ripplePhase;\n\n    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;\n    \n    vDistort = vec3(0.0, 0.0, 0.0);\n\n    // if(_InView == 1.0) {\n    vec4 clipPos = modelViewProjection * vec4(pos, 1.0);\n    clipPos.xyz /= clipPos.w;\n    clipPos.xy = clipPos.xy * 0.5 + 0.5;\n\n    vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;\n    vDistort = distort;\n    pos += distort * max(0.2, heightMapDistort) * _FlowMapPhase * distort.z * _InView;\n    // }\n\n    gl_Position = modelViewProjection * vec4(pos, 1.0);\n    vUv = uv;\n    vMvPos = (modelViewMatrix * vec4(position, 1.0)).xyz;\n\n}";
},{}],"../WebGL/DomQuads/Projects/ProjectQuad/shaders/projectQuad.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _Image;\nuniform sampler2D _FlowMap;\nuniform float _FlowMapPhase;\nuniform vec2 _Resolution;\n\nuniform float _ScalePhase;\nuniform float _Scale;\nuniform float _Alpha;\nuniform float _RevealPhase;\nuniform float _RevealDirection;\nuniform float _ClipRevealPhase;\nuniform float _UvScalePhase;\nuniform float _ScrollPhase;\nuniform float _ViewModePhase;\nuniform float _Time;\n\nvarying vec2 vUv;\nvarying vec3 vMvPos;\nvarying vec3 vDistort;\nvarying float vPhase;\nvarying float vDamp;\n\n#define OFFSETAMOUNTX 0.004\n#define OFFSETAMOUNTY 0.001\n// #define MINVIEWDIST 0.24\n// #define MAXVIEWDIST 0.5\n// #define ALPHAFALLOFFDIST 30.0\n\n// #define MINVIEWDIST 0.24\n// #define MAXVIEWDIST 0.5\n// #define ALPHAFALLOFFDIST 30.0\n\n// #define MINVIEWDIST 0.25\n#define MINVIEWDIST 0.25\n#define MAXVIEWDIST 0.5\n#define ALPHAFALLOFFDIST 5.0 * 5.0\n\n// #define MINVIEWDIST 0.05\n// #define MAXVIEWDIST 1.0\n// #define ALPHAFALLOFFDIST 50.0\n\nfloat hash12(vec2 p)\n{\n\tvec3 p3  = fract(vec3(p.xyx) * .1031);\n    p3 += dot(p3, p3.yzx + 33.33);\n    return fract((p3.x + p3.y) * p3.z);\n}\n\nfloat dither8x8(vec2 position, float brightness) {\n    int x = int(mod(position.x, 8.0));\n    int y = int(mod(position.y, 8.0));\n    int index = x + y * 8;\n    float limit = 0.0;\n  \n    if (x < 8) {\n      if (index == 0) limit = 0.015625;\n      if (index == 1) limit = 0.515625;\n      if (index == 2) limit = 0.140625;\n      if (index == 3) limit = 0.640625;\n      if (index == 4) limit = 0.046875;\n      if (index == 5) limit = 0.546875;\n      if (index == 6) limit = 0.171875;\n      if (index == 7) limit = 0.671875;\n      if (index == 8) limit = 0.765625;\n      if (index == 9) limit = 0.265625;\n      if (index == 10) limit = 0.890625;\n      if (index == 11) limit = 0.390625;\n      if (index == 12) limit = 0.796875;\n      if (index == 13) limit = 0.296875;\n      if (index == 14) limit = 0.921875;\n      if (index == 15) limit = 0.421875;\n      if (index == 16) limit = 0.203125;\n      if (index == 17) limit = 0.703125;\n      if (index == 18) limit = 0.078125;\n      if (index == 19) limit = 0.578125;\n      if (index == 20) limit = 0.234375;\n      if (index == 21) limit = 0.734375;\n      if (index == 22) limit = 0.109375;\n      if (index == 23) limit = 0.609375;\n      if (index == 24) limit = 0.953125;\n      if (index == 25) limit = 0.453125;\n      if (index == 26) limit = 0.828125;\n      if (index == 27) limit = 0.328125;\n      if (index == 28) limit = 0.984375;\n      if (index == 29) limit = 0.484375;\n      if (index == 30) limit = 0.859375;\n      if (index == 31) limit = 0.359375;\n      if (index == 32) limit = 0.0625;\n      if (index == 33) limit = 0.5625;\n      if (index == 34) limit = 0.1875;\n      if (index == 35) limit = 0.6875;\n      if (index == 36) limit = 0.03125;\n      if (index == 37) limit = 0.53125;\n      if (index == 38) limit = 0.15625;\n      if (index == 39) limit = 0.65625;\n      if (index == 40) limit = 0.8125;\n      if (index == 41) limit = 0.3125;\n      if (index == 42) limit = 0.9375;\n      if (index == 43) limit = 0.4375;\n      if (index == 44) limit = 0.78125;\n      if (index == 45) limit = 0.28125;\n      if (index == 46) limit = 0.90625;\n      if (index == 47) limit = 0.40625;\n      if (index == 48) limit = 0.25;\n      if (index == 49) limit = 0.75;\n      if (index == 50) limit = 0.125;\n      if (index == 51) limit = 0.625;\n      if (index == 52) limit = 0.21875;\n      if (index == 53) limit = 0.71875;\n      if (index == 54) limit = 0.09375;\n      if (index == 55) limit = 0.59375;\n      if (index == 56) limit = 1.0;\n      if (index == 57) limit = 0.5;\n      if (index == 58) limit = 0.875;\n      if (index == 59) limit = 0.375;\n      if (index == 60) limit = 0.96875;\n      if (index == 61) limit = 0.46875;\n      if (index == 62) limit = 0.84375;\n      if (index == 63) limit = 0.34375;\n    }\n  \n    return brightness < limit ? 0.0 : 1.0;\n  }\n\nvoid main() {\n\n    vec2 uv = vUv;\n    uv -= 0.5;\n    uv *= mix(1.0, 0.85, _ScalePhase); //rename uniform\n    uv *= mix(0.5, 1.0, _UvScalePhase);\n    uv += 0.5;\n\n    vec2 flow = vDistort.xy * _FlowMapPhase;\n\n    float inputPhase = _ScrollPhase * 3.0;\n    vec2 offsetX = (vec2(1.0 + inputPhase, 0.0)) * OFFSETAMOUNTX;\n    vec2 offsetY = (vec2(0.0, 1.0 + inputPhase)) * OFFSETAMOUNTY;\n\n    float viewModePhase = (1.0 - abs(_ViewModePhase * 2.0 - 1.0));\n    vec2 transitionOffsetX = vec2(0.01, 0.0) * viewModePhase * 0.0;\n    vec2 transitionOffsetY = vec2(0.0, 0.001) * viewModePhase * 0.0;\n\n    float r = texture2D(_Image, uv - transitionOffsetX - offsetX - (flow * 0.02)).x;\n    float g = texture2D(_Image, uv + transitionOffsetY + offsetY + (flow * 0.002)).y;\n    float b = texture2D(_Image, uv + transitionOffsetX + offsetX + (flow * 0.02)).z;\n\n    vec3 col = vec3(r,g,b);\n    col += hash12(vUv * 1000.0 + _Time) * 0.2;\n    col = mix(col, vec3(1.0), mix(0.2, 0.0, _ViewModePhase));\n\n    float len = (vMvPos.z * vMvPos.z); //removes the sign\n    float idleAlpha = smoothstep(MINVIEWDIST, MAXVIEWDIST, len);\n    float phase = (len * len) / (6.0 * 6.0);\n    float scrollPhase = smoothstep(0.1, 1.0, min(1.0, abs(_ScrollPhase)));\n    float scrollAlpha = idleAlpha * mix(0.4, 0.7, phase * 4.0 * (1.0 - phase));\n    float alpha = mix(idleAlpha, scrollAlpha, scrollPhase);\n    alpha *= _Alpha;\n\n    alpha = dither8x8(gl_FragCoord.xy, alpha);\n\n    //reveal phase\n    alpha *= mix(step(vUv.y, _ClipRevealPhase), 1.0 - step((vUv.y * 0.9999), 1.0 - _ClipRevealPhase), _RevealDirection);\n    if(alpha <= 0.0) discard;\n    gl_FragColor = vec4(col, 1.0);\n\n}";
},{}],"../../static/data/*.png":[function(require,module,exports) {
module.exports = {};
},{}],"../../utils/Math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeid = exports.loopNegativeNumber = void 0;

//https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
var loopNegativeNumber = function loopNegativeNumber(_ref) {
  var a = _ref.a,
      b = _ref.b;
  a %= b;
  a = a > 0.0 ? a + b : a;
  return a;
}; //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript


exports.loopNegativeNumber = loopNegativeNumber;

var makeid = function makeid(_ref2) {
  var length = _ref2.length;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

exports.makeid = makeid;
},{}],"../WebGL/DomQuads/Projects/ProjectQuad/ProjectQuad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _DomQuad2 = _interopRequireDefault(require("../../../extras/DomQuad/DomQuad.js"));

var _Program = require("../../../../../vendors/ogl/src/core/Program.js");

var _Texture = require("../../../../../vendors/ogl/src/core/Texture.js");

var _Plane = require("../../../../../vendors/ogl/src/extras/Plane.js");

var _ = _interopRequireDefault(require("../../../../../static/data/*.png"));

var _Math = require("../../../../../utils/Math.js");

var _EventEmitter = _interopRequireDefault(require("../../../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../../../utils/events.js"));

var _gsap = require("gsap");

var _Vec = require("../../../../../vendors/ogl/src/math/Vec2.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var vert = require("./shaders/projectQuad.vert");

var frag = require("./shaders/projectQuad.frag");

var emitter = _EventEmitter.default.emitter;

var ProjectQuad = /*#__PURE__*/function (_DomQuad) {
  (0, _inherits2.default)(ProjectQuad, _DomQuad);

  var _super = _createSuper(ProjectQuad);

  function ProjectQuad(gl, _ref) {
    var _this;

    var media = _ref.media,
        _ref$posOffset = _ref.posOffset,
        posOffset = _ref$posOffset === void 0 ? 0 : _ref$posOffset,
        loopLimit = _ref.loopLimit;
    (0, _classCallCheck2.default)(this, ProjectQuad);
    _this = _super.call(this, gl);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initProgram", function () {
      _this.geometry = new _Plane.Plane(_this.gl, {
        width: 2,
        height: 2,
        widthSegments: 32.0,
        heightSegments: 32.0
      });
      _this.texture = new _Texture.Texture(_this.gl, {
        generateMipmaps: false,
        width: 256,
        height: 256,
        minFilter: _this.gl.LINEAR,
        magFilter: _this.gl.LINEAR
      }); // if (this.media.videoSrc !== null && window.isMobile === false)
      //   this.loadVideo();
      // if (this.media.imageSrc !== null && window.isMobile) this.loadImage();

      if (_this.media.videoSrc !== null) _this.loadVideo();
      var u = {
        _ViewplaneSize: {
          value: _this.viewPlaneSize
        },
        _Time: {
          value: 0
        },
        _Image: {
          value: _this.texture
        },
        _FlowMap: {
          value: new _Texture.Texture(_this.gl)
        },
        _Resolution: {
          value: new _Vec.Vec2(_this.gl.canvas.width, _this.gl.canvas.height)
        },
        _FlowMapPhase: {
          value: 1.0
        },
        _ScrollPhase: {
          value: 0
        },
        _RestorePhase: {
          value: 0
        },
        _InputForce: {
          value: 0.0
        },
        _FlipFlowMapForce: {
          value: _this.media.brightVal
        },
        _ScalePhase: {
          value: 0.0
        },
        _RevealPhase: {
          value: 0.0
        },
        _ClipRevealPhase: {
          value: 0.0
        },
        _UvScalePhase: {
          value: 0.0
        },
        _ViewModePhase: {
          value: 0.0
        },
        _RipplePhase: {
          value: 0
        },
        _Entering: {
          value: 0.0
        },
        _RevealDirection: {
          value: 0.0
        },
        _InView: {
          value: 0.0
        },
        _Alpha: {
          value: 0.0
        },
        _Scale: {
          value: 1.0
        }
      };
      _this.program = new _Program.Program(_this.gl, {
        vertex: vert,
        fragment: frag,
        uniforms: u,
        transparent: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "applyScrollMode", function () {
      _this.inScrollMode = true;

      _this.animateScrollModeUniforms({
        scale: 0.0,
        alpha: 1.0,
        alphaPhase: 1.0,
        flowMapPhase: 0.0
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "removeScrollMode", function () {
      _this.inScrollMode = false;

      _this.animateScrollModeUniforms({
        scale: 1.0,
        alpha: _this.isInView ? 1.0 : 0.0,
        alphaPhase: 0.0,
        flowMapPhase: _this.isInView ? 1.0 : 0.0
      });

      _this.targetPos = Math.round(_this.position.z);
      var delta = _this.targetPos - _this.position.z;
      _this.restoreDelta = Math.abs(delta) > 0 ? delta : 1.0;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "playVideo", function () {
      if (_this.video === null || _this.video === undefined) return;
      if (_this.inView({
        inViewPosZ: 0
      })) _this.video.play();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "pauseVideo", function () {
      if (_this.video === null || _this.video === undefined) return;

      _this.video.pause();
    });
    _this.gl = gl;
    _this.id = (0, _Math.makeid)({
      length: 9
    });
    _this.index = posOffset; //rename argument

    _this.media = media;
    _this.video = _this.media.video; // this.loopLimit = 6; //hardcoded for now

    _this.loopLimit = loopLimit; //hardcoded for now

    _this.initPos = _this.position.z = 0 - posOffset;
    _this.targetPos = _this.position.z;
    _this.inScrollMode = false;
    _this.scrollPhase = 0;
    _this.isInView = false;
    _this.positionRestored = false;
    _this.restoreDelta = 1;
    _this.restorePhase = 0;
    _this.restoreEase = 0;

    _this.initProgram();

    _this.initEvents();

    return _this;
  }

  (0, _createClass2.default)(ProjectQuad, [{
    key: "initEvents",
    value: function initEvents() {
      emitter.on(_events.default.PLAY_VIDEO, this.playVideo);
      emitter.on(_events.default.PAUSE_VIDEO, this.pauseVideo);
      emitter.on(_events.default.APPLY_SCROLL_MODE_ANIM, this.applyScrollMode);
      emitter.on(_events.default.REMOVE_SCROLL_MODE_ANIM, this.removeScrollMode);
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var force = _ref2.force;

      if (this.inScrollMode) {
        this.position.z += force;
        this.scrollPhase += force;
        this.loopPosition();
      } else {
        this.restorePosition();
      }

      this.updateScrollPhase();
      this.visible = this.inBounds(); // if (this.video === null || this.inScrollMode || this.visible === false) return;

      if (this.video === null || this.video === undefined || this.inScrollMode) return;
      this.updateVideoTexture();
    }
  }, {
    key: "loopPosition",
    value: function loopPosition() {
      if (this.position.z < -this.loopLimit) {
        this.position.z += this.loopLimit + 1;
      } else if (this.position.z > 1.0) {
        this.position.z -= this.loopLimit + 1;
      }
    }
  }, {
    key: "updateScrollPhase",
    value: function updateScrollPhase() {
      this.scrollPhase = Math.max(-1.0, Math.min(1.0, this.scrollPhase));
      this.program.uniforms._ScrollPhase.value = this.scrollPhase;
      this.scrollPhase *= Math.abs(this.scrollPhase) < 0.001 ? 0.0 : 0.94;
    }
  }, {
    key: "restorePosition",
    value: function restorePosition() {
      this.position.z += (this.targetPos - this.position.z) / 13.0;
      this.program.uniforms._RestorePhase.value = 1.0 - this.restorePhase;
    }
  }, {
    key: "animateScrollModeUniforms",
    value: function animateScrollModeUniforms(_ref3) {
      var scale = _ref3.scale,
          alpha = _ref3.alpha,
          alphaPhase = _ref3.alphaPhase,
          flowMapPhase = _ref3.flowMapPhase;
      if (this.scrollModeTl) this.scrollModeTl.kill();
      this.scrollModeTl = _gsap.gsap.timeline({});
      this.scrollModeTl.to(this.program.uniforms._Alpha, {
        value: alpha,
        duration: 0.5,
        ease: "power1.out"
      }, "<");
      this.scrollModeTl.to(this.program.uniforms._Scale, {
        value: scale,
        duration: 0.35,
        ease: "power2.inOut"
      }, "<");
      this.scrollModeTl.to(this.program.uniforms._ScalePhase, {
        value: alphaPhase,
        duration: 0.35,
        ease: "power1.out"
      }, "<");
      this.scrollModeTl.to(this.program.uniforms._FlowMapPhase, {
        value: flowMapPhase,
        duration: 0.3,
        ease: "power1.out"
      }, "<");
    }
  }, {
    key: "updateVideoTexture",
    value: function updateVideoTexture() {
      if (this.isInView === false || this.inScrollMode) return;

      if (this.video.readyState >= this.video.HAVE_ENOUGH_DATA) {
        this.texture.image = this.video;
        this.texture.needsUpdate = true;
      }
    }
  }, {
    key: "loadVideo",
    value: function loadVideo() {
      var _this2 = this;

      this.video = document.createElement("video");
      this.video.crossOrigin = "*";
      this.video.addEventListener("loadeddata", function () {
        if (_this2.video.readyState >= _this2.video.HAVE_CURRENT_DATA) {
          _this2.texture.image = _this2.video;
          _this2.texture.needsUpdate = true;
          emitter.emit(_events.default.TEXTURE_LOADED);
        }
      });
      this.video.src = this.media.videoSrc;
      this.video.load();
      this.video.muted = true;
      this.video.loop = true;
      this.video.currentTime = 0.1;
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      var _this3 = this;

      var img = new Image();
      img.crossOrigin = "*";
      img.src = this.media.imageSrc;

      img.onload = function () {
        _this3.texture.image = img;
        emitter.emit(_events.default.TEXTURE_LOADED);
      };
    }
  }, {
    key: "inBounds",
    value: function inBounds() {
      var roundPosZ = Math.round(this.position.z);
      return roundPosZ > -4.0 && roundPosZ < 1.0; // return (this.position.z > -5.0 && this.position.z < 1.0);
    }
  }, {
    key: "inView",
    value: function inView(_ref4) {
      var inViewPosZ = _ref4.inViewPosZ;
      this.isInView = Math.round(this.position.z) === inViewPosZ ? true : false;
      this.program.uniforms._InView.value = this.isInView ? 1.0 : 0.0;
      return this.isInView;
    }
  }]);
  return ProjectQuad;
}(_DomQuad2.default);

exports.default = ProjectQuad;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../../../extras/DomQuad/DomQuad.js":"../WebGL/extras/DomQuad/DomQuad.js","../../../../../vendors/ogl/src/core/Program.js":"../../vendors/ogl/src/core/Program.js","../../../../../vendors/ogl/src/core/Texture.js":"../../vendors/ogl/src/core/Texture.js","../../../../../vendors/ogl/src/extras/Plane.js":"../../vendors/ogl/src/extras/Plane.js","./shaders/projectQuad.vert":"../WebGL/DomQuads/Projects/ProjectQuad/shaders/projectQuad.vert","./shaders/projectQuad.frag":"../WebGL/DomQuads/Projects/ProjectQuad/shaders/projectQuad.frag","../../../../../static/data/*.png":"../../static/data/*.png","../../../../../utils/Math.js":"../../utils/Math.js","../../../../EventEmitter.js":"../EventEmitter.js","../../../../../utils/events.js":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js","../../../../../vendors/ogl/src/math/Vec2.js":"../../vendors/ogl/src/math/Vec2.js"}],"../WebGL/extras/DomQuad/DomquadMediator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Transform2 = require("../../../../vendors/ogl/src/core/Transform");

var _EventEmitter = _interopRequireDefault(require("../../../EventEmitter"));

var _events = _interopRequireDefault(require("../../../../utils/events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

var DomquadMediator = /*#__PURE__*/function (_Transform) {
  (0, _inherits2.default)(DomquadMediator, _Transform);

  var _super = _createSuper(DomquadMediator);

  function DomquadMediator(gl, scene, camera) {
    var _this;

    (0, _classCallCheck2.default)(this, DomquadMediator);
    _this = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "unloadQuads", function () {
      _this.children.forEach(function (quad) {
        quad.visible = false;
      });
    });
    _this.scene = scene;
    _this.camera = camera;
    _this.quadsLoaded = false;
    return _this;
  }

  return DomquadMediator;
}(_Transform2.Transform);

exports.default = DomquadMediator;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../../../../vendors/ogl/src/core/Transform":"../../vendors/ogl/src/core/Transform.js","../../../EventEmitter":"../EventEmitter.js","../../../../utils/events":"../../utils/events.js"}],"../WebGL/DomQuads/Projects/ProjectQuadMediator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ProjectQuad = _interopRequireDefault(require("../Projects/ProjectQuad/ProjectQuad.js"));

var _DomquadMediator2 = _interopRequireDefault(require("../../extras/DomQuad/DomquadMediator.js"));

var _ProjectContent = require("../../../../static/ProjectContent.js");

var _EventEmitter = _interopRequireDefault(require("../../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../../utils/events.js"));

var _gsap = require("gsap");

var _Vec = require("../../../../vendors/ogl/src/math/Vec2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

var ProjectQuadMediator = /*#__PURE__*/function (_DomquadMediator) {
  (0, _inherits2.default)(ProjectQuadMediator, _DomquadMediator);

  var _super = _createSuper(ProjectQuadMediator);

  function ProjectQuadMediator(gl, scene, camera) {
    var _this;

    (0, _classCallCheck2.default)(this, ProjectQuadMediator);
    _this = _super.call(this, gl, scene, camera);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "bindToDom", function (_ref) {
      var referenceElement = _ref.referenceElement,
          getFirstQuad = _ref.getFirstQuad;

      if (referenceElement === null) {
        console.error("reference dom elements not available");
        return;
      }

      _this.children.forEach(function (quad) {
        quad.visible = true;
        quad.domElement = referenceElement;
        quad.updateRelations({
          camera: _this.camera
        });

        _this.calculateDomTransforms({
          quad: quad
        });
      });

      if (getFirstQuad) {
        _this.quadInView = _this.getQuadInView();

        _this.quadInView.playVideo();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "enterScrollMode", function () {
      _this.inScrollMode = true;
      emitter.emit(_events.default.PAUSE_VIDEO);
      emitter.emit(_events.default.APPLY_SCROLL_MODE_ANIM);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "exitScrollMode", function () {
      _this.inScrollMode = false;
      _this.quadInView = _this.getQuadInView();

      _this.quadInView.playVideo();

      emitter.emit(_events.default.REMOVE_SCROLL_MODE_ANIM);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateViewMode", function (args) {
      var mode = args.mode;
      _this.inViewMode = mode;
      var uniforms = _this.quadInView.program.uniforms;
      var duration = 1.8;
      var ease = "sine.out";
      uniforms._Entering.value = _this.inViewMode ? 1.0 : 0.0;

      _gsap.gsap.to(uniforms._ViewModePhase, {
        value: _this.inViewMode ? 1.0 : 0.0,
        duration: duration,
        ease: ease
      });

      _gsap.gsap.fromTo(uniforms._RipplePhase, {
        value: 0
      }, {
        value: 1,
        duration: duration,
        ease: "power1.inOut"
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetQuads", function () {
      _this.inViewMode = false;

      _this.children.forEach(function (quad) {
        quad.scaleOffset.set(1.0, 1.0);
        var uniforms = quad.program.uniforms;
        uniforms._ViewModePhase.value = 0.0;
        uniforms._Entering.value = 0.0;
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "revealQuads", function () {
      if (_this.revealQuadAnim) _this.revealQuadAnim.kill();
      _this.revealQuadAnim = _gsap.gsap.timeline({
        onComplete: function onComplete() {
          _this.children.forEach(function (quad) {
            quad.program.uniforms._ClipRevealPhase.value = 1.0;
            quad.program.uniforms._UvScalePhase.value = 1.0;
          });
        }
      });
      var uniforms = _this.quadInView.program.uniforms;

      _this.revealQuadAnim.set(uniforms._RevealDirection, {
        value: 0.0
      }, "<");

      _this.revealQuadAnim.to(uniforms._Alpha, {
        duration: 0.1,
        value: 1.0,
        ease: "power2.in"
      }, "<");

      _this.revealQuadAnim.to(uniforms._RevealPhase, {
        duration: 2.0,
        value: 1.0,
        ease: "power2.inOut"
      }, "<");

      _this.revealQuadAnim.to(uniforms._UvScalePhase, {
        duration: 2.0,
        value: 1.0,
        ease: "power2.inOut"
      }, "<");

      _this.revealQuadAnim.to(uniforms._ClipRevealPhase, {
        duration: 2.0,
        value: 1.0,
        ease: "power2.inOut"
      }, "<");
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hideQuads", function () {
      _this.children.forEach(function (quad) {
        _gsap.gsap.set(quad.program.uniforms._RevealDirection, {
          value: 1.0
        });

        _gsap.gsap.to(quad.program.uniforms._ClipRevealPhase, {
          duration: 1.0,
          value: 0.0,
          ease: "power2.inOut",
          onComplete: function onComplete() {
            quad.program.uniforms._Alpha.value = 0.0;
            quad.program.uniforms._RevealPhase.value = 0.0;
            quad.program.uniforms._UvScalePhase.value = 0.0;
          }
        });
      });
    });
    _this.gl = gl;
    _this.quads = [];
    _this.quadCount = 3;
    _this.quadInView;
    _this.quadSwapped = false;
    _this.position.z = 0.0;
    _this.inputForce = new _Vec.Vec2(0.0, 0.0);
    _this.inputForceInertia = 0.93;
    _this.inScrollMode = false;
    _this.minBounds = -3.0;
    _this.maxBounds = 0.0;
    _this.inViewMode = false;

    _this.initQuads();

    return _this;
  }

  (0, _createClass2.default)(ProjectQuadMediator, [{
    key: "initEvents",
    value: function initEvents() {
      emitter.on(_events.default.ENTER_SCROLL_MODE, this.enterScrollMode);
      emitter.on(_events.default.EXIT_SCROLL_MODE, this.exitScrollMode);
      emitter.on(_events.default.UPDATE_VIEWMODE, this.updateViewMode);
      emitter.on(_events.default.REVEAL_QUADS, this.revealQuads);
      emitter.on(_events.default.RESET_QUADS, this.resetQuads);
      emitter.on(_events.default.PREPARE_UNMOUNT, this.hideQuads);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      emitter.off(_events.default.ENTER_SCROLL_MODE, this.enterScrollMode);
      emitter.off(_events.default.EXIT_SCROLL_MODE, this.exitScrollMode);
      emitter.off(_events.default.UPDATE_VIEWMODE, this.updateViewMode);
      emitter.off(_events.default.REVEAL_QUADS, this.revealQuads);
      emitter.off(_events.default.RESET_QUADS, this.resetQuads);
      emitter.off(_events.default.PREPARE_UNMOUNT, this.hideQuads);
    }
  }, {
    key: "initQuads",
    value: function initQuads() {
      var _this2 = this;

      var media = _ProjectContent.ProjectContent.map(function (content) {
        return content.media;
      });

      var mediaCount = media.length;
      emitter.emit(_events.default.UPDATE_CONTENT_COUNT, mediaCount);
      media.forEach(function (media, i) {
        var quad = new _ProjectQuad.default(_this2.gl, {
          media: media,
          posOffset: i,
          //rename or make new prop for index?,
          loopLimit: mediaCount - 1
        });
        quad.setParent(_this2);
      });
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var dt = _ref2.dt,
          inputDelta = _ref2.inputDelta,
          flowMap = _ref2.flowMap;
      // this.inputForce.y += this.inScrollMode ? inputDelta.y * 0.008 / dt : 0.0;
      // this.inputForce.y += this.inScrollMode ? inputDelta.y * 0.005 / dt : 0.0;
      this.inputForce.y += this.inScrollMode ? inputDelta.y * 0.008 / dt : 0.0;
      var i = 0;

      while (i < this.children.length) {
        var quad = this.children[i];
        quad.update({
          force: this.inputForce.y,
          deltaTime: dt
        });
        quad.program.uniforms._InputForce.value = Math.min(1.0, Math.abs(this.inputForce.y * 1.0));
        quad.program.uniforms._Time.value += dt;
        quad.program.uniforms._FlowMap.value = flowMap;
        i++;
      }

      this.inputForce.y *= Math.abs(this.inputForce.y) < 0.001 ? 0.0 : this.inputForceInertia;
    } //get the quad whose position equals to the camera's position along Z
    //and offsetted by the parents transform. That way I'll get the quad
    //that is in view of the camera (or simply in front)

  }, {
    key: "getQuadInView",
    value: function getQuadInView() {
      var quadInView;
      var i = 0;

      while (i < this.children.length) {
        var quad = this.children[i];

        if (quad.inView({
          inViewPosZ: 0
        })) {
          quadInView = quad;
          emitter.emit(_events.default.LOAD_PROJECT_CONTENT, quadInView.index);
          break;
        }

        i++;
      }

      return quadInView;
    }
  }, {
    key: "calculateDomTransforms",
    value: function calculateDomTransforms(_ref3) {
      var quad = _ref3.quad;
      quad.updateDimensions();
      quad.calcDomToWebGLPos();
    }
  }]);
  return ProjectQuadMediator;
}(_DomquadMediator2.default);

exports.default = ProjectQuadMediator;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../Projects/ProjectQuad/ProjectQuad.js":"../WebGL/DomQuads/Projects/ProjectQuad/ProjectQuad.js","../../extras/DomQuad/DomquadMediator.js":"../WebGL/extras/DomQuad/DomquadMediator.js","../../../../static/ProjectContent.js":"../../static/ProjectContent.js","../../../EventEmitter.js":"../EventEmitter.js","../../../../utils/events.js":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js","../../../../vendors/ogl/src/math/Vec2":"../../vendors/ogl/src/math/Vec2.js"}],"../WebGL/DomQuads/About/AboutQuad/shaders/aboutQuad.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform vec2 _ViewplaneSize;\nuniform sampler2D _FlowMap;\nuniform sampler2D _Image;\n\nuniform float _Alpha;\n\nuniform float _Aspect;\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\n\nvarying vec2 vUv;\nvarying vec2 vClipPos;\n\n#define DISTORTSTR 1.1\n#define lumaK 0.33333333333333333\n\nvoid main() {\n\n    vec3 pos = position;\n    pos.xy *= _ViewplaneSize;\n    \n    mat4 modelViewProjection = projectionMatrix * modelViewMatrix;\n\n    vec4 clipPos = modelViewProjection * vec4(pos, 1.0);\n    clipPos.xyz /= clipPos.w;\n    clipPos.xy = clipPos.xy * 0.5 + 0.5;\n\n    vec3 distort = texture2D(_FlowMap, clipPos.xy).xyz * DISTORTSTR;\n\n    vec2 imgCoord = uv;\n    // imgCoord.x *= _Aspect;\n\n    vec3 col = texture2D(_Image, imgCoord).xyz;\n    float heightMap = (col.x + col.y + col.z) * lumaK;\n    heightMap *= heightMap;\n    // pos += distort * max(0.2, heightMap) * distort.z;\n    pos += distort * distort.z;\n\n    gl_Position = modelViewProjection * vec4(pos, 1.0);\n    vUv = uv;\n    vClipPos = clipPos.xy;\n\n}";
},{}],"../WebGL/DomQuads/About/AboutQuad/shaders/aboutQuad.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _Image;\nuniform sampler2D _FlowMap;\nuniform float _Alpha;\nuniform float _ClipRevealPhase;\nuniform float _UvScalePhase;\nuniform float _Aspect;\nuniform vec2 _ViewplaneSize;\n\nuniform float _RevealDirection;\n\nvarying vec2 vUv;\nvarying vec2 vClipPos;\n\nfloat hash12(vec2 p)\n{\n\tvec3 p3  = fract(vec3(p.xyx) * .1031);\n    p3 += dot(p3, p3.yzx + 33.33);\n    return fract((p3.x + p3.y) * p3.z);\n}\n\nvoid main() {\n\n    vec2 uv = vUv;\n\n    // float planeAspect = _ViewplaneSize.x / _ViewplaneSize.y;\n    // float imageAspect = 683.0 / 1024.0;\n\n    // float aspect = planeAspect / imageAspect;\n\n    uv -= 0.5;\n    // uv.x *= aspect;\n    uv*= mix(0.5, 1.0, _UvScalePhase);\n    uv += 0.5;\n\n    vec3 flow = texture2D(_FlowMap, vClipPos).xyz;\n\n    uv -= flow.xy * 1.1;\n\n    vec2 offSet = flow.xy;\n\n    float r = texture2D(_Image, uv + offSet * 0.05).x;\n    float g = texture2D(_Image, uv + offSet * 0.008).y;\n    float b = texture2D(_Image, uv - offSet * 0.05).z;\n\n    vec3 outPutCol = vec3(r,g,b);\n    // outPutCol += hash12(vUv * 1000.0) * 0.1;\n\n    gl_FragColor = vec4(outPutCol, mix(step(vUv.y, _ClipRevealPhase), 1.0 - step(vUv.y, 1.0 - _ClipRevealPhase), _RevealDirection));\n\n}";
},{}],"../WebGL/DomQuads/About/AboutQuad/AboutQuad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Program = require("../../../../../vendors/ogl/src/core/Program");

var _Texture = require("../../../../../vendors/ogl/src/core/Texture");

var _Plane = require("../../../../../vendors/ogl/src/extras/Plane");

var _DomQuad2 = _interopRequireDefault(require("../../../extras/DomQuad/DomQuad"));

var _EventEmitter = _interopRequireDefault(require("../../../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../../../utils/events.js"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var vert = require('./shaders/aboutQuad.vert');

var frag = require('./shaders/aboutQuad.frag');

var emitter = _EventEmitter.default.emitter;

var AboutQuad = /*#__PURE__*/function (_DomQuad) {
  (0, _inherits2.default)(AboutQuad, _DomQuad);

  var _super = _createSuper(AboutQuad);

  function AboutQuad(gl, _ref) {
    var _this;

    var media = _ref.media;
    (0, _classCallCheck2.default)(this, AboutQuad);
    _this = _super.call(this, gl);
    _this.gl = gl;
    _this.media = media[0];

    _this.initProgram();

    return _this;
  }

  (0, _createClass2.default)(AboutQuad, [{
    key: "initProgram",
    value: function initProgram() {
      this.texture = new _Texture.Texture(this.gl, {
        generateMipmaps: false,
        minFilter: this.gl.LINEAR,
        magFilter: this.gl.LINEAR,
        // anisotropy: 16,
        width: 1024,
        height: 1024
      });
      if (this.media.imageSrc) this.loadImage();
      this.geometry = new _Plane.Plane(this.gl, {
        width: 2,
        height: 2,
        widthSegments: 32.0,
        heightSegments: 32.0
      });
      var u = {
        _ViewplaneSize: {
          value: this.viewPlaneSize
        },
        _Image: {
          value: this.texture
        },
        _FlowMap: {
          value: null
        },
        _ClipRevealPhase: {
          value: 0.0
        },
        _UvScalePhase: {
          value: 0.0
        },
        _Alpha: {
          value: 0.0
        },
        _RevealDirection: {
          value: 0.0
        },
        _Aspect: {
          value: this.viewPlaneSize.x / this.viewPlaneSize.y
        }
      };
      this.program = new _Program.Program(this.gl, {
        vertex: vert,
        fragment: frag,
        uniforms: u,
        transparent: true
      });
    }
  }, {
    key: "reveal",
    value: function reveal() {
      _gsap.gsap.set(this.program.uniforms._RevealDirection, {
        value: 0.0
      });

      _gsap.gsap.to(this.program.uniforms._ClipRevealPhase, {
        duration: 2.0,
        value: 1.0,
        ease: "power2.inOut"
      });

      _gsap.gsap.to(this.program.uniforms._UvScalePhase, {
        duration: 2.0,
        value: 1.0,
        ease: "power2.inOut"
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      _gsap.gsap.set(this.program.uniforms._RevealDirection, {
        value: 1.0
      });

      _gsap.gsap.to(this.program.uniforms._ClipRevealPhase, {
        duration: 1.0,
        value: 0.0,
        ease: "power2.inOut",
        onComplete: function onComplete() {
          _gsap.gsap.set(_this2.program.uniforms._UvScalePhase, {
            value: 0.0
          });
        }
      });
    }
  }, {
    key: "update",
    value: function update(flowMap) {
      // this.program.uniforms._Aspect.value = this.aspect;
      this.program.uniforms._FlowMap.value = flowMap;
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      var _this3 = this;

      var img = new Image();
      img.crossOrigin = "*";
      img.src = this.media.imageSrc;

      img.onload = function () {
        _this3.texture.image = img;
        emitter.emit(_events.default.TEXTURE_LOADED);
      };
    }
  }]);
  return AboutQuad;
}(_DomQuad2.default);

exports.default = AboutQuad;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","../../../../../vendors/ogl/src/core/Program":"../../vendors/ogl/src/core/Program.js","../../../../../vendors/ogl/src/core/Texture":"../../vendors/ogl/src/core/Texture.js","../../../../../vendors/ogl/src/extras/Plane":"../../vendors/ogl/src/extras/Plane.js","../../../extras/DomQuad/DomQuad":"../WebGL/extras/DomQuad/DomQuad.js","./shaders/aboutQuad.vert":"../WebGL/DomQuads/About/AboutQuad/shaders/aboutQuad.vert","./shaders/aboutQuad.frag":"../WebGL/DomQuads/About/AboutQuad/shaders/aboutQuad.frag","../../../../EventEmitter.js":"../EventEmitter.js","../../../../../utils/events.js":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js"}],"../WebGL/DomQuads/About/AboutQuadMediator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _DomquadMediator2 = _interopRequireDefault(require("../../extras/DomQuad/DomquadMediator.js"));

var _AboutQuad = _interopRequireDefault(require("./AboutQuad/AboutQuad.js"));

var _AboutContent = require("../../../../static/AboutContent.js");

var _EventEmitter = _interopRequireDefault(require("../../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../../utils/events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

var AboutQuadMediator = /*#__PURE__*/function (_DomquadMediator) {
  (0, _inherits2.default)(AboutQuadMediator, _DomquadMediator);

  var _super = _createSuper(AboutQuadMediator);

  function AboutQuadMediator(gl, scene, camera) {
    var _this;

    (0, _classCallCheck2.default)(this, AboutQuadMediator);
    _this = _super.call(this, gl, scene, camera);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "initEvents", function () {
      emitter.on(_events.default.REVEAL_QUADS, _this.revealQuad);
      emitter.on(_events.default.PREPARE_UNMOUNT, _this.animateOutQuads);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "removeEvents", function () {
      emitter.off(_events.default.REVEAL_QUADS, _this.revealQuad);
      emitter.off(_events.default.PREPARE_UNMOUNT, _this.animateOutQuads);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "bindToDom", function (_ref) {
      var referenceElement = _ref.referenceElement;
      _this.quad.visible = true;
      _this.quad.domElement = referenceElement;

      _this.quad.updateRelations({
        camera: _this.camera
      });

      _this.calculateDomTransforms();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "revealQuad", function () {
      _this.quad.reveal();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "animateOutQuads", function () {
      _this.quad.hide();
    });
    _this.gl = gl;
    _this.position.z = 0.0;

    _this.initQuads();

    return _this;
  }

  (0, _createClass2.default)(AboutQuadMediator, [{
    key: "initQuads",
    value: function initQuads() {
      var media = _AboutContent.AboutContent.map(function (content) {
        return content.media;
      });

      emitter.emit(_events.default.UPDATE_CONTENT_COUNT, media.length);
      this.quad = new _AboutQuad.default(this.gl, {
        media: media,
        widthSegments: 32.0,
        heightSegments: 32.0
      });
      this.quad.setParent(this);
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var flowMap = _ref2.flowMap;
      this.quad.update(flowMap);
    }
  }, {
    key: "calculateDomTransforms",
    value: function calculateDomTransforms() {
      this.quad.updateDimensions();
      this.quad.calcDomToWebGLPos();
    }
  }]);
  return AboutQuadMediator;
}(_DomquadMediator2.default);

exports.default = AboutQuadMediator;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/assertThisInitialized":"../../node_modules/@babel/runtime/helpers/assertThisInitialized.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../../extras/DomQuad/DomquadMediator.js":"../WebGL/extras/DomQuad/DomquadMediator.js","./AboutQuad/AboutQuad.js":"../WebGL/DomQuads/About/AboutQuad/AboutQuad.js","../../../../static/AboutContent.js":"../../static/AboutContent.js","../../../EventEmitter.js":"../EventEmitter.js","../../../../utils/events":"../../utils/events.js"}],"../WebGL/DomQuads/DomQuadManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventEmitter = _interopRequireDefault(require("../../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../../utils/events.js"));

var _ProjectQuadMediator = _interopRequireDefault(require("./Projects/ProjectQuadMediator.js"));

var _AboutQuadMediator = _interopRequireDefault(require("./About/AboutQuadMediator.js"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

var DomQuadManager = /*#__PURE__*/function () {
  function DomQuadManager(gl, scene, camera) {
    var _this = this;

    (0, _classCallCheck2.default)(this, DomQuadManager);
    (0, _defineProperty2.default)(this, "loadMediator", function (_ref) {
      var view = _ref.view,
          params = _ref.params;
      _this.activeMediator = _this.mediators[view];

      _this.activeMediator.bindToDom(params);

      _this.activeMediator.initEvents();

      _this.activeMediator.setParent(_this.scene);
    });
    (0, _defineProperty2.default)(this, "unloadActiveMediator", function () {
      _this.activeMediator.removeEvents();

      _this.activeMediator.unloadQuads();

      _this.scene.removeChild(_this.activeMediator);
    });
    (0, _defineProperty2.default)(this, "resize", function () {
      if (_this.resizeEvent) _this.resizeEvent.kill();
      _this.resizeEvent = _gsap.gsap.delayedCall(0.15, function () {
        _this.updateQuadRelations();
      });
    });
    this.gl = gl;
    this.scene = scene;
    this.camera = camera;
    this.initMediators();
    this.initEvents();
  }

  (0, _createClass2.default)(DomQuadManager, [{
    key: "initMediators",
    value: function initMediators() {
      this.activeMediator = null;
      this.mediators = {
        PROJECTS: new _ProjectQuadMediator.default(this.gl, this.scene, this.camera),
        ABOUT: new _AboutQuadMediator.default(this.gl, this.scene, this.camera)
      };
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      emitter.on(_events.default.INIT_DOMGL, this.loadMediator);
      emitter.on(_events.default.REMOVE_DOMGL, this.unloadActiveMediator);
      emitter.on(_events.default.RESIZE, this.resize);
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var dt = _ref2.dt,
          inputPos = _ref2.inputPos,
          inputDelta = _ref2.inputDelta,
          flowMap = _ref2.flowMap;
      if (this.activeMediator === null) return;
      this.activeMediator.update({
        dt: dt,
        inputPos: inputPos,
        inputDelta: inputDelta,
        flowMap: flowMap
      });
      var i = 0;

      while (i < this.activeMediator.children.length) {
        var quad = this.activeMediator.children[i];
        quad.updateDimensions();
        quad.calcDomToWebGLPos();
        i++;
      }

      ;
    }
  }, {
    key: "updateQuadRelations",
    value: function updateQuadRelations() {
      var _this2 = this;

      if (this.activeMediator === null) return;
      this.activeMediator.children.forEach(function (quad) {
        quad.updateRelations({
          camera: _this2.camera
        });
      });
    }
  }]);
  return DomQuadManager;
}();

exports.default = DomQuadManager;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../../EventEmitter.js":"../EventEmitter.js","../../../utils/events.js":"../../utils/events.js","./Projects/ProjectQuadMediator.js":"../WebGL/DomQuads/Projects/ProjectQuadMediator.js","./About/AboutQuadMediator.js":"../WebGL/DomQuads/About/AboutQuadMediator.js","gsap":"../../node_modules/gsap/index.js"}],"../WebGL/MouseFlowmap/shaders/mouseFlowmap.vert":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\nvarying vec2 vUv;\n\nvoid main() {\n\n    gl_Position = vec4(position, 1.0);\n    vUv = uv;\n\n}";
},{}],"../WebGL/MouseFlowmap/shaders/mouseFlowmap.frag":[function(require,module,exports) {
module.exports = "precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D _PrevFrame;\n\nuniform vec2 _InputPos;\nuniform vec2 _InputVel;\n\nuniform float _FadeRate;\nuniform float _Force;\nuniform float _Radius;\nuniform float _Aspect;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n    vec2 uv = vUv;\n    uv = 2.0 * uv - 1.0;\n    vec2 toInput = _InputPos - uv;\n    toInput.x *= _Aspect;\n\n    float phase = smoothstep(_Radius, 0.0, length(toInput));\n    // vec3 vel = vec3(_InputVel,1.0 - pow(1.0 - min(1.0, length(_InputVel)), 2.0)) * phase * _Force;\n    // float fallOff = 1.0 - min(1.0, length(_InputVel));\n    float fallOff = 1.0 - min(1.0, dot(_InputVel, _InputVel) * 0.1);\n    fallOff *= fallOff;\n    vec3 vel = vec3(_InputVel,1.0 - fallOff) * phase * _Force;\n    \n    // vec3 vel = vec3(_InputVel,1.0 - pow(1.0 - min(1.0, length(_InputVel)), 2.0)) * _Force;\n    // float phase = smoothstep(vel.z * 0.5, 0.0, length(toInput));\n    // vel *= phase;\n\n    vec3 prev = texture2D(_PrevFrame, vUv).xyz;\n    vec3 outputPhase = mix(vel, prev, _FadeRate);\n\n    gl_FragColor = vec4(outputPhase, 1.0);\n\n}";
},{}],"../WebGL/MouseFlowmap/MouseFlowmap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Transform = require("../../../vendors/ogl/src/core/Transform");

var _Triangle = require("../../../vendors/ogl/src/extras/Triangle");

var _Mesh = require("../../../vendors/ogl/src/core/Mesh");

var _Program = require("../../../vendors/ogl/src/core/Program");

var _Vec = require("../../../vendors/ogl/src/math/Vec2");

var _RenderTarget = require("../../../vendors/ogl/src/core/RenderTarget");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vert = require('./shaders/mouseFlowmap.vert');

var frag = require('./shaders/mouseFlowmap.frag');

var MouseFlowmap = /*#__PURE__*/function () {
  function MouseFlowmap(gl, _ref) {
    var size = _ref.size;
    (0, _classCallCheck2.default)(this, MouseFlowmap);
    this.gl = gl;
    this.scene = new _Transform.Transform();
    this.initFBO(size);
    this.initProgram();
  }

  (0, _createClass2.default)(MouseFlowmap, [{
    key: "initFBO",
    value: function initFBO(size) {
      this.read = this.createRenderTexture(size);
      this.write = this.createRenderTexture(size);
    }
  }, {
    key: "swap",
    value: function swap() {
      var tmp = this.read;
      this.read = this.write;
      this.write = tmp;
    }
  }, {
    key: "createRenderTexture",
    value: function createRenderTexture(s) {
      var params = {
        width: s,
        height: s,
        type: this.gl.HALF_FLOAT || this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
        format: this.gl.RGBA,
        internalFormat: this.gl.RGBA16F,
        depth: false
      };
      return new _RenderTarget.RenderTarget(this.gl, params);
    }
  }, {
    key: "initProgram",
    value: function initProgram() {
      var geo = new _Triangle.Triangle(this.gl);
      var u = {
        _PrevFrame: {
          value: this.read.texture
        },
        _InputPos: {
          value: new _Vec.Vec2(0.0, 0.0)
        },
        _InputVel: {
          value: new _Vec.Vec2(0.0, 0.0)
        },
        _Force: {
          value: 1.5
        },
        _Radius: {
          // value: 0.5
          value: 0.35
        },
        _FadeRate: {
          value: 0.97
        },
        _Aspect: {
          value: this.gl.canvas.width / this.gl.canvas.height
        }
      };
      var program = new _Program.Program(this.gl, {
        vertex: vert,
        fragment: frag,
        uniforms: u,
        depthTest: false,
        depthWrite: false
      });
      this.flowMap = new _Mesh.Mesh(this.gl, {
        geometry: geo,
        program: program
      });
      this.flowMap.setParent(this.scene);
    }
  }, {
    key: "update",
    value: function update(renderer, _ref2) {
      var _ref2$dt = _ref2.dt,
          dt = _ref2$dt === void 0 ? 1.0 : _ref2$dt,
          inputPos = _ref2.inputPos,
          inputDelta = _ref2.inputDelta;

      this.flowMap.program.uniforms._InputPos.value.copy(inputPos);

      var velX = inputDelta.x / dt;
      var velY = inputDelta.y / dt;

      this.flowMap.program.uniforms._InputVel.value.set(velX, velY);

      this.flowMap.program.uniforms._PrevFrame.value = this.read.texture;
      renderer.render({
        scene: this.scene,
        target: this.write,
        clear: false
      });
      this.swap();
    }
  }, {
    key: "Texture",
    get: function get() {
      return this.read.texture;
    }
  }, {
    key: "Aspect",
    get: function get() {
      return this.flowMap.program.uniforms._Aspect.value;
    },
    set: function set(a) {
      this.flowMap.program.uniforms._Aspect.value = a;
    }
  }]);
  return MouseFlowmap;
}();

exports.default = MouseFlowmap;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../../../vendors/ogl/src/core/Transform":"../../vendors/ogl/src/core/Transform.js","../../../vendors/ogl/src/extras/Triangle":"../../vendors/ogl/src/extras/Triangle.js","../../../vendors/ogl/src/core/Mesh":"../../vendors/ogl/src/core/Mesh.js","../../../vendors/ogl/src/core/Program":"../../vendors/ogl/src/core/Program.js","../../../vendors/ogl/src/math/Vec2":"../../vendors/ogl/src/math/Vec2.js","../../../vendors/ogl/src/core/RenderTarget":"../../vendors/ogl/src/core/RenderTarget.js","./shaders/mouseFlowmap.vert":"../WebGL/MouseFlowmap/shaders/mouseFlowmap.vert","./shaders/mouseFlowmap.frag":"../WebGL/MouseFlowmap/shaders/mouseFlowmap.frag"}],"../WebGL/WebGLContext.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Transform = require("../../vendors/ogl/src/core/Transform");

var _Renderer = require("../../vendors/ogl/src/core/Renderer");

var _Camera = require("../../vendors/ogl/src/core/Camera");

var _Vec = require("../../vendors/ogl/src/math/Vec2");

var _Post = require("../../vendors/ogl/src/extras/Post.js");

var _DomQuadManager = _interopRequireDefault(require("./DomQuads/DomQuadManager.js"));

var _MouseFlowmap = _interopRequireDefault(require("./MouseFlowmap/MouseFlowmap"));

var _EventEmitter = _interopRequireDefault(require("../EventEmitter"));

var _events = _interopRequireDefault(require("../../utils/events"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fxaa = require("./post/fxaa.frag");

var ripple = require("./post/ripple.frag");

var emitter = _EventEmitter.default.emitter;

var WebGLContext = /*#__PURE__*/function () {
  function WebGLContext(container) {
    var _this = this;

    (0, _classCallCheck2.default)(this, WebGLContext);
    (0, _defineProperty2.default)(this, "onMouseDown", function (e) {
      _this.isInteracting = true;
      _this.inputPos.x = 2.0 * (e.x * _this.wk) - 1.0;
      _this.inputPos.y = -1 * (2.0 * (e.y * _this.hK) - 1.0);

      _this.prevInputPos.copy(_this.inputPos);

      _this.inputDelta.copy(_this.inputPos).sub(_this.prevInputPos);
    });
    (0, _defineProperty2.default)(this, "onMouseMove", function (e) {
      _this.inputPos.x = 2.0 * (e.x * _this.wk) - 1.0;
      _this.inputPos.y = -1 * (2.0 * (e.y * _this.hK) - 1.0);

      if (_this.firstMove === false) {
        _this.firstMove = true;

        _this.prevInputPos.copy(_this.inputPos);

        _this.inputDelta.copy(_this.inputPos).sub(_this.prevInputPos);
      }
    });
    (0, _defineProperty2.default)(this, "onMouseUp", function () {
      _this.isInteracting = false;
      _this.firstMove = false;
    });
    (0, _defineProperty2.default)(this, "onTouchStart", function (e) {
      e.preventDefault();
      _this.touchCount++;
      _this.isInteracting = true;
      var currentTouch = e.touches[0];
      _this.inputPos.x = 2.0 * (currentTouch.clientX * _this.wk) - 1.0;
      _this.inputPos.y = -1 * (2.0 * (currentTouch.clientY * _this.hK) - 1.0);

      _this.prevInputPos.copy(_this.inputPos);

      _this.inputDelta.copy(_this.inputPos).sub(_this.prevInputPos);
    });
    (0, _defineProperty2.default)(this, "onTouchMove", function (e) {
      e.preventDefault();

      if (_this.touchCount < 2) {
        var currentTouch = e.touches[0];
        _this.inputPos.x = 2.0 * (currentTouch.clientX * _this.wk) - 1.0;
        _this.inputPos.y = -1 * (2.0 * (currentTouch.clientY * _this.hK) - 1.0);

        if (_this.firstMove === false) {
          _this.firstMove = true;

          _this.prevInputPos.copy(_this.inputPos);

          _this.inputDelta.copy(_this.inputPos).sub(_this.prevInputPos);
        }
      }
    });
    (0, _defineProperty2.default)(this, "onTouchEnd", function () {
      _this.isInteracting = false;
      _this.firstMove = false;
      _this.touchCount = 0;
    });
    (0, _defineProperty2.default)(this, "distort", function () {// const {
      //   uniforms
      // } = this.post.passes[0];
      // gsap.to(uniforms._TransitionPhase, {
      //   ease: "power1.inOut",
      //   duration: 2,
      //   value: 1,
      //   onComplete: () => {
      //     uniforms._TransitionPhase.value = 0;
      //   }
      // });
    });
    (0, _defineProperty2.default)(this, "update", function (_ref) {
      var deltaTime = _ref.deltaTime;
      _this.deltaTime = deltaTime * 0.001;

      _this.inputDelta.copy(_this.inputPos).sub(_this.prevInputPos);

      _this.mouseFlowmap.update(_this.renderer, {
        dt: _this.deltaTime,
        inputPos: _this.inputPos,
        inputDelta: _this.inputDelta
      });

      _this.domQuadManager.update({
        dt: _this.deltaTime,
        inputPos: _this.inputPos,
        inputDelta: _this.inputDelta,
        flowMap: _this.mouseFlowmap.Texture
      });

      _this.render();

      _this.prevInputPos.copy(_this.inputPos);
    });
    (0, _defineProperty2.default)(this, "onResize", function () {
      if (_this.resizeContext) _this.resizeContext.kill();
      var w = window.innerWidth;
      var h = window.innerHeight;
      _this.wk = 1.0 / w;
      _this.hK = 1.0 / h;
      _this.resizeContext = _gsap.gsap.delayedCall(0.05, function () {
        _this.renderer.setSize(w, h);

        var aspectRatio = w / h;

        _this.camera.perspective({
          aspect: aspectRatio
        });

        _this.post.resize();

        _this.post.passes[0].uniforms.uResolution.value.set(_this.gl.canvas.width, _this.gl.canvas.height);

        _this.mouseFlowmap.Aspect = w / h;
      });
    });
    this.initScene(container);
    this.initEvents();
    this.initDomQuadManager();
    this.initMouseflowMap();
  }

  (0, _createClass2.default)(WebGLContext, [{
    key: "initScene",
    value: function initScene(_ref2) {
      var canvas = _ref2.canvas;
      var w = window.innerWidth;
      var h = window.innerHeight;
      this.renderer = new _Renderer.Renderer({
        width: w,
        height: h,
        canvas: canvas,
        powerPreference: "default",
        //powerPreference: "high-performance",
        antialias: window.isMobile ? false : true,
        dpr: window.isMobile ? 2.0 : 1.0
      });
      this.gl = this.renderer.gl; // this.gl.clearColor(0.9, 0.9, 0.9, 1.0);
      // this.gl.clearColor(0.93, 0.93, 0.93, 1.0);

      this.gl.clearColor(0.95, 0.95, 0.95, 1.0); // this.gl.clearColor(0.1, 0.1, 0.1, 1.0);

      var _this$gl$canvas = this.gl.canvas,
          width = _this$gl$canvas.width,
          height = _this$gl$canvas.height;
      this.wk = 1.0 / width;
      this.hK = 1.0 / height;
      this.camera = new _Camera.Camera(this.gl, {
        fov: 35,
        aspect: width / height,
        near: 0.01,
        far: 3.0
      });
      this.camera.position.set(0.0, 0.0, 1.0);
      this.currentTime = 0;
      this.prevtime = 0;
      this.deltaTime = 1;
      this.scene = new _Transform.Transform();
      this.post = new _Post.Post(this.gl);
      this.renderToScreen = true;
      this.canvasResolution = new _Vec.Vec2(width, height); // this.post.addPass({
      //   fragment: ripple,
      //   uniforms: {
      //     _Aspect: {
      //       value: width / height
      //     },
      //     _TransitionPhase: {
      //       value: 0
      //     },
      //     _Target: {
      //       value: new Vec2(0.5, 0.0)
      //     }
      //   }
      // });

      this.post.addPass({
        fragment: fxaa,
        uniforms: {
          uResolution: {
            value: this.canvasResolution
          }
        }
      });
    }
  }, {
    key: "initDomQuadManager",
    value: function initDomQuadManager() {
      this.domQuadManager = new _DomQuadManager.default(this.gl, this.scene, this.camera);
    }
  }, {
    key: "initMouseflowMap",
    value: function initMouseflowMap() {
      this.mouseFlowmap = new _MouseFlowmap.default(this.gl, {
        size: 128
      });
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      if (!window.isMobile) {
        emitter.on(_events.default.MOUSE_DOWN, this.onMouseDown);
        emitter.on(_events.default.MOUSE_MOVE, this.onMouseMove);
        emitter.on(_events.default.MOUSE_UP, this.onMouseUp);
      } else {
        emitter.on(_events.default.TOUCH_START, this.onTouchStart);
        emitter.on(_events.default.TOUCH_MOVE, this.onTouchMove);
        emitter.on(_events.default.TOUCH_END, this.onTouchEnd);
        emitter.on(_events.default.TOUCH_CANCEL, this.onTouchEnd);
        this.touchCount = 0;
      }

      emitter.on(_events.default.PREPARE_UNMOUNT, this.distort);
      emitter.on(_events.default.UPDATE, this.update);
      this.isInteracting = false;
      this.firstMove = false;
      this.inputPos = new _Vec.Vec2(0.0, 0.0);
      this.prevInputPos = new _Vec.Vec2(0.0, 0.0);
      this.inputDelta = new _Vec.Vec2(0.0, 0.0);
      emitter.on(_events.default.RESIZE, this.onResize);
      this.isResizing = false;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.renderToScreen === false) {
        this.post.render({
          scene: this.scene,
          camera: this.camera,
          clear: true
        });
      } else {
        this.renderer.render({
          scene: this.scene,
          camera: this.camera,
          clear: true
        });
      }
    }
  }]);
  return WebGLContext;
}();

exports.default = WebGLContext;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../../vendors/ogl/src/core/Transform":"../../vendors/ogl/src/core/Transform.js","../../vendors/ogl/src/core/Renderer":"../../vendors/ogl/src/core/Renderer.js","../../vendors/ogl/src/core/Camera":"../../vendors/ogl/src/core/Camera.js","../../vendors/ogl/src/math/Vec2":"../../vendors/ogl/src/math/Vec2.js","../../vendors/ogl/src/extras/Post.js":"../../vendors/ogl/src/extras/Post.js","./post/fxaa.frag":"../WebGL/post/fxaa.frag","./post/ripple.frag":"../WebGL/post/ripple.frag","./DomQuads/DomQuadManager.js":"../WebGL/DomQuads/DomQuadManager.js","./MouseFlowmap/MouseFlowmap":"../WebGL/MouseFlowmap/MouseFlowmap.js","../EventEmitter":"../EventEmitter.js","../../utils/events":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js"}],"../LoadingScreen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter.js"));

var _events = _interopRequireDefault(require("../utils/events.js"));

var _gsap = require("gsap");

var _globals = _interopRequireDefault(require("../utils/globals.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

var LoadingScreen = /*#__PURE__*/function () {
  function LoadingScreen() {
    var _this = this;

    (0, _classCallCheck2.default)(this, LoadingScreen);
    (0, _defineProperty2.default)(this, "hide", function () {
      _gsap.gsap.to(_this.loadingProgress, {
        delay: 1.5,
        duration: 1.0,
        ease: "power1.inOut",
        y: -_this.loadingProgress.getBoundingClientRect().height,
        onComplete: function onComplete() {
          _gsap.gsap.delayedCall(0.5, function () {
            _this.el.classList.add('loaded');

            _globals.default.CONTENT_LOADED = true;
            emitter.emit(_events.default.LOADING_ANIM_COMPLETED);
          });
        }
      });
    });
    (0, _defineProperty2.default)(this, "updateProgress", function (phase) {
      _this.contentCount++;
      _this.targetScale = _this.contentCount / _this.totalContent;
      _this.loadingProgress.innerText = "".concat(Math.round(_this.targetScale * 100.0));
      if (_this.contentCount === _this.totalContent) _this.hide();
    });
    (0, _defineProperty2.default)(this, "update", function () {
      _this.currentScale += (_this.targetScale - _this.currentScale) * 0.1;
    });
    this.el = document.body.querySelector('.loader');
    this.loadingProgress = document.body.querySelector('.loader__progress');
    this.totalContent = 0;
    this.contentCount = 0;
    this.currentScale = 0;
    this.targetScale = 0;
    this.reveal();
    this.initEvents();
  }

  (0, _createClass2.default)(LoadingScreen, [{
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      emitter.on(_events.default.UPDATE_CONTENT_COUNT, function (count) {
        _this2.totalContent += count;
      });
      emitter.on(_events.default.TEXTURE_LOADED, this.updateProgress);
      emitter.on(_events.default.UPDATE, this.update);
    }
  }, {
    key: "reveal",
    value: function reveal() {}
  }]);
  return LoadingScreen;
}();

exports.default = LoadingScreen;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","./EventEmitter.js":"../EventEmitter.js","../utils/events.js":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js","../utils/globals.js":"../../utils/globals.js"}],"../../static/img/gaben.gif":[function(require,module,exports) {
module.exports = "/gaben.bd09244c.gif";
},{}],"../../static/img/*.gif":[function(require,module,exports) {
module.exports = {
  "gaben": require("./gaben.gif")
};
},{"./gaben.gif":"../../static/img/gaben.gif"}],"../NoMobileCTA.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ = _interopRequireDefault(require("../static/img/*.gif"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter.js"));

var _events = _interopRequireDefault(require("../utils/events.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

var NoMobileCTA = /*#__PURE__*/function () {
  function NoMobileCTA() {
    var _this = this;

    (0, _classCallCheck2.default)(this, NoMobileCTA);
    this.el = document.createElement('div');
    this.el.classList.add('no-mobile-cta');
    var twitterLink = document.createElement('a');
    twitterLink.href = "https://twitter.com/DougLilliequist";
    twitterLink.innerText = "visit my twitter 👀";
    twitterLink.classList.add('no-mobile-cta__contact-link');
    var emailLink = document.createElement('a');
    emailLink.href = "mailto:douglas@adventureclub.io";
    emailLink.innerText = "or say hello 👋";
    emailLink.target = "_blank";
    emailLink.classList.add('no-mobile-cta__contact-link'); // this.el.appendChild(twitterLink);

    var greetingGif = new Image();
    greetingGif.classList.add('no-mobile-cta__greeting-gif');
    greetingGif.crossOrigin = "*";

    greetingGif.onload = function () {
      _this.el.appendChild(greetingGif);

      _this.el.appendChild(twitterLink);

      _this.el.appendChild(emailLink);
    };

    greetingGif.src = _.default.gaben;
    document.body.appendChild(this.el);
  }

  (0, _createClass2.default)(NoMobileCTA, [{
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      emitter.on(_events.default.LOADING_ANIM_COMPLETED, function () {
        document.body.appendChild(_this2.el);
      });
    }
  }]);
  return NoMobileCTA;
}();

exports.default = NoMobileCTA;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","../static/img/*.gif":"../../static/img/*.gif","./EventEmitter.js":"../EventEmitter.js","../utils/events.js":"../../utils/events.js"}],"../Navigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter.js"));

var _events = _interopRequireDefault(require("../utils/events"));

var _StickyComponent = _interopRequireDefault(require("./StickyComponent.js"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Navigation);
    (0, _defineProperty2.default)(this, "enableLinks", function () {
      _gsap.gsap.fromTo(_this.el, {
        opacity: 0.0
      }, {
        opacity: 1.0,
        duration: 0.8,
        z: 0,
        onStart: function onStart() {
          _this.links.forEach(function (link) {
            if (link.href === window.location.href) {
              link.selected = true;

              _gsap.gsap.set(link, {
                opacity: 1.0
              });
            }
          });
        },
        onComplete: function onComplete() {
          _this.updateActiveState({
            state: true
          });
        }
      });
    });
    (0, _defineProperty2.default)(this, "updateActiveState", function (_ref) {
      var state = _ref.state;
      _this.active = state;

      _this.links.forEach(function (link) {
        if (_this.active) {
          link.classList.remove('link--disabled');
        } else {
          link.classList.add('link--disabled');
        }
      });
    });
    (0, _defineProperty2.default)(this, "onHover", function (link) {
      globals.HOVERING_LINK = true;
      emitter.emit(_events.default.HOVERING_NAV_LINK, true);

      _this.animateHoverState({
        link: link,
        state: true
      });
    });
    (0, _defineProperty2.default)(this, "onLeave", function (link) {
      globals.HOVERING_LINK = false;
      emitter.emit(_events.default.HOVERING_NAV_LINK, false);

      _this.animateHoverState({
        link: link,
        state: false
      });
    });
    (0, _defineProperty2.default)(this, "onSelect", function (selectedLink) {
      _this.links.forEach(function (link) {
        if (link === selectedLink) {
          link.selected = true;

          _gsap.gsap.set(link, {
            opacity: 1
          });
        } else {
          link.selected = false;

          _gsap.gsap.to(link, {
            duration: 0.2,
            ease: "power1.out",
            opacity: 0.4,
            z: 0
          });
        }
      });
    });
    this.el = document.querySelector('.navigation__links');
    this.links = this.el.querySelectorAll('.link');
    this.active = false;
    this.initEvents();
  }

  (0, _createClass2.default)(Navigation, [{
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      this.links.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          _this2.onHover(link);
        });
        link.addEventListener('mouseleave', function () {
          _this2.onLeave(link);
        });
        link.addEventListener('click', function () {
          _this2.onSelect(link);
        });
      });
      emitter.on(_events.default.ENTER_SCROLL_MODE, function () {
        _this2.links.forEach(function (link) {
          link.classList.add('deactivated'); // link.stickyComponent.enable = false;
        });
      });
      emitter.on(_events.default.EXIT_SCROLL_MODE, function () {
        _this2.links.forEach(function (link) {
          link.classList.remove('deactivated'); // link.stickyComponent.enable = true;
        });
      });
      window.viewMediator.on('NAVIGATE_IN', function (_ref2) {// this.updateSelectionState(location);

        var to = _ref2.to,
            location = _ref2.location;
      });
      emitter.on(_events.default.LOADING_ANIM_COMPLETED, this.enableLinks);
      emitter.on(_events.default.TRANSITIONING, this.updateActiveState);
    }
  }, {
    key: "updateSelectionState",
    value: function updateSelectionState() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.links.forEach(function (link) {
        link.classList.remove('link--active');
        link.selected = false;
        var currentLocation = location ? location.href : window.location.href;

        if (link.href === currentLocation) {
          link.classList.add('link--active');
          link.selected = true;
        }
      });
    }
  }, {
    key: "animateHoverState",
    value: function animateHoverState(_ref3) {
      var link = _ref3.link,
          state = _ref3.state;
      if (link.selected) return;
      if (this.hoverAnim) this.hoverAnim.kill();
      this.hoverAnim = _gsap.gsap.to(link, {
        duration: 0.1,
        ease: state ? "power1.out" : "power1.in",
        opacity: state ? 0.7 : 0.4,
        z: 0
      });
    }
  }]);
  return Navigation;
}();

exports.default = Navigation;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","./EventEmitter.js":"../EventEmitter.js","../utils/events":"../../utils/events.js","./StickyComponent.js":"../StickyComponent.js","gsap":"../../node_modules/gsap/index.js"}],"../CanvasComponents/Cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _EventEmitter = _interopRequireDefault(require("../EventEmitter.js"));

var _events = _interopRequireDefault(require("../../utils/events"));

var _gsap = require("gsap");

var _globals = _interopRequireDefault(require("../../utils/globals.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = _EventEmitter.default.emitter;

/**
 * Make this available if not using mobile
 */
var Cursor = /*#__PURE__*/function () {
  function Cursor() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Cursor);
    (0, _defineProperty2.default)(this, "onMouseDown", function () {
      _this.inScrollMode = true; // if(this.hoveringSticky === false) {
      // this.prevPosition.x = this.target.x;
      // this.prevPosition.y = this.target.y;
      // }

      _this.animateScrollMode();
    });
    (0, _defineProperty2.default)(this, "onMouseMove", function (event) {
      if (_this.visible === false) {
        _this.visible = true;

        _this.restoreAlpha();
      }

      _this.inputPos.x = event.clientX;
      _this.inputPos.y = event.clientY;

      if (_this.inScrollMode) {
        _this.inputTravel = _this.inputTravel < _this.inputTravelThreshold ? _this.inputTravel + 1 : _this.inputTravelThreshold;

        if (_this.inputTravel >= _this.inputTravelThreshold) {
          _this.removeCTAText();
        }
      }
    });
    (0, _defineProperty2.default)(this, "onMouseUp", function () {
      _this.restore();
    });
    (0, _defineProperty2.default)(this, "restore", function () {
      if (_this.restoreAnim) _this.restoreAnim.kill();
      _this.restoreAnim = _gsap.gsap.timeline({
        onComplete: function onComplete() {
          return _this.inScrollMode = false;
        }
      });

      _this.restoreAnim.to(_this, {
        duration: 0.2,
        radius: _this.defaultRadius,
        ctaTextAlpha: _this.removeCTA ? 0.0 : 1.0,
        cursorArrowAlpha: 0.0,
        ease: "power1.out"
      }, "<");

      _this.restoreAnim.to(_this.arrowOriginOffset, {
        duration: 0.2,
        y: 4,
        ease: "power1.out"
      }, "<");
    });
    (0, _defineProperty2.default)(this, "reveal", function () {
      var revealAnim = _gsap.gsap.timeline({});

      revealAnim.fromTo(_this, {
        radius: 0,
        ctaTextAlpha: 0
      }, {
        duration: 0.2,
        radius: _this.defaultRadius,
        ctaTextAlpha: 1.0,
        ease: "circ.out"
      });
    });
    (0, _defineProperty2.default)(this, "animateHoverMode", function (event) {
      if (_this.hoveringSticky === false) {
        _this.hoveringSticky = true;
        var rect = event.rect;
        var width = rect.width,
            height = rect.height; // this.hoverRadius = Math.sqrt((width * width) + (height * height)) * 0.3115;

        _this.hoverRadius = Math.sqrt(width * width + height * height) * 0.35;
        if (_this.hoverModeAnim) _this.hoverModeAnim.kill();
        _this.hoverModeAnim = _gsap.gsap.to(_this, {
          duration: 0.4,
          ease: "power1.out",
          radius: _this.hoverRadius,
          onStart: function onStart() {
            if (_this.visible === false) return;

            _this.hideCTAText();

            _this.strokeAlpha = 0;
            _this.fillAlpha = 1;
          }
        });
      }
    });
    (0, _defineProperty2.default)(this, "animateLeaveHoverMode", function () {
      if (_this.hoveringSticky) {
        _this.hoveringSticky = false;
        if (_this.leaveHoverModeAnim) _this.leaveHoverModeAnim.kill();
        _this.leaveHoverModeAnim = _gsap.gsap.to(_this, {
          duration: 0.4,
          ease: "power1.out",
          radius: _this.defaultRadius,
          onStart: function onStart() {
            if (_this.visible === false) return;

            _this.showCTAText();

            _this.strokeAlpha = 1;
            _this.fillAlpha = 0;
          }
        });
      }
    });
    (0, _defineProperty2.default)(this, "onLinkSelected", function () {
      _gsap.gsap.to(_this, {
        duration: 0.2,
        ease: "power1.out",
        alpha: 0.0,
        radius: _this.hoverRadius * 1.2,
        onComplete: function onComplete() {
          _this.visible = false;
        }
      });
    });
    (0, _defineProperty2.default)(this, "updateNavlinkState", function (state) {
      if (_this.navlinkHoverAnim) _this.navlinkHoverAnim.kill();

      if (state === true) {
        _this.navlinkHoverAnim = _gsap.gsap.to(_this, {
          duration: 0.2,
          ease: "power1.out",
          radius: 0,
          onStart: function onStart() {
            _this.hideCTAText();
          }
        });
      } else {
        _this.navlinkHoverAnim = _gsap.gsap.to(_this, {
          duration: 0.2,
          ease: "power1.in",
          radius: _this.defaultRadius,
          onComplete: function onComplete() {
            _this.showCTAText();
          }
        });
      }
    });
    (0, _defineProperty2.default)(this, "updateStickyTarget", function (event) {
      var target = event.target;
      _this.target.x = target.x;
      _this.target.y = target.y;
    });
    (0, _defineProperty2.default)(this, "showCTAText", function () {
      if (_this.removeCTA || _this.inViewProjectMode) return;
      _this.drawMessage = true;

      _gsap.gsap.to(_this, {
        duration: 0.5,
        ctaTextAlpha: 1,
        ease: "power1.out"
      });
    });
    (0, _defineProperty2.default)(this, "hideCTAText", function () {
      if (_this.removeCTA || _this.inViewProjectMode) return;
      _this.drawMessage = false;

      _gsap.gsap.to(_this, {
        duration: 0.5,
        ctaTextAlpha: 0,
        ease: "power1.out"
      });
    });
    (0, _defineProperty2.default)(this, "update", function () {
      _this.position.x += (_this.target.x - _this.position.x) / 6.0;
      _this.position.y += (_this.target.y - _this.position.y) / 6.0; // this.position.x = this.target.x;
      // this.position.y = this.target.y;

      if (_this.hoveringSticky === false) {
        _this.target.x = _this.inputPos.x;
        _this.target.y = _this.inputPos.y;
      }

      _this.delta.x = _this.position.x - _this.prevPosition.x;
      _this.delta.y = _this.position.y - _this.prevPosition.y;
      _this.inputDirection = Math.sign(_this.delta.y) * -1; //coordinates are flipped in canvas

      _this.updateInputphase();

      _this.draw();

      _this.prevPosition.x = _this.position.x;
      _this.prevPosition.y = _this.position.y;
    });
    (0, _defineProperty2.default)(this, "onResize", function () {
      _this.width = _this.canvas.width = window.innerWidth * _this.dpr;
      _this.height = _this.canvas.height = window.innerHeight * _this.dpr;

      _this.ctx.scale(_this.dpr, _this.dpr);
    });
    this.dpr = Math.min(2.0, window.devicePixelRatio);
    this.canvas = document.querySelector('.main-cursor');
    this.width = this.canvas.width = window.innerWidth * this.dpr;
    this.height = this.canvas.height = window.innerHeight * this.dpr;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.dpr, this.dpr);
    this.initCursor();
    this.initCursorArrows();
    this.initCta();
    this.initEvents();
  }

  (0, _createClass2.default)(Cursor, [{
    key: "initCursor",
    value: function initCursor() {
      this.position = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5
      };
      this.prevPosition = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5
      };
      this.delta = {
        x: 0,
        y: 0
      };
      this.inputPos = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.2
      };
      this.target = {
        x: 0,
        y: 0
      };
      this.inScrollMode = false;
      this.inViewProjectMode = false;
      this.defaultRadius = 15.0;
      this.scrollModeRadius = 22.0;
      this.hoverRadius = 1.0;
      this.radius = this.defaultRadius; // this.strokeWidth = 0.5;

      this.strokeWidth = 0.5;
      this.startAngle = 0;
      this.strokeAlpha = 1.0;
      this.fillAlpha = 0.0;
      this.visible = true;
      this.hoveringSticky = false;
      this.endAngle = Math.PI * 2.0;
      this.ease = 0.2;
    }
  }, {
    key: "initCursorArrows",
    value: function initCursorArrows() {
      this.arrowOriginOffset = {
        x: 4,
        y: 4
      };
      this.arrowLocalPos = {
        x: 4,
        y: 9
      };
      this.cursorArrowAlpha = 0.0;
      this.inputPhase = 0.0;
      this.inputDirection = 0.0;
    }
  }, {
    key: "initCta",
    value: function initCta() {
      this.holdMessage = this.createCanvasText({
        word: "Hold",
        fontSize: 12
      });
      this.dragMessage = this.createCanvasText({
        word: "Drag",
        fontSize: 12
      });
      this.ctaPosOffset = {
        x: 0,
        y: 0
      };
      this.ctaTextAlpha = 1.0;
      this.removeCTA = false;
      this.drawMessage = false;
      this.inputTravel = 0;
      this.inputTravelThreshold = 100;
    }
  }, {
    key: "createCanvasText",
    value: function createCanvasText(_ref) {
      var word = _ref.word,
          fontSize = _ref.fontSize;
      this.ctx.font = "".concat(fontSize, "px Mulish");
      var messageBounds = this.ctx.measureText(word);
      return {
        word: word,
        width: messageBounds.width,
        fontSize: fontSize
      };
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      emitter.on(_events.default.LOADING_ANIM_COMPLETED, this.reveal);
      emitter.on(_events.default.SHOW_CLICKDRAG_CTA, this.showCTAText);
      emitter.on(_events.default.HIDE_CLICKDRAG_CTA, this.hideCTAText);
      emitter.on(_events.default.MOUSE_MOVE, this.onMouseMove);
      emitter.on(_events.default.ENTER_SCROLL_MODE, this.onMouseDown);
      emitter.on(_events.default.EXIT_SCROLL_MODE, this.onMouseUp); // emitter.on(events.HOVERING_STICKY_COMPONENT, this.animateHoverMode);
      // emitter.on(events.LEAVING_STICKY_COMPONENT, this.animateLeaveHoverMode);
      // emitter.on(events.HOVERING_LINK, this.animateHoverMode);
      // emitter.on(events.LEAVING_LINK, this.animateLeaveHoverMode);
      // emitter.on(events.)

      emitter.on(_events.default.UPDATE_STICKY_TARGET, this.updateStickyTarget);
      emitter.on(_events.default.LINK_SELECTED, this.onLinkSelected);
      emitter.on(_events.default.HOVERING_NAV_LINK, this.updateNavlinkState);
      emitter.on(_events.default.SHOW_PROJECT, function () {
        return _this2.inViewProjectMode = true;
      });
      emitter.on(_events.default.CLOSE_PROJECT, function () {
        return _this2.inViewProjectMode = false;
      });
      emitter.on(_events.default.UPDATE, this.update);
      emitter.on(_events.default.RESIZE, this.onResize);
    }
  }, {
    key: "animateScrollMode",
    //include kill animation
    //make this to TL animation
    value: function animateScrollMode() {
      if (this.inScrollMode) {
        if (this.scrollModeAnim) this.scrollModeAnim.kill();
        this.scrollModeAnim = _gsap.gsap.timeline({});
        this.scrollModeAnim.to(this, {
          duration: 0.2,
          radius: this.scrollModeRadius,
          cursorArrowAlpha: 0.5,
          ease: "power1.out"
        }, "<");
        this.scrollModeAnim.to(this.arrowOriginOffset, {
          duration: 0.2,
          y: 10,
          ease: "power1.out"
        }, "<");
        this.scrollModeAnim.fromTo(this.ctaPosOffset, {
          y: 24
        }, {
          y: 0,
          duration: 0.5,
          ease: "power1.out"
        }, "<");
      }
    }
  }, {
    key: "restoreAlpha",
    value: function restoreAlpha() {
      var _this3 = this;

      _gsap.gsap.to(this, {
        duration: 0.2,
        ease: "power1.out",
        alpha: 1.0,
        onComplete: function onComplete() {
          _this3.visible = true;
        }
      });
    }
  }, {
    key: "drawCursorArrows",
    value: function drawCursorArrows() {
      //top arrow
      this.ctx.beginPath();
      var topArrowAlpha = Math.min(1, this.cursorArrowAlpha + (this.inputDirection > 0 ? this.inputPhase : 0));
      this.ctx.fillStyle = "rgba(".concat(0.0, ", ", 0.0, ", ", 0.0, ", ", topArrowAlpha, ")");
      var topArrowScale = Math.min(2, this.inputDirection > 0 ? this.inputPhase : 0);
      this.ctx.moveTo(this.position.x - (4 + topArrowScale), this.position.y - (this.radius + this.arrowOriginOffset.y));
      this.ctx.lineTo(this.position.x + (4 + topArrowScale), this.position.y - (this.radius + this.arrowOriginOffset.y));
      this.ctx.lineTo(this.position.x, this.position.y - (this.radius + this.arrowOriginOffset.y + 5.0 + topArrowScale));
      this.ctx.fill();
      this.ctx.closePath(); // //bottom arrow

      this.ctx.beginPath();
      var bottomArrowAlpha = Math.min(1.0, this.cursorArrowAlpha + (this.inputDirection < 0 ? this.inputPhase : 0));
      this.ctx.fillStyle = "rgba(".concat(0.0, ", ", 0.0, ", ", 0.0, ", ", bottomArrowAlpha, ")");
      var bottomArrowScale = Math.min(2, this.inputDirection < 0 ? this.inputPhase : 0);
      this.ctx.moveTo(this.position.x - (4 + bottomArrowScale), this.position.y + (this.radius + this.arrowOriginOffset.y));
      this.ctx.lineTo(this.position.x + (4 + bottomArrowScale), this.position.y + (this.radius + this.arrowOriginOffset.y));
      this.ctx.lineTo(this.position.x, this.position.y + (this.radius + this.arrowOriginOffset.y + 5 + bottomArrowScale));
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "drawCursorCircle",
    value: function drawCursorCircle() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "rgba(".concat(0.0, ",", 0.0, ",", 0.0, ", ", this.fillAlpha, ")");
      this.ctx.strokeStyle = "rgba(".concat(0.0, ",", 0.0, ",", 0.0, ", ", this.strokeAlpha, ")");
      this.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, false);
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "drawCTAText",
    value: function drawCTAText() {
      var message = this.inScrollMode ? this.dragMessage : this.holdMessage;
      this.ctx.fillStyle = "rgba(".concat(0.0, ",", 0.0, ",", 0.0, ", ", this.ctaTextAlpha, ")");
      this.ctx.font = "".concat(12, "px Arial");
      this.ctx.textBaseline = "middle"; // this.ctx.fillText(message.word, this.position.x + 40, this.position.y + this.ctaPosOffset.y);

      this.ctx.fillText(message.word, this.position.x - 60, this.position.y + this.ctaPosOffset.y);
    }
  }, {
    key: "removeCTAText",
    value: function removeCTAText() {
      if (this.removeCTA === false) {
        this.removeCTA = true;

        _gsap.gsap.to(this, {
          duration: 0.5,
          ctaTextAlpha: 0,
          ease: "power1.out"
        });
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawCursorCircle();
      if (this.inScrollMode) this.drawCursorArrows();
      if (_globals.default.CURRENT_VIEW !== "work") return;
      if (this.drawMessage) this.drawCTAText();
    }
  }, {
    key: "updateInputphase",
    value: function updateInputphase() {
      if (this.inScrollMode) this.inputPhase += Math.abs(this.delta.y) * 0.01;
      this.inputPhase *= this.inputPhase < 0.001 ? 0.0 : 0.90;
    }
  }]);
  return Cursor;
}();

exports.default = Cursor;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/defineProperty":"../../node_modules/@babel/runtime/helpers/defineProperty.js","../EventEmitter.js":"../EventEmitter.js","../../utils/events":"../../utils/events.js","gsap":"../../node_modules/gsap/index.js","../../utils/globals.js":"../../utils/globals.js"}],"../TransitionSlide.js":[function(require,module,exports) {
"use strict";

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransitionSlide = /*#__PURE__*/function () {
  function TransitionSlide() {
    (0, _classCallCheck2.default)(this, TransitionSlide);
    this.el = document.querySelector('.transition-slide');

    _gsap.gsap.set(this.el, {
      xPercent: 0,
      yPercent: 100,
      z: 0
    });
  }

  (0, _createClass2.default)(TransitionSlide, [{
    key: "animate",
    value: function animate(_ref) {
      var _this = this;

      var leaving = _ref.leaving;
      return new Promise(function (resolve) {
        var ease = leaving ? "power1.in" : "power1.out";
        var duration = 1.0;

        _gsap.gsap.to(_this.el, {
          xPercent: 0,
          yPercent: leaving ? 0 : -100,
          z: 0,
          ease: ease,
          duration: duration,
          onComplete: function onComplete() {
            _gsap.gsap.set(_this.el, {
              xPercent: 0,
              yPercent: leaving ? 0 : 100,
              z: 0
            });

            resolve();
          }
        });
      });
    }
  }]);
  return TransitionSlide;
}(); // const transitionSlide = new TransitionSlide();
// export default transitionSlide;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","gsap":"../../node_modules/gsap/index.js"}],"../Transitions/Transition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

var _EventEmitter = _interopRequireDefault(require("../EventEmitter"));

var _events = _interopRequireDefault(require("../../utils/events.js"));

var _TransitionSlide = _interopRequireDefault(require("../TransitionSlide"));

var _gsap = require("gsap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var emitter = _EventEmitter.default.emitter;

var Transition = /*#__PURE__*/function (_Highway$Transition) {
  (0, _inherits2.default)(Transition, _Highway$Transition);

  var _super = _createSuper(Transition);

  function Transition() {
    (0, _classCallCheck2.default)(this, Transition);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Transition, [{
    key: "in",
    value: function _in(_ref) {
      var from = _ref.from,
          to = _ref.to,
          done = _ref.done;
      from.remove();
      done();
    }
  }, {
    key: "out",
    value: function out(_ref2) {
      var from = _ref2.from,
          done = _ref2.done;
      emitter.emit(_events.default.PREPARE_UNMOUNT);

      _gsap.gsap.to(this, {
        duration: 1.0,
        onComplete: function onComplete() {
          done();
        }
      });
    }
  }]);
  return Transition;
}(_highway.default.Transition);

exports.default = Transition;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"../../node_modules/@babel/runtime/helpers/createClass.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@dogstudio/highway":"../../node_modules/@dogstudio/highway/build/highway.module.js","../EventEmitter":"../EventEmitter.js","../../utils/events.js":"../../utils/events.js","../TransitionSlide":"../TransitionSlide.js","gsap":"../../node_modules/gsap/index.js"}],"ViewMediator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ViewMediator = /*#__PURE__*/function (_Highway$Core) {
  (0, _inherits2.default)(ViewMediator, _Highway$Core);

  var _super = _createSuper(ViewMediator);

  function ViewMediator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        work = _ref.work,
        about = _ref.about,
        transition = _ref.transition;

    (0, _classCallCheck2.default)(this, ViewMediator);
    var highwayArgs = {
      renderers: {
        work: work,
        about: about
      },
      transitions: {
        default: transition
      }
    };
    return _super.call(this, highwayArgs);
  }

  return ViewMediator;
}(_highway.default.Core);

exports.default = ViewMediator;
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/possibleConstructorReturn":"../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js","@babel/runtime/helpers/getPrototypeOf":"../../node_modules/@babel/runtime/helpers/getPrototypeOf.js","@babel/runtime/helpers/inherits":"../../node_modules/@babel/runtime/helpers/inherits.js","@dogstudio/highway":"../../node_modules/@dogstudio/highway/build/highway.module.js"}],"../../node_modules/bowser/es5.js":[function(require,module,exports) {
var define;
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.bowser=t():e.bowser=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=r(18),i=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}},e.getMacOSVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),10===t[0])switch(t[1]){case 5:return"Leopard";case 6:return"Snow Leopard";case 7:return"Lion";case 8:return"Mountain Lion";case 9:return"Mavericks";case 10:return"Yosemite";case 11:return"El Capitan";case 12:return"Sierra";case 13:return"High Sierra";case 14:return"Mojave";case 15:return"Catalina";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":9===t[0]?"Pie":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,n){void 0===n&&(n=!1);var i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),o=Math.max(i,s),a=0,u=e.map([t,r],(function(t){var r=o-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),(function(e){return new Array(20-e.length).join("0")+e})).reverse()}));for(n&&(a=o-Math.min(i,s)),o-=1;o>=a;){if(u[0][o]>u[1][o])return 1;if(u[0][o]===u[1][o]){if(o===a)return 0;o-=1}else if(u[0][o]<u[1][o])return-1}},e.map=function(e,t){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)n.push(t(e[r]));return n},e.find=function(e,t){var r,n;if(Array.prototype.find)return Array.prototype.find.call(e,t);for(r=0,n=e.length;r<n;r+=1){var i=e[r];if(t(i,r))return i}},e.assign=function(e){for(var t,r,n=e,i=arguments.length,s=new Array(i>1?i-1:0),o=1;o<i;o++)s[o-1]=arguments[o];if(Object.assign)return Object.assign.apply(Object,[e].concat(s));var a=function(){var e=s[t];"object"==typeof e&&null!==e&&Object.keys(e).forEach((function(t){n[t]=e[t]}))};for(t=0,r=s.length;t<r;t+=1)a();return e},e.getBrowserAlias=function(e){return n.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return n.BROWSER_MAP[e]||""},e}();t.default=i,e.exports=t.default},18:function(e,t,r){"use strict";t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Electron:"electron",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic","Google Search":"google_search",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",QQ:"qq",QQLite:"qqlite",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",electron:"Electron",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",google_search:"Google Search",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",qq:"QQ Browser",qqlite:"QQ Browser Lite",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"}},90:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(91))&&n.__esModule?n:{default:n},s=r(18);function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=function(){function e(){}var t,r,n;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new i.default(e,t)},e.parse=function(e){return new i.default(e).getResult()},t=e,n=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&o(t.prototype,r),n&&o(t,n),e}();t.default=a,e.exports=t.default},91:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=u(r(92)),i=u(r(93)),s=u(r(94)),o=u(r(95)),a=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse()}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=a.default.find(n.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=a.default.find(i.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=a.default.find(s.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=a.default.find(o.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return a.default.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},n=0,i={},s=0;if(Object.keys(e).forEach((function(t){var o=e[t];"string"==typeof o?(i[t]=o,s+=1):"object"==typeof o&&(r[t]=o,n+=1)})),n>0){var o=Object.keys(r),u=a.default.find(o,(function(e){return t.isOS(e)}));if(u){var d=this.satisfies(r[u]);if(void 0!==d)return d}var c=a.default.find(o,(function(e){return t.isPlatform(e)}));if(c){var f=this.satisfies(r[c]);if(void 0!==f)return f}}if(s>0){var l=Object.keys(i),h=a.default.find(l,(function(e){return t.isBrowser(e,!0)}));if(void 0!==h)return this.compareVersion(i[h])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),n=e.toLowerCase(),i=a.default.getBrowserTypeByAlias(n);return t&&i&&(n=i.toLowerCase()),n===r},t.compareVersion=function(e){var t=[0],r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(n=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),t.indexOf(a.default.compareVersions(i,r,n))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e){return this.isBrowser(e)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some((function(e){return t.is(e)}))},e}();t.default=d,e.exports=t.default},92:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n};var s=/version\/(\d+(\.?_?\d+)+)/i,o=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qqbrowser/i],describe:function(e){var t={name:/qqbrowserlite/i.test(e)?"QQ Browser Lite":"QQ Browser"},r=i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/electron/i],describe:function(e){var t={name:"Electron"},r=i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/GSA/i],describe:function(e){var t={name:"Google Search"},r=i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return{name:i.default.getFirstMatch(t,e),version:i.default.getSecondMatch(t,e)}}}];t.default=o,e.exports=t.default},93:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var o=[{test:[/Roku\/DVP/],describe:function(e){var t=i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return{name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows /i],describe:function(e){var t=i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=i.default.getWindowsVersionName(t);return{name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/Macintosh(.*?) FxiOS(.*?) Version\//],describe:function(e){var t=i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/,e);return{name:s.OS_MAP.iOS,version:t}}},{test:[/macintosh/i],describe:function(e){var t=i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,"."),r=i.default.getMacOSVersionName(t),n={name:s.OS_MAP.MacOS,version:t};return r&&(n.versionName=r),n}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return{name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i,e),r=i.default.getAndroidVersionName(t),n={name:s.OS_MAP.Android,version:t};return r&&(n.versionName=r),n}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||i.default.getFirstMatch(/\bbb(\d+)/i,e);return{name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return{name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return{name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.PlayStation4,version:t}}}];t.default=o,e.exports=t.default},94:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var o=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=i.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/Macintosh(.*?) FxiOS(.*?) Version\//],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet(?! pc)/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=i.default.getFirstMatch(/(ipod|iphone)/i,e);return{type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"blackberry"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return"bada"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"windows phone"===e.getBrowserName()},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return"android"===e.getOSName(!0)&&t>=3},describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return"android"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"macos"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return"windows"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"linux"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"playstation 4"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}},{test:function(e){return"roku"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}}];t.default=o,e.exports=t.default},95:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var o=[{test:function(e){return"microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return{name:s.ENGINE_MAP.Blink};var t=i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return{name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=o,e.exports=t.default}})}));
},{}],"../index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _Work = _interopRequireDefault(require("./Views/Work/Work.js"));

var _About = _interopRequireDefault(require("./Views/About/About.js"));

var _WebGLContext = _interopRequireDefault(require("./WebGL/WebGLContext.js"));

var _LoadingScreen = _interopRequireDefault(require("./LoadingScreen.js"));

var _NoMobileCTA = _interopRequireDefault(require("./NoMobileCTA.js"));

var _Navigation = _interopRequireDefault(require("./Navigation.js"));

var _Cursor = _interopRequireDefault(require("../src/CanvasComponents/Cursor.js"));

var _Transition = _interopRequireDefault(require("./Transitions/Transition.js"));

var _ViewMediator = _interopRequireDefault(require("./Views/ViewMediator.js"));

var _bowser = _interopRequireDefault(require("bowser"));

var _globals = _interopRequireDefault(require("../utils/globals.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  (0, _classCallCheck2.default)(this, App);
  window.globals = _globals.default;

  var browser = _bowser.default.getParser(window.navigator.userAgent);

  var type = browser.parsedResult.platform.type;
  window.isMobile = type !== "desktop"; // if (window.isMobile) {
  //     new NoMobileCTA();
  //     return;
  // }

  new _LoadingScreen.default();

  if (!window.isMobile) {
    this.cursor = new _Cursor.default();
  }

  new _WebGLContext.default({
    canvas: document.querySelector('.webgl-canvas')
  });
  window.viewMediator = new _ViewMediator.default({
    work: _Work.default,
    about: _About.default,
    transition: _Transition.default
  });
  new _Navigation.default();
};

exports.default = App;

window.onload = function () {
  return new App();
};
},{"@babel/runtime/helpers/classCallCheck":"../../node_modules/@babel/runtime/helpers/classCallCheck.js","./Views/Work/Work.js":"Work/Work.js","./Views/About/About.js":"About/About.js","./WebGL/WebGLContext.js":"../WebGL/WebGLContext.js","./LoadingScreen.js":"../LoadingScreen.js","./NoMobileCTA.js":"../NoMobileCTA.js","./Navigation.js":"../Navigation.js","../src/CanvasComponents/Cursor.js":"../CanvasComponents/Cursor.js","./Transitions/Transition.js":"../Transitions/Transition.js","./Views/ViewMediator.js":"ViewMediator.js","bowser":"../../node_modules/bowser/es5.js","../utils/globals.js":"../../utils/globals.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var hostname = "192.168.1.109" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53573" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../index.js"], null)
//# sourceMappingURL=/src.80dfb952.js.map