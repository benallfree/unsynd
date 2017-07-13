let wavesurfer = require('./wavesurfer.vue');

Vue.component('v-wavesurfer', wavesurfer)

window.eventBus = new Vue();

window.onload = function() {
  
  new Vue({
    el:'#app',
    data: {
      currentlyPlaying: null,
    },
    components: { wavesurfer },
    methods: {
      onPlay() {
        console.log('play');
      },
      fbSignIn() {
        console.log('signin')
        var provider = new firebase.auth.FacebookAuthProvider();
        // provider.addScope('user_birthday');
        provider.addScope('email');
        // provider.addScope('user_likes');
        // provider.addScope('user_about_me');
        // provider.addScope('user_posts');
        // provider.addScope('user_events');
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          // ...
        }).catch(function(error) {
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
    mounted() {
      console.log('mounted')
      window.eventBus.$on('before-play', (title)=> {
        console.log(title);
        this.$data.currentlyPlaying = title
        this.$root.$emit('show::modal','fullVersionLogin')
        console.log('before play')
        
      })
      window.eventBus.$on('playing', ()=>{
        console.log('playing')
      })
      
      
      FB.getLoginStatus((response)=>{
        console.log(response)
      });
    }
  });
}