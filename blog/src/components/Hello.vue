<template>
  <div>
    <input type="text" v-model="post.title"></input>
    <button @click="addPost">Add</button>
    <pre>{{posts}}</pre>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'hello',
    data () {
      return {
        post: {
          title: ''
        }
      }
    },
    firebase: {
      posts: firebase.database().ref('posts')
    },
    methods: {
      addPost: function () {
        this.post.uid = firebase.auth().currentUser.uid
        this.$firebaseRefs.posts.push(this.post).then(
          (r) => {
            this.post = { title: '', uid: '' }
          },
          (e) => {
            console.warn(e)
          }
        )
        /*
        var provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken
          console.log(token)
          // The signed-in user info.
          var user = result.user
          console.log(user)
          // ...
        }).catch(function (error) {
          console.warn(error)
        })
         console.log(firebase.auth().currentUser)
      */
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
