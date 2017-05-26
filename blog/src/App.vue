<template>
  <div id="app">
    <nav class="nav has-shadow" id="top">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item" href="../index.html">
            <h2>Vue.js na prática</h2>
          </a>
        </div>
        <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-active">
          Home
        </a>
        <template v-if="user">
            <a class="nav-item is-tab">
          Posts
        </a>
            <a class="nav-item is-tab">
          Comments
        </a>
          </template>
          <template v-else>
            <a class="nav-item is-tab">
          <router-link to="/login">Login</router-link>
        </a>
          </template>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>

  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'app',
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    mounted: function () {
      let t = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          t.$store.dispatch('setUser', user)
        } else {
          console.warn('Not logged')
        }
      })
    }
  }

</script>

<style>

</style>
