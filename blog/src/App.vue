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
          <a class="nav-item is-tab">
          Posts
        </a>
          <a class="nav-item is-tab">
          Comments
        </a>
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
    created: function () {
      console.log(firebase.auth().currentUser)
          /*
          TESTAR
          firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
    */
    }
  }

</script>

<style>

</style>
