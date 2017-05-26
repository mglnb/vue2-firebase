<template>
  <div>
    <h2> Login </h2>
    <div class="has-text-centered">
      <a class="button is-large" @click="loginGitHub">
    <span class="icon is-medium">
      <i class="fa fa-github"></i>
    </span>
    <span>GitHub</span>
  </a>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Login',
    methods: {
      loginGitHub: function () {
        var provider = new firebase.auth.GithubAuthProvider()
        var t = this
        firebase.auth().signInWithPopup(provider).then(function (result) {
          var user = result.user
          t.$store.dispatch('setUser', user)
          t.$router.push('/')
        }).catch(function (error) {
          console.warn(error)
        })
      }
    }
  }

</script>
