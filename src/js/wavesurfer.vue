<style lang="sass">
.wavesurfer
{
  .wavesurfer-controls
  {
    float: left;
    width: 3rem;
    font-size: 3rem;
    color: green;
    line-height: 3rem;
    .fa-pause-circle
    {
      color: #69b8e0;
    }
  }
  .wavesurfer-player
  {
    overflow: hidden;
  }
  
}
</style>
<template lang="pug">
  .wavesurfer.clearfix
    .wavesurfer-controls
      i.fa.fa-play-circle(v-if='!is_playing', @click='play')
      i.fa.fa-pause-circle(v-if='is_playing', @click='pause')
    .wavesurfer-player(ref='player')
</template>
<script>
export default {
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
    this.$data.player = WaveSurfer.create({
        container: this.$refs.player,
        waveColor: '#69b8e0',
        progressColor: '#2f586d',
        height: 50,
        backend: 'MediaElement',
    });
    let peaks = null;
    try
    {
      peaks = JSON.parse(this.peaks);
    } catch(SyntaxError)
    {
      console.log("peaks error", this.peaks)
    }
    this.$data.player.load(this.src, peaks);
    this.$data.player.on('pause', ()=>{
      this.$data.is_playing = false;
    })
    this.$data.player.on('play', ()=>{
      this.$data.is_playing = true;
    })
  },
}
</script>