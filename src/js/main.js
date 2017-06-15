window.onload = function() {
  new Vue({
    el:'#app',
    components: {
      'v-wavesurfer': {
        template: '<div class="wavesurfer clearfix"><div class="wavesurfer-controls"><i v-if="!is_playing" class="fa fa-play-circle" @click="play"></i><i v-if="is_playing" class="fa fa-pause-circle" @click="pause"></i></div><div ref="player" class="wavesurfer-player"></div></div>',
        props: ['src', 'peaks'],
        data() {
          return {
            'player': null,
            'is_playing': false
          }
        },
        methods: {
          play() {
            this.$data.player.play();
          },
          pause() {
            this.$data.player.pause();
          },
        },
        mounted() {
          console.log(this.$refs.player);
          this.$data.player = WaveSurfer.create({
              container: this.$refs.player,
              waveColor: '#69b8e0',
              progressColor: '#2f586d',
              height: 50,
          });
          let peaks = null;
          try
          {
            peaks = JSON.parse(this.peaks);
            peaks = peaks.filter((v,i,a)=>{
              return v >=0;
            });
            peaks = peaks.map((v,i,a)=>{
              return v/127.0;
            })
          } catch(SyntaxError)
          {
          }
          console.log(peaks);
          this.$data.player.load(this.src, peaks);
          this.$data.player.on('pause', ()=>{
            this.$data.is_playing = false;
          })
          this.$data.player.on('play', ()=>{
            this.$data.is_playing = true;
          })
        },
      },        
    },
  });
}