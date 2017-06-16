(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.onload = function () {
  new Vue({
    el: '#app',
    components: {
      'v-wavesurfer': {
        template: '<div class="wavesurfer clearfix"><div class="wavesurfer-controls"><i v-if="!is_playing" class="fa fa-play-circle" @click="play"></i><i v-if="is_playing" class="fa fa-pause-circle" @click="pause"></i></div><div ref="player" class="wavesurfer-player"></div></div>',
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
      }
    }
  });
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxNQUFQLEdBQWdCLFlBQVc7QUFDekIsTUFBSSxHQUFKLENBQVE7QUFDTixRQUFHLE1BREc7QUFFTixnQkFBWTtBQUNWLHNCQUFnQjtBQUNkLGtCQUFVLHVRQURJO0FBRWQsZUFBTyxDQUFDLEtBQUQsRUFBUSxPQUFSLENBRk87QUFHZCxZQUhjLGtCQUdQO0FBQ0wsaUJBQU87QUFDTCxzQkFBVSxJQURMO0FBRUwsMEJBQWM7QUFGVCxXQUFQO0FBSUQsU0FSYTs7QUFTZCxpQkFBUztBQUNQLGNBRE8sa0JBQ0E7QUFDTCxpQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixJQUFsQjtBQUNELFdBSE07QUFJUCxlQUpPLG1CQUlDO0FBQ04saUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEI7QUFDRDtBQU5NLFNBVEs7QUFpQmQsZUFqQmMscUJBaUJKO0FBQUE7O0FBQ1IsZUFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixXQUFXLE1BQVgsQ0FBa0I7QUFDbEMsdUJBQVcsS0FBSyxLQUFMLENBQVcsTUFEWTtBQUVsQyx1QkFBVyxTQUZ1QjtBQUdsQywyQkFBZSxTQUhtQjtBQUlsQyxvQkFBUSxFQUowQjtBQUtsQyxxQkFBUztBQUx5QixXQUFsQixDQUFwQjtBQU9BLGNBQUksUUFBUSxJQUFaO0FBQ0EsY0FDQTtBQUNFLG9CQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBaEIsQ0FBUjtBQUNELFdBSEQsQ0FHRSxPQUFNLFdBQU4sRUFDRjtBQUNFLG9CQUFRLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEtBQUssS0FBaEM7QUFDRDtBQUNELGVBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxHQUE1QixFQUFpQyxLQUFqQztBQUNBLGVBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsWUFBSTtBQUNoQyxrQkFBSyxLQUFMLENBQVcsVUFBWCxHQUF3QixLQUF4QjtBQUNELFdBRkQ7QUFHQSxlQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEVBQWxCLENBQXFCLE1BQXJCLEVBQTZCLFlBQUk7QUFDL0Isa0JBQUssS0FBTCxDQUFXLFVBQVgsR0FBd0IsSUFBeEI7QUFDRCxXQUZEO0FBR0Q7QUF4Q2E7QUFETjtBQUZOLEdBQVI7QUErQ0QsQ0FoREQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBuZXcgVnVlKHtcbiAgICBlbDonI2FwcCcsXG4gICAgY29tcG9uZW50czoge1xuICAgICAgJ3Ytd2F2ZXN1cmZlcic6IHtcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwid2F2ZXN1cmZlciBjbGVhcmZpeFwiPjxkaXYgY2xhc3M9XCJ3YXZlc3VyZmVyLWNvbnRyb2xzXCI+PGkgdi1pZj1cIiFpc19wbGF5aW5nXCIgY2xhc3M9XCJmYSBmYS1wbGF5LWNpcmNsZVwiIEBjbGljaz1cInBsYXlcIj48L2k+PGkgdi1pZj1cImlzX3BsYXlpbmdcIiBjbGFzcz1cImZhIGZhLXBhdXNlLWNpcmNsZVwiIEBjbGljaz1cInBhdXNlXCI+PC9pPjwvZGl2PjxkaXYgcmVmPVwicGxheWVyXCIgY2xhc3M9XCJ3YXZlc3VyZmVyLXBsYXllclwiPjwvZGl2PjwvZGl2PicsXG4gICAgICAgIHByb3BzOiBbJ3NyYycsICdwZWFrcyddLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncGxheWVyJzogbnVsbCxcbiAgICAgICAgICAgICdpc19wbGF5aW5nJzogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICBwbGF5KCkge1xuICAgICAgICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIucGxheSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGF1c2UoKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLnBsYXllci5wYXVzZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIgPSBXYXZlU3VyZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGNvbnRhaW5lcjogdGhpcy4kcmVmcy5wbGF5ZXIsXG4gICAgICAgICAgICAgIHdhdmVDb2xvcjogJyM2OWI4ZTAnLFxuICAgICAgICAgICAgICBwcm9ncmVzc0NvbG9yOiAnIzJmNTg2ZCcsXG4gICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgIGJhY2tlbmQ6ICdNZWRpYUVsZW1lbnQnLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCBwZWFrcyA9IG51bGw7XG4gICAgICAgICAgdHJ5XG4gICAgICAgICAge1xuICAgICAgICAgICAgcGVha3MgPSBKU09OLnBhcnNlKHRoaXMucGVha3MpO1xuICAgICAgICAgIH0gY2F0Y2goU3ludGF4RXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwZWFrcyBlcnJvclwiLCB0aGlzLnBlYWtzKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRkYXRhLnBsYXllci5sb2FkKHRoaXMuc3JjLCBwZWFrcyk7XG4gICAgICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIub24oJ3BhdXNlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMuJGRhdGEuaXNfcGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIub24oJ3BsYXknLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy4kZGF0YS5pc19wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgfSwgICAgICAgIFxuICAgIH0sXG4gIH0pO1xufSJdfQ==
