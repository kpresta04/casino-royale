import React from 'react';
var ReactDOM = require('react-dom');

export default function SlotPage() {

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _class, _temp, _class2, _temp2;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
        'this hasn\'t been initialised - super() hasn\'t been called');
  }
  return call && (typeof call === 'object' || typeof call === 'function') ?
      call :
      self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
        'Super expression must either be null or a function, not ' +
        typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor:
        {value: subClass, enumerable: false, writable: true, configurable: true}
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) :
                            subClass.__proto__ = superClass;
}

var rootElement = document.getElementById('root');

function RepeatButton(props) {
  return React.createElement('button', {
    'aria-label': 'Play again.',
    id: 'repeatButton',
    onClick: props.onClick
  });
}

function WinningSound() {
  return React.createElement(
      'audio', {autoplay: 'autoplay', className: 'player', preload: 'false'},
      React.createElement('source', {src: ''}));
}

var App =
    (_temp = _class =
         function(_React$Component) {
           _inherits(App, _React$Component);

           function App(props) {
             _classCallCheck(this, App);

             var _this = _possibleConstructorReturn(
                 this,
                 (App.__proto__ || Object.getPrototypeOf(App))
                     .call(this, props));

             _this.state = {winner: null};
             _this.finishHandler = _this.finishHandler.bind(_this);
             _this.handleClick = _this.handleClick.bind(_this);
             return _this;
           }

           _createClass(App, [
             {
               key: 'handleClick',
               value: function handleClick() {
                 this.setState({winner: null});
                 this.emptyArray();
                 this._child1.forceUpdateHandler();
                 this._child2.forceUpdateHandler();
                 this._child3.forceUpdateHandler();
               }
             },
             {
               key: 'finishHandler',
               value: function finishHandler(value) {
                 App.matches.push(value);

                 if (App.matches.length === 3) {
                   var winner = this.state.winner;

                   var first = App.matches[0];
                   var results = App.matches.every(function(match) {
                     return match === first;
                   });
                   this.setState({winner: results});
                 }
               }
             },
             {
               key: 'emptyArray',
               value: function emptyArray() {
                 App.matches = [];
               }
             },
             {
               key: 'render',
               value: function render() {
                 var _this2 = this;

                 var winner = this.state.winner;

                 var getLoser = function getLoser() {
                   return App
                       .loser[Math.floor(Math.random() * App.loser.length)];
                 };
                 var repeatButton = null;
                 var winningSound = null;

                 if (winner !== null) {
                   repeatButton = React.createElement(
                       RepeatButton, {onClick: this.handleClick});
                 }

                 if (winner) {
                   winningSound = React.createElement(WinningSound, null);
                 }

                 return React.createElement(
                     'div', null, winningSound,
                     React.createElement(
                         'h1', {style: {color: 'white'}},
                         React.createElement(
                             'span', null,
                             winner === null ?
                                 'Spinning!' :
                                 winner ? 'Pure skill!' : getLoser())),
                     React.createElement(
                         'div', {className: 'spinner-container'},
                         React.createElement(Spinner, {
                           onFinish: this.finishHandler,
                           ref: function ref(child) {
                             _this2._child1 = child;
                           },
                           timer: '1000'
                         }),
                         React.createElement(Spinner, {
                           onFinish: this.finishHandler,
                           ref: function ref(child) {
                             _this2._child2 = child;
                           },
                           timer: '1400'
                         }),
                         React.createElement(Spinner, {
                           onFinish: this.finishHandler,
                           ref: function ref(child) {
                             _this2._child3 = child;
                           },
                           timer: '2200'
                         }),
                         React.createElement(
                             'div', {className: 'gradient-fade'})),
                     repeatButton);
               }
             }
           ]);

           return App;
         }(React.Component),
     _class.loser = ['Lost 1', 'Lost 2', 'Lost 3!'], _class.matches = [],
     _temp);
var Spinner = (_temp2 = _class2 = function(_React$Component2) {
  _inherits(Spinner, _React$Component2);

  function Spinner(props) {
    _classCallCheck(this, Spinner);

    var _this3 = _possibleConstructorReturn(
        this,
        (Spinner.__proto__ || Object.getPrototypeOf(Spinner))
            .call(this, props));

    _this3.state = {position: 0, lastPosition: null};
    _this3.multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    _this3.start = _this3.setStartPosition();
    _this3.speed = Spinner.iconHeight * _this3.multiplier;

    _this3.forceUpdateHandler = _this3.forceUpdateHandler.bind(_this3);
    return _this3;
  }

  _createClass(Spinner, [
    {
      key: 'forceUpdateHandler',
      value: function forceUpdateHandler() {
        this.reset();
      }
    },
    {
      key: 'reset',
      value: function reset() {
        var _this4 = this;

        if (this.timer) {
          clearInterval(this.timer);
        }

        this.start = this.setStartPosition();

        this.setState({position: this.start, timeRemaining: this.props.timer});

        this.timer = setInterval(function() {
          _this4.tick();
        }, 100);
      }
    },
    {
      key: 'setStartPosition',
      value: function setStartPosition() {
        return Math.floor(Math.random() * 6) * Spinner.iconHeight * -1;
      }
    },
    {
      key: 'moveBackground',
      value: function moveBackground() {
        this.setState({
          position: this.state.position - this.speed,
          timeRemaining: this.state.timeRemaining - 100
        });
      }
    },
    {
      key: 'getSymbolFromPosition',
      value: function getSymbolFromPosition() {
        var position = this.state.position;

        var totalSymbols = 6;
        var maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
        var moved = this.props.timer / 100 * this.multiplier;
        var startPosition = this.start;
        var currentPosition = startPosition;

        for (var i = 0; i < moved; i++) {
          currentPosition -= Spinner.iconHeight;

          if (currentPosition < maxPosition) {
            currentPosition = 0;
          }
        }

        this.props.onFinish(currentPosition);
      }
    },
    {
      key: 'tick',
      value: function tick() {
        if (this.state.timeRemaining <= 0) {
          clearInterval(this.timer);
          this.getSymbolFromPosition();
        } else {
          this.moveBackground();
        }
      }
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this5 = this;

        clearInterval(this.timer);

        this.setState({position: this.start, timeRemaining: this.props.timer});

        this.timer = setInterval(function() {
          _this5.tick();
        }, 100);
      }
    },
    {
      key: 'render',
      value: function render() {
        var _state = this.state, position = _state.position,
            current = _state.current;


        return React.createElement('div', {
          style: {backgroundPosition: '0px ' + position + 'px'},
          className: 'icons'
        });
      }
    }
  ]);

  return Spinner;
}(React.Component), _class2.iconHeight = 188, _temp2);


function runApp() {
  ReactDOM.render(React.createElement(App, null), rootElement);
}

runApp();

}