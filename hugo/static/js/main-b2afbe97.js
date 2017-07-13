(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],2:[function(require,module,exports){
'use strict';

var wavesurfer = require('./wavesurfer.vue');

Vue.component('v-wavesurfer', wavesurfer);

window.eventBus = new Vue();

window.onload = function () {

  new Vue({
    el: '#app',
    data: {
      currentlyPlaying: null
    },
    components: { wavesurfer: wavesurfer },
    methods: {
      onPlay: function onPlay() {
        console.log('play');
      },
      fbSignIn: function fbSignIn() {
        console.log('signin');
        var provider = new firebase.auth.FacebookAuthProvider();
        // provider.addScope('user_birthday');
        provider.addScope('email');
        // provider.addScope('user_likes');
        // provider.addScope('user_about_me');
        // provider.addScope('user_posts');
        // provider.addScope('user_events');
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          // ...
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error);
          // ...
        });
      }
    },
    mounted: function mounted() {
      var _this = this;

      console.log('mounted');
      window.eventBus.$on('before-play', function (title) {
        console.log(title);
        _this.$data.currentlyPlaying = title;
        _this.$root.$emit('show::modal', 'fullVersionLogin');
        console.log('before play');
      });
      window.eventBus.$on('playing', function () {
        console.log('playing');
      });

      FB.getLoginStatus(function (response) {
        console.log(response);
      });
    }
  });
};

},{"./wavesurfer.vue":3}],3:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".wavesurfer .wavesurfer-player{font-size:.6rem}.wavesurfer .wavesurfer-player .wavesurfer-player-left{width:3rem;float:left;overflow:auto;padding:.3rem;padding-top:1.1rem;text-align:right}.wavesurfer .wavesurfer-player .wavesurfer-player-center{overflow:hidden}.wavesurfer .wavesurfer-player .wavesurfer-player-right{width:3rem;float:right;padding:.3rem;padding-top:1.1rem}.wavesurfer .wavesurfer-controls{text-align:center;font-size:1rem;line-height:1rem;margin-top:.5rem}.wavesurfer .wavesurfer-controls .fa-pause-circle{color:#69b8e0}.wavesurfer .wavesurfer-controls button{margin-right:.2rem}.wavesurfer .wavesurfer-controls button.btn{padding:.25rem .5rem}.wavesurfer .wavesurfer-console{text-align:center;font-size:.5rem;color:gray}.wavesurfer .wavesurfer-console .title{display:inline-block}.wavesurfer .wavesurfer-console .duration{color:blue;display:inline-block;background:1px solid gray;padding:.2rem;margin:.2rem;border-radius:.1rem}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    src: {
      type: String
    },
    peaks: {
      type: Array
    },
    title: {
      type: String
    },
    waveColor: {
      type: String,
      default: '#69b8e0'
    },
    progressColor: {
      type: String,
      default: '#2f586d'
    },
    height: {
      type: Number,
      default: 50
    }
  },
  data: function data() {
    return {
      'player': null,
      'is_playing': false,
      currentTime: 0,
      duration: 0
    };
  },

  methods: {
    play: function play() {
      window.eventBus.$emit('before-play', this.title, this._uid);
      this.$data.player.play();
      window.eventBus.$emit('playing', this.title, this._uid);
    },
    pause: function pause() {
      this.$data.player.pause();
      window.eventBus.$emit('paused', this.title, this._uid);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$data.player = WaveSurfer.create({
      container: this.$refs.player,
      waveColor: this.waveColor,
      progressColor: this.progressColor,
      height: this.height,
      backend: 'MediaElement'
    });
    var peaks = null;
    try {
      peaks = JSON.parse(this.peaks);
    } catch (SyntaxError) {
      console.log("peaks error", this.peaks);
    }
    this.$data.player.load(this.src, peaks);

    var t = null;
    var updateTime = function updateTime() {
      var d = _this.$data.player.getDuration();
      var f = d > 3600 ? 'hh:mm:ss' : 'mm:ss';
      _this.$data.currentTime = moment.duration(_this.$data.player.getCurrentTime(), "seconds").format(f, { trim: false });
      _this.$data.duration = moment.duration(_this.$data.player.getDuration(), "seconds").format(f, { trim: false });
    };
    this.$data.player.on('pause', function () {
      _this.$data.is_playing = false;
      updateTime();
      clearTimeout(t);
    });
    this.$data.player.on('play', function () {
      _this.$data.is_playing = true;
      updateTime();
      t = setInterval(updateTime, 1000);
    });
    this.$data.player.on('finish', function () {
      console.log('finished');
      _this.$data.is_playing = false;
      _this.$data.player.seekTo(0);
      clearTimeout(t);
      window.eventBus.$emit('stopped', _this.title);
    });
    this.$data.player.on('ready', function () {
      updateTime();
    });
    this.$data.player.on('seek', function () {
      updateTime();
    });
    window.eventBus.$on('before-play', function (title, uid) {
      if (uid != _this._uid) {
        _this.pause();
      }
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wavesurfer clearfix"},[_c('div',{staticClass:"wavesurfer-player"},[_c('div',{staticClass:"wavesurfer-player-left"},[_vm._v(_vm._s(_vm.currentTime))]),_c('div',{staticClass:"wavesurfer-player-right"},[_vm._v(_vm._s(_vm.duration))]),_c('div',{ref:"player",staticClass:"wavesurfer-player-center"})]),_c('div',{staticClass:"wavesurfer-controls"},[_vm._m(0),_vm._m(1),_c('button',{staticClass:"btn btn-xs btn-primary"},[(!_vm.is_playing)?_c('i',{staticClass:"fa fa-play-circle",on:{"click":_vm.play}}):_vm._e(),(_vm.is_playing)?_c('i',{staticClass:"fa fa-pause-circle",on:{"click":_vm.pause}}):_vm._e()]),_vm._m(2),_vm._m(3),_c('div',{staticClass:"wavesurfer-console"},[_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.title))])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-xs btn-primary"},[_c('i',{staticClass:"fa fa fa-step-backward"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-xs btn-primary"},[_c('i',{staticClass:"fa fa-backward"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-xs btn-primary"},[_c('i',{staticClass:"fa fa-forward"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-xs btn-primary"},[_c('i',{staticClass:"fa fa-step-forward"})])}]

},{"vueify/lib/insert-css":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdnVlaWZ5L2xpYi9pbnNlcnQtY3NzLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvd2F2ZXN1cmZlci52dWU/Njg5MGY5ZTgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkEsSUFBSSxhQUFhLFFBQVEsa0JBQVIsQ0FBakI7O0FBRUEsSUFBSSxTQUFKLENBQWMsY0FBZCxFQUE4QixVQUE5Qjs7QUFFQSxPQUFPLFFBQVAsR0FBa0IsSUFBSSxHQUFKLEVBQWxCOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFXOztBQUV6QixNQUFJLEdBQUosQ0FBUTtBQUNOLFFBQUcsTUFERztBQUVOLFVBQU07QUFDSix3QkFBa0I7QUFEZCxLQUZBO0FBS04sZ0JBQVksRUFBRSxzQkFBRixFQUxOO0FBTU4sYUFBUztBQUNQLFlBRE8sb0JBQ0U7QUFDUCxnQkFBUSxHQUFSLENBQVksTUFBWjtBQUNELE9BSE07QUFJUCxjQUpPLHNCQUlJO0FBQ1QsZ0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDQSxZQUFJLFdBQVcsSUFBSSxTQUFTLElBQVQsQ0FBYyxvQkFBbEIsRUFBZjtBQUNBO0FBQ0EsaUJBQVMsUUFBVCxDQUFrQixPQUFsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVMsSUFBVCxHQUFnQixlQUFoQixDQUFnQyxRQUFoQyxFQUEwQyxJQUExQyxDQUErQyxVQUFTLE1BQVQsRUFBaUI7QUFDOUQ7QUFDQSxjQUFJLFFBQVEsT0FBTyxVQUFQLENBQWtCLFdBQTlCO0FBQ0E7QUFDQSxjQUFJLE9BQU8sT0FBTyxJQUFsQjtBQUNBLGtCQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0E7QUFDRCxTQVBELEVBT0csS0FQSCxDQU9TLFVBQVMsS0FBVCxFQUFnQjtBQUN2QjtBQUNBLGNBQUksWUFBWSxNQUFNLElBQXRCO0FBQ0EsY0FBSSxlQUFlLE1BQU0sT0FBekI7QUFDQTtBQUNBLGNBQUksUUFBUSxNQUFNLEtBQWxCO0FBQ0E7QUFDQSxjQUFJLGFBQWEsTUFBTSxVQUF2QjtBQUNBLGtCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0E7QUFDRCxTQWpCRDtBQWtCRDtBQS9CTSxLQU5IO0FBdUNOLFdBdkNNLHFCQXVDSTtBQUFBOztBQUNSLGNBQVEsR0FBUixDQUFZLFNBQVo7QUFDQSxhQUFPLFFBQVAsQ0FBZ0IsR0FBaEIsQ0FBb0IsYUFBcEIsRUFBbUMsVUFBQyxLQUFELEVBQVU7QUFDM0MsZ0JBQVEsR0FBUixDQUFZLEtBQVo7QUFDQSxjQUFLLEtBQUwsQ0FBVyxnQkFBWCxHQUE4QixLQUE5QjtBQUNBLGNBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsYUFBakIsRUFBK0Isa0JBQS9CO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLGFBQVo7QUFFRCxPQU5EO0FBT0EsYUFBTyxRQUFQLENBQWdCLEdBQWhCLENBQW9CLFNBQXBCLEVBQStCLFlBQUk7QUFDakMsZ0JBQVEsR0FBUixDQUFZLFNBQVo7QUFDRCxPQUZEOztBQUtBLFNBQUcsY0FBSCxDQUFrQixVQUFDLFFBQUQsRUFBWTtBQUM1QixnQkFBUSxHQUFSLENBQVksUUFBWjtBQUNELE9BRkQ7QUFHRDtBQXhESyxHQUFSO0FBMERELENBNUREOzs7Ozs7Ozs7Ozs7QUN5RkE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFsQkE7QUF1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQW5HQTs7O0FBekJBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGluc2VydGVkID0gZXhwb3J0cy5jYWNoZSA9IHt9XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZXhwb3J0cy5pbnNlcnQgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIGlmIChpbnNlcnRlZFtjc3NdKSByZXR1cm4gbm9vcFxuICBpbnNlcnRlZFtjc3NdID0gdHJ1ZVxuXG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpXG5cbiAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgIGVsZW0udGV4dENvbnRlbnQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICBlbGVtLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbGVtKVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0ucmVtb3ZlQ2hpbGQoZWxlbSlcbiAgICBpbnNlcnRlZFtjc3NdID0gZmFsc2VcbiAgfVxufVxuIiwibGV0IHdhdmVzdXJmZXIgPSByZXF1aXJlKCcuL3dhdmVzdXJmZXIudnVlJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3Ytd2F2ZXN1cmZlcicsIHdhdmVzdXJmZXIpXG5cbndpbmRvdy5ldmVudEJ1cyA9IG5ldyBWdWUoKTtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBcbiAgbmV3IFZ1ZSh7XG4gICAgZWw6JyNhcHAnLFxuICAgIGRhdGE6IHtcbiAgICAgIGN1cnJlbnRseVBsYXlpbmc6IG51bGwsXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7IHdhdmVzdXJmZXIgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBvblBsYXkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwbGF5Jyk7XG4gICAgICB9LFxuICAgICAgZmJTaWduSW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduaW4nKVxuICAgICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5GYWNlYm9va0F1dGhQcm92aWRlcigpO1xuICAgICAgICAvLyBwcm92aWRlci5hZGRTY29wZSgndXNlcl9iaXJ0aGRheScpO1xuICAgICAgICBwcm92aWRlci5hZGRTY29wZSgnZW1haWwnKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuYWRkU2NvcGUoJ3VzZXJfbGlrZXMnKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuYWRkU2NvcGUoJ3VzZXJfYWJvdXRfbWUnKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuYWRkU2NvcGUoJ3VzZXJfcG9zdHMnKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuYWRkU2NvcGUoJ3VzZXJfZXZlbnRzJyk7XG4gICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgLy8gVGhpcyBnaXZlcyB5b3UgYSBGYWNlYm9vayBBY2Nlc3MgVG9rZW4uIFlvdSBjYW4gdXNlIGl0IHRvIGFjY2VzcyB0aGUgRmFjZWJvb2sgQVBJLlxuICAgICAgICAgIHZhciB0b2tlbiA9IHJlc3VsdC5jcmVkZW50aWFsLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgIC8vIFRoZSBzaWduZWQtaW4gdXNlciBpbmZvLlxuICAgICAgICAgIHZhciB1c2VyID0gcmVzdWx0LnVzZXI7XG4gICAgICAgICAgY29uc29sZS5sb2codXNlcik7XG4gICAgICAgICAgLy8gLi4uXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSGFuZGxlIEVycm9ycyBoZXJlLlxuICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xuICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgIC8vIFRoZSBlbWFpbCBvZiB0aGUgdXNlcidzIGFjY291bnQgdXNlZC5cbiAgICAgICAgICB2YXIgZW1haWwgPSBlcnJvci5lbWFpbDtcbiAgICAgICAgICAvLyBUaGUgZmlyZWJhc2UuYXV0aC5BdXRoQ3JlZGVudGlhbCB0eXBlIHRoYXQgd2FzIHVzZWQuXG4gICAgICAgICAgdmFyIGNyZWRlbnRpYWwgPSBlcnJvci5jcmVkZW50aWFsO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAvLyAuLi5cbiAgICAgICAgfSk7ICAgICAgICBcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdW50ZWQoKSB7XG4gICAgICBjb25zb2xlLmxvZygnbW91bnRlZCcpXG4gICAgICB3aW5kb3cuZXZlbnRCdXMuJG9uKCdiZWZvcmUtcGxheScsICh0aXRsZSk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRpdGxlKTtcbiAgICAgICAgdGhpcy4kZGF0YS5jdXJyZW50bHlQbGF5aW5nID0gdGl0bGVcbiAgICAgICAgdGhpcy4kcm9vdC4kZW1pdCgnc2hvdzo6bW9kYWwnLCdmdWxsVmVyc2lvbkxvZ2luJylcbiAgICAgICAgY29uc29sZS5sb2coJ2JlZm9yZSBwbGF5JylcbiAgICAgICAgXG4gICAgICB9KVxuICAgICAgd2luZG93LmV2ZW50QnVzLiRvbigncGxheWluZycsICgpPT57XG4gICAgICAgIGNvbnNvbGUubG9nKCdwbGF5aW5nJylcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIFxuICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoKHJlc3BvbnNlKT0+e1xuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59IiwiPHN0eWxlIGxhbmc9XCJzYXNzXCI+XG4ud2F2ZXN1cmZlclxue1xuICAud2F2ZXN1cmZlci1wbGF5ZXJcbiAge1xuICAgIGZvbnQtc2l6ZTogMC42cmVtO1xuICAgIC53YXZlc3VyZmVyLXBsYXllci1sZWZ0XG4gICAge1xuICAgICAgd2lkdGg6IDNyZW07XG4gICAgICBmbG9hdDogbGVmdDtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgcGFkZGluZzogMC4zcmVtO1xuICAgICAgcGFkZGluZy10b3A6IDEuMXJlbTtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIH1cbiAgICAud2F2ZXN1cmZlci1wbGF5ZXItY2VudGVyXG4gICAge1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gICAgLndhdmVzdXJmZXItcGxheWVyLXJpZ2h0XG4gICAge1xuICAgICAgd2lkdGg6IDNyZW07XG4gICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICBwYWRkaW5nOiAwLjNyZW07XG4gICAgICBwYWRkaW5nLXRvcDogMS4xcmVtO1xuICAgIH1cbiAgfVxuXG4gIC53YXZlc3VyZmVyLWNvbnRyb2xzXG4gIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxcmVtO1xuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICAuZmEtcGF1c2UtY2lyY2xlXG4gICAge1xuICAgICAgY29sb3I6ICM2OWI4ZTA7XG4gICAgfVxuICAgIGJ1dHRvblxuICAgIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMC4ycmVtO1xuICAgICAgJi5idG5cbiAgICAgIHtcbiAgICAgICAgcGFkZGluZzogMC4yNXJlbSAuNXJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAud2F2ZXN1cmZlci1jb25zb2xlXG4gIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAwLjVyZW07XG4gICAgY29sb3I6IGdyYXk7XG4gICAgLnRpdGxlXG4gICAge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAuZHVyYXRpb25cbiAgICB7XG4gICAgICBjb2xvcjogYmx1ZTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGJhY2tncm91bmQ6IDFweCBzb2xpZCBncmF5O1xuICAgICAgcGFkZGluZzogMC4ycmVtO1xuICAgICAgbWFyZ2luOiAwLjJyZW07XG4gICAgICBib3JkZXItcmFkaXVzOiAwLjFyZW07XG4gICAgfVxuICB9XG59XG48L3N0eWxlPlxuPHRlbXBsYXRlIGxhbmc9XCJwdWdcIj5cbiAgLndhdmVzdXJmZXIuY2xlYXJmaXhcbiAgICAud2F2ZXN1cmZlci1wbGF5ZXJcbiAgICAgIC53YXZlc3VyZmVyLXBsYXllci1sZWZ0XG4gICAgICAgIHwge3sgY3VycmVudFRpbWUgfX1cbiAgICAgIC53YXZlc3VyZmVyLXBsYXllci1yaWdodFxuICAgICAgICB8IHt7IGR1cmF0aW9uIH19XG4gICAgICAud2F2ZXN1cmZlci1wbGF5ZXItY2VudGVyKHJlZj0ncGxheWVyJylcbiAgICAud2F2ZXN1cmZlci1jb250cm9sc1xuICAgICAgYnV0dG9uLmJ0bi5idG4teHMuYnRuLXByaW1hcnlcbiAgICAgICAgaS5mYS5mYS5mYS1zdGVwLWJhY2t3YXJkXG4gICAgICBidXR0b24uYnRuLmJ0bi14cy5idG4tcHJpbWFyeVxuICAgICAgICBpLmZhLmZhLWJhY2t3YXJkXG4gICAgICBidXR0b24uYnRuLmJ0bi14cy5idG4tcHJpbWFyeVxuICAgICAgICBpLmZhLmZhLXBsYXktY2lyY2xlKHYtaWY9JyFpc19wbGF5aW5nJywgQGNsaWNrPSdwbGF5JylcbiAgICAgICAgaS5mYS5mYS1wYXVzZS1jaXJjbGUodi1pZj0naXNfcGxheWluZycsIEBjbGljaz0ncGF1c2UnKVxuICAgICAgYnV0dG9uLmJ0bi5idG4teHMuYnRuLXByaW1hcnlcbiAgICAgICAgaS5mYS5mYS1mb3J3YXJkXG4gICAgICBidXR0b24uYnRuLmJ0bi14cy5idG4tcHJpbWFyeVxuICAgICAgICBpLmZhLmZhLXN0ZXAtZm9yd2FyZFxuICAgICAgLndhdmVzdXJmZXItY29uc29sZVxuICAgICAgICAudGl0bGVcbiAgICAgICAgICB8IHt7IHRpdGxlIH19XG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBzcmM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIHBlYWtzOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICB3YXZlQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcjNjliOGUwJyxcbiAgICB9LFxuICAgIHByb2dyZXNzQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcjMmY1ODZkJyxcbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNTAsXG4gICAgfSxcbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ3BsYXllcic6IG51bGwsXG4gICAgICAnaXNfcGxheWluZyc6IGZhbHNlLFxuICAgICAgY3VycmVudFRpbWU6IDAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBwbGF5KCkge1xuICAgICAgd2luZG93LmV2ZW50QnVzLiRlbWl0KCdiZWZvcmUtcGxheScsIHRoaXMudGl0bGUsIHRoaXMuX3VpZClcbiAgICAgIHRoaXMuJGRhdGEucGxheWVyLnBsYXkoKTtcbiAgICAgIHdpbmRvdy5ldmVudEJ1cy4kZW1pdCgncGxheWluZycsIHRoaXMudGl0bGUsIHRoaXMuX3VpZClcbiAgICB9LFxuICAgIHBhdXNlKCkge1xuICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIucGF1c2UoKTtcbiAgICAgIHdpbmRvdy5ldmVudEJ1cy4kZW1pdCgncGF1c2VkJywgdGhpcy50aXRsZSwgdGhpcy5fdWlkKVxuICAgIH0sXG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy4kZGF0YS5wbGF5ZXIgPSBXYXZlU3VyZmVyLmNyZWF0ZSh7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy4kcmVmcy5wbGF5ZXIsXG4gICAgICAgIHdhdmVDb2xvcjogdGhpcy53YXZlQ29sb3IsXG4gICAgICAgIHByb2dyZXNzQ29sb3I6IHRoaXMucHJvZ3Jlc3NDb2xvcixcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgYmFja2VuZDogJ01lZGlhRWxlbWVudCcsXG4gICAgfSk7XG4gICAgbGV0IHBlYWtzID0gbnVsbDtcbiAgICB0cnlcbiAgICB7XG4gICAgICBwZWFrcyA9IEpTT04ucGFyc2UodGhpcy5wZWFrcyk7XG4gICAgfSBjYXRjaChTeW50YXhFcnJvcilcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcInBlYWtzIGVycm9yXCIsIHRoaXMucGVha3MpXG4gICAgfVxuICAgIHRoaXMuJGRhdGEucGxheWVyLmxvYWQodGhpcy5zcmMsIHBlYWtzKTtcbiAgICBcbiAgICBsZXQgdCA9IG51bGw7XG4gICAgbGV0IHVwZGF0ZVRpbWUgPSAoKT0+XG4gICAge1xuICAgICAgbGV0IGQgPSB0aGlzLiRkYXRhLnBsYXllci5nZXREdXJhdGlvbigpO1xuICAgICAgbGV0IGYgPSBkID4gMzYwMCA/ICdoaDptbTpzcycgOiAnbW06c3MnXG4gICAgICB0aGlzLiRkYXRhLmN1cnJlbnRUaW1lID0gbW9tZW50LmR1cmF0aW9uKHRoaXMuJGRhdGEucGxheWVyLmdldEN1cnJlbnRUaW1lKCksIFwic2Vjb25kc1wiKS5mb3JtYXQoZiwge3RyaW06IGZhbHNlfSk7XG4gICAgICB0aGlzLiRkYXRhLmR1cmF0aW9uID0gbW9tZW50LmR1cmF0aW9uKHRoaXMuJGRhdGEucGxheWVyLmdldER1cmF0aW9uKCksIFwic2Vjb25kc1wiKS5mb3JtYXQoZiwge3RyaW06IGZhbHNlfSk7XG4gICAgfVxuICAgIHRoaXMuJGRhdGEucGxheWVyLm9uKCdwYXVzZScsICgpPT57XG4gICAgICB0aGlzLiRkYXRhLmlzX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZVRpbWUoKTtcbiAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICB9KVxuICAgIHRoaXMuJGRhdGEucGxheWVyLm9uKCdwbGF5JywgKCk9PntcbiAgICAgIHRoaXMuJGRhdGEuaXNfcGxheWluZyA9IHRydWU7XG4gICAgICB1cGRhdGVUaW1lKCk7XG4gICAgICB0ID0gc2V0SW50ZXJ2YWwodXBkYXRlVGltZSwgMTAwMCk7XG4gICAgfSlcbiAgICB0aGlzLiRkYXRhLnBsYXllci5vbignZmluaXNoJywgKCk9PntcbiAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCcpO1xuICAgICAgdGhpcy4kZGF0YS5pc19wbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLiRkYXRhLnBsYXllci5zZWVrVG8oMCk7XG4gICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICB3aW5kb3cuZXZlbnRCdXMuJGVtaXQoJ3N0b3BwZWQnLCB0aGlzLnRpdGxlKVxuICAgIH0pXG4gICAgdGhpcy4kZGF0YS5wbGF5ZXIub24oJ3JlYWR5JywgKCk9PntcbiAgICAgIHVwZGF0ZVRpbWUoKTtcbiAgICB9KTtcbiAgICB0aGlzLiRkYXRhLnBsYXllci5vbignc2VlaycsICgpPT57XG4gICAgICB1cGRhdGVUaW1lKCk7XG4gICAgfSk7XG4gICAgd2luZG93LmV2ZW50QnVzLiRvbignYmVmb3JlLXBsYXknLCAodGl0bGUsdWlkKT0+e1xuICAgICAgaWYodWlkIT10aGlzLl91aWQpXG4gICAgICB7XG4gICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgfVxuICAgIH0pXG4gICAgXG4gIH0sXG59XG48L3NjcmlwdD4iXX0=
