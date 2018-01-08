<style lang="sass">
.wavesurfer
{
  .wavesurfer-player
  {
    font-size: 0.6rem;
    .wavesurfer-player-left
    {
      width: 3rem;
      float: left;
      overflow: auto;
      padding: 0.3rem;
      padding-top: 1.1rem;
      text-align: right;
    }
    .wavesurfer-player-center
    {
      overflow: hidden;
    }
    .wavesurfer-player-right
    {
      width: 3rem;
      float: right;
      padding: 0.3rem;
      padding-top: 1.1rem;
    }
  }

  .wavesurfer-controls
  {
    text-align: center;
    font-size: 1rem;
    line-height: 1rem;
    margin-top: 0.5rem;
    .fa-pause-circle
    {
      color: #69b8e0;
    }
    button
    {
      margin-right: 0.2rem;
      &.btn
      {
        padding: 0.25rem .5rem;
      }
    }
  }

  .wavesurfer-console
  {
    text-align: center;
    font-size: 0.5rem;
    color: gray;
    .title
    {
      display: inline-block;
    }
    .duration
    {
      color: blue;
      display: inline-block;
      background: 1px solid gray;
      padding: 0.2rem;
      margin: 0.2rem;
      border-radius: 0.1rem;
    }
  }
}
</style>
<template lang="pug">
  .wavesurfer.clearfix
    .wavesurfer-player
      .wavesurfer-player-left
        | {{ currentTime }}
      .wavesurfer-player-right
        | {{ duration }}
      .wavesurfer-player-center(ref='player')
    .wavesurfer-controls
      button.btn.btn-xs.btn-primary
        i.fa.fa.fa-step-backward
      button.btn.btn-xs.btn-primary
        i.fa.fa-backward
      button.btn.btn-xs.btn-primary
        i.fa.fa-play-circle(v-if='!is_playing', @click='play')
        i.fa.fa-pause-circle(v-if='is_playing', @click='pause')
      button.btn.btn-xs.btn-primary
        i.fa.fa-forward
      button.btn.btn-xs.btn-primary
        i.fa.fa-step-forward
      .wavesurfer-console
        .title
          | {{ title }}
</template>
<script>
export default {
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
  data() {
    return {
      player: null,
      is_playing: false,
      currentTime: 0,
      duration: 0
    }
  },
  methods: {
    play() {
      window.eventBus.$emit('before-play', this.title, this._uid)
      this.$data.player.play()
      window.eventBus.$emit('playing', this.title, this._uid)
    },
    pause() {
      this.$data.player.pause()
      window.eventBus.$emit('paused', this.title, this._uid)
    }
  },
  mounted() {
    this.$data.player = WaveSurfer.create({
      container: this.$refs.player,
      waveColor: this.waveColor,
      progressColor: this.progressColor,
      height: this.height,
      backend: 'MediaElement'
    })
    let peaks = null
    try {
      peaks = JSON.parse(this.peaks)
    } catch (SyntaxError) {
      console.log('peaks error', this.peaks)
    }
    this.$data.player.load(this.src, peaks)

    let t = null
    let updateTime = () => {
      let d = this.$data.player.getDuration()
      let f = d > 3600 ? 'hh:mm:ss' : 'mm:ss'
      this.$data.currentTime = moment
        .duration(this.$data.player.getCurrentTime(), 'seconds')
        .format(f, { trim: false })
      this.$data.duration = moment
        .duration(this.$data.player.getDuration(), 'seconds')
        .format(f, { trim: false })
    }
    this.$data.player.on('pause', () => {
      this.$data.is_playing = false
      updateTime()
      clearTimeout(t)
    })
    this.$data.player.on('play', () => {
      this.$data.is_playing = true
      updateTime()
      t = setInterval(updateTime, 1000)
    })
    this.$data.player.on('finish', () => {
      console.log('finished')
      this.$data.is_playing = false
      this.$data.player.seekTo(0)
      clearTimeout(t)
      window.eventBus.$emit('stopped', this.title)
    })
    this.$data.player.on('ready', () => {
      updateTime()
    })
    this.$data.player.on('seek', () => {
      updateTime()
    })
    window.eventBus.$on('before-play', (title, uid) => {
      if (uid != this._uid) {
        this.pause()
      }
    })
  }
}
</script>