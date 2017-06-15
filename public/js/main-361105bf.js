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

          console.log(this.$refs.player);
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
          console.log(peaks);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxNQUFQLEdBQWdCLFlBQVc7QUFDekIsTUFBSSxHQUFKLENBQVE7QUFDTixRQUFHLE1BREc7QUFFTixnQkFBWTtBQUNWLHNCQUFnQjtBQUNkLGtCQUFVLHVRQURJO0FBRWQsZUFBTyxDQUFDLEtBQUQsRUFBUSxPQUFSLENBRk87QUFHZCxZQUhjLGtCQUdQO0FBQ0wsaUJBQU87QUFDTCxzQkFBVSxJQURMO0FBRUwsMEJBQWM7QUFGVCxXQUFQO0FBSUQsU0FSYTs7QUFTZCxpQkFBUztBQUNQLGNBRE8sa0JBQ0E7QUFDTCxpQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixJQUFsQjtBQUNELFdBSE07QUFJUCxlQUpPLG1CQUlDO0FBQ04saUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEI7QUFDRDtBQU5NLFNBVEs7QUFpQmQsZUFqQmMscUJBaUJKO0FBQUE7O0FBQ1Isa0JBQVEsR0FBUixDQUFZLEtBQUssS0FBTCxDQUFXLE1BQXZCO0FBQ0EsZUFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixXQUFXLE1BQVgsQ0FBa0I7QUFDbEMsdUJBQVcsS0FBSyxLQUFMLENBQVcsTUFEWTtBQUVsQyx1QkFBVyxTQUZ1QjtBQUdsQywyQkFBZSxTQUhtQjtBQUlsQyxvQkFBUSxFQUowQjtBQUtsQyxxQkFBUztBQUx5QixXQUFsQixDQUFwQjtBQU9BLGNBQUksUUFBUSxJQUFaO0FBQ0EsY0FDQTtBQUNFLG9CQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBaEIsQ0FBUjtBQUNELFdBSEQsQ0FHRSxPQUFNLFdBQU4sRUFDRjtBQUNFLG9CQUFRLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEtBQUssS0FBaEM7QUFDRDtBQUNELGtCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsZUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixJQUFsQixDQUF1QixLQUFLLEdBQTVCLEVBQWlDLEtBQWpDO0FBQ0EsZUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixZQUFJO0FBQ2hDLGtCQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXdCLEtBQXhCO0FBQ0QsV0FGRDtBQUdBLGVBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsRUFBbEIsQ0FBcUIsTUFBckIsRUFBNkIsWUFBSTtBQUMvQixrQkFBSyxLQUFMLENBQVcsVUFBWCxHQUF3QixJQUF4QjtBQUNELFdBRkQ7QUFHRDtBQTFDYTtBQUROO0FBRk4sR0FBUjtBQWlERCxDQWxERCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIG5ldyBWdWUoe1xuICAgIGVsOicjYXBwJyxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAndi13YXZlc3VyZmVyJzoge1xuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ3YXZlc3VyZmVyIGNsZWFyZml4XCI+PGRpdiBjbGFzcz1cIndhdmVzdXJmZXItY29udHJvbHNcIj48aSB2LWlmPVwiIWlzX3BsYXlpbmdcIiBjbGFzcz1cImZhIGZhLXBsYXktY2lyY2xlXCIgQGNsaWNrPVwicGxheVwiPjwvaT48aSB2LWlmPVwiaXNfcGxheWluZ1wiIGNsYXNzPVwiZmEgZmEtcGF1c2UtY2lyY2xlXCIgQGNsaWNrPVwicGF1c2VcIj48L2k+PC9kaXY+PGRpdiByZWY9XCJwbGF5ZXJcIiBjbGFzcz1cIndhdmVzdXJmZXItcGxheWVyXCI+PC9kaXY+PC9kaXY+JyxcbiAgICAgICAgcHJvcHM6IFsnc3JjJywgJ3BlYWtzJ10sXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwbGF5ZXInOiBudWxsLFxuICAgICAgICAgICAgJ2lzX3BsYXlpbmcnOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgIHBsYXkoKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLnBsYXllci5wbGF5KCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXVzZSgpIHtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEucGxheWVyLnBhdXNlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRyZWZzLnBsYXllcik7XG4gICAgICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIgPSBXYXZlU3VyZmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGNvbnRhaW5lcjogdGhpcy4kcmVmcy5wbGF5ZXIsXG4gICAgICAgICAgICAgIHdhdmVDb2xvcjogJyM2OWI4ZTAnLFxuICAgICAgICAgICAgICBwcm9ncmVzc0NvbG9yOiAnIzJmNTg2ZCcsXG4gICAgICAgICAgICAgIGhlaWdodDogNTAsXG4gICAgICAgICAgICAgIGJhY2tlbmQ6ICdNZWRpYUVsZW1lbnQnLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCBwZWFrcyA9IG51bGw7XG4gICAgICAgICAgdHJ5XG4gICAgICAgICAge1xuICAgICAgICAgICAgcGVha3MgPSBKU09OLnBhcnNlKHRoaXMucGVha3MpO1xuICAgICAgICAgIH0gY2F0Y2goU3ludGF4RXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwZWFrcyBlcnJvclwiLCB0aGlzLnBlYWtzKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhwZWFrcyk7XG4gICAgICAgICAgdGhpcy4kZGF0YS5wbGF5ZXIubG9hZCh0aGlzLnNyYywgcGVha3MpO1xuICAgICAgICAgIHRoaXMuJGRhdGEucGxheWVyLm9uKCdwYXVzZScsICgpPT57XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmlzX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuJGRhdGEucGxheWVyLm9uKCdwbGF5JywgKCk9PntcbiAgICAgICAgICAgIHRoaXMuJGRhdGEuaXNfcGxheWluZyA9IHRydWU7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0sICAgICAgICBcbiAgICB9LFxuICB9KTtcbn0iXX0=
