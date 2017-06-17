let wavesurfer = require('./wavesurfer.vue');

Vue.component('v-wavesurfer', wavesurfer)

window.onload = function() {
  
  new Vue({
    el:'#app',
    components: { wavesurfer }
  });
}