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

window.onload = function () {

  new Vue({
    el: '#app',
    components: { wavesurfer: wavesurfer }
  });
};

},{"./wavesurfer.vue":3}],3:[function(require,module,exports){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".wavesurfer .wavesurfer-controls{float:left;width:3rem;font-size:3rem;color:green;line-height:3rem}.wavesurfer .wavesurfer-controls .fa-pause-circle{color:#69b8e0}.wavesurfer .wavesurfer-player{overflow:hidden}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['src', 'peaks'],
  data: function data() {
    return {
      'player': null,
      'is_playing': false
    };
  },

  methods: {
    play: function play() {
      this.$data.player.play();
    },
    pause: function pause() {
      this.$data.player.pause();
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$data.player = WaveSurfer.create({
      container: this.$refs.player,
      waveColor: '#69b8e0',
      progressColor: '#2f586d',
      height: 50,
      backend: 'MediaElement'
    });
    var peaks = null;
    try {
      peaks = JSON.parse(this.peaks);
    } catch (SyntaxError) {
      console.log("peaks error", this.peaks);
    }
    this.$data.player.load(this.src, peaks);
    this.$data.player.on('pause', function () {
      _this.$data.is_playing = false;
    });
    this.$data.player.on('play', function () {
      _this.$data.is_playing = true;
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wavesurfer clearfix"},[_c('div',{staticClass:"wavesurfer-controls"},[(!_vm.is_playing)?_c('i',{staticClass:"fa fa-play-circle",on:{"click":_vm.play}}):_vm._e(),(_vm.is_playing)?_c('i',{staticClass:"fa fa-pause-circle",on:{"click":_vm.pause}}):_vm._e()]),_c('div',{ref:"player",staticClass:"wavesurfer-player"})])}
__vue__options__.staticRenderFns = []

},{"vueify/lib/insert-css":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdnVlaWZ5L2xpYi9pbnNlcnQtY3NzLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvd2F2ZXN1cmZlci52dWU/MjdlYjMxMjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkEsSUFBSSxhQUFhLFFBQVEsa0JBQVIsQ0FBakI7O0FBRUEsSUFBSSxTQUFKLENBQWMsY0FBZCxFQUE4QixVQUE5Qjs7QUFFQSxPQUFPLE1BQVAsR0FBZ0IsWUFBVzs7QUFFekIsTUFBSSxHQUFKLENBQVE7QUFDTixRQUFHLE1BREc7QUFFTixnQkFBWSxFQUFFLHNCQUFGO0FBRk4sR0FBUjtBQUlELENBTkQ7Ozs7Ozs7Ozs7OztBQzJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF2Q0E7OztBQVJBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGluc2VydGVkID0gZXhwb3J0cy5jYWNoZSA9IHt9XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZXhwb3J0cy5pbnNlcnQgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIGlmIChpbnNlcnRlZFtjc3NdKSByZXR1cm4gbm9vcFxuICBpbnNlcnRlZFtjc3NdID0gdHJ1ZVxuXG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpXG5cbiAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgIGVsZW0udGV4dENvbnRlbnQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICBlbGVtLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbGVtKVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0ucmVtb3ZlQ2hpbGQoZWxlbSlcbiAgICBpbnNlcnRlZFtjc3NdID0gZmFsc2VcbiAgfVxufVxuIiwibGV0IHdhdmVzdXJmZXIgPSByZXF1aXJlKCcuL3dhdmVzdXJmZXIudnVlJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3Ytd2F2ZXN1cmZlcicsIHdhdmVzdXJmZXIpXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgXG4gIG5ldyBWdWUoe1xuICAgIGVsOicjYXBwJyxcbiAgICBjb21wb25lbnRzOiB7IHdhdmVzdXJmZXIgfVxuICB9KTtcbn0iLCI8c3R5bGUgbGFuZz1cInNhc3NcIj5cbi53YXZlc3VyZmVyXG57XG4gIC53YXZlc3VyZmVyLWNvbnRyb2xzXG4gIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogM3JlbTtcbiAgICBmb250LXNpemU6IDNyZW07XG4gICAgY29sb3I6IGdyZWVuO1xuICAgIGxpbmUtaGVpZ2h0OiAzcmVtO1xuICAgIC5mYS1wYXVzZS1jaXJjbGVcbiAgICB7XG4gICAgICBjb2xvcjogIzY5YjhlMDtcbiAgICB9XG4gIH1cbiAgLndhdmVzdXJmZXItcGxheWVyXG4gIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG4gIFxufVxuPC9zdHlsZT5cbjx0ZW1wbGF0ZSBsYW5nPVwicHVnXCI+XG4gIC53YXZlc3VyZmVyLmNsZWFyZml4XG4gICAgLndhdmVzdXJmZXItY29udHJvbHNcbiAgICAgIGkuZmEuZmEtcGxheS1jaXJjbGUodi1pZj0nIWlzX3BsYXlpbmcnLCBAY2xpY2s9J3BsYXknKVxuICAgICAgaS5mYS5mYS1wYXVzZS1jaXJjbGUodi1pZj0naXNfcGxheWluZycsIEBjbGljaz0ncGF1c2UnKVxuICAgIC53YXZlc3VyZmVyLXBsYXllcihyZWY9J3BsYXllcicpXG48L3RlbXBsYXRlPlxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IFsnc3JjJywgJ3BlYWtzJ10sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdwbGF5ZXInOiBudWxsLFxuICAgICAgJ2lzX3BsYXlpbmcnOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHBsYXkoKSB7XG4gICAgICB0aGlzLiRkYXRhLnBsYXllci5wbGF5KCk7XG4gICAgfSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIHRoaXMuJGRhdGEucGxheWVyLnBhdXNlKCk7XG4gICAgfSxcbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRkYXRhLnBsYXllciA9IFdhdmVTdXJmZXIuY3JlYXRlKHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLiRyZWZzLnBsYXllcixcbiAgICAgICAgd2F2ZUNvbG9yOiAnIzY5YjhlMCcsXG4gICAgICAgIHByb2dyZXNzQ29sb3I6ICcjMmY1ODZkJyxcbiAgICAgICAgaGVpZ2h0OiA1MCxcbiAgICAgICAgYmFja2VuZDogJ01lZGlhRWxlbWVudCcsXG4gICAgfSk7XG4gICAgbGV0IHBlYWtzID0gbnVsbDtcbiAgICB0cnlcbiAgICB7XG4gICAgICBwZWFrcyA9IEpTT04ucGFyc2UodGhpcy5wZWFrcyk7XG4gICAgfSBjYXRjaChTeW50YXhFcnJvcilcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhcInBlYWtzIGVycm9yXCIsIHRoaXMucGVha3MpXG4gICAgfVxuICAgIHRoaXMuJGRhdGEucGxheWVyLmxvYWQodGhpcy5zcmMsIHBlYWtzKTtcbiAgICB0aGlzLiRkYXRhLnBsYXllci5vbigncGF1c2UnLCAoKT0+e1xuICAgICAgdGhpcy4kZGF0YS5pc19wbGF5aW5nID0gZmFsc2U7XG4gICAgfSlcbiAgICB0aGlzLiRkYXRhLnBsYXllci5vbigncGxheScsICgpPT57XG4gICAgICB0aGlzLiRkYXRhLmlzX3BsYXlpbmcgPSB0cnVlO1xuICAgIH0pXG4gIH0sXG59XG48L3NjcmlwdD4iXX0=
