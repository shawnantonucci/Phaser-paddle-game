// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"js/scenes/sceneMain.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SceneMain =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(SceneMain, _Phaser$Scene);

  function SceneMain() {
    _classCallCheck(this, SceneMain);

    return _possibleConstructorReturn(this, _getPrototypeOf(SceneMain).call(this, "SceneMain"));
  }

  _createClass(SceneMain, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      //define our objects
      //set up
      emitter = new Phaser.Events.EventEmitter();
      controller = new Controller();
      model.score = 0;
      var mediaManager = new MediaManager({
        scene: this
      });
      var sb = new SoundButtons({
        scene: this
      });
      this.velocity = 100;
      this.centerX = game.config.width / 2;
      this.centerY = game.config.height / 2;
      this.quarter = game.config.height / 4;
      this.pMove = game.config.height / 32;
      this.bar = this.add.image(this.centerX, this.centerY, "bar");
      this.bar.displayWidth = game.config.width / 3;
      this.bar.displayHeight = game.config.height;
      this.ball = this.physics.add.sprite(this.centerX, this.centerY, "balls");
      Align.scaleToGameW(this.ball, 0.05); //
      //
      //

      this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, "paddles");
      Align.scaleToGameW(this.paddle1, 0.25);
      this.pScale = this.paddle1.scaleX; //
      //
      //

      this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter * 3, "paddles");
      Align.scaleToGameW(this.paddle2, 0.25); //
      //
      //

      var scoreBox = new ScoreBox({
        scene: this
      });
      this.aGrid = new AlignGrid({
        scene: this,
        rows: 11,
        cols: 11
      });
      this.aGrid.placeAtIndex(5, scoreBox); // this.aGrid.showNumbers();
      //
      //
      //

      this.setBallColor();
      this.ball.setVelocity(0, this.velocity);
      this.paddle1.setImmovable();
      this.paddle2.setImmovable();
      this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
      this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);
      this.input.on("pointerdown", this.changePaddle, this);
      this.input.on("pointerup", this.onUp, this);
    }
  }, {
    key: "onUp",
    value: function onUp(pointer) {
      var diffY = Math.abs(pointer.y - this.downY);
      console.log(diffY);

      if (diffY > 300) {
        this.tweens.add({
          targets: this.paddle1,
          duration: 1000,
          y: this.quarter
        });
        this.tweens.add({
          targets: this.paddle2,
          duration: 1000,
          y: this.quarter * 3
        });
      }
    }
  }, {
    key: "changePaddle",
    value: function changePaddle(pointer) {
      var paddle = this.velocity > 0 ? this.paddle2 : this.paddle1;
      this.tweens.add({
        targets: paddle,
        duration: 500,
        scaleX: 0,
        onComplete: this.onCompleteHandler,
        onCompleteParams: [{
          scope: this,
          paddle: paddle
        }]
      });
      this.downY = pointer.y;
      emitter.emit(G.PLAY_SOUND, "flip");
    }
  }, {
    key: "onCompleteHandler",
    value: function onCompleteHandler(tween, targets, custom) {
      var paddle = custom.paddle;
      paddle.scaleX = custom.scope.pScale;
      var color = paddle.frame.name == 1 ? 0 : 1;
      paddle.setFrame(color);
    }
  }, {
    key: "setBallColor",
    value: function setBallColor() {
      var r = Math.floor(Math.random() * 100);

      if (r < 50) {
        this.ball.setFrame(0);
      } else {
        this.ball.setFrame(1);
      }
    }
  }, {
    key: "doOver",
    value: function doOver() {
      this.scene.start("SceneOver");
    }
  }, {
    key: "ballHit",
    value: function ballHit(ball, paddle) {
      this.velocity = -this.velocity;
      this.velocity *= 1.01;
      emitter.emit(G.PLAY_SOUND, "hit");
      var distY = Math.abs(this.paddle1.y - this.paddle2.y);

      if (ball.frame.name === paddle.frame.name) {
        var points = 1;

        if (distY < game.config.height / 3) {
          points = 2;
        }

        if (distY < game.config.height / 4) {
          points = 3;
        }

        emitter.emit(G.UP_POINTS, points);
      } else {
        emitter.emit(G.PLAY_SOUND, "lose");
        this.time.addEvent({
          delay: 1000,
          callback: this.doOver,
          callbackScope: this,
          loop: false
        });
        return;
      }

      this.setBallColor();
      ball.setVelocity(0, this.velocity);
      var targetY = 0;

      if (distY > game.config.height / 5) {
        if (paddle.y > this.centerY) {
          targetY = paddle.y - this.pMove;
        } else {
          targetY = paddle.y + this.pMove;
        }

        this.tweens.add({
          targets: paddle,
          duration: 1000,
          y: targetY
        });
      }
    }
  }, {
    key: "update",
    value: function update() {//constant running loop
    }
  }]);

  return SceneMain;
}(Phaser.Scene);
},{}],"C:/Users/shawn/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "9935" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/shawn/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/scenes/sceneMain.js"], null)
//# sourceMappingURL=/sceneMain.68a3bc32.map